import React, { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch users.");
        }

        const data = await response.json();

        setUsers(data.slice(0, 5));
      } catch (err) {
        setError("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading users...</h2>;
  }

  if (error) {
    return <h2 style={{ textAlign: "center" }}>{error}</h2>;
  }

  return (
    <div
      style={{
        backgroundColor: "#87CEEB",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#ffffff",
          marginBottom: "30px",
        }}
      >
        User List
      </h1>

      {users.map((user) => (
        <div
          key={user.id}
          style={{
            backgroundColor: "#ffffff",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "8px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
          }}
        >
          <h3>{user.name}</h3>
          <p>Email: {user.email}</p>
          <p>Company: {user.company.name}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
