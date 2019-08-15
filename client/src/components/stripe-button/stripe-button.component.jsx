import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios'

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_WBqax2FWVzS9QlpJScO07iuL';

  const onToken = token => {
    axios.post('/payment', {
      amount: priceForStripe,
      token: token
    })
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log('Payment error:', error);
      alert('There was an issue with your payment, please use the provided credit card')
    })
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='Gbenga Ecommerce App.'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
