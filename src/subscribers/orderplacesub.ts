import { EventBusService } from "@medusajs/medusa"
import OrderService from "../services/order"


class OrderPlacedSubscriber {
  protected readonly orderService: OrderService
  
  
  constructor({ eventBusService, orderService, }) {
    this.orderService = orderService
    eventBusService.subscribe("order.placed", this.handleOrder)
  }

  handleOrder = async (order) => {
    console.log(order.id)
    
    await this.orderService.calculateLoyaltyPoints(order.id)
    // await this.customerService.makeLoyaltyPoints(order.customer_id, 2)

  }
}

export default OrderPlacedSubscriber
