import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, FormGroup, FormLabel } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../slices/cartSlice'

const ShippingScreen = () => {

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress?.address || '');
    const [city, setCity] = useState(shippingAddress?.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
    const [country, SetCountry] = useState(shippingAddress?.country || '');

    const dispatch = useDispatch();
    const navigate = useNavigate();



    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({address, city, postalCode, country}));
        navigate('/payment');
    }

 
  return (

    <FormContainer>
        
        <CheckoutSteps step1 step2/>

        <h1>Shipping</h1>
        <Form onSubmit={ submitHandler }>
            <FormGroup controlId='address' className='my-2'>
                <FormLabel>Address</FormLabel>
            
            <Form.Control 
            type="text"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
            </FormGroup>

            <FormGroup controlId='city' className='my-2'>
                <FormLabel>City</FormLabel>
            
            <Form.Control 
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
            </FormGroup>

            <FormGroup controlId='postalCode' className='my-2'>
                <FormLabel>Postal Code</FormLabel>
            
            <Form.Control 
            type="text"
            placeholder="Enter postal code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            ></Form.Control>
            </FormGroup>

            <FormGroup controlId='country' className='my-2'>
                <FormLabel>Country</FormLabel>
            
            <Form.Control 
            type="text"
            placeholder="Enter country"
            value={country}
            onChange={(e) => SetCountry(e.target.value)}
            ></Form.Control>
            </FormGroup>

            <Button type="submit" variant="primary" className="my-2">Continue</Button>

        </Form>
    </FormContainer>
    
  )
}

export default ShippingScreen