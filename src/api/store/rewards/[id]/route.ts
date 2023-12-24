import type { 
    MedusaRequest, 
    MedusaResponse,
  } from "@medusajs/medusa"
  import RewardsService  from "../../../../services/rewards"
  
  // retrieve a post by its ID
  export const GET = async (
    req: MedusaRequest, 
    res: MedusaResponse
  ) => {
    const rewardsService: RewardsService = req.scope.resolve(
      "rewardsService"
    )
  
    const post = await rewardsService.retrieve(req.params.id)
  
    res.json({
      post,
    })
  }
  
  // update a post by its ID
  export const POST = async (
    req: MedusaRequest, 
    res: MedusaResponse
  ) => {
    const rewardsService: RewardsService = req.scope.resolve(
      "rewardsService"
    )
  
    // basic validation of request body
    if (req.body.id) {
      throw new Error("Can't update post ID")
    }
  
    const post = await rewardsService.update(
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
    const rewardsService: RewardsService = req.scope.resolve(
      "rewardsService"
    )
  
    await rewardsService.delete(req.params.id)
  
    res.status(200).end()
  }