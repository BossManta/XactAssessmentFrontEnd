import { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { StockInfo } from "./StockTypes";

interface StockFormProps {
    formSubmit: (stockJson: StockInfo) => void;
    presetData?: StockInfo
}

type FormFieldInfo = {
    type: string
    placeholder: string
    apiName: keyof StockInfo
    requirements: {}

}


const StockForm: FunctionComponent<StockFormProps> = ({formSubmit, presetData}) => {
    
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const onSubmit = (data: any) => {
        formSubmit({"stockCode": `${presetData?presetData.stockCode:undefined}`, ...data});
    }
    
    var formFieldInfo: FormFieldInfo[] = [
        {type: "number", placeholder: "Stock Code", apiName: "stockCode", requirements: {required: true}},
        {type: "text", placeholder: "Description", apiName: "stockDescription", requirements: {required: true}},
        {type: "text", placeholder: "Cost", apiName: "cost", requirements: {required: true, pattern: /^[0-9]*(\.[0-9]{0,2})?$/}},
        {type: "text", placeholder: "Selling Price", apiName: "sellingPrice", requirements: {required: true, pattern: /^[0-9]*(\.[0-9]{0,2})?$/}},
        {type: "text", placeholder: "Total Purchases Excl Vat", apiName: "totalPurchasesExclVat", requirements: {required: true, pattern: /^[0-9]*(\.[0-9]{0,2})?$/}},
        {type: "text", placeholder: "Total Sales Excl Vat", apiName: "totalSalesExclVat", requirements: {required: true, pattern: /^[0-9]*(\.[0-9]{0,2})?$/}},
        {type: "number", placeholder: "Qty Purchased", apiName: "qtyPurchased", requirements: {required: true}},
        {type: "number", placeholder: "Qty Sold", apiName: "qtySold", requirements: {required: true}},
        {type: "number", placeholder: "Stock On Hand", apiName: "stockOnHand", requirements: {required: true}},
    ];

    if (presetData) {
        formFieldInfo = formFieldInfo.slice(1);
    }

    return ( 
        <form className="flex flex-col m-8" onSubmit={handleSubmit(onSubmit)}>

            {formFieldInfo.map(f=> {
                const defaultValue = presetData?presetData[f.apiName as keyof StockInfo]:"";
                return <input title={f.placeholder} defaultValue={defaultValue} className={`formInput ${errors[f.apiName] && 'formError'}`} type={f.type} placeholder={f.placeholder} {...register(f.apiName, f.requirements)} />
            })}

            <input className="bg-green-500 p-2 mt-6 rounded-md text-white" type="submit" value="Submit"/>
        </form>
     );
}
 
export default StockForm;