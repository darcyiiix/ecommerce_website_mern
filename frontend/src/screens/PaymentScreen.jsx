import React from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import CheckoutSteps from '../components/CheckoutSteps'
import FormContainer from '../components/FormContainer'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { savePaymentMethod } from '../slices/cartSlice'


const PaymentScreen = () => {

    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart;

    useEffect(() => {
        if(!shippingAddress){
            navigate('/shipping')
        }   
    }, [shippingAddress, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder')
    }

  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3/>
        <h1>Payment</h1>
        <Form onSubmit={ submitHandler }>
            <Form.Group>
                <Form.Label as="legend">Select Method</Form.Label>

                <Col>
                    <Form.Check
                    type="radio"
                    className="my-2"
                    label="PayPal or Credit Card"
                    name="paymentMethod"
                    value="PayPal"
                    checked
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    ></Form.Check>
                </Col>
            </Form.Group>

            <Button type="submit" variant="primary">Continue</Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen 