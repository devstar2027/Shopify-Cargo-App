import { useState } from "react";

import {
  Page,
  Image,
  Grid,
  Frame,
} from "@shopify/polaris";

import { logoImage } from "../assets";
import Menu from "../components/Menu";
import Settings from "../components/Settings";
import Instructions from "../components/Instructions";
// import Dashboard from "../components/Dashboard";

export default function HomePage() {
  const [step, setStep] = useState(2)
  return (
    
    <Frame>
      <Page>
        <Grid>
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
            <div style={{ padding: "0 20px", textAlign: "center" }}>
              <Image
                source={logoImage}
                alt="LogoImage"
                width={150}
              />
            </div>
            <Menu step={step} />
          </Grid.Cell>

          <Grid.Cell columnSpan={{ xs: 6, sm: 9, md: 9, lg: 9, xl: 9 }}>
            {step === 1 && <Settings />}
            {step === 2 && <Instructions />}
            {/* {step === 3 && <Dashboard />} */}
          </Grid.Cell>
        </Grid>
      </Page>
    </Frame>
  );
}
