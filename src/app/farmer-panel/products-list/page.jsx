"use client"; // Mark as Client Component

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductByFarmerId, deleteProduct } from "@/redux/slices/productSlice";
import DataTable from "react-data-table-component";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { Button, Spinner } from "react-bootstrap";

const ProductsList = () => {
  const dispatch = useDispatch();
  const { productByFarmer, fetchProductByFarmerStatus } = useSelector((state) => state.products);

  const [farmerId, setFarmerId] = useState(null);

  // Get farmer ID from localStorage after component mounts (client-side)
  useEffect(() => {
    const storedId = localStorage.getItem("farmerId");
    if (storedId) {
      setFarmerId(storedId);
    }
  }, []);

  // Fetch products after farmerId is set
  useEffect(() => {
    if (farmerId) {
      dispatch(getProductByFarmerId(farmerId));
    }
  }, [farmerId, dispatch]);

  const handleDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(productId));
    }
  };

  const columns = [
    {
      name: "Image",
      selector: (row) => <img src={row.product_image} alt={row.name} width="50" height="50" />,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category_id?.name || "Unknown",
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => `₹${row.price_per_unit}`,
      sortable: true,
    },
    {
      name: "Qty",
      selector: (row) => row.quantity,
      sortable: true,
    },
    {
      name: "Unit",
      selector: (row) => row.unit || "N/A",
      sortable: true,
    },
    {
      name: "Harvest",
      selector: (row) => new Date(row.harvest_date).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <Button variant="warning" className="me-2">
            <FaEdit />
          </Button>
          <Button variant="danger" onClick={() => handleDelete(row._id)}>
            <FaRegTrashAlt />
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="container mt-4">
      <h3 className="mb-3">My Products</h3>

      {fetchProductByFarmerStatus === "loading" ? (
        <div className="d-flex justify-content-center">
          <Spinner variant="success" />
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={Array.isArray(productByFarmer) ? productByFarmer : []}
          pagination
          highlightOnHover
        />
      )}
    </div>
  );
};

export default ProductsList;
