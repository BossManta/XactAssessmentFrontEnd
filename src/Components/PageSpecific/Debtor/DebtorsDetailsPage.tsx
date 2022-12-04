import { FunctionComponent, useState } from "react";
import { useParams } from "react-router-dom";
import PageContentContainer from "../../Shared/PageContentContainer";
import DebtorInvoiceItemTable from "./DebtorInvoiceItemTable";
import DebtorInvoiceTable from "./DebtorInvoiceTable";
import { DebtorInvoice } from "./DebtorTypes";

interface DebtorsDetailsPageProps {
    
}
 
const DebtorsDetailsPage: FunctionComponent<DebtorsDetailsPageProps> = () => {

    const [selectedInvoiceNumber, setSelectedInvoiceNumber] = useState<number|null>(null);
    const {id} = useParams();

    const handleInvoiceClick = (row: DebtorInvoice) => {
        setSelectedInvoiceNumber(old=>{
            return old===row.invoiceNo?null:row.invoiceNo;
        });
    }

    return ( 
        <PageContentContainer>
            <h1 className="text-2xl font-bold mb-10">Invoice History</h1>
            <DebtorInvoiceTable stockCode={id as unknown as number} refreshTrigger={true} customRowElementBuilder={[
                (row)=> {
                        const isSelected = (row as DebtorInvoice).invoiceNo===selectedInvoiceNumber;
                        
                        return <button  className={`${isSelected?"bg-emerald-400 hover:bg-emerald-500":""} defaultButtonStyle w-32`}
                                onClick={()=>handleInvoiceClick(row as DebtorInvoice)}>
                                    {isSelected?"Selected":"Select"}
                        </button>}
            ]}/>


            {selectedInvoiceNumber!==null?
                <>
                    <h1 className="text-2xl font-bold my-10">Invoice Details</h1>
                    <DebtorInvoiceItemTable invoiceNo={selectedInvoiceNumber as number} refreshTrigger={true}/>
                </>
                :"Nothing selected.."
            }
        </PageContentContainer>
    );
}
 
export default DebtorsDetailsPage;