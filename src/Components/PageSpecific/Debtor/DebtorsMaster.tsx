import { useState, FunctionComponent} from "react";
import { toast, ToastContainer } from "react-toastify";
import { createDebtor, editDebtor } from "./DebtorAPIRequester";
import DebtorForm from "./DebtorForm";

import 'react-toastify/dist/ReactToastify.css';
import { DebtorInfo } from "./DebtorTypes";
import Modal from "../../Modal";
import DebtorTable from "./DebtorTable";
import PageContentContainer from "../../Shared/PageContentContainer";
import { Link } from "react-router-dom";

interface DebtorsMasterProps {
    
}
 
const DebtorsMaster: FunctionComponent<DebtorsMasterProps> = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [editPreset, setEditPreset] = useState<DebtorInfo>();
    const [debtorsTableRefreshTrigger, setDebtorsTableRefreshTrigger] = useState<boolean>(false);


    const onSuccess = () => {
        toast.success("Success");
        setModalOpen(false);
        setDebtorsTableRefreshTrigger(old=>!old);
    }
    
    const handleEditClick = (row: DebtorInfo) => {
        setModalOpen(true);
        setIsEditMode(true);
        setEditPreset(row);
    }

    const handleAddFundsClick = (row: DebtorInfo) => {

    }

    return ( 
        <PageContentContainer>

            <DebtorTable refreshTrigger={debtorsTableRefreshTrigger} 
                        customRowElementBuilder={[
                            (row) => <button className="defaultButtonStyle" title="Edit"  onClick={()=>handleEditClick(row as DebtorInfo)}>Edit</button>,
                            (row) => <Link to={`/debtorsdetails/${(row as DebtorInfo).accountCode}`} className="defaultButtonStyle" title="View Details" onClick={()=>handleEditClick(row as DebtorInfo)}>Details</Link>,
                            (row) => <button className="defaultButtonStyle" title="Add Funds"  onClick={()=>handleAddFundsClick(row as DebtorInfo)}>Add Funds</button>,
                        ]}
            />

            <button className="bg-green-400 hover:bg-green-500 w-12 p-2 m-2 rounded-2xl text-white font-bold" onClick={()=>{setModalOpen(true); setIsEditMode(false); setEditPreset(undefined)}}>+</button>

            {/* Modal to add or edit record to table */}
            {modalOpen && 
                <Modal openSetter={setModalOpen}>            
                    <DebtorForm presetData={editPreset?(editPreset as DebtorInfo):undefined} formSubmit={(data) => {

                        if (isEditMode) {
                            editDebtor(data, onSuccess, (resp: any)=>toast.error(resp));
                        }
                        else {
                            createDebtor(data, onSuccess, (resp: any)=>toast.error(resp));
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
 
export default DebtorsMaster;