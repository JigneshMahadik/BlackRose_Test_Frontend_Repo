import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, LogarithmicScale } from "chart.js";
import DataTable from "./DataTable";
import RandomNumberTable from "./RandomNumberTable";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, LogarithmicScale);

const RandomNumberGenerator = () => {
  const [randomNumber, setRandomNumber] = useState("Waiting for random numbers...");
  const [dataPoints, setDataPoints] = useState([]);  // Store random numbers
  const [dataIndices, setDataIndices] = useState([]);  // Store indices for x-axis labels

  useEffect(() => {
    const ws = new WebSocket("https://blackrose-test-backend-repo.onrender.com/ws/random");
    const token = localStorage.getItem("token"); // Retrieve token from localStorage

    ws.onopen = () => {
      if (token) {
        ws.send(token); // Send token to server upon WebSocket connection
      } else {
        console.error("No token available");
        ws.close();
      }
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.error) {
        console.error(data.error);
        ws.close(); // Close the connection on token error
      } else {
        const randomNumber = data.random_number;
        setRandomNumber(`Random Number: ${randomNumber}`);
        setDataPoints((prevData) => [...prevData, randomNumber]);
        setDataIndices((prevIndices) => [...prevIndices, prevIndices.length]);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket Error: ", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      ws.close();
    };
  }, []);

  const data = {
    labels: dataIndices,
    datasets: [
      {
        label: "Stock Price Chart",
        data: dataPoints,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: false,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        type: "logarithmic",
        ticks: {
          callback: function (value) {
            return value.toString();
          },
        },
        title: {
          display: true,
          text: "Stock Price (INR)",
        },
      },
    },
    responsive: true,
    plugins: {
      title: {
        display: true,
      },
    },
  };

  return (
    <div>
      <h1>Tata Technologies - Stock</h1>
      <Line data={data} options={options} style={{ backgroundColor: "white" }}/>
      <br></br>
      <RandomNumberTable />
      <br></br>
      <DataTable />
    </div>
  );
};

export default RandomNumberGenerator;
