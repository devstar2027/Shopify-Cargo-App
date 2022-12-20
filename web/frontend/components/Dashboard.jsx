import {Card, TextStyle, Heading, List, Grid, EmptyState, Button, Select} from '@shopify/polaris';
import React from 'react';
import { useAuthenticatedFetch, useAppQuery } from "../hooks";
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from "react";
import { useSearchParams  } from "react-router-dom";

export default function Dashboard() {
	const fetch = useAuthenticatedFetch();
  const [step, setStep] = useState(1);
  const [shipmentId, setShipmentId] = useState(0);
  const [selected, setSelected] = useState('standardShipping');
  const [searchParams, setSearchParams] = useSearchParams();
  const order_id = searchParams.get('id');

  const handleSelectChange = (value) => setSelected(value);

  const options = [
    {label: 'Standard Shipping', value: 'standardShipping'},
    {label: 'Duplicate', value: 'duplicate'},
  ];

  if (order_id) {
    const {data} = useAppQuery({
      url: "/api/ordersList",
    });
    console.log(data);
  }

	// useEffect(async () => {
  //   const response = await fetch("/api/ordersList", {
  //     method: "POST",
  //     body: JSON.stringify({ savedSearchId: order_id }),
  //     headers: { "Content-Type": "application/json" },
  //   });

  //   if (response.ok) {
  //     const res = await response.json()
  //   }
	// }, [order_id]);

  console.log(order_id);

  // create shipment
  const createShipment = async () => {
    axios.post('https://api.carg0.co.il/Webservice/CreateShipment', {
      Method: 'Ship',
      Params: {
        shipping_type: 1,
        to_address: {
          name: 'John Doe',
          company: 'customer company',
          street1: 'aluf david 171',
          street2: '',
          entrance: '',
          floor: '',
          appartment: '',
          city: 'RAMAT GAN',
          state: 'IL',
          zip: '90210',
          country: 'IL',
          phone: '052249297',
          email: 'johndoe@gmail.com'
        },
        from_address: {
          name: 'John Doe',
          company: 'my company',
          street1: 'aluf david 171',
          street2: '',
          entrance: '',
          floor: '',
          appartment: '',
          city: 'ramat gan',
          state: 'il',
          zip: '90210',
          country: 'il',
          phone: '039300039',
          email: 'johndoe@gmail.com'
        },
        noOfParcel: 0,
        barcode: '',
        return_order: '2365',
        doubleDelivery: 1,
        TotalValue: 123,
        TransactionID: 'ORDER2365',
        ContentDescription: 'Milk',
        CaashOnDeliveryTypes: 0,
        CarrierName: 'CARGO EXPRESS',
        CarrierService: 'CARGO',
        CarrierID: 1,
        OrderID: '',
        PaymentMethod: 'Paypal',
        Note: 'Ship by 25/06/2018',
        customerCode: 2808
      }
    })
    .then(function (response) {
      console.log(response);
      setShipmentId(response.data.shipmentId);
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  return (  
    <Card
      title="Dashboard"
      style={{textAlign: "center"}}
    >
      <Card.Section>
        {step === 1 && (
          <>
          <Heading>Create express shipment</Heading>
  
          <Grid>
            <Grid.Cell columnSpan={{ xs: 2, sm: 2, md: 2, lg: 2, xl: 2 }}></Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 8, sm: 8, md: 8, lg: 8, xl: 8 }}>
              <Card
                title="Order"
                style={{textAlign: "center"}}
                primaryFooterAction={{content: 'Create Shipment', onMouseEnter: (createShipment)}}
              >
                <Card.Section>
                  <Grid>
                    <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                      <div>Details</div>
                      <div>Name:</div>
                      <div>Address 1:</div>
                      <div>City:</div>
                      <div>Country:</div>
                      <div>Zip</div>
                      <div>Phone</div>
                      <div>Company</div>
                      <div>Delivery method:</div>
                    </Grid.Cell>
  
                    <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                      <Select
                        label="Delivery type"
                        options={options}
                        onChange={handleSelectChange}
                        value={selected}
                      />
                    </Grid.Cell>
                  </Grid>
                </Card.Section>
              </Card>
            </Grid.Cell>
          </Grid>
          </>
        )}

        {step === 2 && (
          <>
          <Heading>Shipment created!</Heading>
  
          <Grid>
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
              <Card
                title="Details"
                primaryFooterAction={{content: 'Create Shipment', onMouseEnter: (createShipment)}}
              >
                <Card.Section>
                  <Grid>
                    <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                      <div>Order</div>
                      <div>#987766:</div>
                      <div></div>
                      <div>Tracking Number</div>
                      <div>5467543</div>
                    </Grid.Cell>
                    <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                      <div>Address</div>
                      <div>Name:</div>
                      <div>Address 1:</div>
                      <div>City:</div>
                      <div>Country:</div>
                      <div>Zip</div>
                      <div>Phone</div>
                      <div>Company</div>
                    </Grid.Cell>
                  </Grid>
                </Card.Section>
              </Card>
            </Grid.Cell>
          </Grid>
          </>
        )}
        
      </Card.Section>
    </Card>
  );
}