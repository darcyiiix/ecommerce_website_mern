import { Form, Button, Row, Col } from 'react-bootstrap';
import { FormContainer } from '../components/FormContainer';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { useGeolocated } from 'react-geolocated'; // Import the useGeolocated hook

export const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [coordinates, setCoordinates] = useState({ lat: 0, lon: 0 });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();

    // Use the useGeolocated hook to get the user's current coordinates
    const { coords } = useGeolocated({
        onSuccess: (position) => {
            setCoordinates({
                lat: position.coords.latitude,
                lon: position.coords.longitude,
            });
        },
        enableHighAccuracy: true, // Set this based on your accuracy needs
    });

    const { userInfo } = useSelector((state) => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';
    console.log(coordinates)
    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo, redirect, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const res = await login({ email, password, coordinates }).unwrap();

            // Assuming that the user's allowed coordinates are stored in the response from the server
            const allowedCoordinates = res.allowedCoordinates;

            // Check if the user's current coordinates match the allowed coordinates
            if (checkCoordinates(coordinates, allowedCoordinates)) {
                dispatch(setCredentials({ ...res }));
                navigate(redirect);
            } else {
                toast.error('Invalid Coordinates');
            }
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    const checkCoordinates = (userCoordinates, allowedCoordinates) => {
        return (
            userCoordinates.lat === allowedCoordinates.lat &&
            userCoordinates.lon === allowedCoordinates.lon
        );
    };

    return (
        <FormContainer>
            <h1>Sign In</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email' className='my-3'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId='password' className='my-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Button type='submit' variant='primary' className='mt-2' disabled={isLoading}>
                    Sign In
                </Button>

                {isLoading && <Loader />}
            </Form>

            <Row>
                <Col>
                    New customer?{' '}
                    <Link to={redirect ? `/register?=${redirect}` : '/register'}>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default LoginScreen;
