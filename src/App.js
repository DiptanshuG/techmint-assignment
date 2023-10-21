import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import UserDirectory from "./components/UserDirectory"; // Create this component
import UserProfile from "./components/UserProfile"; // Create this component

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route  path="/" component={UserDirectory} />
          <Route path="/user/:userId" component={UserProfile} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;