import type { 
    MedusaRequest, 
    MedusaResponse,
  } from "@medusajs/medusa"
  import WithdrawalService  from "../../../../services/withdrawal"
  
  // retrieve a post by its ID
  export const GET = async (
    req: MedusaRequest, 
    res: MedusaResponse
  ) => {
    const withdrawalService: WithdrawalService = req.scope.resolve(
      "withdrawalService"
    )
  
    const post = await withdrawalService.retrieve(req.params.id)
  
    res.json({
      post,
    })
  }
  
  // update a post by its ID
  export const POST = async (
    req: MedusaRequest, 
    res: MedusaResponse
  ) => {
    const withdrawalService: WithdrawalService = req.scope.resolve(
      "withdrawalService"
    )
  
    // basic validation of request body
    if (req.body.id) {
      throw new Error("Can't update post ID")
    }
  
    const post = await withdrawalService.update(
      req.params.id,
      req.body
    )
  
    res.json({
      post,
    })
  }
  
  // delete a post by its ID
  export const DELETE = async (
    req: MedusaRequest, 
    res: MedusaResponse
  ) => {
    const withdrawalService: WithdrawalService = req.scope.resolve(
      "withdrawalService"
    )
  
    await withdrawalService.delete(req.params.id)
  
    res.status(200).end()
  }