import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CSS/DataTable.css";

const DataTable = () => {
  const [data, setData] = useState([]); // Holds table data
  const [editingCell, setEditingCell] = useState(null); // Tracks which cell is being edited
  const [editValue, setEditValue] = useState(""); // Value of the currently edited cell
  const [showAddForm, setShowAddForm] = useState(false); // Toggle Add Form visibility
  const [newRecord, setNewRecord] = useState({}); // Holds new record data

  // Fetch all data from the backend
  const fetchData = async () => {
    try {
      const response = await axios.get("https://blackrose-test-backend-repo.onrender.com/data");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Delete a record
  const deleteRecord = async (user) => {
    try {
      await axios.delete(`https://blackrose-test-backend-repo.onrender.com/data/${user}`);
      alert(`Record for user '${user}' deleted successfully`);
      fetchData(); // Refresh data after deletion
    } catch (error) {
      console.error("Error deleting record:", error);
      alert("Error deleting record");
    }
  };

  // Update a specific field for a user
  const updateData = async (user, field, value) => {
    try {
      await axios.put("https://blackrose-test-backend-repo.onrender.com/data", {
        user: user,
        field: field,
        value: value,
      });
      alert(`Field '${field}' updated successfully for user '${user}'`);
      fetchData(); // Refresh data after update
    } catch (error) {
      console.error("Error updating data:", error);
      alert("Error updating data");
    }
  };

  // Add a new record
  const addRecord = async () => {
    try {
      await axios.post("https://blackrose-test-backend-repo.onrender.com/data", newRecord);
      alert("New record added successfully");
      fetchData(); // Refresh data after adding
      setShowAddForm(false); // Close the form
      setNewRecord({}); // Reset form fields
    } catch (error) {
      console.error("Error adding record:", error);
      alert("Error adding record");
    }
  };

  // Handle click on a table cell to enable editing
  const handleCellClick = (user, field, value) => {
    setEditingCell({ user, field });
    setEditValue(value);
  };

  // Handle input change for the editable cell
  const handleInputChange = (event) => {
    setEditValue(event.target.value);
  };

  // Handle blur (losing focus) to save changes
  const handleBlur = () => {
    if (editingCell) {
      const { user, field } = editingCell;
      updateData(user, field, editValue);
      setEditingCell(null); // Exit editing mode
    }
  };

  // Handle "Enter" key press to save changes
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleBlur();
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data on component mount
  }, []);

  return (
    <div className="data-table-container">
      <h1 className="table-title">Statement Table</h1>
      <button
        onClick={() => setShowAddForm(true)}
        className="add-button"
      >
        Add New Record
      </button>
      {showAddForm && (
        <div className="overlay">
          <div className="form-container">
            <h3>Add New Record</h3>
            {Object.keys(data[0] || {}).map((key) => (
              <div key={key} className="input-field">
                <label>{key}: </label>
                <input
                  type="text"
                  value={newRecord[key] || ""}
                  onChange={(e) =>
                    setNewRecord({ ...newRecord, [key]: e.target.value })
                  }
                  className="input"
                />
              </div>
            ))}
            <div className="button-container">
              <button onClick={addRecord} className="save-button">
                Save
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="cancel-button"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <table className="data-table">
        <thead>
          <tr>
            {data.length > 0 &&
              Object.keys(data[0]).map((key) => (
                <th key={key} className="table-header">
                  {key}
                </th>
              ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.keys(row).map((key) => (
                <td
                  key={key}
                  className={`table-cell ${
                    editingCell &&
                    editingCell.user === row.user &&
                    editingCell.field === key
                      ? "editing"
                      : ""
                  }`}
                  onClick={() => handleCellClick(row.user, key, row[key])}
                >
                  {editingCell &&
                  editingCell.user === row.user &&
                  editingCell.field === key ? (
                    <input
                      type="text"
                      value={editValue}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      onKeyDown={handleKeyDown}
                      autoFocus
                      className="editable-input"
                    />
                  ) : (
                    row[key]
                  )}
                </td>
              ))}
              <td>
                <button
                  onClick={() => deleteRecord(row.user)}
                  className="delete-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
