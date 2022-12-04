import { FunctionComponent, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Modal from "../../Modal";
import PageContentContainer from "../../Shared/PageContentContainer";
import { StockCount } from "../Invoice/InvoiceTypes";
import StockCountForm from "../Invoice/StockCountForm";
import { addStock, createStock, editStock } from "./StockAPIRequester";
import StockForm from "./StockForm";
import StockTable from "./StockTable";
import { StockInfo } from "./StockTypes";

interface StockMasterProps {
    
}
 
const StockMaster: FunctionComponent<StockMasterProps> = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [selectedRow, setSelectedRow] = useState<StockInfo>();
    const [stockTableRefreshTrigger, setStockTableRefreshTrigger] = useState<boolean>(false);
    const [addStockModalOpen, setAddStockModalOpen] = useState<boolean>(false);
    
    

    const onSuccess = () => {
        toast.success("Success");
        setModalOpen(false);
        setAddStockModalOpen(false);
        setStockTableRefreshTrigger(old=>!old);
    }

    const onFail = (resp: any) => {
        toast.error(resp);
    }
    
    const handleEditClick = (row: StockInfo) => {
        setModalOpen(true);
        setIsEditMode(true);
        setSelectedRow(row);
    }
    
    const handleAddStockClick = (row: StockInfo) => {
        setAddStockModalOpen(true);
        setSelectedRow(row);
    }

    const handleAddStock = (count: number) => {
        const stockCount: StockCount = {stockCode:(selectedRow as StockInfo).stockCode, count:count}
        addStock(stockCount, onSuccess, onFail);
        setStockTableRefreshTrigger(old=>!old);
    }
    
    return ( 
        <PageContentContainer>
        
            <StockTable refreshTrigger={stockTableRefreshTrigger} 
                        customRowElementBuilder = {[
                            (row) => <button className="defaultButtonStyle" onClick={()=>handleEditClick(row as StockInfo)}>Edit</button>,
                            (row) => <Link to={`/stockdetails/${(row as StockInfo).stockCode}`} className="defaultButtonStyle" onClick={()=>handleEditClick(row as StockInfo)}>Details</Link>,
                            (row) => <button className="defaultButtonStyle" onClick={()=>handleAddStockClick(row as StockInfo)}>Add Stock</button>,
                        ]}  
                                
                                />

            <button className="bg-green-400 hover:bg-green-500 w-12 p-2 m-2 rounded-2xl text-white font-bold" onClick={()=>{setModalOpen(true); setIsEditMode(false); setSelectedRow(undefined)}}>+</button>

            {/* Modal to add or edit record to table */}
            {modalOpen && 
                <Modal openSetter={setModalOpen}>
                    <StockForm presetData={(selectedRow as StockInfo)} formSubmit={(data) => {

                        if (isEditMode) {
                            editStock(data, onSuccess, onFail);
                        }
                        else {
                            createStock(data, onSuccess, onFail);
                        }
                    
                    }}/>
                </Modal>
            }

            {addStockModalOpen && 
                <Modal openSetter={setAddStockModalOpen}>
                    <StockCountForm stockLimit={500} updateStockList={handleAddStock} />
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

        </PageContentContainer>
     );
}
 
export default StockMaster;