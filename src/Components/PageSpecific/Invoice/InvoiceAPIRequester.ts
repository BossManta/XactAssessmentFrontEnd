import { InvoiceDisplayModel, InvoiceMinimalModel } from "./InvoiceTypes";

var endpoint = process.env.REACT_APP_BACKEND_API_URL+"/invoice";

//Fetch a preview of an invoice. Does not effect database.
export const fetchPreview = async (invoiceMinimal: InvoiceMinimalModel, setLoading: (b: boolean)=>void, setInvoicePreview: (d: InvoiceDisplayModel)=>void) => {
    
    await fetch(endpoint+"/preview", {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(invoiceMinimal)
    })
    .then(response => {
        if (response.ok)
        {
            return response.json();
        }
    })
    .then(data => {
        setInvoicePreview(data as InvoiceDisplayModel);
        
    }).finally(() => {
        setLoading(false);
    });
}

//Generate invoice. Returns invoice information.
export const fetchSubmit = async (invoiceMinimal: InvoiceMinimalModel, setLoading: (b: boolean)=>void, setInvoicePreview: (d: InvoiceDisplayModel)=>void) => {
    
    await fetch(endpoint+"/submit", {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(invoiceMinimal)
    })
    .then(response => {
        if (response.ok)
        {
            return response.json();
        }
    })
    .then(data => {
        setInvoicePreview(data as InvoiceDisplayModel);
        
    }).finally(() => {
        setLoading(false);
    });
}