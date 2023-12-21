import {   
    OrderService as MedusaOrderService, 
    CustomerService,
    MedusaContainer,
    
  } from "@medusajs/medusa"  
  import { Customer, Item } from "@medusajs/medusa"
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

      // async test(updatedCustomer): Promise<Item[]> {
      //   const custRepo = this.activeManager_.getRepository(
      //     Item
      //   )
      //   return await custRepo.
      // }
      
    constructor(container){
        super(container)
        this.customerService = container.customerService
        
    }
    

    async recursiveFunction(referrer, loyaltyPoints){
      const referrerReferral = referrer.metadata?.referrer;
      if(referrerReferral){
        const referrer = "cus_01" + referrerReferral;
        const referrerCust = await this.customerService.retrieve(referrer)
        console.log(loyaltyPoints*0.05)
        const referrerPoints = Math.round((loyaltyPoints*0.05)*100)
        referrerCust.loyaltyPoints += referrerPoints;
        await this.findRepo(referrerCust)
        await this.recursiveFunction(referrerCust, loyaltyPoints)  
      }
    }
    
    async calculateLoyaltyPoints(orderId) {  
      const order = await this.retrieveWithTotals(orderId)
      console.log(order.customer_id)
      const customer = await this.customerService.retrieve(order.customer_id)  
      console.log(customer)
      const referrerId = customer.metadata?.referrer;
      console.log(String(referrerId))
      const loyaltyPoints = order.total / 100
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
        console.log(loyaltyPoints*0.2)
        const referrerPoints = Math.round((loyaltyPoints*0.20)*100)
        console.log(referrerPoints)
        referrercust.loyaltyPoints += referrerPoints;
        await this.findRepo(referrercust)
        await this.recursiveFunction(referrercust, loyaltyPoints)
      }

      // Assuming order.cart.items is an array of items and each item has a 'quantity' property
      const totalQuantity = order.items.reduce((total, item) => {
        return total + item.quantity;
      }, 0); // Start with a total of 0
      customer.totalOrders += 1;
      console.log(totalQuantity)
      if (totalQuantity >= 10) {
        console.log(totalQuantity)
        customer.totalBulkPurchase = customer.totalBulkPurchase + Math.floor(totalQuantity / 10);
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