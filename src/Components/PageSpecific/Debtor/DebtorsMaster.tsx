import { useState, FunctionComponent} from "react";
import { toast, ToastContainer } from "react-toastify";
import { createDebtor, editDebtor } from "./DebtorAPIRequester";
import DebtorForm from "./DebtorForm";

import 'react-toastify/dist/ReactToastify.css';
import { DebtorModel } from "./DebtorTypes";
import Modal from "../../Shared/Modal";
import DebtorTable from "./DebtorTable";
import PageContentContainer from "../../Shared/PageContentContainer";
import { Link } from "react-router-dom";

interface DebtorsMasterProps {
    
}

//A page that lists all debtors. Allows for management of debtors.
const DebtorsMaster: FunctionComponent<DebtorsMasterProps> = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [editPreset, setEditPreset] = useState<DebtorModel>();
    const [debtorsTableRefreshTrigger, setDebtorsTableRefreshTrigger] = useState<boolean>(false);


    const onSuccess = () => {
        toast.success("Success");
        setModalOpen(false);
        setDebtorsTableRefreshTrigger(old=>!old);
    }
    
    const handleEditClick = (row: DebtorModel) => {
        setModalOpen(true);
        setIsEditMode(true);
        setEditPreset(row);
    }

    return ( 
        <PageContentContainer>

            <DebtorTable refreshTrigger={debtorsTableRefreshTrigger} 
                        customRowElementBuilder={[
                            (row) => <button className="defaultButtonStyle" title="Edit"  onClick={()=>handleEditClick(row as DebtorModel)}>Edit</button>,
                            (row) => <Link to={`/debtorsdetails/${(row as DebtorModel).accountCode}`} className="defaultButtonStyle" title="View Details" onClick={()=>handleEditClick(row as DebtorModel)}>Details</Link>,
                            // (row) => <button className="defaultButtonStyle" title="Add Funds"  onClick={()=>handleAddFundsClick(row as DebtorInfo)}>Add Funds</button>,
                        ]}
            />

            <button className="bg-green-400 hover:bg-green-500 w-12 p-2 m-2 rounded-2xl text-white font-bold" onClick={()=>{setModalOpen(true); setIsEditMode(false); setEditPreset(undefined)}}>+</button>

            {/* Modal to add or edit record to table */}
            {modalOpen && 
                <Modal openSetter={setModalOpen}>            
                    <DebtorForm presetData={editPreset?(editPreset as DebtorModel):undefined} formSubmit={(data) => {

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