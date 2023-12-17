import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { CustomerService } from "@medusajs/medusa";
import { isNumberObject } from "util/types";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    const customerService: CustomerService = req.scope.resolve("customerService");
    
    // Fetch all customers
    const customers = await customerService.list({});

    // Sort customers by 'loyaltyPoints' in descending order
    const sortedCustomers = customers.sort((a, b) => {
      return b.loyaltyPoints - a.loyaltyPoints; // For descending order
    });

    res.status(200).json(sortedCustomers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
