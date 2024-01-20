import { 
  FindConfig,
  Selector,
  TransactionBaseService,
  buildQuery,
} from "@medusajs/medusa"
import { WithdrawalRepository } from "../repositories/withdrawal"
import { Withdrawal } from "../models/withdrawal"
import { MedusaError } from "@medusajs/utils"
import { Not } from "typeorm"

type WithdrawalSelector = Selector<Withdrawal> & {
  customer_id?: string;
  status?: string;
};
class WithdrawalService extends TransactionBaseService {
  protected withdrawalRepository_: typeof WithdrawalRepository

  constructor(container) {
    super(container)
    this.withdrawalRepository_ = container.withdrawalRepository
  }

  async listAndCount(
    selector?: Selector<Withdrawal>,
    config: FindConfig<Withdrawal> = {
      skip: 0,
      take: 20,
      relations: [],
  }): Promise<[Withdrawal[], number]> {
    const withdrawalRepo = this.activeManager_.withRepository(
      this.withdrawalRepository_
    )
    
    const query = buildQuery(selector, config)
    
    return withdrawalRepo.findAndCount(query)
  }
  
  async list(
    selector?: Selector<Withdrawal>,
    config: FindConfig<Withdrawal> = {
      skip: 0,
      take: 20,
      relations: ["customer"],
  }): Promise<Withdrawal[]> {
    const [withdrawals] = await this.listAndCount(selector, config)

    return withdrawals
  }

  async retrieve(
    id: string,
    config?: FindConfig<Withdrawal>
  ): Promise<Withdrawal> {
    const withdrawalRepo = this.activeManager_.withRepository(
      this.withdrawalRepository_
    )

    const query = buildQuery({
      id,
    }, config)

    const post = await withdrawalRepo.findOne(query)

    if (!post) {
      throw new MedusaError(
        MedusaError.Types.NOT_FOUND,
        "Post was not found"
      )
    }

    return post
  }

  async create(
    data: Pick<Withdrawal, "total" | "customer_id" | "status" | "reason">
  ): Promise<Withdrawal> {
    return this.atomicPhase_(async (manager) => {
      const withdrawalRepo = manager.withRepository(
        this.withdrawalRepository_
      )
      const withdrawal = withdrawalRepo.create()

      withdrawal.total = data.total
      withdrawal.customer_id = data.customer_id
      withdrawal.status = "pending"
      withdrawal.reason = data.reason

      const result = await withdrawalRepo.save(withdrawal)

      return result
    })
  }

  async update(
    id: string,
    data: Omit<Partial<Withdrawal>, "id">
  ): Promise<Withdrawal> {
    return await this.atomicPhase_(async (manager) => {
      const withdrawalRepo = manager.withRepository(
        this.withdrawalRepository_
      )
      const withdrawal = await this.retrieve(id)

      Object.assign(withdrawal, data)

      return await withdrawalRepo.save(withdrawal)
    })
  }
  async listByCustomerPending(
    selector: WithdrawalSelector = {},
    config: FindConfig<Withdrawal> = {
      skip: 0,
      take: 20,
      relations: [],
    },
    customerId?: string
  ): Promise<Withdrawal[]> {
    if (customerId) {
      selector.customer_id = customerId;
      selector.status = "pending";
    }
    const [withdrawals] = await this.listAndCount(selector, config);
    return withdrawals;
  }

  async listByCustomerCompleted(
    customerId: string,
    config: FindConfig<Withdrawal> = {
      skip: 0,
      take: 20,
      relations: [],
    }
  ): Promise<Withdrawal[]> {
    const withdrawalRepo = this.activeManager_.withRepository(
      this.withdrawalRepository_
    );
  
    // Use the TypeORM query builder to construct the query
    const queryBuilder = withdrawalRepo.createQueryBuilder("withdrawal");
  
    // Filter by customer_id
    queryBuilder.where("withdrawal.customer_id = :customerId", { customerId: customerId });
  
    // Exclude pending withdrawals
    queryBuilder.andWhere("withdrawal.status != :status", { status: "pending" });
  
    // Apply pagination if needed
    if (config.skip) {
      queryBuilder.skip(config.skip);
    }
    if (config.take) {
      queryBuilder.take(config.take);
    }
  
    // Apply relations if needed
    if (config.relations) {
      config.relations.forEach(relation => {
        queryBuilder.leftJoinAndSelect(`withdrawal.${relation}`, relation);
      });
    }
  
    // Execute the query and return the result
    return queryBuilder.getMany();
  }
  async delete(id: string): Promise<void> {
    return await this.atomicPhase_(async (manager) => {
      const withdrawalRepo = manager.withRepository(
        this.withdrawalRepository_
      )
      const withdrawal = await this.retrieve(id)
      
      await withdrawalRepo.remove([withdrawal])
    })
  }
}

export default WithdrawalService