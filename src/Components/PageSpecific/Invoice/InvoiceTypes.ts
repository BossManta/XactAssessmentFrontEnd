import { DebtorModel } from "../Debtor/DebtorTypes"
import { StockModel } from "../Stock/StockTypes"

//Model that represents needed information to create a visual invoice.
export type InvoiceDisplayModel = {
    generalInfo: InvoiceGeneralModel
    itemInfo: InvoiceItemModel[]
    debtorInfo: DebtorModel
}

//Model that represents general invoice info.
//This is everything other than item info.
export type InvoiceGeneralModel = {
    invoiceNo: number
    accountCode: number
    date: string
    totalSellAmountExclVat: number
    vat: number
    total: number
}

//Model that represents invoice item info.
export type InvoiceItemModel = {
    invoiceNo: number
    itemNo: number
    stockCode: number
    qtySold: number
    unitCost: number
    unitSell: number
    combinedSell: number
    disc: string
    total: number
}

//Model that represents stripped down version of invoice.
//Only contains debtor account code and stock codes and qtys.
export type InvoiceMinimalModel = {
    accountCode: number
    stockCountArray: StockCountModel[]
}

//Model that represents stock count info.
//Contains stock code and count.
//Used to show qty for a given stock item.
export type StockCountModel = {
    stockCode: number
    count: number
}