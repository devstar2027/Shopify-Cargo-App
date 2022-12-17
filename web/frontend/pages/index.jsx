import { useState } from "react"

import { Page, Grid, Button, Frame } from "@shopify/polaris"

import VerificationMethod from "../components/VerificationMethod"
import Menu from "../components/Menu"
import SelectProducts from "../components/SelectProducts"
import PricingAndShipping from "../components/PricingAndShipping"
import Confirmation from "../components/Confirmation"

export default function HomePage() {
  const [step, setStep] = useState(1)

  return (
    <Frame>
      <Page>
        <Grid>
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3, xl: 3 }}>
            <Menu step={step} />
          </Grid.Cell>

          <Grid.Cell columnSpan={{ xs: 6, sm: 9, md: 9, lg: 9, xl: 9 }}>
            {step === 1 && <VerificationMethod />}
            {step === 2 && <SelectProducts />}
            {step === 3 && <PricingAndShipping />}
            {step === 4 && <Confirmation />}
            {step < 4 && (
              <div className="block--wrapper">
                <div className="page-actions--wrapper">
                  <div className={step === 1 ? "visually-hidden-button" : ""}>
                    <Button onClick={() => setStep(step - 1)}>Back</Button>
                  </div>

                  <Button primary onClick={() => setStep(step + 1)}>
                    {step < 3 ? <span>Continue</span> : <span>Submit</span>}
                  </Button>
                </div>
              </div>
            )}
          </Grid.Cell>
        </Grid>
      </Page>
    </Frame>
  )
}
