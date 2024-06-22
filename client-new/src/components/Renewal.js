import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './UserList.css'; // Import the CSS file

function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const Details = (id) => {
    navigate(`/user/${id}`);
  };

  useEffect(() => {
    axios.get("http://localhost:4000/users")
      .then(response => {
        if (response.status === 200) {
          setUsers(response.data);
        }
      })
      .catch(err => setError(err.message));
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      {error ? (
        <h1>Something went wrong</h1>
      ) : (
        <div className="container">
            <h2 className="text-center mt-3">
              Fresh Registrations
            </h2>
          <div className="search-container">
            
            <input
              type="text"
              placeholder="Search by name"
              value={query}
              onChange={handleSearch}
              className="search-input"
            />
          </div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Id</th>
                <th>Student Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((userObj) => (
                  <tr key={userObj.id}>
                    <td>{userObj.id}</td>
                    <td>{userObj.name}</td>
                    <td>
                      <button 
                        className="btn btn-secondary"
                        onClick={() => Details(userObj.id)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UserList;
