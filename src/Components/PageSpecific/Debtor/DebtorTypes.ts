//A model to represent a debtor.
export type DebtorModel = {
    accountCode: number
    name: string
    address1: string
    address2: string
    address3: string
    balance: number
    salesYearToDate: number
    costYearToDate: number
}

//A model to represent invoice data from debtor.
export type DebtorInvoiceModel = {
    invoiceNo: number
    date: string
    itemCount: number
    total: number
}

