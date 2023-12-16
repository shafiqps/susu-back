import { Withdrawal } from "../models/withdrawal"
import { 
  dataSource,
} from "@medusajs/medusa/dist/loaders/database"

export const WithdrawalRepository = dataSource
  .getRepository(Withdrawal)
  .extend({
    customMethod(): void {
      // TODO add custom implementation
      return
    },
  })

export default WithdrawalRepository