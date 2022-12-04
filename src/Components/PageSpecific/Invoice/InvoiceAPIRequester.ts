import { InvoiceDisplay, InvoiceMinimal } from "./InvoiceTypes";

var endpoint = process.env.REACT_APP_BACKEND_API_URL+"/invoice";


export const fetchPreview = async (invoiceMinimal: InvoiceMinimal, setLoading: (b: boolean)=>void, setInvoicePreview: (d: InvoiceDisplay)=>void) => {
    
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
        setInvoicePreview(data as InvoiceDisplay);
        
    }).finally(() => {
        setLoading(false);
    });
}

export const fetchSubmit = async (invoiceMinimal: InvoiceMinimal, setLoading: (b: boolean)=>void, setInvoicePreview: (d: InvoiceDisplay)=>void) => {
    
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
        setInvoicePreview(data as InvoiceDisplay);
        
    }).finally(() => {
        setLoading(false);
    });
}