export declare module "@medusajs/medusa/dist/models/order" {
    declare interface Order {
      referrer: string;
      loyaltyPoints;
    }
    
  }
  export declare module "@medusajs/medusa/dist/models/customer" {
    declare interface Customer {
        loyaltyPoints: number  
        referralCode: String
        referralInput: String
        referrer: String
        totalOrders: number
        recruits: number
        totalBulkPurchase: number
        totalProfitShare: number
        pendingFunds: number
             }
    
  }
  