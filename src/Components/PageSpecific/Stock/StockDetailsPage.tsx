import { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import PageContentContainer from "../../Shared/PageContentContainer";
import StockDetailsTable from "./StockDetailsTable";

interface StockDetailsPageProps {
    
}

//A page to show stock transaction information.
const StockDetailsPage: FunctionComponent<StockDetailsPageProps> = () => {

    const {id} = useParams();


    return ( 
        <PageContentContainer>
            <h1 className="text-2xl font-bold mb-10">Transaction History</h1>
            <StockDetailsTable stockCode={id as unknown as number} refreshTrigger={true}/>
        </PageContentContainer>
    );
}
 
export default StockDetailsPage;