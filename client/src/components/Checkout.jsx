import { useState } from "react"
import React from "react"
import { useOutletContext } from "react-router-dom";

function Checkout(){
    const {currentUser} = useOutletContext()

    const [shippingInfo, setShippingInfo] = useState({
        fullName: '',
        address: '',
        city: '',
        state: '',
        zip: ''
        });

    const [billingSameAsShipping, setBillingSameAsShipping] = useState(false);
    
    const [billingInfo, setBillingInfo] = useState({
        fullName: '',
        address: '',
        city: '',
        state: '',
        zip: ''
    });

    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });

  const handleShippingChange = (e) => {

    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo({ ...billingInfo, [name]: value });
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo({ ...paymentInfo, [name]: value });
  };

  const handleBillingSameAsShippingChange = (e) => {
    setBillingSameAsShipping(e.target.checked);
    if (e.target.checked) {
      setBillingInfo({ ...shippingInfo });
    } else {
      setBillingInfo({
        fullName: '',
        address: '',
        city: '',
        state: '',
        zip: ''
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Payment has been submitted successfully!');
    console.log('Form submitted:', { shippingInfo, billingInfo, paymentInfo });
          
        setShippingInfo({
            fullName: '',
            address: '',
            city: '',
            state: '',
            zip: ''
          });
        setBillingInfo({
            fullName: '',
            address: '',
            city: '',
            state: '',
            zip: ''
        });
        setPaymentInfo({
            cardNumber: '',
            expiryDate: '',
            cvv: ''
        });
        setBillingSameAsShipping(false);
          
  };
  if (currentUser == null){
    return "Not Logged In"
  }
  if (currentUser.cart[0].items.length === 0){
    return (<h1> Your Cart is Empty!</h1>)}
  else{
  return (
    <div id="checkout">
      <h2 id='checkoutheader'>Checkout</h2>
      <form onSubmit={handleSubmit}>
        
        <h3>Shipping Address</h3>
        <label htmlFor="fullName">Full Name:</label>
        <input type="text" id="fullName" name="fullName" value={shippingInfo.fullName} onChange={handleShippingChange} required />

        <label htmlFor="address">Address:</label>
        <input type="text" id="address" name="address" value={shippingInfo.address} onChange={handleShippingChange} required />

        <label htmlFor="city">City:</label>
        <input type="text" id="city" name="city" value={shippingInfo.city} onChange={handleShippingChange} required />

        <label htmlFor="state">State:</label>
        <input type="text" id="state" name="state" value={shippingInfo.state} onChange={handleShippingChange} required />

        <label htmlFor="zip">Zip Code:</label>
        <input type="text" id="zip" name="zip" value={shippingInfo.zip} onChange={handleShippingChange} required />


        <h3>Billing Address</h3>
        <label id="sameas">
          <p>Same as Shipping Address</p> &nbsp;
          <input type="checkbox" checked={billingSameAsShipping} onChange={handleBillingSameAsShippingChange} />
          
        </label>

        {!billingSameAsShipping && (
          <form>
            <label htmlFor="billingFullName">Full Name:</label>
            <input type="text" id="billingFullName" name="fullName" value={billingInfo.fullName} onChange={handleBillingChange} required />

            <label htmlFor="billingAddress">Address:</label>
            <input type="text" id="billingAddress" name="address" value={billingInfo.address} onChange={handleBillingChange} required />

            <label htmlFor="billingCity">City:</label>
            <input type="text" id="billingCity" name="city" value={billingInfo.city} onChange={handleBillingChange} required />

            <label htmlFor="billingState">State:</label>
            <input type="text" id="billingState" name="state" value={billingInfo.state} onChange={handleBillingChange} required />

            <label htmlFor="billingZip">Zip Code:</label>
            <input type="text" id="billingZip" name="zip" value={billingInfo.zip} onChange={handleBillingChange} required />
          </form>
        )}


        <h3>Payment Information</h3>
        <label htmlFor="cardNumber">Card Number:</label>    
        <input type="text" id="cardNumber" name="cardNumber" value={paymentInfo.cardNumber} onChange={handlePaymentChange} required />
       
        <label htmlFor="expiryDate">Expiration Date:</label>
        <input type="date" id="expiryDate" name="expiryDate" value={paymentInfo.expiryDate} onChange={handlePaymentChange} required />
        
        <label htmlFor="cvv">CVV:</label>
        <input type="text" id="cvv" name="cvv" value={paymentInfo.cvv} onChange={handlePaymentChange} required />
        
          
        <br />
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}
}

export default Checkout