// Backend route adjustment
import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { CustomerService } from "@medusajs/medusa";

async function fetchReferrals(customerService, referralCode) {
  const customers = await customerService.list({});
  return customers.filter(customer => customer.metadata?.referrer === referralCode);
}

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    const customerService: CustomerService = req.scope.resolve("customerService");
    const loggedInUserId = req.user.customer_id;
    
    if (!loggedInUserId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const loggedInUser = await customerService.retrieve(loggedInUserId);
    const loggedInUserReferralCode = loggedInUser.metadata?.referral_code;
    
    if (!loggedInUserReferralCode) {
      return res.status(404).json({ error: 'Referral code not found' });
    }

    // Recursive function to build the referral tree
    async function buildReferralTree(referralCode) {
      const referrals = await fetchReferrals(customerService, referralCode);
      for (const ref of referrals) {
        ref.referrals = await buildReferralTree(ref.metadata?.referral_code);
      }
      return referrals;
    }

    const referralTree = await buildReferralTree(loggedInUserReferralCode);
    res.status(200).json(referralTree);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
