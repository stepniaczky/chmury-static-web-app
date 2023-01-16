import { useEffect, useState } from "react";

const User = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch("/.auth/me")
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      });
  }, []);

  return user;
};

export default User;