import ".././dashboardPage.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../../../components/loading/loading";
import Cookies from "universal-cookie";

export default function Users() {
  const cookies = new Cookies();
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState(cookies.get("Bearer"));
  const [loading, setLoading] = useState(false);
  // when delete the deleteUser will be false and the function of showData will be turn on
  const [deleteUser, setDeleteUser] = useState(false);

  useEffect(() => {
    setToken(cookies.get("Bearer"));
    const showData = async () => {
      setLoading(true);
      try {
        let res = await axios.get("http://localhost:5000/admin/get-users", {
          headers: {
            "x-auth-token": token,
          },
        });
        setUsers(res.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    showData();
  }, [deleteUser]);

  // handleDelete used to delete product when click on trash
  async function handleDelete(id) {
    try {
      let res = await axios.delete(
        `http://localhost:5000/api/delete-user/${id}`,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      setDeleteUser((prev) => !prev);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="User">
      <div className="title">
        <h3>ID</h3>
        <h3>Name</h3>
        <h3>E-mail</h3>
        <h3>Options</h3>
      </div>
      <div className="users">
        {users.map((user, index) => (
          <div className="user" key={user._id}>
            <h3>{index + 1}</h3>
            <h3>{user.name}</h3>
            <h3>{user.email}</h3>
            <h3>
              <i
                className="fa-solid fa-trash pointer"
                onClick={() => handleDelete(user._id)}
              ></i>
            </h3>
          </div>
        ))}
      </div>
      {loading && <Loading />}
    </div>
  );
}
