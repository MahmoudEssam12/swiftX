import { useState, useEffect } from "react";

const useFetchCateogries = (url, query) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: query })
        })
            .then(res => res.json())
            .then(data => {
                setCategories(data.data.categories)
            })
            .catch(err => console.log(err))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return categories
}

export default useFetchCateogries;