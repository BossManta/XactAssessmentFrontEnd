import { StockCountModel } from "../Invoice/InvoiceTypes";
import { StockModel } from "./StockTypes";

var endpoint = process.env.REACT_APP_BACKEND_API_URL+"/stockmaster";

//Fetch list of stock items from the backend
export const fetchStock = async (searchString: string, setLoading: (b: boolean)=>void, setStockList: (d: [])=>void) => {
    
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
        setStockList(data);
        console.log(data);
        
    }).finally(() => {
        setLoading(false);
    });
}

//Create a new stock item and add it to the database
export const createStock = async (stockInfo: StockModel, onSuccess: ()=>void, onFail: (jsonData:string)=>void) => {
    fetch(endpoint+"/insert", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(stockInfo)
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


//Replace an existing stock item with a new provided one
export const editStock = async (stockInfo: StockModel, onSuccess: ()=>void, onFail: (jsonData:string)=>void) => {
    fetch(endpoint+"/edit", {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(stockInfo)
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

//Add stock to given debtor.
export const addStock = async (stockCount: StockCountModel, onSuccess: ()=>void, onFail: (jsonData:string)=>void) => {
    fetch(endpoint+"/addstock", {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(stockCount)
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

//Fetch transaction information for given stock item.
export const fetchDetails = async (stockCode: number, setLoading: (b: boolean)=>void, setDetailsList: (d: [])=>void) => {
    await fetch(endpoint+`/details/${stockCode}`).then(response => {
        if (response.ok)
        {
            return response.json();
        }

    }).then(data => {
        setDetailsList(data);
        
    }).finally(() => {
        setLoading(false);
    });
}