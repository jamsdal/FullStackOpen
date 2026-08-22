import { useState, useEffect } from 'react'
import axios from 'axios'

const Display = ({ countries, filter, setFilter} ) => {
  const handleShow = (country) => {
    setFilter(country)
  }
  if (countries.length > 10 && filter) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (countries.length <= 10 && countries.length > 1) {
    return (
      <div>
        {countries.map(country => <div key={country}>{country}<button onClick={() => handleShow(country)}>show</button></div>)}
      </div>
    )
  } else if (countries.length === 1) {
    const country = countries[0]
    return (
      <div>
        <DisplayCountry key={country} country={country}/>
      </div>
    )
  }
}

const DisplayCountry = ({ country }) => {
  const [countryData, setCountryData] = useState([])
  
  useEffect(()=> {
    async function fetchData() {
      await axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
        .then(response => {
          setCountryData(response.data)
        })
    }
    fetchData()
  },[country])

  if (countryData.length !== 0){
    
    return (
    <div>
      <h1>{countryData.name.common}</h1>

      <p>Capital: {countryData.capital}</p>
      <p>Area: {countryData.area}</p>

      <h2>Languages</h2>
      <ul>
        {Object.values(countryData.languages).map(language => <li key={language}>{language}</li>)}
      </ul>

      <h2>Flag</h2>

      <img alt={countryData.flags.alt} src={countryData.flags.png} />
    </div>)
  }

  return <div></div>
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data.map(country => country.name.common))
      })
  },[])
  
  const countriesToShow = countries.filter(country => country.toLowerCase().includes(filter.toLowerCase()))

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  

  return (
    <div>
        Find Countries: <input value={filter} onChange={handleFilterChange} />
        <Display countries={countriesToShow} filter={filter} setFilter={setFilter} />
    </div>
  )
}

export default App