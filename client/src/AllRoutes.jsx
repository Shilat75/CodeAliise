import React from "react";
import { Routes, Route } from "react-router-dom";

import App from "./Pages/LandingPage/App"; // Ensure correct path to App.jsx
import Home from "./Pages/Home/Home";
import Auth from "./Pages/Auth/Auth";
import Questions from "./Pages/Questions/Questions";
import AskQuestion from "./Pages/AskQuestion/AskQuestion";
import DisplayQuestion from "./Pages/Questions/DisplayQuestion";
import Tags from "./Pages/Tags/Tags";
import Users from "./Pages/Users/Users";
import UserProfile from "./Pages/UserProfile/UserProfile";
import About from "./Pages/About/About";
import Products from "./Pages/Products/products"; // Import Products page
import Teams from "./Pages/Teams/Teams"; // Import Products page
import Contact from "./Pages/Contact/Contact";
import FAQ from "./Pages/FAQ/FAQ"


const AllRoutes = ({ slideIn, handleSlideIn }) => {
  return (
    <Routes>
      {/* Landing Page */}
      <Route
        path="/"
        element={<App slideIn={slideIn} handleSlideIn={handleSlideIn} />}
      />
      <Route
        path="/Home"
        element={<Home slideIn={slideIn} handleSlideIn={handleSlideIn} />}
      />

      {/* Other Routes */}
      <Route path="/Auth" element={<Auth />} />
      <Route path="/AskQuestion" element={<AskQuestion />} />
      <Route
        path="/Questions"
        element={<Questions slideIn={slideIn} handleSlideIn={handleSlideIn} />}
      />
      <Route
        path="/Questions/:id"
        element={
          <DisplayQuestion slideIn={slideIn} handleSlideIn={handleSlideIn} />
        }
      />
      <Route
        path="/Tags"
        element={<Tags slideIn={slideIn} handleSlideIn={handleSlideIn} />}
      />
      <Route
        path="/Users"
        element={<Users slideIn={slideIn} handleSlideIn={handleSlideIn} />}
      />
      <Route
        path="/Users/:id"
        element={
          <UserProfile slideIn={slideIn} handleSlideIn={handleSlideIn} />
        }
      />
      <Route
        path="/About"
        element={<About slideIn={slideIn} handleSlideIn={handleSlideIn} />}
      />
      <Route
        path="/Products"
        element={<Products slideIn={slideIn} handleSlideIn={handleSlideIn} />} // Add Products route
      />
      <Route
        path="/Teams"
        element={<Teams slideIn={slideIn} handleSlideIn={handleSlideIn} />} // Add Products route
      />
      <Route
        path="/Contact"
        element={<Contact slideIn={slideIn} handleSlideIn={handleSlideIn} />}
      />
      <Route
        path="/FAQ"
        element={<FAQ slideIn={slideIn} handleSlideIn={handleSlideIn} />}
      />
    </Routes>
  );
};

export default AllRoutes;
