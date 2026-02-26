const URL_BASE = "http://localhost:9090";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

function UserCard() {
  const { user, setUser } = useContext(UserContext);
  const [showUser, setShowUser] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await fetch(`${URL_BASE}/api/users`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonData = await response.json();

      setUsers(jsonData.users);
      console.log("UserCard, handleSwitch - users ", jsonData.users);
    }

    getData();
  }, []);

  async function handleSwitchUserClick() {
    setShowUser(true);
  }

  async function handleChange(e) {
    console.log(e.target.value);
    setUser(e.target.value);
    setShowUser(false);
  }

  return (
    <>
      <div>Current User is: {user}</div>
      <img
        src={users.find((item) => item.username === user)?.avatar_url}
        alt={`Avatar of : ${user}`}
        width="100px"
      />
      <button hidden={showUser} onClick={handleSwitchUserClick}>
        Switch User{" "}
      </button>
      <form hidden={!showUser}>
        <select onChange={handleChange} name="" id="">
          {users.map((userFromArr, i) => (
            <option key={`userCardList ${i}`} value={user.username}>
              {userFromArr.username}
            </option>
          ))}
        </select>
      </form>
    </>
  );
}

export default UserCard;
