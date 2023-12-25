import { 
    BeforeInsert, 
    Column, 
    Entity,
    JoinColumn,
    ManyToOne, 
  } from "typeorm"
  import { BaseEntity } from "@medusajs/medusa"
  import { generateEntityId } from "@medusajs/medusa/dist/utils"
  import { Rewards } from "./rewards"
  import { Customer } from "./customer"
  
  @Entity()
  export class Redeem extends BaseEntity {

    @Column({ type: "varchar" })
    status: string

    @Column({ type: "varchar" })
    customer_id: string

    @Column({ type: "varchar" })
    rewards_id: string

    @ManyToOne(() => Customer, (customer) => customer.redeem)
    @JoinColumn({ name: "customer_id" })
    customer: Customer;

    @ManyToOne(() => Rewards, (rewards) => rewards.redeem)
    @JoinColumn({ name: "rewards_id" })
    rewards: Rewards;

    
  
    

    @BeforeInsert()
    private beforeInsert(): void {
      this.id = generateEntityId(this.id, "redeem")
    }
  }