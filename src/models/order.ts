import { Column, Entity } from "typeorm"  
import {  
 // alias the core entity to not cause a naming conflict  
 Order as MedusaOrder,  
} from "@medusajs/medusa"  
  
@Entity()  
export class Order extends MedusaOrder {  
 @Column()  
 loyaltyPoints: number
 referrer: string  
}  