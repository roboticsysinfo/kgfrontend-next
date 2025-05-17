"use client"

import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { FaLeaf, FaHandshake, FaTractor, FaStore } from "react-icons/fa";

const cardData = [
  {
    icon: <FaLeaf size={40} className="text-success mb-3" />,
    title: "Fresh & Organic",
    description: "Buy seasonal fruits and vegetables directly from local farmers.",
  },
  {
    icon: <FaHandshake size={40} className="text-success mb-3" />,
    title: "No Middlemen",
    description: "Fair prices for farmers & buyers.",
  },
  {
    icon: <FaTractor size={40} className="text-success mb-3" />,
    title: "Support Local Agriculture",
    description: "Support Indian farmers and build the local economy.",
  },
  {
    icon: <FaStore size={40} className="text-success mb-3" />,
    title: "Easy Access",
    description: "Go and connect with local farmer shops.",
  },
];

const WhyKissanGrowthCards = () => {
  return (
    <Container className="my-50 mt-60">
      <h2 className="text-center text-4xl text-dark fw-bold mb-4">Why Kissan Growth?</h2>
      <Row className="g-4 mt-30">
        {cardData.map((card, index) => (
          <Col key={index} md={6} lg={3}>
            <Card className="h-100 text-center shadow-sm border-0">
              <Card.Body>
                {card.icon}
                <Card.Title className="fw-semibold h6">{card.title}</Card.Title>
                <Card.Text className="text-muted small">{card.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default WhyKissanGrowthCards;
