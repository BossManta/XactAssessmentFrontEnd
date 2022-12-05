//A model that represents stock information.
export type StockModel = {
    stockCode: number
    stockDescription: string
    cost: number
    sellingPrice: number
    totalPurchasesExclVat: number
    totalSalesExclVat: number
    qtyPurchased: number
    qtySold: number
    stockOnHand: number
}

//A model that represents stock transaction information.
export type StockDetailsModel = {
    invoiceNo: number
    date: string
    debtorAccountCode: number
    debtorName: string
    purchaseQty: number
    total: number
}