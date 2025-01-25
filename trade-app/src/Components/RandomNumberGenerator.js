import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import DataTable from "./DataTable";
import RandomNumberTable from "./RandomNumberTable";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const RandomNumberGenerator = () => {
  const [randomNumber, setRandomNumber] = useState("Waiting for random numbers...");
  const [dataPoints, setDataPoints] = useState([]);
  const [dataIndices, setDataIndices] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const ws = new WebSocket("wss://blackrose-test-backend-repo.onrender.com/ws/random");
    const token = localStorage.getItem("token");

    ws.onopen = () => {
      if (token) {
        ws.send(token); // Send token as the first message
      } else {
        setError("Token not found. Please log in.");
        ws.close();
      }
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.error) {
        setError(data.error);
        ws.close();
      } else {
        const { random_number, timestamp } = data;

        // Update state with new data
        setRandomNumber(`Stock price: ${random_number} at ${timestamp}`);
        setDataPoints((prev) => [...prev, random_number]);
        setDataIndices((prev) => [...prev, prev.length]);
      }
    };

    ws.onerror = () => {
      setError("WebSocket error occurred.");
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    // Cleanup WebSocket connection on component unmount
    return () => ws.close();
  }, []);

  const data = {
    labels: dataIndices,
    datasets: [
      {
        label: "Stock Prices",
        data: dataPoints,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: { display: true, text: "Stock Price Chart" },
    },
  };

  return (
    <div>
      <h1>Tata Technologies - Stock</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Line data={data} options={options} />
      <br></br>
      <RandomNumberTable />
      <br></br>
      <DataTable />
    </div>
  );
};

export default RandomNumberGenerator;
