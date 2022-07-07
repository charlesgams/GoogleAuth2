import Layout from "../components/Layout";
import { useEffect, useContext, useState } from "react";
import { UserContext } from "../utils/auth";

export default function Mail() {
  const user = useContext(UserContext),
    [tasks, setTasks] = useState();

  const apiCall = async () => {
    if (!user.user) return;
    console.log(user.user);

    const headers = new Headers({
      "content-Type": "application/json",
    });

    const res = await fetch("http://localhost:5001/getTasks", {
      headers,
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        token: user.user.token,
      }),
    })
      .then((res) => res.json())
      .then((res) => res);

    console.log(res);
  };

  useEffect(() => {
    apiCall();
  }, [user]);

  return (
    <Layout>
      <div>J'existe</div>
    </Layout>
  );
}
