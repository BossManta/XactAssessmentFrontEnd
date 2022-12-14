var endpoint = process.env.REACT_APP_BACKEND_API_URL+"/debtorsmaster";

//Fetch list of debtors from the backend
export const fetchDebtors = async (searchString: string, setLoading: (b: boolean)=>void, setDebtorsList: (d: [])=>void) => {
    
    let ep = endpoint;
    if (searchString!=="")
    {
        ep+=`/search/${searchString}`;
    }

    await fetch(ep).then(response => {
        if (response.ok)
        {
            return response.json();
        }

    }).then(data => {
        setDebtorsList(data);
        
    }).finally(() => {
        setLoading(false);
    });
}

//Create a new debtor and add it to the database
export const createDebtor = async (debtorInfo: {}, onSuccess: ()=>void, onFail: (jsonData:string)=>void) => {
    fetch(endpoint+"/insert", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(debtorInfo)
    })
    .then(response => {
        if (response.ok) {
            onSuccess();
        }
        else {
            response.json().then(data=>onFail(data));
        }
    })
}


//Replace an existing debtor with a new provided one
export const editDebtor = async (debtorInfo: {}, onSuccess: ()=>void, onFail: (jsonData:string)=>void) => {
    fetch(endpoint+"/edit", {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(debtorInfo)
    })
    .then(response => {
        if (response.ok) {
            onSuccess();
        }
        else {
            response.json().then(data=>onFail(data));
        }
    })
}

//Fetch invoices with given debtor
export const fetchInvoices = async (accountCode: number, setLoading: (b: boolean)=>void, setInvoiceList: (d: [])=>void) => {
    
    await fetch(endpoint+`/invoices/${accountCode}`).then(response => {
        if (response.ok)
        {
            return response.json();
        }

    }).then(data => {
        setInvoiceList(data);
        
    }).finally(() => {
        setLoading(false);
    });
}

//Fetch individual items on invoice with given debtor
export const fetchInvoiceItems = async (invoiceNo: number, setLoading: (b: boolean)=>void, setInvoiceItemList: (d: [])=>void) => {
    
    await fetch(endpoint+`/invoiceItems/${invoiceNo}`).then(response => {
        if (response.ok)
        {
            return response.json();
        }

    }).then(data => {
        setInvoiceItemList(data);
        
    }).finally(() => {
        setLoading(false);
    });
}