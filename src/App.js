import React, {useEffect, useState} from 'react'
import './App.css';
import axios from 'axios';
import styled from 'styled-components';

function App() {

  const [weather, setWeather] = useState()
  const [input, setInput] = useState('')
  const [faren, setFaren] = useState(true)

  useEffect(() => {
      axios.get( 'http://api.weatherapi.com/v1/current.json?key=45085b5aef344e6cb30123316212004&q=Wicklow')
      .then(data => {
          setWeather(data.data)
      })
      .catch(err => console.log("Error"))
    }, [])

    const weatherInput = (e) => {
        setInput(e.target.value)
    }

    const searchWeather = () => {
      axios.get( `http://api.weatherapi.com/v1/current.json?key=45085b5aef344e6cb30123316212004&q=${input}`)
      .then(data => {
        setWeather(data.data)
      })
    }

    function setToFaren() {
      setFaren(false)
    }

  return (
    <WeatherWrapper>
    <DetailWrapper>
    {weather && (
      <div className="WeatherMain">
      <div className="search">
        <input onChange={weatherInput} type='text' />
        <button onClick={searchWeather}>Search</button>
      </div>
        <h1>{weather.location.name}</h1>
        <h2>{weather.location.country}</h2>
        <p>{weather.location.localtime}</p>
        </div>
        )}
        </DetailWrapper>
        <ConditionWrapper>
    <WindWrapper>
    {weather && (
      <div className="wind">
        <img 
        className="wind"
        src={'https://www.shareicon.net/data/2015/09/07/97241_wind_512x512.png'} alt={weather.current.condition.text} />
        <h5>{weather.current.wind_kph} KPH</h5>
        <h4>Wind</h4>
      </div>
    )}
    </WindWrapper>
    <MainWrapper>
    {weather && (
        <div>
        <img 
        src={weather.current.condition.text === 'Partly cloudy' ? 
        'https://play-lh.googleusercontent.com/RRdFlzBWL39t-y-jx8HkPh7ij7sh0v4NrmcHB7Nc9VqFu0M1QfQKcOvqX6wqjc-b8A' 
        : weather.current.condition.text === 'Clear' ? 'https://cdn.iconscout.com/icon/free/png-512/sun-bright-rays-sunny-weather-33960.png' 
        : weather.current.condition.text === 'Overcast' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Weather-overcast.svg/1200px-Weather-overcast.svg.png'
        : weather.current.condition.text === 'Light rain' ? 'https://lh3.googleusercontent.com/proxy/DClfjlWJQUGNpYmD12UEAX_MkzdNbEvZPzgBwpUdzsyxJRK1EP2RmLYsL6_qxTvtBo_9tH8rrWVPs13iWiGfk78EUVbiTJ-686P0WhO_eep1JpOgwd_AW_mou-A_bLPJditnUql19uhN'
        : weather.current.condition.text === 'Mist' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Weather-overcast.svg/1200px-Weather-overcast.svg.png'
        : weather.current.condition.text === 'Sunny' ? 'https://cdn.iconscout.com/icon/free/png-512/sun-bright-rays-sunny-weather-33960.png' 
        : weather.current.condition.text === 'Light rain shower' ? 'https://lh3.googleusercontent.com/proxy/DClfjlWJQUGNpYmD12UEAX_MkzdNbEvZPzgBwpUdzsyxJRK1EP2RmLYsL6_qxTvtBo_9tH8rrWVPs13iWiGfk78EUVbiTJ-686P0WhO_eep1JpOgwd_AW_mou-A_bLPJditnUql19uhN'
        : ""
        } alt={weather.current.condition.text} />
        <h5 onClick={setToFaren}>{faren ? `${weather.current.temp_c} °C` :  `${weather.current.temp_f} °F`}</h5>
        <h4>{weather.current.condition.text}</h4>
      </div>
    )}
    </MainWrapper>
    <FeelWrapper>
    {weather && (
      <div >
        <img className="feel"
        src={'https://image.flaticon.com/icons/png/512/2025/2025520.png'} alt={weather.current.condition.text} />
        <h5>{weather.current.uv}</h5>
        <h4>UV Index</h4>
      </div>
    )}
    </FeelWrapper>
    </ConditionWrapper>
    </WeatherWrapper>
  );
}


const DetailWrapper = styled.div`
margin:0; 

 .WeatherMain {
    text-align:center;
    align-items:center;
    justify-content:center;

  }`

const WeatherWrapper = styled.div`
  display:flex;
  flex-direction:column;
  text-align:center;
  align-items:center;
  justify-content:center;
  width:100vw;
  max-height:100vh;

  img {
    width:250px;
  }

  h5 {
    margin:0;
    font-size:40px;
    font-weight:200;
  }
  h4 {
    font-size:20px;
  }

  h1 {
    margin-bottom:5px;
  }
  h2 {
    margin-top:10px;
  }

  p {
    bottom:0;
    font-weight:200;

  }

  .search {
    margin:50px;
    margin-top: 100px;
    display:flex;
    flex-direction:row;

    input {
      height:30px;
      width:150px;
      text-decoration:none;
      outline:none;
      border:0;
      text-align:center;
      background-color:transparent;
      box-shadow: 0px 2px 30px rgba(0,0,0,0.2);
      border-top-left-radius:10px;
      border-bottom-left-radius:10px;
    }
    button {
      text-decoration:none;
      outline:none;
      height:32px;
      background-color:transparent;
      margin-left:1px;
      border:0;
      box-shadow: 0px 2px 30px rgba(0,0,0,0.2);
      border-top-right-radius:10px;
      border-bottom-right-radius:10px;
    }
  }
`

const MainWrapper = styled.div`
  margin:60px 100px;


  img {
    width:250px;
    margin: 20px 0;
  }

`

const ConditionWrapper = styled.div`
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  text-align:center;
  align-items:center;
`

const WindWrapper = styled.div`
  display:flex;
  flex-direction:column;
  text-align:center;
  align-items:center;
  justify-content:center;


  .wind {
      width:200px;
  }

  img {
    width:300px;
    margin: 20px 0 70px 0;
  }

  h5 {
    margin:0;
    font-size:40px;
    font-weight:200;
  }
  h4 {
    font-size:20px;
  }

  h1 {
    margin-top: 20px;
    margin-bottom:5px;
  }
  h2 {
    margin-top:10px;
  }

  p {
    bottom:0;
    font-weight:200;

  }
`

const FeelWrapper = styled.div`
  display:flex;
  flex-direction:column;
  text-align:center;
  align-items:center;
  justify-content:center;

  img {
    width:200px;
    margin: 10px 0 70px 0;
  }

  h5 {
    margin:0;
    font-size:40px;
    font-weight:200;
  }
  h4 {
    font-size:20px;
  }

  h1 {
    margin-top: 20px;
    margin-bottom:5px;
  }
  h2 {
    margin-top:10px;
  }

  p {
    bottom:0;
    font-weight:200;

  }
`

export default App;
