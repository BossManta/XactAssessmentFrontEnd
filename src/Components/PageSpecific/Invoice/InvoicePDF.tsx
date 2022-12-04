import { FunctionComponent } from "react";
import formatMoney from "../../Shared/MoneyFormatter";
import SpacedList from "../../Shared/SpacedList";
import TableDisplayer, { ColumnInfo } from "../../TableDisplayer";
import { InvoiceDisplay } from "./InvoiceTypes";

interface InvoicePDFProps {
    invoiceInfo: InvoiceDisplay
}
 
const InvoicePDF: FunctionComponent<InvoicePDFProps> = ({invoiceInfo}) => {

    const generalInfo = invoiceInfo.generalInfo;
    const itemInfo = invoiceInfo.itemInfo;
    const debtorInfo = invoiceInfo.debtorInfo;


    const tableColumnInfo: ColumnInfo = [
        {headerName:"Qty",                  jsonName:"qtySold"},
        {headerName:"Stock Code",           jsonName:"stockCode"},
        {headerName:"Stock Description",    jsonName:"disc"},
        {headerName:"Unit Price",           jsonName:"unitCost", customFunction:formatMoney},
        {headerName:"Combined Price",       jsonName:"combinedCost", customFunction:formatMoney},
    ]


    return ( 
        <div className="w-full h-full font-mono border-2 border-emerald-500 rounded-md">

            <div className="bg-emerald-500 p-8">
                <h1 className="text-white text-2xl">{invoiceInfo.generalInfo.invoiceNo===0?"PREVIEW ":""}INVOICE</h1>
            </div>

            <div className="p-6">
                <div className="flex justify-between pb-5 border-b-2">

                    <SpacedList labels={["Invoice Number:",
                                         "Date:"]} 

                                values={[generalInfo.invoiceNo===0?"PREVIEW":generalInfo.invoiceNo,
                                         generalInfo.date]}
                    />

                    <SpacedList labels={["Account Code:",
                                         "Name:",
                                         "Address 1:",
                                         "Address 2:",
                                         "Address 3:"]} 

                                values={[debtorInfo.accountCode,
                                        debtorInfo.name,
                                        debtorInfo.address1,
                                        debtorInfo.address2,
                                        debtorInfo.address3]}
                    />

                </div>


                <div className="py-16 border-b-2">
                    <TableDisplayer columnInfo={tableColumnInfo}
                                    jsonData={itemInfo as []} 
                                    disableSort/>                 
                </div>

                <SpacedList className={"w-fit ml-auto mt-8"}
                                labels={["Pre Vat:",
                                         "Vat:",
                                         "Total:"]} 

                                values={[formatMoney(generalInfo.totalSellAmountExclVat),
                                         formatMoney(generalInfo.vat),
                                         formatMoney(generalInfo.totalCost)]}
                />
            </div>

        </div>
    );
}
 
export default InvoicePDF;