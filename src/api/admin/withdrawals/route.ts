import type {
  MedusaRequest, 
  MedusaResponse,
} from "@medusajs/medusa"
import WithdrawalService  from "../../../services/withdrawal"

// list withdrawals
export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    // Resolve the WithdrawalService from the request's scope
    const withdrawalService: WithdrawalService = req.scope.resolve("withdrawalService");

    // Optionally, you can pass selectors and configuration, e.g., for pagination
    const selector = {}; // Define your selector here, if needed
    const config = {
      skip: 0,
      take: 20, // You can adjust pagination settings here
      relations: ["customer"] // Include any relations if needed
    };

    // Retrieve all withdrawals
    const withdrawals = await withdrawalService.list(selector, config);

    // Respond with the retrieved withdrawals
    res.status(200).json(withdrawals);
  } catch (error) {
    // Handle any errors
    res.status(500).json({ error: error.message });
  }
};

// create a withdrawal
export const POST = async (
  req: MedusaRequest, 
  res: MedusaResponse
) => {
  const withdrawalService: WithdrawalService = req.scope.resolve(
    "withdrawalService"
  )

  // basic validation of request body
  if (!req.body.total || !req.body.customer_id) {
    throw new Error("`total` and `customer_id` are required.")
  }

  const post = await withdrawalService.create(req.body)

  res.json({
    post,
  })
}