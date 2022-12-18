import {Card, TextStyle, Heading, List, Grid, EmptyState, Button} from '@shopify/polaris';
import React from 'react';
import { useAuthenticatedFetch, useAppQuery } from "../hooks";
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from "react";

export default function Dashboard() {
	const fetch = useAuthenticatedFetch();
  const [shipmentId, setShipmentId] = useState(0);

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



  const variables = {
    id: 5225465741603,
	}  

	// useEffect(async () => {
	// 	const response = await fetch("/api/ordersList", {
	// 		method: "POST",
	// 		body: JSON.stringify({ variables }),
	// 		headers: { "Content-Type": "application/json" },
	// 	});

	// 	if (response.ok) {
	// 		const res = await response.json()
	// 		const orders = res.body.data.orders
	// 	}
	// }, []);

  return (  
    <Card
      title="Dashboard"
      style={{textAlign: "center"}}
    >
      <Card.Section>

        <Heading>Create express shipment</Heading>

        <Grid>
          <Grid.Cell columnSpan={{ xs: 2, sm: 2, md: 2, lg: 2, xl: 2 }}></Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 8, sm: 8, md: 8, lg: 8, xl: 8 }}>
            <Card
              title="Order"
              style={{textAlign: "center"}}
              primaryFooterAction={{content: 'Create Shipment'}}
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
                    <div>Delivery type</div>
                  </Grid.Cell>
                </Grid>
              </Card.Section>
            </Card>
          </Grid.Cell>
        </Grid>
        
      </Card.Section>
    </Card>
  );
}