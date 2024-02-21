import React, { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, ListGroup, Button, Image, Card } from 'react-bootstrap'
import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { toast } from 'react-toastify';
import { clearCartItems } from '../slices/cartSlice'
import { useCreateOrderMutation } from '../slices/ordersApiSlice'

const PlaceOrderScreen = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const [createOrder, {isLoading, error}] = useCreateOrderMutation();

    useEffect(() => {
        if(!cart.shippingAddress.address){
            navigate('/shipping')
        } else if(!cart.paymentMethod){
            navigate('/payment');
        }
    }
    , [cart.shippingAddress, cart.paymentMethod, navigate]);

    const placeOrderHandler = async () => {
        try {
            const res = await createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                taxPrice: cart.shippingTax,
                shippingPrice: cart.shippingPrice,
                totalPrice: cart.totalPrice,
            }).unwrap();
            dispatch(clearCartItems());
            navigate(`/order/${res._id}`);
        } catch (error) {
            toast.error(error);
        }
    }

  return (
    <>
    <CheckoutSteps step1 step2 step3 step4 />

     <Row>
        <Col md={8}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h1>Shipping</h1>
                    <p>
                        <strong>Address: </strong>
                        {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                    </p>
                </ListGroup.Item>

                <ListGroup.Item>
                    <h1>Payment Method</h1>
                    <p>
                        <strong>Method: </strong>
                        {cart.paymentMethod}
                    </p>
                </ListGroup.Item>


                <ListGroup.Item>
                    <h1>Order Items</h1>

                    {cart.cartItems.length === 0 ? (<Message>Your cart is empty</Message>) : (
                        <ListGroup variant='flush'>
                        {cart.cartItems.map((item, index) => (
                            <ListGroup.Item key={index}>
                            <Row>
                                <Col md={1}>
                                    <Image
                                    src={item.image}
                                    alt={item.name}
                                    fluid
                                    rounded>
                                    </Image>
                                </Col>

                                <Col> <Link to={`/products/${item.product}`}>{item.name}</Link> </Col>

                                <Col md={4}>{item.qty} x {item.price} = {(item.qty * item.price).toFixed(2)}</Col>
                            </Row>

                            </ListGroup.Item>
                        ))}
                        </ListGroup>
                    )}

                </ListGroup.Item>
            </ListGroup>
        </Col>

        <Col md={4}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h1>Order Summary</h1>
                </ListGroup.Item>

                <ListGroup.Item>
                    <Row>
                        <Col>Items:</Col>
                        <Col>${cart.itemsPrice}</Col>
                    </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                    <Row>
                        <Col>Shipping:</Col>
                        <Col>${cart.shippingPrice}</Col>
                    </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                    <Row>
                        <Col>Tax:</Col>
                        <Col>${cart.shippingTax}</Col>
                    </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                    <Row>
                        <Col>Total:</Col>
                        <Col>${cart.totalPrice}</Col>
                    </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                    {error && <Message variant='danger'>error</Message>}
                </ListGroup.Item>

                <ListGroup.Item>
                    <Button
                    type='button'
                    className='btn-block'
                    disabled={cart.cartItems.length === 0}
                    onClick={ placeOrderHandler }
                    >Place Order</Button>
                    {isLoading && <Loader />}
                </ListGroup.Item>
            </ListGroup>
        </Col>
     </Row>
    </>
  )
}

export default PlaceOrderScreen