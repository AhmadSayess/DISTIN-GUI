import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import React from "react";
import Dashboard from "./pages/Dashboard/Dashboard";
// import Posts from "./pages/Posts/Categories";
import Login from "./pages/Login/Login";
import { useAuthContext } from "./hooks/useAuthContext";
import EditPost from "./pages/EditPost/EditPost";
import Categories from "./pages/Posts/Categories";
import Home from "./pages/Home/Home";


function App() {
  var user1 = localStorage.getItem("user");
  const { user } = useAuthContext();


  return (
    <div className="App">
      <Router>
        <Routes>
        <Route
            path="/"
            element={!user || !user1 ? <Home /> : <Navigate to="/dashboard/login" />}
          />
          <Route
            path="/dashboard/login"
            element={!user || !user1 ? <Login /> : <Navigate to="/dashboard/categories" />}
          />
          <Route 
            path="/dashboard"
            element={user || user1 ? <Dashboard /> : <Navigate to="/" />}
          >
            <Route
              path="categories"
              element={user || user1 ? <Categories /> : <Navigate to="/" />}
            />
             <Route
              path="editPost/:id"
              element={user || user1 ? <EditPost /> : <Navigate to="/" />}
            />
            
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
