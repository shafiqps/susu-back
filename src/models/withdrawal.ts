import { 
    BeforeInsert, 
    Column, 
    Entity,
    JoinColumn,
    ManyToOne, 
  } from "typeorm"
  import { BaseEntity } from "@medusajs/medusa"
  import { generateEntityId } from "@medusajs/medusa/dist/utils"
  import { Customer } from "./customer"
  
  @Entity()
  export class Withdrawal extends BaseEntity {
    @Column({ type: "int" })
    total: number
    
    @Column({ type: "varchar" })
    status: string

    @Column({ type: "varchar" })
    reason: string

    @Column({ type: "varchar" })
    customer_id: string

    
  
    @ManyToOne(() => Customer, (customer) => customer.withdrawals)
    @JoinColumn({ name: "customer_id" })
    customer: Customer

    @BeforeInsert()
    private beforeInsert(): void {
      this.id = generateEntityId(this.id, "withdrawal")
    }
  }