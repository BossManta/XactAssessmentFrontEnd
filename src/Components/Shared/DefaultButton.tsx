import { FunctionComponent, ReactNode } from "react";

interface DefaultButtonProps {
    onClick: ()=>void;
    children: ReactNode
    className?: string
}
 
const DefaultButton: FunctionComponent<DefaultButtonProps> = ({onClick, children, className}) => {
    return ( 
        <button className = {`${className} bg-amber-300 hover:bg-amber-400 rounded-md py-2 px-4 mx-1`}
                onClick={()=>onClick()}>
                    {children}
        </button>
     );
}
 
export default DefaultButton;