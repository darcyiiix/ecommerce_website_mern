import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, Form, Button, Card, ListGroup } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useGetOrderDetailsQuery, useGetPayPalClientIdQuery, usePayOrderMutation, useDeliverOrderMutation } from '../slices/ordersApiSlice'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
const OrderScreen = () => {

    const { id: orderId } = useParams() 
    const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);

    const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

    const [ deliverOrder, {isLoading: loadingDeliver} ] = useDeliverOrderMutation();

    const [{isPending}, paypalDispatch ] = usePayPalScriptReducer();

    const {data: paypal, isLoading: loadingPayPal, error: errorPayPal} = useGetPayPalClientIdQuery();

    const { userInfo } = useSelector((state) => state.auth);

    const style = {"color":"silver"};

    useEffect(() => {
        if(!loadingPayPal && !errorPayPal && paypal.clientId){
            const loadPayPalScript = async () => { 
                paypalDispatch({
                    type: 'resetOptions',
                    value: {
                        'client-id': paypal.clientId,
                        currency: 'USD',
                    }
                });
                paypalDispatch({type: 'setLoadingStatus', value: 'pending'});
            }
            if(order && !order.isPaid){
                if(!window.paypal){
                    loadPayPalScript();
                }
            }
        }
    }, [paypal, order, loadingPayPal, errorPayPal, paypalDispatch])

    function onApprove(data, actions){
        return actions.order.capture().then(async function(details){
            try {
                await payOrder({orderId, details})
                refetch();
                toast.success('Payment successful')
            } catch (err) {
                toast.error(err?.data?.message || err.message);
            }
        });
    }

    async function onApproveTest(){
        await payOrder({orderId, details: {payer: {}}})
        refetch();
        toast.success('Payment successful')
    }


    function createOrder(data, actions){
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: order.totalPrice
                    }
                }
            ]
        }).then((orderId) => {return orderId});
    }

    function onError(err){
        toast.error(err.message)
    }

    const deliverOrderHandler = async () => {
        try {
            await deliverOrder(orderId);
            refetch();
            toast.success('Order delivered')
        } catch (err) {
            toast.error(err?.data?.message || err.message)
        }
    }


    
  return isLoading ? (<Loader />) : error ? (<Message variant='danger' />) : (
    <>
        <h1>Order: {order._id}</h1>

        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>

                    <ListGroup.Item>
                        <h2>Shipping</h2> 
                        <p>
                            <strong>Name</strong> {order.user.name}
                        </p>

                        <p>
                            <strong>Email</strong> {order.user.email}
                        </p>

                        <p>
                            <strong>Address</strong> {order.shippingAddress.address}. {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                        </p>

                        {order.isDelivered ? (<Message variant='success'>Delivered at: {order.deliveredAt}</Message>) : (<Message variant='danger'>Not Delivered</Message>)}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method: </strong> {order.paymentMethod}
                        </p>

                        {order.isPaid ? (<Message variant='success'>Paid on: {order.paidAt}</Message>) : (<Message variant='danger'>Not Paid</Message>)}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h1>Order Items</h1>

                        {order.orderItems.map((item, index) => (
                            <ListGroup.Item key={index}>
                                <Row>
                                    <Col md={1}>
                                        {<Image src={item.image} alt={item.name} fluid rounded></Image>}
                                    </Col>

                                    <Col><Link to={`/product/${item.product}`}>{item.name}</Link></Col>

                                    <Col md={4}>{item.qty} x ${item.price} = ${item.qty * item.price}</Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>

                        <ListGroup.Item>
                         <h2>Order Summary</h2>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Item(s):</Col>
                                <Col>${order.itemsPrice}</Col>
                            </Row>

                            <Row>
                                <Col>Shipping:</Col>
                                <Col>${order.shippingPrice}</Col>
                            </Row>

                            <Row>
                                <Col>Tax:</Col>
                                <Col>${order.taxPrice}</Col>
                            </Row>

                            <Row>
                                <Col>Total:</Col>
                                <Col>${order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        {loadingPay && <Loader />}

                        {isPending ? <Loader /> : (
                            <ListGroup.Item>
                            
                            {userInfo.isAdmin &&
                             (
                                <div>   
                                    <Button onClick={onApproveTest} style={{marginBottom: '10px'}}>Test Pay</Button>    
                                </div>)}
                            
                            <div>
                                <PayPalButtons style={style}
                                createOrder={createOrder}
                                onApprove={onApprove}
                                onError={onError}></PayPalButtons>
                            </div>
                            </ListGroup.Item>
                        )}

                        {loadingDeliver && <Loader />}
                        { userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                            <ListGroup.Item>
                                <Button type='button' className='btn btn-block' onClick={deliverOrderHandler}>Mark As Delivered</Button>
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
  )
}

export default OrderScreen