import { Redeem } from "../models/redeem"
import { 
  dataSource,
} from "@medusajs/medusa/dist/loaders/database"

export const RedeemRepository = dataSource
  .getRepository(Redeem)
  .extend({
    customMethod(): void {
      // TODO add custom implementation
      return
    },
  })

export default RedeemRepository