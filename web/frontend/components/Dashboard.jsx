import {Card, TextStyle, Heading, List, Grid, EmptyState, Button} from '@shopify/polaris';
import React from 'react';
import { useAuthenticatedFetch, useAppQuery } from "../hooks";
import { useEffect } from 'react';

export default function Dashboard() {
	const fetch = useAuthenticatedFetch();

  const variables = {
    id: 5225465741603,
	}  

  
	useEffect(async () => {
		const response = await fetch("/api/ordersList", {
			method: "POST",
			body: JSON.stringify({ variables }),
			headers: { "Content-Type": "application/json" },
		});

		if (response.ok) {
			const res = await response.json()
			const orders = res.body.data.orders
		}
	}, []);
  


  return (
    <Card
      title="Dashboard"
      style={{textAlign: "center"}}
    >
      <Card.Section>

        <Heading>Create express shipment</Heading>
        <Card
          title="Dashboard"
          style={{textAlign: "center"}}
        >
          <Card.Section>
            <Heading>Order</Heading>
            
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
            <Button submit>Submit</Button>
          </Card.Section>
        </Card>
        
      </Card.Section>
    </Card>
  );
}