import axios from "axios";
import { useEffect, useState } from "react";

export default function useCurrencyInfo(currency, chosenDate) {
    const [data, setData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [retryTrigger, setRetryTrigger] = useState(0);

    useEffect(() => {
        if (!currency) return;
        let isMounted = true;

        async function fetchData() {
            setLoading(true);
            setError(null);
            try {
                const dateTag = chosenDate ? chosenDate : 'latest';
                const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${dateTag}/v1/currencies/${currency}.json`;
                let response;
                
                try {
                    response = await axios.get(url);
                } catch (firstErr) {
                    // If fetching today's rates fails (often because of publication latency), try to fall back to 'latest'
                    const todayStr = new Date().toISOString().split('T')[0];
                    if (dateTag === todayStr) {
                        console.warn(`Failed to fetch rates for today (${dateTag}), falling back to latest.`);
                        const fallbackUrl = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`;
                        response = await axios.get(fallbackUrl);
                    } else {
                        throw firstErr;
                    }
                }

                if (isMounted) {
                    if (response.data && response.data[currency]) {
                        setData(response.data[currency]);
                    } else {
                        throw new Error("Invalid data format received from the API.");
                    }
                }
            } catch (err) {
                if (isMounted) {
                    console.error("Error fetching currency rates:", err);
                    setError(err.message || "Failed to fetch currency rates. Please check your connection.");
                    setData({}); // Clear options on failure so we don't display stale values
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [currency, chosenDate, retryTrigger]);

    const retry = () => setRetryTrigger((prev) => prev + 1);

    return { data, error, loading, retry };
}