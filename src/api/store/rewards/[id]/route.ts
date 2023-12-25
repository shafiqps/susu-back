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
