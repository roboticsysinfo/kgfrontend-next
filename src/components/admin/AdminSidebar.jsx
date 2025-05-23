"use client"
import Link from "next/link";
import React from "react";
import { Nav } from "react-bootstrap";

const AdminSidebar = () => {
  return (
    <div className="bg-light vh-100 p-3" style={{ width: "250px" }}>
      <h5 className="mb-20">Navigation</h5>
      <Nav defaultActiveKey="/admin" className="flex-column">
        <Link className="admin-accordion-button  nav-link" href="/admin">Dashboard</Link>

        <Link className="admin-accordion-button  nav-link" href="/admin/categories-list">Categories</Link>

        <Link className="admin-accordion-button  nav-link" href="/admin/customers">Customers</Link>

        <Link className="admin-accordion-button  nav-link" href="/admin/farmers">Farmers List</Link>

        <Link className="admin-accordion-button  nav-link" href="/admin/kyc-requests">KYC Requests</Link>

        <Link className="admin-accordion-button  nav-link" href="/admin/users">Users</Link>

        <Link className="admin-accordion-button  nav-link" href="/admin/help-support-tickets">Farmer Help & Supports</Link>

        <Link className="admin-accordion-button  nav-link" href="/admin/customer-help-support">Customer Help & Supports</Link>

        <Link className="admin-accordion-button  nav-link" href="/admin/order-requests">Order Requests</Link>

        <div className="accordion" id="blogAccordion">

          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse4">
                Plans & Points Transactions
              </button>
            </h2>
            <div id="collapse4" className="accordion-collapse collapse" data-bs-parent="#blogAccordion">
              <div className="accordion-body">
                <Link className="btn-link text-info nav-link" href="/admin/farmer-plans-history">Farmer Plans</Link>
                <Link className="btn-link text-dark nav-link" href="/admin/farmer-points-table">Farmer Points</Link>
                <Link className="btn-link text-dark nav-link" href="/admin/customer-points-table">Customer Points</Link>
              </div>
            </div>
          </div>

        </div>


        <div className="accordion" id="blogAccordion">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                Blogs
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#blogAccordion">
              <div className="accordion-body">
                <Link className="btn-link text-info nav-link" href="/admin/blog-categories">Blog Categories</Link>
                <Link className="btn-link text-dark nav-link" href="/admin/add-blog">Add Blog</Link>
                <Link className="btn-link text-dark nav-link" href="/admin/blogs-list">Blogs List</Link>
              </div>
            </div>
          </div>

        </div>

        <div className="accordion" id="RPAccordion">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                Redeem Products
              </button>
            </h2>
            <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#RPAccordion">
              <div className="accordion-body">
                <Link className="btn-link text-dark nav-link" href="/admin/farmers-redeem-history">Farmers Redeem History</Link>
                <Link className="btn-link text-dark nav-link" href="/admin/add-redeem-products">Add Farmer Products</Link>
                <Link className="btn-link text-dark nav-link" href="/admin/redeem-products-list">Farmer Products List</Link>

                <hr />
                <Link className="btn-link text-dark nav-link" href="/admin/customers-redeem-history">Customers Redeem History</Link>
                <Link className="btn-link text-dark nav-link" href="/admin/add-customer-products">Add Customer Products</Link>
                <Link className="btn-link text-dark nav-link" href="/admin/customer-products-list">Customer Products List</Link>

              </div>
            </div>
          </div>

        </div>


        <div className="accordion" id="headingThree">

          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree">
                Referral Points Table
              </button>
            </h2>
            <div id="collapseThree" className="accordion-collapse " data-bs-parent="#headingThree">
              <div className="accordion-body">
                <Link className="btn-link text-dark nav-link" href="/admin/farmer-points-table">Farmer's Points</Link>
                <Link className="btn-link text-dark nav-link" href="/admin/customer-points-table">Customer's Points</Link>
              </div>
            </div>
          </div>

        </div>


        <Link className="admin-accordion-button  nav-link" href="/admin/settings">Site Settings</Link>

        <Link className="admin-accordion-button  nav-link" href="/admin/messages-list">Admin Messages</Link>

        <Link className="admin-accordion-button  nav-link" href="/admin/farming-tips">Farming Tips</Link>

      </Nav>
    </div>
  );
};

export default AdminSidebar;
