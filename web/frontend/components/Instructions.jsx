import {Card, Grid, Heading, List} from '@shopify/polaris';
import React from 'react';

export default function Instructions() {
  return (
    <Card
      title="Instructions"
      style={{textAlign: "center"}}
    >
      <div style={{paddingBottom: "40px"}}>
        <Grid>
          <Grid.Cell columnSpan={{ xs: 2, sm: 2, md: 2, lg: 2, xl: 2 }}></Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 8, sm: 8, md: 8, lg: 8, xl: 8 }}>
            <Card.Section>

              <div style={{marginBottom: "30px", fontSize: "30px", fontStyle: "bold"}}>How to create shipments?</div>
              
              <List type="number">
                <List.Item>View an order on your Shopify dashboard</List.Item>
                <List.Item>Click on "More Actions" in the top right corner</List.Item>
                <List.Item>Click "Send to Cargo"</List.Item>
              </List>
                  
              <div style={{marginBottom: "30px", marginTop: "30px", fontSize: "30px", fontStyle: "bold"}}>How to submit bulk shipment?</div>

              <List type="number">
                <List.Item>View your order list on your Shopify dashboard</List.Item>
                <List.Item>Click on the bulk selection symbol on the top of your list</List.Item>
                <List.Item>Click on "More Actions" in the top right corner</List.Item>
                <List.Item>Click "Send to Cargo"</List.Item>
              </List>

            </Card.Section>
          </Grid.Cell>
        </Grid>
      </div>
    </Card>
  );
}