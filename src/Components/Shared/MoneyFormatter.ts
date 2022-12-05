//Function to format money.
const formatMoney = (money: number) => {
    return money.toLocaleString(undefined, { style: 'currency', currency: 'ZAR', minimumFractionDigits: 2 })
}

export default formatMoney;