import { FunctionComponent, useState } from "react";
import Modal from "../../Shared/Modal";
import PageContentContainer from "../../Shared/PageContentContainer";
import DebtorTable from "../Debtor/DebtorTable";
import { DebtorModel } from "../Debtor/DebtorTypes";
import StockTable from "../Stock/StockTable";
import { StockModel } from "../Stock/StockTypes";
import InvoiceDocument from "./InvoiceDocument";
import StockCountForm from "./StockCountForm";
import {InvoiceDisplayModel, InvoiceMinimalModel, StockCountModel} from "./InvoiceTypes";
import { fetchPreview, fetchSubmit } from "./InvoiceAPIRequester";
import { toast, ToastContainer } from "react-toastify";

type SelectionScreen = "Debtor" | "Stock" | "Invoice";

interface InvoiceProps {
    
}

//A page for generating an invoice. Allows for debtor and stock selecting.
const Invoice: FunctionComponent<InvoiceProps> = () => {

    const [selectedDebtor, setSelectedDebtor] = useState<DebtorModel>();
    const [currentSelectionScreen, setCurrentSelectionScreen] = useState<SelectionScreen>("Debtor");
    const [stockModalOpen, setStockModalOpen] = useState<boolean>(false);
    const [currentStockInfo, setCurrentStockInfo] = useState<StockModel>();
    const [stockInfoMap, setStockInfoMap] = useState(new Map<number, StockCountModel>())
    const [invoicePreview, setInvoicePreview] = useState<InvoiceDisplayModel>();
    const [isLoading, setIsLoading] = useState(true);

    const handleStockClick = (row: StockModel) => {
        setCurrentStockInfo(row);
        setStockModalOpen(true)
    }

    const handleDebtorClick = (row: DebtorModel) => {
        setSelectedDebtor(row);
        setCurrentSelectionScreen("Stock");
    }

    const handlePreviewClick = () => {
        const s = Array.from(stockInfoMap.values());
        const minInvoice: InvoiceMinimalModel = {accountCode: (selectedDebtor as DebtorModel).accountCode,
                                            stockCountArray: s}
        fetchPreview(minInvoice, setIsLoading, setInvoicePreview);
        setCurrentSelectionScreen("Invoice");
    }

    const handleSubmitClick = () => {
        const s = Array.from(stockInfoMap.values());
        const minInvoice: InvoiceMinimalModel = {accountCode: (selectedDebtor as DebtorModel).accountCode,
                                            stockCountArray: s}
        fetchSubmit(minInvoice, setIsLoading, setInvoicePreview);
        toast.success("Successfully created invoice");
    }

    const addToListOfStocks = (count: number) => {
        const curStockInfo = currentStockInfo as StockModel;

        //Removes if set item qty to 0
        if (count === 0) {
            setStockInfoMap(old=>{
                old.delete(curStockInfo.stockCode);
                return old;
            })
        }

        //Add item and set qty
        else {
            const toAdd: StockCountModel = {stockCode: curStockInfo.stockCode, count: count}
            setStockInfoMap(old=>old.set(curStockInfo.stockCode, toAdd))
        }

        setStockModalOpen(false);
    }

    const generateStockButtonContent = (row: StockModel) => {
        if (stockInfoMap.has(row.stockCode)  && stockInfoMap.get(row.stockCode)?.count!==0) {
            return stockInfoMap.get(row.stockCode)?.count??"+"
        }
        return "+"
    }    

    return ( 
        <div>
            <PageContentContainer>      
                {
                    currentSelectionScreen === "Debtor" && 
                    <>
                        <h1 className="text-3xl font-bold">Select Debtor</h1>
                        <div className="overflow">                
                            <DebtorTable refreshTrigger={true} 
                                customRowElementBuilder={[
                                    (row) => <button className="defaultButtonStyle" onClick={()=>handleDebtorClick(row as DebtorModel)}>Set Debtor</button>
                                ]}
                            />
                        </div>
                    </>
                }

                {
                    currentSelectionScreen === "Stock" && 
                    <>
                        <div className="flex justify-between w-full mb-12 border-b-2 pb-2">
                            <button className="defaultButtonStyle" onClick={()=>setCurrentSelectionScreen("Debtor")}>
                                Change Debtor
                            </button>

                            <h1 className="my-auto">Selected Debtor <b>#{selectedDebtor?.accountCode}</b></h1>

                            <button className="defaultButtonStyle" onClick={handlePreviewClick}>
                                Preview Invoice
                            </button>
                        </div>

                        <h1 className="text-3xl font-bold">Select Stock</h1>
                        <div className="overflow">                
                            <StockTable refreshTrigger={true} 
                                customRowElementBuilder = {[
                                    (row) => <button className="defaultButtonStyle w-16"
                                         onClick={()=>handleStockClick(row as StockModel)}>
                                        {generateStockButtonContent(row as StockModel)}
                                    </button>
                                ]}
                            />
                        </div>
                    </>
                }

                {
                    currentSelectionScreen === "Invoice" &&
                    <>
                        <div className="flex justify-between w-full mb-12 border-b-2 pb-2">
                            <button className="defaultButtonStyle" onClick={()=>{setCurrentSelectionScreen("Stock"); setIsLoading(true)}}>
                                Change Items
                            </button>

                            <button className="defaultButtonStyle" onClick={handleSubmitClick}>
                                Submit Invoice
                            </button>
                        </div>

                        {isLoading?"Loading...":
                            <div className="mb-16 p-6 w-full">
                                <InvoiceDocument invoiceInfo={invoicePreview as InvoiceDisplayModel}/>
                            </div>
                        }
                    </>
                }
            </PageContentContainer>


            {stockModalOpen && 
                <Modal openSetter={setStockModalOpen}>
                    <StockCountForm stockLimit={currentStockInfo?.stockOnHand??0} updateStockList={addToListOfStocks} />
                </Modal>
            }

            {/* Toast Modal */}
            <ToastContainer
                position="top-center"
                autoClose={7000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover
                toastStyle={
                    {
                        backgroundColor: "#0c1818",
                        color: "#fff"
                    }
                }/>

        </div>
     );
}
 
export default Invoice;