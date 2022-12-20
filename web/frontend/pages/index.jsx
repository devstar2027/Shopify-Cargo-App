import { useState } from "react";

import { Page, Image, Grid, Frame, EmptyState, Navigation } from "@shopify/polaris";

import { logoImage } from "../assets";
import Settings from "../components/Settings";
import Instructions from "../components/Instructions";
import Dashboard from "../components/Dashboard";
import {SettingsMajor, QuestionMarkInverseMajor, DraftOrdersMajor} from '@shopify/polaris-icons';

export default function HomePage() {
  const [step, setStep] = useState(3);

  return (
    <Frame>
      <Page>
        <Grid>
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
              <div style={{ padding: "20px"}}>
                <Image
                  source={logoImage}
                  alt="LogoImage"
                  width={150}
                />
              </div>
              <Navigation location="/">
                <Navigation.Section
                  items={[
                    {
                      url: '/',
                      label: 'Settings',
                      icon: SettingsMajor,
                      onClick: ()=>setStep(1),
                      selected: step === 1 && true,
                    },
                    {
                      url: '/path/to/place',
                      label: 'Instructions',
                      icon: QuestionMarkInverseMajor,
                      onClick: ()=>setStep(2),
                      selected: step === 2 && true,
                    },
                    {
                      url: '/path/to/place',
                      label: 'Dashboard',
                      icon: DraftOrdersMajor,
                      onClick: ()=>setStep(3),
                      selected: step === 3 && true,
                    },
                  ]}
                />
              </Navigation>
          </Grid.Cell>

          <Grid.Cell columnSpan={{ xs: 6, sm: 9, md: 9, lg: 9, xl: 9 }}>
            <EmptyState></EmptyState>
            {step === 1 && <Settings />}
            {step === 2 && <Instructions />}
            {step === 3 && <Dashboard />}
          </Grid.Cell>
        </Grid>
      </Page>
    </Frame>
  );
}
