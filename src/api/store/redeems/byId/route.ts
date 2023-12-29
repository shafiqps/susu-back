import type {
    MedusaRequest, 
    MedusaResponse,
  } from "@medusajs/medusa"
  import RedeemService  from "../../../../services/redeem"

// Example route to list withdrawals for the logged-in user
export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
    const redeemService: RedeemService = req.scope.resolve("redeemService");
    const loggedInUserId = req.user.customer_id; // Assuming you have a way to get the logged-in user's ID
    const config = {
      skip: 0,
      take: 20, // You can adjust pagination settings here
      relations: ["rewards"] // Include any relations if needed
    };
    try {
      const redeems = await redeemService.listById({}, config, loggedInUserId);
      res.status(200).json({ redeems });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  