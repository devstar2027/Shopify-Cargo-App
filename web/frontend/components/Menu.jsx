// import { Fragment } from "react"

// import { Image, TextStyle } from "@shopify/polaris"

// import { dotImage, logoImage, number1Image, selectedImage } from "../assets"

// export default function ProgressIndicator({ step }) {
//   return (
//     <Fragment>
//       <div className="block--wrapper ">
//         <Image source={logoImage} height={50} className="logo-img"/>
//       </div>
//       <div className="block--wrapper">
//         <div className="progress-indicator--wrapper">
//           <div className={step === 1 ? "" : "visually-hidden"}>
//             <Image source={number1Image} />
//           </div>
//           <div className={step > 1 ? "" : "visually-hidden"}>
//             <Image source={selectedImage} />
//           </div>

//           <TextStyle variation="negative">Configure your site</TextStyle>
//         </div>
//         <div
//           className={step >= 2 ? "progress-bar active" : "progress-bar"}
//         ></div>
//         <div className="progress-indicator--wrapper">
//           <div className={step < 2 ? "" : "visually-hidden"}>
//             <Image source={dotImage} />
//           </div>
//           <div className={step === 2 ? "" : "visually-hidden"}>
//             <Image source={number1Image} />
//           </div>
//           <div className={step > 2 ? "" : "visually-hidden"}>
//             <Image source={selectedImage} />
//           </div>
//           <TextStyle variation={step >= 2 ? "negative" : "subdued"}>
//             Select your products
//           </TextStyle>
//         </div>
//         <div
//           className={step >= 3 ? "progress-bar active" : "progress-bar"}
//         ></div>
//         <div className="progress-indicator--wrapper">
//           <div className={step < 3 ? "" : "visually-hidden"}>
//             <Image source={dotImage} />
//           </div>
//           <div className={step === 3 ? "" : "visually-hidden"}>
//             <Image source={number1Image} />
//           </div>
//           <div className={step > 3 ? "" : "visually-hidden"}>
//             <Image source={selectedImage} />
//           </div>

//           <TextStyle variation={step >= 3 ? "negative" : "subdued"}>
//             Confirm pricing and shipping
//           </TextStyle>
//         </div>
//       </div>
//     </Fragment>
//   )
// }

import {Frame, Navigation} from '@shopify/polaris';
import {HomeMinor, OrdersMinor, ProductsMinor} from '@shopify/polaris-icons';
import React from 'react';
import { dotImage, logoImage, number1Image, selectedImage } from "../assets"

export default function Menu({ currentTab }) {
  return (
    <Frame>
      <div className="block--wrapper ">
        <Image source={logoImage} height={50} className="logo-img"/>
      </div>
      <Navigation location="/">
        <Navigation.Section
          items={[
            {
              url: '/',
              label: 'Setting',
              icon: HomeMinor,
            },
            {
              url: '/path/to/place',
              label: 'Instructions',
              icon: OrdersMinor,
              badge: '15',
            },
            {
              url: '/path/to/place',
              label: 'Dashboard',
              icon: ProductsMinor,
            },
          ]}
        />
      </Navigation>
    </Frame>
  );
}
