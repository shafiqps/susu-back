// In your API route (e.g., src/api/orders/all-with-total.js)

import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    const orderService = req.scope.resolve("orderService");
    const orders = await orderService.list({}); // List all orders

    const total = orders.reduce((sum, order) => sum + order.total, 0);

    res.status(200).json(total*0.19 );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
