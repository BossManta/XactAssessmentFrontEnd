import { DebtorInfo } from "../Debtor/DebtorTypes"
import { StockInfo } from "../Stock/StockTypes"

export type InvoiceDisplay = {
    generalInfo: InvoiceGeneralInfo
    itemInfo: InvoiceItemInfo[]
    debtorInfo: DebtorInfo
}

export type InvoiceGeneralInfo = {
    invoiceNo: number
    accountCode: number
    date: string
    totalSellAmountExclVat: number
    vat: number
    totalCost: number
}

export type InvoiceItemInfo = {
    invoiceNo: number
    itemNo: number
    stockCode: number
    qtySold: number
    unitCost: number
    combinedCost: number
    disc: string
    total: number
}

export type InvoiceMinimal = {
    accountCode: number
    stockCountArray: StockCount[]
}

export type StockCount = {
    stockCode: number
    count: number
}