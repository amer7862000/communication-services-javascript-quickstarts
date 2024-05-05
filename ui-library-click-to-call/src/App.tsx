import "./App.css";
import {
  CommunicationIdentifier,
  MicrosoftTeamsAppIdentifier,
} from "@azure/communication-common";
import {
  Spinner,
  Stack,
  initializeIcons,
  registerIcons,
  Text,
} from "@fluentui/react";
import { CallAdd20Regular, Dismiss20Regular } from "@fluentui/react-icons";
import logo from "./logo.svg";

import { CallingWidgetComponent } from "./components/CallingWidgetComponent";
import { isValidTeamsAppId, isValidToken, isValidUserId } from "./utils";

registerIcons({
  icons: { dismiss: <Dismiss20Regular />, callAdd: <CallAdd20Regular /> },
});
initializeIcons();
function App() {
  /**
   * Token for local user.
   */
  const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjYwNUVCMzFEMzBBMjBEQkRBNTMxODU2MkM4QTM2RDFCMzIyMkE2MTkiLCJ4NXQiOiJZRjZ6SFRDaURiMmxNWVZpeUtOdEd6SWlwaGsiLCJ0eXAiOiJKV1QifQ.eyJza3lwZWlkIjoiYWNzOmRmMDNlYTAxLWRlOGUtNGY4OC1iY2Q5LTU3MjQ5ZTg1ZTgyNl8wMDAwMDAxZi1lODBlLTVjMjMtNWI0Mi1hZDNhMGQwMDBmYzMiLCJzY3AiOjE3OTIsImNzaSI6IjE3MTQ5MDI4NDEiLCJleHAiOjE3MTQ5ODkyNDEsInJnbiI6InVrIiwiYWNzU2NvcGUiOiJ2b2lwIiwicmVzb3VyY2VJZCI6ImRmMDNlYTAxLWRlOGUtNGY4OC1iY2Q5LTU3MjQ5ZTg1ZTgyNiIsInJlc291cmNlTG9jYXRpb24iOiJ1ayIsImlhdCI6MTcxNDkwMjg0MX0.YZBzHKe-_3nhGJfd515bDCIw37XZkT-1wVD1bIhfFwuBuOLCl0dgxxmJURC_JcwHEghuV_VT2DpqjuLLKNi9y_ihpp5giTOgKkuoEM9b2F1uOxWs8t8_q0R_wsPx8bdAKfwv7ppRMHqVL1tLop9TLO-otHc4NSBVc_JRRaUswRHoV0MOycfinQXXaw0lJadnJeXV4tHnHLfGuLT5f3WKLMhuaIMwezUWYDKRDdUGUf-WJqTGi9Z-uUd5zfpGQkh62XJif-Yja9Oc3fuE6Kxfa-bzIxIbP1dMCk9rjSPsJhF7_4O7s2T5i_LzXGkUTh3DQ7qXMjZ9zydnZKg4_oKVWw";

  /**
   * User identifier for local user.
   */
  const userId: CommunicationIdentifier = {
    communicationUserId: "8:acs:df03ea01-de8e-4f88-bcd9-57249e85e826_0000001f-e80e-5c23-5b42-ad3a0d000fc3",
  };

  /**
   * Enter your Teams voice app identifier from the Teams admin center here
   */
  const teamsAppIdentifier: MicrosoftTeamsAppIdentifier = {
    teamsAppId: "c6d44cdf-67d9-4592-aebf-54eb8a27f9b8",
    cloud: "public",
  };

  const widgetParams = {
    userId,
    token,
    teamsAppIdentifier,
  };

  if (!isValidToken(token) || !isValidUserId(userId) || !isValidTeamsAppId(teamsAppIdentifier)) {
    return (
      <Stack horizontalAlign="center" verticalAlign="center" style={{ height: "40rem", width: "100%" }}>
        <Spinner
          ariaLive="assertive"
          labelPosition="top"
        />
        <Text variant="large">Invalid token, local userId or teamsAppId</Text>
      </Stack>
    );
  }

  return (
    <Stack
      style={{ height: "100%", width: "100%", padding: "3rem" }}
      tokens={{ childrenGap: "1.5rem" }}
    >
      <Stack tokens={{ childrenGap: "1rem" }} style={{ margin: "auto" }}>
        <Stack
          style={{ padding: "3rem" }}
          horizontal
          tokens={{ childrenGap: "2rem" }}
        >
          <Text style={{ marginTop: "auto" }} variant="xLarge">
            Welcome to a Calling Widget sample
          </Text>
          <img
            style={{ width: "7rem", height: "auto" }}
            src={logo}
            alt="logo"
          />
        </Stack>

        <Text>
          Welcome to a Calling Widget sample for the Azure Communication
          Services UI Library. This sample has the ability to connect you through a
          Teams voice apps to an agent to help you.
        </Text>
        <Text>
          As a user all you need to do is click the widget below, enter your
          display name for the call - this will act as your caller id, and
          action the <b>start call</b> button.
        </Text>
      </Stack>
      <Stack
        horizontal
        tokens={{ childrenGap: "1.5rem" }}
        style={{ overflow: "hidden", margin: "auto" }}
      >
        <CallingWidgetComponent
          widgetAdapterArgs={widgetParams}
          onRenderLogo={() => {
            return (
              <img
                style={{ height: "4rem", width: "4rem", margin: "auto" }}
                src={logo}
                alt="logo"
              />
            );
          }}
        />
      </Stack>
    </Stack>
  );
}

export default App;
