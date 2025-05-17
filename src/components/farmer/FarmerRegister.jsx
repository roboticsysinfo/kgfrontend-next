"use client"
import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import toast from 'react-hot-toast';
import api from '@/utils/api';
import ReCAPTCHA from "react-google-recaptcha";
import Link from "next/link";
import {useRouter} from "next/navigation";

const FarmerRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [village, setVillage] = useState('');
  const [aadharCard, setAadharCard] = useState('');
  const [uploadAadharCard, setUploadAadharCard] = useState('');
  const [profileImg, setProfileImg] = useState('');
  const [loading, setLoading] = useState(false);

  // Location-related states
  const [statesCities, setStatesCities] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [districts, setDistricts] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [agreed, setAgreed] = useState(false);

  const [captchaValue, setCaptchaValue] = useState(null); // ✅ Captcha state


  const router = useRouter();

  useEffect(() => {

    const fetchStatesCities = async () => {
      try {
        const response = await api.get('/states-cities');
        setStatesCities(response.data);
      } catch (error) {
        toast.error('Failed to fetch states and districts');
      }
    };

    fetchStatesCities();

  }, []);

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    const matched = statesCities.find((item) => item.state === state);
    setDistricts(matched?.districts || []);
    setSelectedCity('');
  };


  const handleCaptchaChange = (value) => {
    setCaptchaValue(value); // ✅ Set captcha response
  };


  const handleRegister = async (e) => {
    e.preventDefault();

    if (!captchaValue) {
      toast.error("Please Complete CAPTCHA");
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('phoneNumber', phoneNumber);
    formData.append('address', address);
    formData.append('village', village);
    formData.append('aadharCard', aadharCard);
    formData.append('uploadAadharCard', uploadAadharCard);
    formData.append('profileImg', profileImg); // ✅ Added
    formData.append('state', selectedState);
    formData.append('city_district', selectedCity);
    formData.append('agreedToPrivacyPolicyAndTermsAndConditions', agreed);
    formData.append('agreementTimestamp', new Date().toISOString());
    formData.append('captchaValue', captchaValue);


    setLoading(true);
    try {
      const response = await api.post('/farmer/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success(response.data.message);
      router.push('/farmer/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };


  return (

    <>



      <div className='container-fluid ps-0'>
        <div className='row'>
          <div className='col-lg-7 col-xs-12 col-sm-12'>
            <img src='/assets/images/bg/bg-banner-kg.jpg' style={styles.register_img} alt='Kisaan Growth' />
          </div>

          <div className='col-lg-5 col-xs-12 col-sm-12'>
            <div className='form_container'>
              <h4 className="text-start mb-4">Register as a Farmer </h4>
              <p className='text-muted small'>
                Sign up for free to create your farmers shop and placing orders
              </p>
              <hr />

              <Form onSubmit={handleRegister} encType="multipart/form-data">
                <Form.Group className="my-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="my-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="my-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="my-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    maxLength={10}
                    required
                  />
                </Form.Group>

                <Form.Group className="my-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </Form.Group>


                <div className='row mb-20'>

                  <div className='col-lg-6 col-xs-12 col-sm-12'>

                    <Form.Group className="my-3">
                      <Form.Label>State</Form.Label>
                      <Form.Select value={selectedState} onChange={handleStateChange} required>
                        <option value="">Select State</option>
                        {statesCities.map((state) => (
                          <option key={state._id} value={state.state}>{state.state}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>

                  </div>

                  <div className='col-lg-6 col-xs-12 col-sm-12'>

                    <Form.Group className="my-3">
                      <Form.Label>City/District</Form.Label>
                      <Form.Select
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        required
                        disabled={!districts.length}
                      >
                        <option value="">Select District</option>
                        {districts.map((district, idx) => (
                          <option key={idx} value={district}>{district}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>

                  </div>

                </div>


                <Form.Group className="my-3">
                  <Form.Label>Village (Optional)</Form.Label>
                  <Form.Control
                    type="text"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                  />
                </Form.Group>


                <div className='row'>
                  <div className='col-lg-6 col-xs-12 col-sm-12'>
                    <Form.Group className="my-3">
                      <Form.Label>Aadhar Card Number</Form.Label>
                      <Form.Control
                        type="text"
                        value={aadharCard}
                        onChange={(e) => setAadharCard(e.target.value)}
                        maxLength={12}
                        required
                      />
                    </Form.Group>
                  </div>
                  <div className='col-lg-6 col-xs-12 col-sm-12'>
                    <Form.Group className="my-3">
                      <Form.Label>Upload Aadhar Card</Form.Label>
                      <Form.Control
                        type="file"
                        onChange={(e) => setUploadAadharCard(e.target.files[0])}
                        required
                      />
                    </Form.Group>
                  </div>
                </div>

                <Form.Group className="my-3">
                  <Form.Label>Upload Profile Image</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => setProfileImg(e.target.files[0])}
                    required
                  />
                </Form.Group>

                {/* ✅ reCAPTCHA Box */}
                <div className="mb-24">
                  <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} // ✅ Correct way
                    onChange={handleCaptchaChange}
                  />
                </div>


                <Form.Group className="my-3">
                  <Form.Check
                    type="checkbox"
                    label={
                      <>
                        I agree to the <Link href="/terms-and-conditions" target="_blank">Terms & Conditions</Link> and <Link href="/privacy-policy" target="_blank">Privacy Policy</Link>.
                      </>
                    }
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    required
                  />
                </Form.Group>


                <Button variant="success" className='w-100' type="submit" disabled={loading}>
                  {loading ? 'Registering...' : 'Register as Farmer'}
                </Button>


                <div className="my-4 text-center">
                  <p>Already have an account? <Link href="/farmer/login">Login</Link></p>
                </div>
              </Form>
            </div>
          </div>

        </div>

        <Link href="/" className="go-back-btn" >
          ← Go Back to Website
        </Link>


      </div>

    </>


  );
};

const styles = {
  register_img: {
    width: "100%",
    height: "100%",
  },

};

export default FarmerRegister;
