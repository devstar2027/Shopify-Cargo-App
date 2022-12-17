import {
  Card,
  DisplayText,
  Image,
  Heading,
  TextStyle,
  TextField,
  ChoiceList
} from "@shopify/polaris"
import { useState, useCallback, Fragment } from "react"
import { discountImage, dollarImage, priceImage } from "../assets"

export default function PricingAndShipping() {
  

  const [txtDiscount, setTxtDiscount] = useState("2.00")

  const handleTxtDiscountChange = useCallback(
    (value) => setTxtDiscount(value),
    []
  )

  const [txtCharge, setTxtCharge] = useState("2.00")

  const handleTxtChargeChange = useCallback(
    (value) => setTxtCharge(value),
    []
  )

  const [txtProduct, setTxtProduct] = useState("0")

  const handleTxtProductChange = useCallback(
    (value) => setTxtProduct(value),
    []
  )

  const [selPrice, setSelPrice] = useState(['yes']);

  const handlePriceChange = useCallback((value) => setSelPrice(value), []);

  const [selDiscount, setSelDiscount] = useState(['yes']);

  const handleDiscountChange = useCallback((value) => setSelDiscount(value), []);



  return (
    <Fragment>
      <div className="layout--wrapper">
        <div className="block--wrapper">
          <DisplayText size="small">Confirm pricing and shipping</DisplayText>
        </div>
        <div className="divider"></div>
        <div className="block--wrapper">
          <Card
            sectioned
            title={
              <Heading>
                By default, we set your gift prices to{" "}
                <span className="strong-positive">$0</span> and offer
                <span className="strong-positive"> FREE SHIPPING</span>.
                <br />
                Does that sound OK?
              </Heading>
            }
          >
            <div className="card-background--wrapper">
              <Image source={priceImage} height={24} />
            </div>
            <ChoiceList
              choices={[
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },
              ]}
              selected={selPrice}
              onChange={handlePriceChange}
            />
          </Card>
        </div>
        {selPrice[0] === "no" && (
          <Fragment>
            <div className="block--wrapper">
              <Card sectioned>
                <div className="card-background--wrapper">
                  <Image source={discountImage} height={24} />
                </div>
                <TextStyle variation="subdued">
                  No problem! What would you like your discount to be?
                </TextStyle>
                <TextField
                  type="number"
                  value={txtDiscount}
                  onChange={handleTxtDiscountChange}
                  prefix="%"
                  autoComplete="off"
                />
              </Card>
            </div>
            <div className="block--wrapper">
              <Card sectioned>
                <div className="card-background--wrapper">
                  <Image source={dollarImage} height={24} />
                </div>
                <TextStyle variation="subdued">
                  How much do you want to charge for shipping?
                </TextStyle>
                <TextField
                  type="number"
                  value={txtCharge}
                  onChange={handleTxtChargeChange}
                  prefix="$"
                  autoComplete="off"
                />
              </Card>
            </div>
          </Fragment>
        )}

        <div className="block--wrapper">
          <Card
            sectioned
            title={
              <Heading>
                By default, we will limit site users to receive{" "}
                <span className="strong-positive">1</span> free/discounted product
                <span className="strong-positive"> from your gifting site</span>.
                <br />
                Does that sound OK?
              </Heading>
            }
          >
            <ChoiceList
              choices={[
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },
              ]}
              selected={selDiscount}
              onChange={handleDiscountChange}
            />
          </Card>
        </div>
        {selDiscount[0] === "no" && (
          <Fragment>
            <div className="block--wrapper">
              <Card sectioned>
                <TextStyle variation="subdued">
                  No problem! What’s the maximum number of products you want each user to be able to receive?
                </TextStyle>
                <TextField
                  type="number"
                  value={txtProduct}
                  onChange={handleTxtProductChange}
                  autoComplete="off"
                />
              </Card>
            </div>

          </Fragment>
        )}

      </div>
    </Fragment>
  )
}
