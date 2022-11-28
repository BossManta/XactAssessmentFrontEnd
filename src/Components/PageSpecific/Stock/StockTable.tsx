import { FormEvent, FunctionComponent, useEffect, useState } from "react";
import { CustomRowElementBuilder } from "../../Shared/TableDisplayerTypes";
import TableDisplayer from "../../TableDisplayer";
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

    const tableHeaderNames = [
        "Stock Code",
        "Disc",
        "Cost",
        "Sell Price",
        "PurchaseTotal",
        "SalesTotal",
        "# Purchased",
        "# Sold",
        "stock",
    ]

    const tableDataNames: (keyof StockInfo)[] = [
        "stockCode",
        "stockDescription",
        "cost",
        "sellingPrice",
        "totalPurchasesExclVat",
        "totalSalesExclVat",
        "qtyPurchased",
        "qtySold",
        "stockOnHand",
    ]

    return ( 
        <>
            <form onSubmit={(e)=>searchSubmit(e)} className="mr-auto my-4">
                <input className="border-gray-400 border-2 rounded-r-md p-1" onChange={(e)=>setSearch(e.target.value)} type="text" name="Search" title="Search" placeholder=" Search" id="Search" />
                <input type="submit" hidden/>
            </form>

            {
                loading?<h1 className="text-2xl">Loading...</h1>:            
                <TableDisplayer headerNames={tableHeaderNames}
                                dataNames={tableDataNames as []}
                                jsonData={stockList as []}
                                customRowElementBuilder = {customRowElementBuilder} />
            }
        </>
     );
}
 
export default StockTable;