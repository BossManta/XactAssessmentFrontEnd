import { FunctionComponent, useEffect, useState } from "react";
import formatMoney from "../../Shared/MoneyFormatter";
import { CustomRowElementBuilder } from "../../Shared/TableDisplayerTypes";
import TableDisplayer, { ColumnInfo } from "../../Shared/TableDisplayer";
import { fetchDetails } from "./StockAPIRequester";
import { StockDetailsModel } from "./StockTypes";

interface StockTableProps {
    stockCode: number
    refreshTrigger: boolean
    customRowElementBuilder?: CustomRowElementBuilder[]
}

//A table to show all stock transaction information.
const StockTable: FunctionComponent<StockTableProps> = ({stockCode, refreshTrigger, customRowElementBuilder=[]}) => {

    const [detailsList, setDetailsList] = useState<StockDetailsModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchDetails(stockCode, setLoading, setDetailsList);
    }, [refreshTrigger, stockCode])


    const tableColumnInfo: ColumnInfo = [
        {headerName:"Invoice Number",       jsonName:"invoiceNo"},
        {headerName:"Date",                 jsonName:"date"},
        {headerName:"Debtor Acc Number",    jsonName:"debtorAccountCode"},
        {headerName:"Debtor Name",          jsonName:"debtorName"},
        {headerName:"Purchase Qty",         jsonName:"purchaseQty"},
        {headerName:"Total",                jsonName:"total", customFunction:formatMoney},
    ]

    return ( 
        <>
            {
                loading?<h1 className="text-2xl">Loading...</h1>:            
                <TableDisplayer columnInfo={tableColumnInfo}
                                jsonData={detailsList as []}
                                customRowElementBuilder = {customRowElementBuilder} />
            }
        </>
     );
}
 
export default StockTable;