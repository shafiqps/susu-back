import { 
    BeforeInsert, 
    Column, 
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany 
  } from "typeorm"
  import { BaseEntity } from "@medusajs/medusa"
  import { generateEntityId } from "@medusajs/medusa/dist/utils"
  import { Redeem } from "./redeem"
  
  @Entity()
  export class Rewards extends BaseEntity {
    @Column({ type: "int" })
    price: number
    
    @Column({ type: "varchar" })
    image: string

    @Column({ type: "varchar" })
    details: string

    @Column({ type: "varchar" })
    caption: string

    @OneToMany(() => Redeem, (redeem) => redeem.rewards)
  redeem: Redeem[]
  
    

    @BeforeInsert()
    private beforeInsert(): void {
      this.id = generateEntityId(this.id, "rewards")
    }
  }