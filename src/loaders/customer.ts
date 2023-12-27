export default async function () {
    const imports = (await import(
      "@medusajs/medusa/dist/api/routes/store/customers/index"
    )) as any
    imports.allowedStoreCustomersFields = [
      ...imports.allowedStoreCustomersFields,
      "loyaltyPoints",
      "totalOrders",
      "pendingFunds",
    ]
    imports.defaultStoreCustomersFields = [
      ...imports.defaultStoreCustomersFields,
      "loyaltyPoints",
      "totalOrders",
      "pendingFunds",

    ]
  }