import { FormEvent, FunctionComponent, useState } from "react";

interface StockCountFormProps {
    stockLimit: number
    updateStockList: (count: number) => void
}
 
const StockCountForm: FunctionComponent<StockCountFormProps> = ({stockLimit, updateStockList}) => {
    
    const [stockCount, setStockCount] = useState<number>();

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (stockCount || stockCount===0)
        {
            updateStockList(stockCount);
        }
    }

    return ( 
        <form className="flex flex-col m-8" onSubmit={e=>onSubmit(e)}>

            <h1 className="mb-8 font-bold">In Stock: {stockLimit}</h1>
            <input className="w-64 p-2" onChange={(e)=>setStockCount(e.target.valueAsNumber)} type="number" placeholder="Number of Stock" name="" id="" min={0} max={stockLimit} />

            <input className="bg-green-500 p-2 mt-6 rounded-md text-white" type="submit" value="Submit"/>
        </form>
     );
}
 
export default StockCountForm;