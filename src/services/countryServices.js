
import axios from "axios"
import React  from "react"

const baseURL = "https://studies.cs.helsinki.fi/restcountries/api/all"
const URLForSpecificCountry = 'https://studies.cs.helsinki.fi/restcountries/api/name/'
const getAll = () => {

    return (
    axios.get(baseURL).then(response => {
        const countries = response.data
        console.log(countries)
    })
)
}

const getSpecificCountry = (country) => {
    const request = axios.get(URLForSpecificCountry + country)
    return request.then(response => {
        return response.data
    }
)
}

export default {
    getAll: getAll,
    getSpecificCountry: getSpecificCountry
}


