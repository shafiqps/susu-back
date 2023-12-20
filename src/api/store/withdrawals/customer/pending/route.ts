import type {
    MedusaRequest, 
    MedusaResponse,
  } from "@medusajs/medusa"
  import WithdrawalService  from "../../../../../services/withdrawal"

// Example route to list withdrawals for the logged-in user
export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
    const withdrawalService: WithdrawalService = req.scope.resolve("withdrawalService");
    const loggedInUserId = req.user.customer_id; // Assuming you have a way to get the logged-in user's ID
    if (!loggedInUserId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
    try {
      const withdrawals = await withdrawalService.listByCustomerPending({}, {}, loggedInUserId);
      res.status(200).json({ withdrawals });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  