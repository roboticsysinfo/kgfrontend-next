
"use client"
import React, { useState } from 'react';
import { Container, Button, Modal, Form, Row, Col } from 'react-bootstrap';
import DataTable from 'react-data-table-component';

const DeliveryPreferencePage = () => {

    // Sample initial data, replace with actual API data if necessary
    const [deliveryPreferences, setDeliveryPreferences] = useState([
        {
            farmerId: 'Farmer123',
            deliveryMethod: 'Self Pickup',
            deliveryRange: '30 km',
            additionalNotes: 'Available for pickup every weekend',
        },
    ]);


    const [showModal, setShowModal] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [deliveryMethod, setDeliveryMethod] = useState('');
    const [deliveryRange, setDeliveryRange] = useState('');
    const [additionalNotes, setAdditionalNotes] = useState('');


    const handleShowModal = (index = null) => {
        if (index !== null) {
            const deliveryPreference = deliveryPreferences[index];
            setEditIndex(index);
            setDeliveryMethod(deliveryPreference.deliveryMethod);
            setDeliveryRange(deliveryPreference.deliveryRange);
            setAdditionalNotes(deliveryPreference.additionalNotes);
        } else {
            // Reset form for adding new entry
            setEditIndex(null);
            setDeliveryMethod('');
            setDeliveryRange('');
            setAdditionalNotes('');
        }
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newDeliveryPreference = {
            farmerId: `Farmer${Math.floor(Math.random() * 1000)}`, // Just an example, replace with JWT or other logic
            deliveryMethod,
            deliveryRange,
            additionalNotes,
        };

        if (editIndex !== null) {
            const updatedPreferences = [...deliveryPreferences];
            updatedPreferences[editIndex] = newDeliveryPreference;
            setDeliveryPreferences(updatedPreferences);
        } else {
            setDeliveryPreferences([...deliveryPreferences, newDeliveryPreference]);
        }

        handleCloseModal();
    };

    const handleDelete = (index) => {
        const updatedPreferences = deliveryPreferences.filter((_, i) => i !== index);
        setDeliveryPreferences(updatedPreferences);
    };

    const columns = [
        {
            name: 'Farmer ID',
            selector: row => row.farmerId,
            sortable: true,
        },
        {
            name: 'Delivery Method',
            selector: row => row.deliveryMethod,
            sortable: true,
        },
        {
            name: 'Delivery Range',
            selector: row => row.deliveryRange,
            sortable: true,
        },
        {
            name: 'Additional Notes',
            selector: row => row.additionalNotes,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: (row, index) => (
                <div>
                    <Button
                        size="sm"
                        className="btn btn-sm btn-main d-inline-flex align-items-center rounded-pill gap-20 mr-2"
                        onClick={() => handleShowModal(index)}
                    >
                        Edit
                    </Button>
                    <Button
                    size='sm'
                        className='btn btn-danger d-inline-flex align-items-center rounded-pill gap-20 '
                        onClick={() => handleDelete(index)}
                    >
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <Container className="mt-5">

            <div className='row mt-20 align-items-center'>
                <div className='col-lg-6 col-xs-12 col-sm-12'>
                    <h3>Delivery Preferences</h3>
                </div>
                <div className='col-lg-6 col-xs-12 col-sm-12 text-end'>
                    <Button className='btn btn-main d-inline-flex align-items-center float-right rounded-pill gap-20 ' onClick={() => handleShowModal()}>
                        Add Delivery Preference
                    </Button>
                </div>
            </div>

            <hr />

            {/* Data Table */}
            <DataTable
                columns={columns}
                data={deliveryPreferences}
                pagination
                highlightOnHover
                striped
                responsive
            />

            {/* Modal for Add or Edit */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{editIndex !== null ? 'Edit Delivery Preference' : 'Add Delivery Preference'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group controlId="farmerId">
                                    <Form.Label>Farmer ID (Auto-Generated)</Form.Label>
                                    <Form.Control type="text" value={`Farmer123`} disabled />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group controlId="deliveryMethod">
                                    <Form.Label>Delivery Method</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={deliveryMethod}
                                        onChange={(e) => setDeliveryMethod(e.target.value)}
                                        required
                                    >
                                        <option value="">Select Method</option>
                                        <option value="self-pickup">Self Pickup</option>
                                        <option value="delivery-by-farmer">Delivery by Farmer</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group controlId="deliveryRange">
                                    <Form.Label>Delivery Range (in km)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={deliveryRange}
                                        onChange={(e) => setDeliveryRange(e.target.value)}
                                        required
                                        placeholder="Enter Delivery Range"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={12}>
                                <Form.Group controlId="additionalNotes">
                                    <Form.Label>Additional Notes</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        value={additionalNotes}
                                        onChange={(e) => setAdditionalNotes(e.target.value)}
                                        placeholder="Enter any additional notes"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Button className='btn btn-main d-inline-flex align-items-center rounded-pill gap-20' type="submit">
                            {editIndex !== null ? 'Update Preference' : 'Add Preference'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default DeliveryPreferencePage;
