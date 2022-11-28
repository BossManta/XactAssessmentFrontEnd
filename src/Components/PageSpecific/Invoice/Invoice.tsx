import { FunctionComponent, useState } from "react";
import Modal from "../../Modal";
import DefaultButton from "../../Shared/DefaultButton";
import PageContentContainer from "../../Shared/PageContentContainer";
import DebtorTable from "../Debtor/DebtorTable";
import { DebtorInfo } from "../Debtor/DebtorTypes";
import StockTable from "../Stock/StockTable";
import { StockInfo } from "../Stock/StockTypes";
import StockCountForm from "./StockCountForm";

type StockCount = {
    stockInfo: StockInfo
    count: number
}

type SelectionScreen = "Debtor" | "Stock" | "Confirmation";

interface InvoiceProps {
    
}
 
const Invoice: FunctionComponent<InvoiceProps> = () => {

    const [selectedDebtor, setSelectedDebtor] = useState<DebtorInfo>();
    const [currentSelectionScreen, setCurrentSelectionScreen] = useState<SelectionScreen>("Debtor");
    const [stockModalOpen, setStockModalOpen] = useState<boolean>(false);
    const [currentStockInfo, setCurrentStockInfo] = useState<StockInfo>();
    const [stockInfoMap, setStockInfoMap] = useState(new Map<number, StockCount>())

    const handleStockClick = (row: StockInfo ) => {
        setCurrentStockInfo(row);
        setStockModalOpen(true)
    }

    const handleDebtorClick = (row: DebtorInfo) => {
        setSelectedDebtor(row);
        setCurrentSelectionScreen("Stock");
    }

    const addToListOfStocks = (count: number) => {
        const toAdd: StockCount = {stockInfo: (currentStockInfo as StockInfo), count: count}
        setStockInfoMap(old=>old.set(currentStockInfo?.stockCode??0, toAdd))
        setStockModalOpen(false);
    }

    const generateStockButtonContent = (row: StockInfo) => {
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
                        <div className="w-full h-96 overflow-auto">                
                            <DebtorTable refreshTrigger={true} 
                                customRowElementBuilder={[
                                    (row) => <DefaultButton onClick={()=>handleDebtorClick(row as DebtorInfo)}>Set Debtor</DefaultButton>
                                ]}
                            />
                        </div>
                    </>
                }

                {
                    currentSelectionScreen === "Stock" && 
                    <>
                        <div className="flex justify-between w-full mb-12 border-b-2 pb-2">
                            <DefaultButton onClick={()=>setCurrentSelectionScreen("Debtor")}>
                                Change Debtor
                            </DefaultButton>

                            <h1 className="my-auto">Selected Debtor <b>#{selectedDebtor?.accountCode}</b></h1>

                            <DefaultButton onClick={()=>{}}>
                                Submit Invoice
                            </DefaultButton>
                        </div>

                        <h1 className="text-3xl font-bold">Select Stock</h1>
                        <div className="w-full h-96 overflow-auto">                
                            <StockTable refreshTrigger={true} 
                                customRowElementBuilder = {[
                                    (row) => <DefaultButton className="w-16"
                                         onClick={()=>handleStockClick(row as StockInfo)}>
                                        {generateStockButtonContent(row as StockInfo)}
                                    </DefaultButton>
                                ]}
                            />
                        </div>
                    </>
                }
            </PageContentContainer>

            {stockModalOpen && 
                <Modal openSetter={setStockModalOpen}>
                    <StockCountForm stockLimit={currentStockInfo?.stockOnHand??0} updateStockList={addToListOfStocks} />
                </Modal>
            }

        </div>
     );
}
 
export default Invoice;