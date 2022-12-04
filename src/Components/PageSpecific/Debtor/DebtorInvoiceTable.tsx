import { FunctionComponent, useEffect, useState } from "react";
import formatMoney from "../../Shared/MoneyFormatter";
import { CustomRowElementBuilder } from "../../Shared/TableDisplayerTypes";
import TableDisplayer, { ColumnInfo } from "../../TableDisplayer";
import { fetchInvoices } from "./DebtorAPIRequester";
import { DebtorInvoice } from "./DebtorTypes";

interface DebtorInvoiceTableProps {
    stockCode: number
    refreshTrigger: boolean
    customRowElementBuilder?: CustomRowElementBuilder[]
}
 
const DebtorInvoiceTable: FunctionComponent<DebtorInvoiceTableProps> = ({stockCode, refreshTrigger, customRowElementBuilder=[]}) => {

    const [invoiceList, setInvoiceList] = useState<DebtorInvoice[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchInvoices(stockCode, setLoading, setInvoiceList);
    }, [refreshTrigger, stockCode])


    const tableColumnInfo: ColumnInfo = [
        {headerName:"Invoice Number",       jsonName:"invoiceNo"},
        {headerName:"Date",                 jsonName:"date"},
        {headerName:"Unique Item Count",    jsonName:"itemCount"},
        {headerName:"Total",                jsonName:"total", customFunction:formatMoney},
    ]

    return ( 
        <>
            {
                loading?<h1 className="text-2xl">Loading...</h1>:            
                <TableDisplayer columnInfo={tableColumnInfo}
                                jsonData={invoiceList as []}
                                customRowElementBuilder = {customRowElementBuilder} />
            }
        </>
     );
}
 
export default DebtorInvoiceTable;