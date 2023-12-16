import { 
    BeforeInsert,
    Column,
    Entity,
    OneToMany,
  } from "typeorm"

  import { Withdrawal } from "./withdrawal"

import {  
 // alias the core entity to not cause a naming conflict  
 Customer as MedusaCustomer,  
} from "@medusajs/medusa"  
  
@Entity()  
export class Customer extends MedusaCustomer {
 @Column()  
 loyaltyPoints: number  
 @Column()  
 referralCode: String
 @Column()  
 referralInput: String
 @Column()  
 referrer: String

 @OneToMany(() => Withdrawal, (withdrawal) => withdrawal.customer)
  withdrawals: Withdrawal[]
}