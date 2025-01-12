import React, { useEffect, useState } from "react";
import axios from "axios";

const RandomNumberTable = () => {
  const [numbers, setNumbers] = useState([]); // All numbers fetched from API
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [error, setError] = useState("");

  const recordsPerPage = 10; // Number of records to show per page

  useEffect(() => {
    // Fetch the random numbers on component mount
    const fetchRandomNumbers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/random-numbers");
        setNumbers(response.data); // Assuming the API returns an array of numbers
      } catch (err) {
        setError("Failed to fetch random numbers");
        console.error(err);
      }
    };

    fetchRandomNumbers();
  }, []);

  // Calculate the starting and ending indices for the current page
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const paginatedNumbers = numbers.slice(startIndex, endIndex);

  // Calculate total pages
  const totalPages = Math.ceil(numbers.length / recordsPerPage);

  return (
    <div>
      <h1>Stock Prices</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      {/* Table to display random numbers */}
      <table border="1" style={{ width: "100%", textAlign: "left", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Stock Price</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {paginatedNumbers.map((item, index) => (
            <tr key={index}>
              <td>{startIndex + index + 1}</td>
              <td>{item.random_number}</td>
              <td>{item.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </button>
        <span style={{ margin: "0 10px" }}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RandomNumberTable;
