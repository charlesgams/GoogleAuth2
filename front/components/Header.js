import { GoogleLogin, GoogleLogout } from "react-google-login";
import { Col, Container, Row } from "@nextui-org/react";
import { useContext, useEffect } from "react";
import { UserContext } from "../utils/auth";
import { useRouter } from "next/router";

const clientId =
  "581772637259-cp7nt0aedjmti76hoc30hcqvurrf4lrn.apps.googleusercontent.com";

export default function Header() {
  const user = useContext(UserContext),
    router = useRouter();

  const loginSucces = (response) => {
      console.log(response);
      user.signIn(response.googleId, response.accessToken);
    },
    logoutSucces = (response) => {
      console.log(response);
      user.signOut();
    };

  useEffect(() => {
    console.log(user);
  });

  return (
    <Container>
      <Row align="center" justify="space-between">
        <Col span={3}>
          <Row justify="space-between">
            <a onClick={() => router.push("/")}>Homepage</a>
            <a onClick={() => router.push("/mail")}>Mail</a>
            <a onClick={() => router.push("/tasks")}>Taches</a>
          </Row>
        </Col>

        <Col span={4}>
          <Row justify="flex-end">
            <GoogleLogin
              clientId={clientId}
              buttonText="Login"
              onSuccess={loginSucces}
              onFailure={logoutSucces}
            />

            <GoogleLogout
              clientId={clientId}
              buttonText="Logout"
              onLogoutSuccess={logoutSucces}
              onFailure={logoutSucces}
            />
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
