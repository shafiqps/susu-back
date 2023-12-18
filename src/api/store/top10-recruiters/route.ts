import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { EntityManager } from "typeorm";
import { Customer } from "@medusajs/medusa";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    const manager: EntityManager = req.scope.resolve("manager");
    const customerRepository = manager.getRepository(Customer);

    // Fetch all customers
    const allCustomers = await customerRepository.find();

    // Map to hold referralCode and count of how many times it's been referred
    const referralCounts = new Map();

    // Initialize counts for each referral code
    allCustomers.forEach(customer => {
      const referralCode = customer.metadata?.referral_code;
      if (referralCode) {
        referralCounts.set(referralCode, 0);
      }
    });

    // Count referrals
    allCustomers.forEach(customer => {
      const referrerCode = customer.metadata?.referrer;
      if (referrerCode && referralCounts.has(referrerCode)) {
        referralCounts.set(referrerCode, referralCounts.get(referrerCode) + 1);
      }
    });

    // Update 'recruits' attribute for each customer
    for (const customer of allCustomers) {
      const referralCode = customer.metadata?.referral_code;
      if (referralCode) {
        const recruitCount = referralCounts.get(referralCode) || 0;
        customer.recruits = recruitCount
        await customerRepository.save(customer);
      }
    }

    // Optionally, refetch updated customers if needed
    const updatedCustomers = await customerRepository.find();

    res.status(200).json(updatedCustomers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
