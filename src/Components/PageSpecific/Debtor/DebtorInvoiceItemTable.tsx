import { FunctionComponent, useEffect, useState } from "react";
import formatMoney from "../../Shared/MoneyFormatter";
import { CustomRowElementBuilder } from "../../Shared/TableDisplayerTypes";
import TableDisplayer, { ColumnInfo } from "../../TableDisplayer";
import { InvoiceItemInfo } from "../Invoice/InvoiceTypes";
import { fetchInvoiceItems } from "./DebtorAPIRequester";

interface DebtorInvoiceItemTableProps {
    invoiceNo: number
    refreshTrigger: boolean
    customRowElementBuilder?: CustomRowElementBuilder[]
}
 
const DebtorInvoiceItemTable: FunctionComponent<DebtorInvoiceItemTableProps> = ({invoiceNo, refreshTrigger, customRowElementBuilder=[]}) => {

    const [invoiceItemList, setInvoiceItemList] = useState<InvoiceItemInfo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchInvoiceItems(invoiceNo, setLoading, setInvoiceItemList);
    }, [refreshTrigger, invoiceNo])

    const tableColumnInfo: ColumnInfo = [
        // {headerName:"Invoice Number",       jsonName:"invoiceNo"},
        {headerName:"Item No",              jsonName:"itemNo"},
        {headerName:"Stock Code",           jsonName:"stockCode"},
        {headerName:"Disc",                 jsonName:"disc"},
        {headerName:"Qty Sold",             jsonName:"qtySold"},
        {headerName:"Item Cost",            jsonName:"unitCost", customFunction:formatMoney},
        {headerName:"Combined Cost",        jsonName:"combinedCost", customFunction:formatMoney},
    ]

    return ( 
        <>
            {
                loading?<h1 className="text-2xl">Loading...</h1>:            
                <TableDisplayer columnInfo={tableColumnInfo}
                                jsonData={invoiceItemList as []}
                                customRowElementBuilder = {customRowElementBuilder} />
            }
        </>
     );
}
 
export default DebtorInvoiceItemTable;