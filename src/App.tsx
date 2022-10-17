import React from "react";
import "./App.css";
import Users from "./components/users/Users";
import Loader from "./components/loader/Loader";

function App() {
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <div className="App">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1>Users</h1>
          <Users />
        </>
      )}
    </div>
  );
}

export default App;
