"use client"
import React from "react";
import { Nav } from "react-bootstrap";
import  Link from 'next/link'
import { Accordion } from 'react-bootstrap'

const FarmerSidevbar
  = () => {
    return (

      <>

        <div className="bg-light vh-100 p-3" style={{ width: "250px" }}>
          <h5 className="mb-4">Farmer Navigation</h5>
          <Nav defaultActiveKey="/farmer/dashboard" className="flex-column">
            <Link className="nav-link" href="dashboard">Dashboard</Link>
            <Link className="nav-link" href="customers">Customers</Link>
            <Link className="nav-link" href="orders">Orders</Link>

            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Basic Info</Accordion.Header>
                <Accordion.Body>
                  <Link className="nav-link" href="upgrade-plans">Upgrade Plans</Link>
                  <Link className="nav-link" href="delivery-preference">Delivery Prefrence</Link>

                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1">
                <Accordion.Header>My Products</Accordion.Header>
                <Accordion.Body>
                  <Link className="nav-link" href="add-product">Add New Product</Link>
                  <Link className="nav-link" href="products-list">All Products List</Link>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="2">
                <Accordion.Header>My Shop</Accordion.Header>
                <Accordion.Body>
                  <Link className="nav-link" href="add-shop">Create Shop</Link>
                  <Link className="nav-link" href="shop-details">Shop Details</Link>
                </Accordion.Body>
              </Accordion.Item>


            </Accordion>

          </Nav>
        </div>

        {/* / Menu */}
      </>


    );
  };

export default FarmerSidevbar
  ;
