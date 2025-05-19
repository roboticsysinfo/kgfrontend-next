"use client"
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import api from '@/utils/api';
import ReCAPTCHA from 'react-google-recaptcha';
import { useRouter } from 'next/navigation';
import Link from "next/link"
import Cookies from 'js-cookie'; 

const FarmerLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [captchaValue, setCaptchaValue] = useState(null);
    const router = useRouter();

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!captchaValue) {
            toast.error("Please Complete CAPTCHA");
            setLoading(false);
            return;
        }

        try {
            const response = await api.post('/farmer/login', { email, password, captchaValue });

            if (!response.data.farmer || !response.data.farmer.id) {
                throw new Error("Farmer data is missing in response");
            }

            // Use cookies instead of localStorage
            Cookies.set('token', response.data.token, { expires: 7 });          // expires in 7 days
            Cookies.set('userRole', 'farmer', { expires: 7 });
            Cookies.set('farmerId', response.data.farmer.id, { expires: 7 });
            Cookies.set('farmerName', response.data.farmer.name, { expires: 7 });

            toast.success('Login successful! Redirecting...');
            router.push('/farmer-panel/farmer-dashboard');
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='container-fluid ps-0'>
            <div className='row'>
                <div className='col-lg-7 col-xs-12 col-sm-12'>
                    <img src='/assets/images/bg/bg-banner-kg.jpg' style={styles.register_img} alt='Kisaan Growth' />
                </div>

                <div className='col-lg-5 col-xs-12 col-sm-12'>
                    <div className='form_container'>
                        <h4 className="text-start mb-4">
                            Farmer Login – Access Your KissanGrowth Account
                        </h4>
                        <p className='text-muted small'>Log in to manage your shop, view your orders, and explore farming tools</p>
                        <hr />
                        <Form onSubmit={handleLogin}>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <div className="mb-30">
                                <ReCAPTCHA
                                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                                    onChange={handleCaptchaChange}
                                />
                            </div>

                            <Button variant="success" className='btn btn-block w-100 mt-20' type="submit" block disabled={loading}>
                                {loading ? 'Logging in...' : 'Login'}
                            </Button>

                            <Form.Group>
                                <p className='p'>Don't have an account? <Link className='a' href="/farmer/register">Register Here</Link></p>
                            </Form.Group>
                        </Form>
                    </div>
                </div>
            </div>

            <Link href="/" className="go-back-btn" >
                ← Go Back to Website
            </Link>
        </div>
    );
};

const styles = {
    register_img: {
        width: "100%",
        height: "100vh",
    },
};

export default FarmerLogin;
