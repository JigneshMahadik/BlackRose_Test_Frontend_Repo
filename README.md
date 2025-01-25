Project Overview

This is the frontend of a full-stack application that provides real-time data visualization and CRUD functionality. The application includes user authentication, a real-time interactive plot, and a CRUD interface for managing data stored on the backend.

Tech Stack

React (Frontend Framework)

Chart.js (Real-time data visualization)

React Router (Routing)

Axios (HTTP client)

Zustand (State management)

Tailwind CSS (Styling)

Vercel (Hosting)

Features

Authentication

Login page for username and password input.

Session token stored using localStorage for persistence.

Protected routes restricted to authenticated users.

Main Application

Dark Theme UI: A consistent and responsive dark theme.

Interactive Plot: Displays real-time streamed random numbers using Chart.js.

Dynamic Table: Paginated and sortable table for displaying data records.

CRUD Interface: Interface to perform Create, Read, Update, and Delete operations on data.

Additional Features

Dynamic Updates: Real-time data streaming updates both the plot and the table.

Error Handling: Displays appropriate error messages for failed logins, unauthorized actions, or CRUD conflicts.

Session Persistence: User session remains active even after page reloads.

Concurrency Handling: Notifies users of pending or conflicting CRUD operations.

Recovery UI: Allows users to restore data from the latest backup file.

Local Setup

Prerequisites

Node.js (version 16 or higher)

npm or yarn

Steps

Clone the repository:
