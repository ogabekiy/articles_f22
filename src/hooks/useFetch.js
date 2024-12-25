import { useEffect, useState } from "react"

const useFetch = (url) => {
    const [data,setData] = useState(null)
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState(null)
    const base_url = "https://mustafocoder.pythonanywhere.com/api"
    useEffect(() => {
        const getHandler = async() => {
            setLoading(true)
            try {
                const res = await fetch(base_url + url)
                if(!res.ok) throw new Error("Server error");
                const json = await res.json()
                setData(json)
                setError(null)
                setLoading(false)
            } catch (error) {
                setError(error)
            }
        }
        getHandler()
    },[url])

    return {data,loading,error}
}

export default useFetch