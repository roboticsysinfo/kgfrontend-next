'use client';

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { FaShare, FaDownload } from "react-icons/fa";
import { fetchCustomerReferralDetails } from "@/redux/slices/customerSlice";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useParams } from "next/navigation"; // ✅ useParams import

const Page = () => {
  const dispatch = useDispatch();
  const params = useParams(); // ✅
  const id = params?.id; // ✅ /customer/referral-details/[id]

  const { referralDetails, loading, error } = useSelector((state) => state.customer);

  useEffect(() => {
    if (id) {
      dispatch(fetchCustomerReferralDetails(id));
    }
  }, [id]);

  const referredColumns = [
    {
      name: "ID",
      selector: (row) => row?._id || "N/A",
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row?.name || "N/A",
      sortable: true,
    },
    {
      name: "Referral Code",
      selector: (row) => row?.referralCode || "N/A",
      sortable: true,
    },
  ];

  return (
    <Container className="py-4">
      <h4 className="text-capitalize mb-3">Farmer's Referral Details</h4>
      <hr />

      <Row className="mb-4">
        <Col lg={4}>
          <Card className="shadow p-3">
            <h6>Referral Shares</h6>
            <p style={{ color: "#00A859", fontSize: 24 }}>
              <FaShare /> &ensp; <strong>{referralDetails?.referralShares ?? "N/A"}</strong>
            </p>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="shadow p-3">
            <h6>Referral Downloads</h6>
            <p style={{ color: "#00A859", fontSize: 24 }}>
              <FaDownload /> &ensp; <strong>{referralDetails?.referralDownloads ?? "N/A"}</strong>
            </p>
          </Card>
        </Col>
      </Row>

      <hr />
      <h5>Referral Download Customers</h5>

      {referralDetails?.referredCustomer?.length > 0 ? (
        <DataTable
          columns={referredColumns}
          data={referralDetails.referredCustomer}
          pagination
          responsive
        />
      ) : (
        <p>No referred farmers yet.</p>
      )}
    </Container>
  );
};

export default Page;
