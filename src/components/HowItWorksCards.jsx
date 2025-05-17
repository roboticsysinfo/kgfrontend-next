"use client"
import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaSeedling, FaUserFriends } from "react-icons/fa";

const HowItWorksCards = () => {


  return (
    <Container className="my-60">
      <h2 className="text-center text-4xl text-dark fw-bold mb-4">How Does It Work?</h2>

      <Row className="g-4 mt-30">
        {/* For Farmers */}
        <Col md={6}>
          <Card className="h-100 shadow-sm border-0">
            <Card.Body>
              <div className="d-flex align-items-center mb-3">
                <FaSeedling size={28} className="text-success me-2" />
                <Card.Title className="mb-0 text-success fw-semibold">For Farmers</Card.Title>
              </div>
              <ul className="ps-3 text-muted small">
                <li>Open your online farm shop and feature your farm produce—such as vegetables, crops, dairy, and more.</li>
                <li>Gain exposure with thousands of local farmers and ensure that your produce lands in the hands of people concerned about fresh and organic farming.</li>
                <li>Enjoy reasonable prices, skipping middlemen who cut your profits short.</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>

        {/* For Consumers */}
        <Col md={6}>
          <Card className="h-100 shadow-sm border-0">
            <Card.Body>
              <div className="d-flex align-items-center mb-3">
                <FaUserFriends size={28} className="text-success me-2" />
                <Card.Title className="mb-0 text-success fw-semibold">For Consumers</Card.Title>
              </div>
              <ul className="ps-3 text-muted small">
                <li>Find and buy organic farm products directly from local farmer shops.</li>
                <li>Connect with local farmer shops and savor farm-fresh food delivered at the most affordable prices.</li>
                <li>Support sustainable agriculture and join the Indian farm revolution.</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};



export default HowItWorksCards;
