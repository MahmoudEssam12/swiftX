import { useState, useEffect } from "react";

const useFetchCateogry = (url, query) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: query })
        })
            .then(res => res.json())
            .then(data => {
                setCategories(data.data)
            })
            .catch(err => console.log(err))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query])
    return categories
}

export default useFetchCateogry;