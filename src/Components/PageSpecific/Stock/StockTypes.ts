export type StockInfo = {
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

export type StockDetails = {
    invoiceNo: number
    date: string
    debtorAccountCode: number
    debtorName: string
    purchaseQty: number
    total: number
}