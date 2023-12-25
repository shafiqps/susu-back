import type { 
    MedusaRequest, 
    MedusaResponse,
  } from "@medusajs/medusa"
  import RedeemService  from "../../../../services/redeem"
  
  // retrieve a post by its ID
  export const GET = async (
    req: MedusaRequest, 
    res: MedusaResponse
  ) => {
    const redeemService: RedeemService = req.scope.resolve(
      "redeemService"
    )
  
    const redeem = await redeemService.retrieve(req.params.id)
  
    res.json({
      redeem,
    })
  }
  
  // update a post by its ID
  export const POST = async (
    req: MedusaRequest, 
    res: MedusaResponse
  ) => {
    const redeemService: RedeemService = req.scope.resolve(
      "redeemService"
    )
  
    // basic validation of request body
    if (req.body.id) {
      throw new Error("Can't update post ID")
    }
  
    const redeem = await redeemService.update(
      req.params.id,
      req.body
    )
  
    res.json({
      redeem,
    })
  }
  
  // delete a post by its ID
  export const DELETE = async (
    req: MedusaRequest, 
    res: MedusaResponse
  ) => {
    const redeemService: RedeemService = req.scope.resolve(
      "redeemService"
    )
  
    await redeemService.delete(req.params.id)
  
    res.status(200).end()
  }