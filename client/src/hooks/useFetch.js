import { useEffect, useState } from 'react'
import axios from 'axios'

export const useFetch = (url) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const call = async () => {
            setLoading(true)
            try {
                const { data } = await axios.get(`http://localhost:4000${url}`)
                setData(data.result)
            } catch (error) {
                setError(error)
            }
            setLoading(false)
        }
        call()
    }, [url])

    const reFetch = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get(`http://localhost:4000${url}`)
            setData(data.result)
        } catch (error) {
            setError(error)
        }
        setLoading(false)
    }

    return { data, loading, error, reFetch }

}