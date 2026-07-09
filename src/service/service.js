import axios from "axios";
import { useEffect, useState } from "react";

export default function useCurrencyInfo(currency){

    const [data , setData] = useState({});

    useEffect(() => {
        async function fetchData(){
            const response = await axios.get( `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
            setData(response.data[currency]);
        }

        fetchData()
    } , [currency])

    return data
}