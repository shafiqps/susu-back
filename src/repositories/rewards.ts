import { Rewards } from "../models/rewards"
import { 
  dataSource,
} from "@medusajs/medusa/dist/loaders/database"

export const RewardsRepository = dataSource
  .getRepository(Rewards)
  .extend({
    customMethod(): void {
      // TODO add custom implementation
      return
    },
  })

export default RewardsRepository