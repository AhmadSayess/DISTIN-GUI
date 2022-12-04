import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import React from "react";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import { useAuthContext } from "./hooks/useAuthContext";
import Categories from "./pages/Categories/Categories";
import Home from "./pages/Home/Home";
import Items from "./pages/Items/Items";
import EditCategorie from "./pages/EditCategorie/EditCategorie";
import EditItem from "./pages/EditItem/EditItem";
import ListOfItem from "./pages/ListOfItem/ListOfItem";


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
            path="/listitem/:id"
            element={!user || !user1 ? <ListOfItem/> : <Navigate to="/dashboard/login" />}
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
              path="items/:id"
              element={user || user1 ? <Items /> : <Navigate to="/" />}
            />
             <Route
              path="editcategorie/:id"
              element={user || user1 ? <EditCategorie /> : <Navigate to="/" />}
            />
              <Route
              path="edititem/:id"
              element={user || user1 ? <EditItem /> : <Navigate to="/" />}
            />
            
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
