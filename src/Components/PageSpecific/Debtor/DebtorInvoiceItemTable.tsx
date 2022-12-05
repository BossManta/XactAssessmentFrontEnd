import { FunctionComponent, useEffect, useState } from "react";
import formatMoney from "../../Shared/MoneyFormatter";
import { CustomRowElementBuilder } from "../../Shared/TableDisplayerTypes";
import TableDisplayer, { ColumnInfo } from "../../Shared/TableDisplayer";
import { InvoiceItemModel } from "../Invoice/InvoiceTypes";
import { fetchInvoiceItems } from "./DebtorAPIRequester";

interface DebtorInvoiceItemTableProps {
    invoiceNo: number
    refreshTrigger: boolean
    customRowElementBuilder?: CustomRowElementBuilder[]
}

//A table containing invoice item information for debtor. Used in debtor details page.
const DebtorInvoiceItemTable: FunctionComponent<DebtorInvoiceItemTableProps> = ({invoiceNo, refreshTrigger, customRowElementBuilder=[]}) => {

    const [invoiceItemList, setInvoiceItemList] = useState<InvoiceItemModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchInvoiceItems(invoiceNo, setLoading, setInvoiceItemList);
    }, [refreshTrigger, invoiceNo])

    const tableColumnInfo: ColumnInfo = [
        {headerName:"Item No",              jsonName:"itemNo"},
        {headerName:"Stock Code",           jsonName:"stockCode"},
        {headerName:"Disc",                 jsonName:"disc"},
        {headerName:"Qty Sold",             jsonName:"qtySold"},
        {headerName:"Item Price",            jsonName:"unitSell", customFunction:formatMoney},
        {headerName:"Combined Price",        jsonName:"combinedSell", customFunction:formatMoney},
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