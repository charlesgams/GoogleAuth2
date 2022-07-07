import Layout from "../components/Layout";
import { useEffect, useContext, useState } from "react";
import { Col, Container, Row } from "@nextui-org/react";
import { UserContext } from "../utils/auth";
import { Head } from "next/document";

export default function Mail() {
  const user = useContext(UserContext),
    [mails, setMails] = useState(null);

  const apiCall = async () => {
    if (!user.user) return;

    const headers = new Headers({
      "content-Type": "application/json",
    });

    const res = await fetch("http://localhost:5000/mail", {
      headers,
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        token: user.user.token,
        userId: user.user.userId,
      }),
    })
      .then((res) => res.json())
      .then((res) => res);

    setMails(res);
  };

  useEffect(() => {
    apiCall();
    console.log(mails);
  }, [user]);

  return (
    <Layout>
      {mails &&
        mails.map((mail, index) => {
          return (
            <Container>
              <Row key={index}>
                <Row>
                  <Col>{mail.from}</Col>
                  <Col>{mail.subject}</Col>
                </Row>

                <Col>{mail.snippet}</Col>
              </Row>
            </Container>
          );
        })}
    </Layout>
  );
}
