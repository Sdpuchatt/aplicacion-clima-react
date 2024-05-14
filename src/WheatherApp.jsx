import React from 'react'
import {useState} from 'react' 


export const WheatherApp = () => {
    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const API_KEY = 'c78036d2005939418e526b161a82a81e'
    const [ciudad, setCiudad] = useState('')
    const [dataClima, setDataClima] = useState(null)
    const difKelvin = 273.15

    const handlecambioCiudad = (e) =>{
        setCiudad(e.target.value)
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        if(ciudad.length>0){
            fetchClima()
        }
    }

    const fetchClima = async () =>{
        try{
            const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`)
            const data = await response.json()
            setDataClima(data)
        }
        catch(error){
            console.error('Ocurrio el siguiente problema: ', error)
        }
    }
    
  return (
    <div className='container'>
        <h1>Aplicacion del clima</h1>

        <form onSubmit={handleSubmit}>
            <input 
            type="text"
            value={ciudad}
            onChange={handlecambioCiudad}
            />
            <button type="submit">Buscar</button>
        </form>

        {
            dataClima && (
                <div>
                    <h2>{dataClima.name}</h2>
                    <p2>Temperatura: {parseInt(dataClima?.main?.temp -difKelvin)}°C</p2>
                    <p>Condicion meteorologica: {dataClima.weather[0].description}</p>
                    <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`} />
                </div>
            )
        }

    </div>
  )
}
