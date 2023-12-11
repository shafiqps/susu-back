export default async function () {
    const imports = (await import(
      "@medusajs/medusa/dist/api/routes/store/orders/index"
    )) as any
    imports.allowedStoreOrdersFields = [
      ...imports.allowedStoreOrdersFields,
      "loyaltyPoints",
    ]
    imports.defaultStoreOrdersFields = [
      ...imports.defaultStoreOrdersFields,
      "loyaltyPoints",
    ]
  }