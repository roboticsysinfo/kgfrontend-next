"use client"
import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomerById, updateCustomer } from "@/redux/slices/customerSlice";
import axiosInstance from "@/utils/axiosInstance";

const MyProfile = () => {

    const dispatch = useDispatch();
    const { customer, loading } = useSelector((state) => state.customer);

    const [statesAndCities, setStatesAndCities] = useState({});
    const [districts, setDistricts] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        address: "",
        state: "",
        city: "",
        profileImage: "https://avatar.iran.liara.run/public/boy",
    });

    const user = JSON.parse(localStorage.getItem("user"));
    const customerId = user?.id;

    // Fetch customer details
    useEffect(() => {
        dispatch(fetchCustomerById(customerId));
    }, [dispatch, customerId]);

    // Populate form with fetched customer data
    useEffect(() => {

        if (customer) {
            setFormData({
                name: customer.name || "",
                email: customer.email || "",
                phoneNumber: customer.phoneNumber || "",
                address: customer.address || "",
                state: customer.state || "",
                city: customer.city || "",
                profileImage: customer.profileImage || "https://avatar.iran.liara.run/public/boy",
            });

            if (customer.state && statesAndCities[customer.state]) {
                setDistricts(statesAndCities[customer.state]);
            }
        }

    }, [customer, statesAndCities]);

    // Fetch states and cities
    useEffect(() => {
        const fetchStatesAndCities = async () => {
            try {
                const response = await axiosInstance.get("/states-cities");
                const transformedData = response.data.reduce((acc, item) => {
                    acc[item.state] = item.districts;
                    return acc;
                }, {});
                setStatesAndCities(transformedData);
            } catch (error) {
                toast.error("Error fetching states and cities.");
            }
        };
        fetchStatesAndCities();
    }, []);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle state change
    const handleStateChange = (e) => {
        const selectedState = e.target.value;
        setFormData({ ...formData, state: selectedState, city: "" });
        setDistricts(statesAndCities[selectedState] || []);
    };

    // Handle profile image upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setFormData({ ...formData, profileImage: imageUrl });
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateCustomer({ customerId, customerData: formData }))
            .unwrap()
            .then(() => {
                toast.success("Profile updated successfully!");
            })
            .catch((error) => {
                toast.error(error || "Failed to update profile");
            });
    };

    return (
        <Card className="p-40">

            <h4 className="mb-4 text-start">My Profile</h4>

            <div className="d-flex justify-content-center mb-30">
                <img
                    src={formData.profileImage}
                    alt="Profile"
                    className="rounded-circle border"
                    style={{ width: "120px", height: "120px", objectFit: "cover" }}
                />
            </div>

            <Form onSubmit={handleSubmit} encType="multipart/form-data">
                <Form.Group controlId="name" className="mb-30">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
                </Form.Group>

                <Row>
                    <Col md={6}>
                        <Form.Group controlId="email" className="mb-30">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} disabled />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="phoneNumber" className="mb-30">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} maxLength={10} />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group controlId="address" className="mb-30">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} />
                </Form.Group>

                <Row>
                    <Col md={6}>
                        <Form.Group controlId="state" className="mb-30">
                            <Form.Label>State</Form.Label>
                            <Form.Select name="state" value={formData.state} onChange={handleStateChange}>
                                <option value="">Select State</option>
                                {Object.keys(statesAndCities).map((stateName) => (
                                    <option key={stateName} value={stateName}>{stateName}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="city" className="mb-30">
                            <Form.Label>City</Form.Label>
                            <Form.Select name="city" value={formData.city} onChange={handleChange} disabled={!formData.state}>
                                <option value="">Select City</option>
                                {districts.map((city) => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group controlId="profileImage" className="mb-30">
                    <Form.Label>Profile Picture</Form.Label>
                    <Form.Control type="file" onChange={handleImageUpload} />
                </Form.Group>

                <Button variant="success" type="submit" className="w-100" disabled={loading}>
                    {loading ? "Updating..." : "Update Profile"}
                </Button>
            </Form>
        </Card>
    );
};

export default MyProfile;
