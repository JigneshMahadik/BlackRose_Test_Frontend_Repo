**## Hosted URL : **
-https://black-rose-frontend.vercel.app/

**## Project Overview**

This is the frontend of a full-stack application that provides real-time data visualization and CRUD functionality. The application includes user authentication, a real-time interactive plot, and a CRUD interface for managing data stored on the backend.

**## Tech Stack**

-React (Frontend Framework)
-Chart.js (Real-time data visualization)
-React Router (Routing)
-Axios (HTTP client)
-State management
-Tailwind CSS (Styling)
-Vercel (Hosting)

**## Core Features**

### **Authentication**
- Login page for username and password input.
- Stores session token using a state management library (e.g., Zustand).
- Restricts access to application pages for unauthenticated users.

### **Main Application**
#### **UI Components**
1. **Interactive Plot**:
   - Displays real-time streamed random numbers using `Chart.js`.

2. **Dynamic Table**:
   - Shows stored numbers and records in a paginated, sortable table.

3. **CRUD Interface**:
   - Allows users to perform CRUD operations on `backend_table.csv`.

### **Features**
1. **Dynamic Updates**:
   - Real-time data streaming updates the plot and table dynamically.

2. **Error Handling**:
   - Displays errors for failed logins, unauthorized actions, or conflicting CRUD operations.

3. **Session Persistence**:
   - Uses `localStorage` to maintain the user session.

4. **Concurrency Handling**:
   - Notifies users of conflicting or pending operations during simultaneous CRUD actions.

5. **Recovery UI**:
   - Option to restore data from the most recent backup file.

---

**## Hosting**
- Deployed on free platforms like Vercel or Netlify.

---

**## Installation Instructions**

### **Local Setup**
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the React development server:
   ```bash
   npm start
   ```

---

**## Deployment**
- Hosted Frontend URL: `<Your Frontend URL>`

---

**## Testing Instructions**
1. **Login**:
   - Enter credentials and validate token-based authentication.

2. **Interactive Plot**:
   - Confirm real-time random number updates on the chart.

3. **Dynamic Table**:
   - Check for proper pagination, sorting, and data rendering.

4. **CRUD Operations**:
   - Test Create, Read, Update, and Delete functionalities for `backend_table.csv`.

5. **Session Management**:
   - Ensure session persists after refreshing the page.

6. **Error Handling**:
   - Simulate errors and verify proper error messages are displayed.

7. **Recovery**:
   - Restore the data using the recovery option and validate integrity.

---
