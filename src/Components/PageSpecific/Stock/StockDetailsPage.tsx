import { FunctionComponent, useState } from "react";
import { useParams } from "react-router-dom";
import PageContentContainer from "../../Shared/PageContentContainer";
import StockDetailsTable from "./StockDetailsTable";

interface StockDetailsPageProps {
    
}
 
const StockDetailsPage: FunctionComponent<StockDetailsPageProps> = () => {

    const [stockTableRefreshTrigger, setStockTableRefreshTrigger] = useState<boolean>(false);
    const {id} = useParams();


    return ( 
        <PageContentContainer>
            <h1 className="text-2xl font-bold mb-10">Transaction History</h1>
            <StockDetailsTable stockCode={id as unknown as number} refreshTrigger={stockTableRefreshTrigger}/>
        </PageContentContainer>
    );
}
 
export default StockDetailsPage;