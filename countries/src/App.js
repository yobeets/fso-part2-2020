import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ weatherData, city }) => {
    if (!weatherData) {
        return null
    }
    // console.log(weatherData)
    return (
        <div>
            <h2>Weather in {city}</h2>
            <p>Temp: {weatherData.temperature} Celcius</p>
            <img src={weatherData.weather_icons} alt=""/>
            <p>Wind: {weatherData.wind_speed} mph, direction {weatherData.wind_dir}</p>
        </div>
    )
}

const CountryDetails = ({ countryToShow }) => {
    const [weatherData, setWeatherData] = useState(null)

    const api_key = process.env.REACT_APP_API_KEY
    const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${countryToShow.capital}`

    useEffect(() => {
        axios
            .get(url)
            .then(response => {
                // console.log('promise fulfilled')
                // console.log(response.data)
                setWeatherData(response.data.current)
            })
        }, [url])
    
    return (
        <div>
            <h1>{countryToShow.name}</h1>
            <p>Capital: {countryToShow.capital}</p>
            <p>Country Population: {countryToShow.population}</p>
            <h2>Languages</h2>
            <ul>
                {countryToShow.languages.map(lang => <li key={lang.iso639_1}>{lang.name}</li>)}
            </ul>
            <img src={countryToShow.flag} alt={countryToShow.name} width="300px"/>
            <Weather weatherData={weatherData} city={countryToShow.capital} />
        </div>
    )
}

const App = () => {
    const [ countries, setCountries ] = useState([])
    const [ showCountry, setShowCountry ] = useState('')

    useEffect(() => {
        // console.log('effect')
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                // console.log('promise fulfilled')
                setCountries(response.data)
            })
    }, [])
    // console.log('render', countries.length, 'countries')

    const handleFilter = (event) => {
        setShowCountry(event.target.value)
    }
    const countryToShow = showCountry.length === 1
        ? countries
        : countries.filter(country => country.name.toLowerCase().includes(showCountry.toLowerCase()))

    return (
        <div>
            <div>
            Find Country <input
                value={showCountry} 
                onChange={handleFilter}
            />
            </div>
            <div>
                <div>
                    {countryToShow.length === countries.length
                        ? `Search for a country to get started`
                        : countryToShow.length > 10
                        ? `Too many matches, specify a filter` 
                        : countryToShow.length === 1
                        ? <CountryDetails countryToShow={countryToShow[0]} />
                        : countryToShow.map( (country) => 
                            <p key={country.name}>{country.name} <button onClick={() => setShowCountry(country.name)}>
                            show</button></p>
                    )}
                    {/* {countryToShow.map( (country) => 
                        <p key={country.name}>{country.name}</p>
                    )} */}
                </div>
            </div>        
        </div>
    )
}

export default App