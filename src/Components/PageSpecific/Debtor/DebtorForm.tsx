import { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { DebtorInfo } from "./DebtorTypes";

interface DebtorFormProps {
    formSubmit: (debtorJson: DebtorInfo) => void;
    presetData?: DebtorInfo
}

type FormFieldInfo = {
    type: string
    placeholder: string
    apiName: keyof DebtorInfo
    requirements: {}

}
 
const DebtorForm: FunctionComponent<DebtorFormProps> = ({formSubmit, presetData}) => {
    
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const onSubmit = (data: any) => {
        formSubmit({"accountCode": `${presetData?presetData.accountCode:undefined}`, ...data});
    }
    
    var formFieldInfo: FormFieldInfo[] = [
        {type: "number", placeholder: "Account Code", apiName: "accountCode", requirements: {required: true}},
        {type: "text", placeholder: "Address1", apiName: "address1", requirements: {required: true, maxLength: 30}},
        {type: "text", placeholder: "Address2", apiName: "address2", requirements: {required: true, maxLength: 30}},
        {type: "text", placeholder: "Address3", apiName: "address3", requirements: {required: true, maxLength: 30}},
        {type: "text", placeholder: "Balance", apiName: "balance", requirements: {required: true, pattern: /^[0-9]*(\.[0-9]{0,2})?$/}},
        {type: "text", placeholder: "Sales YTD YYYY-MM-DD", apiName: "salesYearToDate", requirements: {required: true, pattern: /^(19|20)\d\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/i}},
        {type: "text", placeholder: "Cost YTD YYYY-MM-DD", apiName: "costYearToDate", requirements: {required: true, pattern: /^(19|20)\d\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/i}}
    ];

    if (presetData) {
        formFieldInfo = formFieldInfo.slice(1);
    }

    return ( 
        <form className="flex flex-col m-8" onSubmit={handleSubmit(onSubmit)}>

            {formFieldInfo.map(f=> {
                const defaultValue = presetData?presetData[f.apiName as keyof DebtorInfo]:"";
                return <input defaultValue={defaultValue} className={`formInput ${errors[f.apiName] && 'formError'}`} type={f.type} placeholder={f.placeholder} {...register(f.apiName, f.requirements)} />
            })}

            <input className="bg-green-500 p-2 mt-6 rounded-md text-white" type="submit" value="Submit"/>
        </form>
     );
}
 
export default DebtorForm;