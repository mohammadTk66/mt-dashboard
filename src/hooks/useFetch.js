import { useEffect } from "react";
import { useState } from "react";

export const useFetch = (endpoint) => {
    const [data, setData] = useState([]);
    const [isError, setError] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const baseUrl = "https://jsonplaceholder.typicode.com/";
    useEffect(() => {
        fetch(baseUrl + endpoint)
            .then(res => res.json())
            .then(setData)
            .catch(() => setError(true))
            .finally(setLoading(false));
    }, [endpoint])

    return { data, isError, isLoading }
}