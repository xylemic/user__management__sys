# User Management System

## Overview
This is a **User Management System** built with **React, TypeScript, Redux Toolkit, and Tailwind CSS**. The application allows users to **view, add, edit, and delete users** while managing state globally with Redux.

## Features & Task Requirements Met
- **Global State Management with Redux Toolkit**
  - Created a Redux store (`store.ts`).
  - Implemented `userSlice.ts` to manage user data.
  - Fetched initial user data from `https://jsonplaceholder.typicode.com/users`.
  - Used Redux thunks to manage state for adding, updating, and deleting users **locally**.

- **Displaying Users**
  - `UserList.tsx`: Fetches and displays users.
  - `UserCard.tsx`: Displays user details (name, email, address).
  - Shows a **loading state** while fetching data.

- **Add, Edit, and Delete Functionality**
  - `UserForm.tsx`: Form for adding/editing users.
  - Edit button: **Prefills** form with user data.
  - Delete button: Removes user from Redux state.

- **Navigation & Routing (React Router)**
  - `/users` → Shows list of users.
  - `/users/:id` → Displays user details.
  - `/add-user` → Form to add a new user.
  - `/edit-user/:id` → Form to edit an existing user.

- **UI/UX Enhancements**
  - **Mobile-friendly & Responsive Design** (Tailwind CSS).
  - Added `Header` and `Navbar` for structured navigation.
  - Improved form UI with clear input fields and validation.

## Problems Encountered & Solutions
1. **Redux State Typing Issues (TypeScript)**
   - Used `RootState` and `AppDispatch` for proper type inference.
   - Ensured correct type annotations for `User` model.

2. **Initial API Fetch Not Populating Users**
   - Fixed by properly dispatching `fetchUsers()` inside `useEffect`.

3. **Components Not Re-rendering After State Updates**
   - Used **Redux selectors** to trigger re-renders.
   - Ensured proper state updates via **immutability best practices**.

4. **Mobile Responsiveness Issues**
   - Adjusted layout using **Tailwind CSS breakpoints (`md`, `lg`)**.
   - Fixed navbar and header spacing for **better small-screen UX**.

## Technologies Used
- **Frontend**: React, TypeScript, Redux Toolkit, React Router, Tailwind CSS
- **State Management**: Redux Toolkit (RTK)
- **API Fetching**: `axios` + RTK Async Thunks
- **Styling**: Tailwind CSS (fully responsive)

