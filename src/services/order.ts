import {   
    OrderService as MedusaOrderService, 
    CustomerService,
    MedusaContainer,
    
  } from "@medusajs/medusa"  
  import { Customer } from "@medusajs/medusa"
import { CustomRepositoryCannotInheritRepositoryError } from "typeorm"
  
  export default class OrderService extends MedusaOrderService {  
    protected readonly customerService: CustomerService
    protected readonly customerServiceRepository: CustomRepositoryCannotInheritRepositoryError
    
    async findRepo(updatedCustomer): Promise<Customer[]> {
        const custRepo = this.activeManager_.getRepository(
          Customer
        )
        return await custRepo.save(updatedCustomer)
      }
      
    constructor(container){
        super(container)
        this.customerService = container.customerService
        
    }
  
    async calculateLoyaltyPoints(orderId) {  
      const order = await this.retrieveWithTotals(orderId)
      console.log(order.customer_id)
      const customer = await this.customerService.retrieve(order.customer_id)  
      console.log(customer)
      const referrerId = customer.metadata?.referrer;
      console.log(String(referrerId))
      const loyaltyPoints = Math.ceil(order.total / 100)
      customer.loyaltyPoints += loyaltyPoints;
      console.log(order.total) 
      console.log(order.total) 
      console.log(loyaltyPoints)
      if (referrerId) {
        // Logic to handle the referrer
        // For example, update the referrer's loyalty points
        const referrer = "cus_01" + customer.metadata.referrer;
        console.log(referrer)
        const referrercust = await this.customerService.retrieve(referrer)
        console.log(referrercust)
        const referrerPoints = Math.ceil(loyaltyPoints*0.10)
        console.log(referrerPoints)
        referrercust.loyaltyPoints += referrerPoints;
        await this.findRepo(referrercust)
      }
      order.loyaltyPoints += loyaltyPoints
      console.log(order)
      const updatedOrder = await this.orderRepository_.save(order)
      await this.findRepo(customer)
      console.log(updatedOrder)


      // Apply the loyalty points to the customer's account
    //   await this.customerService.makeLoyaltyPoints(order.customer_id, loyaltyPoints)
  
      return updatedOrder  
    }  
  }  