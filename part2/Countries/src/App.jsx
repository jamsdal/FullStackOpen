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
        <DisplayCountry country={country}/>
      </div>
    )
  }
}

const DisplayCountry = ({ country }) => {
  const [countryData, setCountryData] = useState(null)

  useEffect(()=> {
    function fetchData() {
     axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
      .then(response => {
        setCountryData(response.data)
      })
    }
    fetchData()
  },[country])

  if (countryData){
    
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
      <DisplayWeather country={countryData} />
    </div>)
  }

  return <div></div>
}

const DisplayWeather = ({ country }) => {
  const [temp, setTemp] = useState(null)
  
  useEffect(()=> {
    function fetchData() {
     axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${country.capitalInfo.latlng[0]}&longitude=${country.capitalInfo.latlng[1]}&current=temperature_2m,wind_speed_10m`)
      .then(response => {
        setTemp(response.data)
      })
    }
    fetchData()
  },[country])

  if (temp)
    return (
      <div>
        <h2>Weather in {country.capital[0]}</h2>
        <p>Temperature {temp.current.temperature_2m}{temp.current_units.temperature_2m} </p>
        <p>Wind Speed {temp.current.wind_speed_10m} {temp.current_units.wind_speed_10m}</p>
      </div>
    )
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