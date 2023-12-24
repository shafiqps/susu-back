import { 
    FindConfig,
    Selector,
    TransactionBaseService,
    buildQuery,
  } from "@medusajs/medusa"
  import { RewardsRepository } from "../repositories/rewards"
  import { Rewards } from "../models/rewards"
  import { MedusaError } from "@medusajs/utils"
  
  class RewardsService extends TransactionBaseService {
    protected rewardsRepository_: typeof RewardsRepository
  
    constructor(container) {
      super(container)
      this.rewardsRepository_ = container.rewardsRepository
    }
  
    async listAndCount(
      selector?: Selector<Rewards>,
      config: FindConfig<Rewards> = {
        skip: 0,
        take: 20,
        relations: [],
    }): Promise<[Rewards[], number]> {
      const rewardsRepo = this.activeManager_.withRepository(
        this.rewardsRepository_
      )
  
      const query = buildQuery(selector, config)
  
      return rewardsRepo.findAndCount(query)
    }
    
    async list(
      selector?: Selector<Rewards>,
      config: FindConfig<Rewards> = {
        skip: 0,
        take: 20,
        relations: [],
    }): Promise<Rewards[]> {
      const [rewards] = await this.listAndCount(selector, config)
  
      return rewards
    }
  
    async retrieve(
      id: string,
      config?: FindConfig<Rewards>
    ): Promise<Rewards> {
      const rewardsRepo = this.activeManager_.withRepository(
        this.rewardsRepository_
      )
  
      const query = buildQuery({
        id,
      }, config)
  
      const rewards = await rewardsRepo.findOne(query)
  
      if (!rewards) {
        throw new MedusaError(
          MedusaError.Types.NOT_FOUND,
          "Post was not found"
        )
      }
  
      return rewards
    }
  
    async create(
      data: Pick<Rewards, "price" | "image" | "caption" | "details">
    ): Promise<Rewards> {
      return this.atomicPhase_(async (manager) => {
        const rewardsRepo = manager.withRepository(
          this.rewardsRepository_
        )
        const rewards = rewardsRepo.create()
        rewards.price = data.price
        rewards.caption = data.caption
        rewards.image = data.image
        rewards.details = data.details
        const result = await rewardsRepo.save(rewards)
  
        return result
      })
    }
  
    async update(
      id: string,
      data: Omit<Partial<Rewards>, "id">
    ): Promise<Rewards> {
      return await this.atomicPhase_(async (manager) => {
        const rewardsRepo = manager.withRepository(
          this.rewardsRepository_
        )
        const rewards = await this.retrieve(id)
  
        Object.assign(rewards, data)
  
        return await rewardsRepo.save(rewards)
      })
    }
  
    async delete(id: string): Promise<void> {
      return await this.atomicPhase_(async (manager) => {
        const rewardsRepo = manager.withRepository(
          this.rewardsRepository_
        )
        const rewards = await this.retrieve(id)
        
        await rewardsRepo.remove([rewards])
      })
    }
  }
  
  export default RewardsService