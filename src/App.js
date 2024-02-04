import React from "react";
import './App.css';
import Home from './components/Home/Home';
import Login from "./components/Login/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return (
    <div>
      {isLoggedIn || sessionStorage.getItem("userName") ? <Home setIsLoggedIn={setIsLoggedIn} /> : <Login setIsLoggedIn={setIsLoggedIn} />}
    </div>
  );
}

export default App;
