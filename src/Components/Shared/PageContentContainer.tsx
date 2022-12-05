import { FunctionComponent, ReactNode } from "react";

interface PageContentContainerProps {
    children: ReactNode;
}

//A container to center content neatly in the center of the screen.
const PageContentContainer: FunctionComponent<PageContentContainerProps> = ({children}) => {
    return ( 
        <div className="flex flex-col items-center mt-10 max-w-7xl mx-auto">
            {children}
        </div>
     );
}
 
export default PageContentContainer;