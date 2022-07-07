import "../styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { useEffect } from "react";
import { AuthProvider } from "../utils/auth";

const clientId =
  "581772637259-cp7nt0aedjmti76hoc30hcqvurrf4lrn.apps.googleusercontent.com";

function MyApp({ Component, pageProps }) {
  const gapInit = async () => {
    const gapiInit = await import("gapi-script").then((pack) => pack.gapi);

    gapiInit.load("client:auth2", () => {
      gapiInit.client.init({
        clientId,
        scope:
          "https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/tasks",
      });
    });
  };
  useEffect(() => {
    gapInit();
  }, []);

  return (
    <NextUIProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </NextUIProvider>
  );
}

export default MyApp;
