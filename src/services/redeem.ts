import { 
    FindConfig,
    Selector,
    TransactionBaseService,
    buildQuery,
  } from "@medusajs/medusa"
  import { RedeemRepository } from "../repositories/redeem"
  import { Redeem } from "../models/redeem"
  import { MedusaError } from "@medusajs/utils"
  
  class RedeemService extends TransactionBaseService {
    protected redeemRepository_: typeof RedeemRepository
  
    constructor(container) {
      super(container)
      this.redeemRepository_ = container.redeemRepository
    }
  
    async listAndCount(
      selector?: Selector<Redeem>,
      config: FindConfig<Redeem> = {
        skip: 0,
        take: 20,
        relations: [],
    }): Promise<[Redeem[], number]> {
      const rewardsRepo = this.activeManager_.withRepository(
        this.redeemRepository_
      )
  
      const query = buildQuery(selector, config)
  
      return rewardsRepo.findAndCount(query)
    }
    
    async list(
      selector?: Selector<Redeem>,
      config: FindConfig<Redeem> = {
        skip: 0,
        take: 20,
        relations: [],
    }): Promise<Redeem[]> {
      const [redeem] = await this.listAndCount(selector, config)
  
      return redeem
    }
  
    async retrieve(
      id: string,
      config?: FindConfig<Redeem>
    ): Promise<Redeem> {
      const redeemRepo = this.activeManager_.withRepository(
        this.redeemRepository_
      )
  
      const query = buildQuery({
        id,
      }, config)
  
      const redeem = await redeemRepo.findOne(query)
  
      if (!redeem) {
        throw new MedusaError(
          MedusaError.Types.NOT_FOUND,
          "Redeem was not found"
        )
      }
  
      return redeem
    }
    async listById(
      selector: Selector<Redeem> = {},
      config: FindConfig<Redeem> = {
        skip: 0,
        take: 20,
        relations: [],
      },
      customerId?: string
    ): Promise<Redeem[]> {
      if (customerId) {
        selector.customer_id = customerId;
      }
      const [redeems] = await this.listAndCount(selector, config);
      return redeems;
    }
    async create(
      data: Pick<Redeem, "status" | "customer_id" | "rewards_id">
    ): Promise<Redeem> {
      return this.atomicPhase_(async (manager) => {
        const redeemRepo = manager.withRepository(
          this.redeemRepository_
        )
        const redeem = redeemRepo.create()
        redeem.status = "pending"
        redeem.customer_id = data.customer_id
        redeem.rewards_id = data.rewards_id
        console.log(redeem)
        const result = await redeemRepo.save(redeem)
  
        return result
      })
    }
  
    async update(
      id: string,
      data: Omit<Partial<Redeem>, "id">
    ): Promise<Redeem> {
      return await this.atomicPhase_(async (manager) => {
        const redeemRepo = manager.withRepository(
          this.redeemRepository_
        )
        const redeem = await this.retrieve(id)
  
        Object.assign(redeem, data)
  
        return await redeemRepo.save(redeem)
      })
    }
  
    async delete(id: string): Promise<void> {
      return await this.atomicPhase_(async (manager) => {
        const redeemRepo = manager.withRepository(
          this.redeemRepository_
        )
        const redeem = await this.retrieve(id)
        
        await redeemRepo.remove([redeem])
      })
    }
  }
  
  export default RedeemService