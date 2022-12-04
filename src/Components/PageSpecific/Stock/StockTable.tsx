import { FormEvent, FunctionComponent, useEffect, useState } from "react";
import formatMoney from "../../Shared/MoneyFormatter";
import { CustomRowElementBuilder } from "../../Shared/TableDisplayerTypes";
import TableDisplayer, { ColumnInfo } from "../../TableDisplayer";
import { fetchStock } from "./StockAPIRequester";
import { StockInfo } from "./StockTypes";

interface StockTableProps {
    refreshTrigger: boolean
    customRowElementBuilder?: CustomRowElementBuilder[]
}
 
const StockTable: FunctionComponent<StockTableProps> = ({refreshTrigger, customRowElementBuilder=[]}) => {

    const [stockList, setStockList] = useState<StockInfo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        fetchStock("", setLoading, setStockList);
    }, [refreshTrigger])

    useEffect(() => {
        fetchStock("", setLoading, setStockList);
    }, [])

    const searchSubmit = (e: FormEvent) => {
        e.preventDefault()
        setLoading(false);
        fetchStock(search, setLoading, setStockList);
    }

    const tableColumnInfo: ColumnInfo = [
        {headerName:"Stock Code",       jsonName:"stockCode"},
        {headerName:"Disc",             jsonName:"stockDescription"},
        {headerName:"Cost",             jsonName:"cost", customFunction:formatMoney},
        {headerName:"Sell Price",       jsonName:"sellingPrice", customFunction:formatMoney},
        {headerName:"PurchaseTotal",    jsonName:"totalPurchasesExclVat", customFunction:formatMoney},
        {headerName:"SalesTotal",       jsonName:"totalSalesExclVat", customFunction:formatMoney},
        {headerName:"# Purchased",      jsonName:"qtyPurchased"},
        {headerName:"# Sold",           jsonName:"qtySold"},
        {headerName:"Stock",            jsonName:"stockOnHand"},
    ]

    return ( 
        <>
            <form onSubmit={(e)=>searchSubmit(e)} className="mr-auto my-4">
                <input className="border-gray-400 border-2 rounded-r-md p-1" onChange={(e)=>setSearch(e.target.value)} type="text" name="Search" title="Search" placeholder=" Search" id="Search" />
                <input type="submit" hidden/>
            </form>

            {
                loading?<h1 className="text-2xl">Loading...</h1>:            
                <TableDisplayer columnInfo={tableColumnInfo}
                                jsonData={stockList as []}
                                customRowElementBuilder = {customRowElementBuilder} />
            }
        </>
     );
}
 
export default StockTable;