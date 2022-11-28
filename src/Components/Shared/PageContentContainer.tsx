import { FunctionComponent, ReactNode } from "react";

interface PageContentContainerProps {
    children: ReactNode;
}
 
const PageContentContainer: FunctionComponent<PageContentContainerProps> = ({children}) => {
    return ( 
        <div className="flex flex-col items-center mt-10 max-w-7xl mx-auto">
            {children}
        </div>
     );
}
 
export default PageContentContainer;