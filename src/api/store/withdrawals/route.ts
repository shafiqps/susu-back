import type {
  MedusaRequest, 
  MedusaResponse,
} from "@medusajs/medusa"
import WithdrawalService  from "../../../services/withdrawal"

// list withdrawals
export const GET = async (
  req: MedusaRequest, 
  res: MedusaResponse
) => {
  const withdrawalService: WithdrawalService = req.scope.resolve(
    "withdrawalService"
  )

  res.json({
    posts: await withdrawalService.list(),
  })
}

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