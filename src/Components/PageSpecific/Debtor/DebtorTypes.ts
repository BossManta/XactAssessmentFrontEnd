export type DebtorInfo = {
    accountCode: number
    name: string
    address1: string
    address2: string
    address3: string
    balance: number
    salesYearToDate: number
    costYearToDate: number
}

export type DebtorInvoice = {
    invoiceNo: number
    date: string
    itemCount: number
    total: number
}

