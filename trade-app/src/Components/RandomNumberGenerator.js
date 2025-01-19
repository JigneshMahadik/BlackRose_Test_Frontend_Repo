import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
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

  useEffect(() => {
    const ws = new WebSocket("wss://blackrose-test-backend-repo.onrender.com/ws/random");
    const token = localStorage.getItem("token");

    ws.onopen = () => {
      if (token) {
        ws.send(JSON.stringify({ token })); // Send token as a JSON object
      } else {
        console.error("No token available");
        ws.close();
      }
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.error) {
        console.error(data.error);
        ws.close(); // Close the connection on error
      } else {
        const randomNumber = data.random_number;
        setRandomNumber(`Random Number: ${randomNumber}`);
        setDataPoints((prevData) => [...prevData, randomNumber]); // Append new random number
        setDataIndices((prevIndices) => [...prevIndices, prevIndices.length + 1]); // Increment indices
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
    labels: dataIndices, // x-axis labels
    datasets: [
      {
        label: "Random Numbers",
        data: dataPoints, // y-axis data
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        pointRadius: 3,
        tension: 0.4, // Smooth curve
      },
    ],
  };

  const options = {
    scales: {
      y: {
        title: {
          display: true,
          text: "Random Numbers",
        },
      },
      x: {
        title: {
          display: true,
          text: "Sequence",
        },
      },
    },
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Live Random Number Chart",
      },
    },
  };

  return (
    <div>
      <h1>Random Number Generator</h1>
      <Line data={data} options={options} style={{ backgroundColor: "white" }} />
      <p>{randomNumber}</p>
    </div>
  );
};

export default RandomNumberGenerator;
