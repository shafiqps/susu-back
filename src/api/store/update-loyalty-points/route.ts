// src/api/update-customer-loyalty-points.js

import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { CustomerService } from "@medusajs/medusa";

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    const { customerId, pointsToDeduct } = req.body;
    const customerService: CustomerService = req.scope.resolve("customerService");

    const customer = await customerService.retrieve(customerId);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    // Update customer's LoyaltyPoints
    const updatedLoyaltyPoints = Math.max(customer.loyaltyPoints - pointsToDeduct, 0); // Ensure it doesn't go below 0
    await customerService.update(customerId, { loyaltyPoints: updatedLoyaltyPoints });

    res.status(200).json({ message: 'Customer updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
