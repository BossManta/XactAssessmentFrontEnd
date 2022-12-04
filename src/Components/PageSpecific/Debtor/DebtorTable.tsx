import { FormEvent, FunctionComponent, useEffect, useState } from "react";
import formatMoney from "../../Shared/MoneyFormatter";
import { CustomRowElementBuilder } from "../../Shared/TableDisplayerTypes";
import TableDisplayer, { ColumnInfo } from "../../TableDisplayer";
import { fetchDebtors } from "./DebtorAPIRequester";
import { DebtorInfo } from "./DebtorTypes";

interface DebtorTableProps {
    refreshTrigger: boolean
    customRowElementBuilder?: CustomRowElementBuilder[]
}
 
const DebtorTable: FunctionComponent<DebtorTableProps> = ({refreshTrigger, customRowElementBuilder=[]}) => {
    
    const [debtorsList, setDebtorsList] = useState<DebtorInfo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        fetchDebtors("", setLoading, setDebtorsList);
    }, [refreshTrigger])

    useEffect(() => {
        fetchDebtors("", setLoading, setDebtorsList);
    }, [])

    const searchSubmit = (e: FormEvent) => {
        e.preventDefault()
        setLoading(false);
        fetchDebtors(search, setLoading, setDebtorsList);
    }
    
    const tableColumnInfo: ColumnInfo = [
        {headerName:"Acc Code",     jsonName:"accountCode"},
        {headerName:"Name",         jsonName:"name"},
        {headerName:"Address1",     jsonName:"address1"},
        {headerName:"Address2",     jsonName:"address2"},
        {headerName:"Address3",     jsonName:"address3"},
        {headerName:"Balance",      jsonName:"balance", customFunction:formatMoney},
        {headerName:"Cost YTD",     jsonName:"costYearToDate"},
        {headerName:"Sales YTD",     jsonName:"salesYearToDate"},
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
                                jsonData={debtorsList as []} 
                                customRowElementBuilder={customRowElementBuilder}/>
            }
        </>
     );
}
 
export default DebtorTable;