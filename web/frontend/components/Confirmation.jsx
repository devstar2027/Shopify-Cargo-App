import { Button, DisplayText, Heading, Image } from "@shopify/polaris"
import { Fragment } from "react"
import { successImage } from "../assets"

import { Redirect } from "@shopify/app-bridge/actions";
import { useAppBridge, Loading } from "@shopify/app-bridge-react";

export default function Confirmation() {
  const app = useAppBridge();

  const createLoadPage = async () => {
		const response = await fetch("/api/create_load_page");
	}

  return (
    <Fragment>
      <div className="layout--wrapper">
        <div className="block--wrapper">
          <DisplayText size="small">&nbsp;</DisplayText>
        </div>
        <div className="divider"></div>
        <div className="block--wrapper">
          <div className="confirmation--wrapper">
            <Image src={successImage} />
            <DisplayText size="large">Perfect!</DisplayText>
            <DisplayText size="large">
              Your site is being configured
            </DisplayText>
            <div className="button--wrapper">
              <Button
                outline
                monochrome
                size="large"
                onClick={() => {
                  createLoadPage();
                  const redirect = Redirect.create(app);
                    redirect.dispatch(Redirect.Action.ADMIN_PATH, `/`);
                  }}
              >
                Back to home
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
