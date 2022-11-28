import { FormEvent, FunctionComponent, useEffect, useState } from "react";
import { CustomRowElementBuilder } from "../../Shared/TableDisplayerTypes";
import TableDisplayer from "../../TableDisplayer";
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
    
    
    const tableHeaderNames = [
        "Acc Code",
        "Address1",
        "Address2",
        "Address3",
        "Balance",
        "Cost YTD",
        "Sales YTD",
    ]

    const tableDataNames: (keyof DebtorInfo)[] = [
        "accountCode",
        "address1",
        "address2",
        "address3",
        "balance",
        "costYearToDate",
        "salesYearToDate",
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
                                jsonData={debtorsList as []} 
                                customRowElementBuilder={customRowElementBuilder}/>
            }
        </>
     );
}
 
export default DebtorTable;