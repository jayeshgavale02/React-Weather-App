import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("Dhule"); // Default city
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=88335c7e163105f3f31290fc699c1f02`
      );
      if (!response.ok) {
        throw new Error("No data found");
      }
      const jsonData = await response.json();
      setData(jsonData);
      setError(null);
    } catch (error) {
      setError(error.message);
      setData(null);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  return (
    <div className="container">
      <h1>Weather App</h1>
      <div className="main">
        <div className="input">
          <input
            type="text"
            placeholder="Search City"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="second-main">
        {error ? (
          <p style={{
            textAlign: 'center',
            marginTop: '113px',
            fontSize: 'larger'}}>{error}</p>
        ) : data ? (
          <div className="box">
            <h1>
              <i className="fa-solid fa-location-dot"></i> {data.name}
            </h1>
            <div className="info">
              <div>
                <i className="fa-solid fa-cloud"></i>{" "}
                {data.weather && data.weather[0] && data.weather[0].main}
              </div>
              <div>
                <i className="fa-solid fa-temperature-three-quarters"></i>{" "}
                {data.main && data.main.temp} °C
              </div>
            </div>
            <p>
              Min: {data.main && data.main.temp_min} °C || Max:{" "}
              {data.main && data.main.temp_max} °C
            </p>
          </div>
        ) : (
          <p style={{
            textAlign: 'center',
            marginTop: '113px',
            fontSize: 'larger'
          }}>
            Loading...
          </p>
        )}
      </div>
      <div className="footer">
        <h5>Developed by Jayesh Gavale ❤️</h5>
      </div>
    </div>
  );
}

export default App;
