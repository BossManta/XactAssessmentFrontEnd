import { FunctionComponent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Modal from "../../Modal";
import DefaultButton from "../../Shared/DefaultButton";
import PageContentContainer from "../../Shared/PageContentContainer";
import { createStock, editStock } from "./StockAPIRequester";
import StockForm from "./StockForm";
import StockTable from "./StockTable";
import { StockInfo } from "./StockTypes";

interface StockMasterProps {
    
}
 
const StockMaster: FunctionComponent<StockMasterProps> = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [editPreset, setEditPreset] = useState<StockInfo>();
    const [stockTableRefreshTrigger, setStockTableRefreshTrigger] = useState<boolean>(false);
    
    

    const onSuccess = () => {
        toast.success("Success");
        setModalOpen(false);
        setStockTableRefreshTrigger(old=>!old);
    }
    
    const handleEditClick = (row: StockInfo) => {
        setModalOpen(true);
        setIsEditMode(true);
        setEditPreset(row);
    }

    return ( 
        <PageContentContainer>
        
            <StockTable refreshTrigger={stockTableRefreshTrigger} 
                        customRowElementBuilder = {[
                            (row) => <DefaultButton onClick={()=>handleEditClick(row as StockInfo)}>
                                Edit
                            </DefaultButton>
                        ]}  
                                
                                />

            <button className="bg-green-400 hover:bg-green-500 w-12 p-2 m-2 rounded-2xl text-white font-bold" onClick={()=>{setModalOpen(true); setIsEditMode(false); setEditPreset(undefined)}}>+</button>

            {/* Modal to add or edit record to table */}
            {modalOpen && 
                <Modal openSetter={setModalOpen}>
                    <StockForm presetData={editPreset?(editPreset as StockInfo):undefined} formSubmit={(data) => {

                        if (isEditMode) {
                            editStock(data, onSuccess, (resp: any)=>toast.error(resp));
                        }
                        else {
                            createStock(data, onSuccess, (resp: any)=>toast.error(resp));
                        }
                    
                    }}/>
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