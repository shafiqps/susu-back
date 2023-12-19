// src/api/count-customers.js

import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { CustomerService } from "@medusajs/medusa";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    const customerService: CustomerService = req.scope.resolve("customerService");

    // Count the total number of customers
    const totalCustomers = await customerService.count();

    // Send the count as a response
    res.status(200).json({ totalCustomers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
