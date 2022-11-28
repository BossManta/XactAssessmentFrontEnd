import { FunctionComponent, ReactNode } from "react";

interface ModalProps {
    children: ReactNode
    openSetter: (isOpen: boolean) => void
}
 
const Modal: FunctionComponent<ModalProps> = ({children, openSetter}) => {
    return ( 
        <div onClick={()=>openSetter(false)}
             className="flex items-center justify-center
                      bg-black bg-opacity-50
                        w-screen h-screen top-0
                        left-0 right-0 bottom-0 fixed">
            <div onClick={(e)=>e.stopPropagation()} className="bg-white rounded-md">
                {children}
            </div>
        </div>
     );
}
 
export default Modal;