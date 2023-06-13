import React, { useState, useEffect } from 'react'
import axios from 'axios'

// importing axios services
import countryServices from './services/countryServices'
import { type } from '@testing-library/user-event/dist/type'

// importing countryDataComponent
import CountryDataComponent from './components/countryData'
import countryData from './components/countryData'


const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
    console.log('this is event.target', event.target)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const [dataOfCountry, setDataOfCountry] = useState('')
  
  useEffect(() => {

    setCountry(name)
  })

  useEffect(() => {
    // making api req
    countryServices
    .getSpecificCountry(country)
      .then(data => {
        console.log('data', data)
        setDataOfCountry(data)
      })
  }, [country])

  return (
    <div>
      <Country country={dataOfCountry} />
    </div>
  )
}

const Country = ({ country }) => {

  console.log('this is country in comopo:', country)
  if (!country) {
    return null
  }

  if (!country.found) {
    console.log('country not found in compo')
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div> 
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')

  // using custom hook
  const country = useCountry(nameInput.value)

  
  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)

    console.log('putting the country name to nameInput state!')

  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button type='submit'>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App