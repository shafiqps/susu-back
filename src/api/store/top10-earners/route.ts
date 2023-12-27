import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { CustomerService } from "@medusajs/medusa";
import { EntityManager } from "typeorm";
import { Customer } from "@medusajs/medusa";

import { isNumberObject } from "util/types";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    const customerService: CustomerService = req.scope.resolve("customerService");
    const manager: EntityManager = req.scope.resolve("manager");
    const customerRepository = manager.getRepository(Customer);

    // Fetch all customers
    const customers = await customerRepository.find({
      relations: ["billing_address"],
    });

    // Sort customers by 'loyaltyPoints' in descending order
    const sortedCustomers = customers.sort((a, b) => {
      return b.loyaltyPoints - a.loyaltyPoints; // For descending order
    });
    const topCustomers = sortedCustomers.slice(0, 10);

    res.status(200).json(topCustomers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
