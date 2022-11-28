import { StockInfo } from "./StockTypes";

var endpoint = "http://localhost:5141/api/stockmaster";


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


export const createStock = async (stockInfo: StockInfo, onSuccess: ()=>void, onFail: (jsonData:string)=>void) => {
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



export const editStock = async (stockInfo: StockInfo, onSuccess: ()=>void, onFail: (jsonData:string)=>void) => {
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
