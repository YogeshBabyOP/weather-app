import React, { useState } from "react";
import {
  Search,
  Wind,
  Droplets,
  Thermometer,
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
} from "lucide-react";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "ddeb4da96c947243e1e4a24f3ccf9bb2";

  const fetchWeather = async (searchCity) => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (response.ok) {
        setWeather(data);
      } else {
        setError("City not found. Please try again.");
      }
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (weatherCode) => {
    switch (true) {
      case weatherCode >= 200 && weatherCode < 300:
        return (
          <CloudLightning className="w-20 h-20 text-yellow-400 animate-pulse" />
        );
      case weatherCode >= 300 && weatherCode < 600:
        return <CloudRain className="w-20 h-20 text-blue-400 animate-bounce" />;
      case weatherCode >= 600 && weatherCode < 700:
        return <CloudSnow className="w-20 h-20 text-gray-300 animate-spin" />;
      case weatherCode === 800:
        return <Sun className="w-20 h-20 text-yellow-500 animate-pulse" />;
      default:
        return <Cloud className="w-20 h-20 text-gray-400 animate-fade" />;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8 flex flex-col items-center">
      <div className="max-w-3xl w-full">
        <h1 className="text-5xl font-extrabold text-white mb-10 text-center drop-shadow-lg">
          Weather Explorer
        </h1>

        <form onSubmit={handleSubmit} className="mb-10">
  <div className="relative">
    <input
      type="text"
      value={city}
      onChange={(e) => setCity(e.target.value)}
      placeholder="Enter city name"
      className="search-bar w-full px-5 py-3 rounded-full bg-white/20 backdrop-blur-md text-white placeholder-white/70 outline-none border border-white/30 focus:ring focus:ring-white/50"
    />
    <button
      type="submit"
      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-3 rounded-full hover:bg-white/30 text-white"
    >
      <Search className="w-6 h-6" />
    </button>
  </div>
</form>


        {loading && (
          <div className="text-center text-white text-xl font-semibold">
            Loading weather data...
          </div>
        )}

        {error && (
          <div className="text-center text-red-200 bg-red-600/20 rounded-lg p-4 font-medium">
            {error}
          </div>
        )}

        {weather && (
          <div className="bg-white/20 backdrop-blur-md rounded-lg text-white p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center md:text-left">
                <h2 className="text-4xl font-bold mb-4">
                  {weather.name}, {weather.sys.country}
                </h2>
                <div className="flex items-center justify-center md:justify-start">
                  {getWeatherIcon(weather.weather[0].id)}
                  <span className="text-6xl ml-4 font-extrabold">
                    {Math.round(weather.main.temp)}°C
                  </span>
                </div>
                <p className="text-xl mt-3 capitalize font-medium">
                  {weather.weather[0].description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 p-6 rounded-lg shadow-lg">
                  <div className="flex items-center mb-3">
                    <Thermometer className="w-6 h-6 mr-2" />
                    <span className="font-medium">Feels Like</span>
                  </div>
                  <span className="text-3xl font-bold">
                    {Math.round(weather.main.feels_like)}°C
                  </span>
                </div>

                <div className="bg-white/10 p-6 rounded-lg shadow-lg">
                  <div className="flex items-center mb-3">
                    <Droplets className="w-6 h-6 mr-2" />
                    <span className="font-medium">Humidity</span>
                  </div>
                  <span className="text-3xl font-bold">
                    {weather.main.humidity}%
                  </span>
                </div>

                <div className="bg-white/10 p-6 rounded-lg shadow-lg">
                  <div className="flex items-center mb-3">
                    <Wind className="w-6 h-6 mr-2" />
                    <span className="font-medium">Wind Speed</span>
                  </div>
                  <span className="text-3xl font-bold">
                    {weather.wind.speed} m/s
                  </span>
                </div>

                <div className="bg-white/10 p-6 rounded-lg shadow-lg">
                  <div className="flex items-center mb-3">
                    <Thermometer className="w-6 h-6 mr-2" />
                    <span className="font-medium">Pressure</span>
                  </div>
                  <span className="text-3xl font-bold">
                    {weather.main.pressure} hPa
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
