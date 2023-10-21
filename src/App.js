import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import UserDirectory from "./components/UserDirectory";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<UserDirectory />} />
          <Route path="/user/:userId" element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
