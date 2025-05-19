import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { getAllHelpSupport, deleteHelpSupport } from "../../redux/slices/customerHelpSupportSlice";
import { Spinner } from "react-bootstrap";
import { Button } from "react-bootstrap";

const CustomerHelpSupport = () => {
  const dispatch = useDispatch();
  const { supports, loading } = useSelector((state) => state.customerHelpSupport);

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    dispatch(getAllHelpSupport());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      dispatch(deleteHelpSupport(id));
    }
  };

  const filteredTickets = supports.filter((ticket) =>
    ticket.name.toLowerCase().includes(searchText.toLowerCase()) ||
    ticket.email.toLowerCase().includes(searchText.toLowerCase()) ||
    ticket.subject.toLowerCase().includes(searchText.toLowerCase()) ||
    ticket.message.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      name: "Customer Id",
      selector: (row) => row.customer,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.phoneNumber,
    },
    {
      name: "Subject",
      selector: (row) => row.subject,
      sortable: true,
    },
    {
      name: "Message",
      selector: (row) => row.message,
      wrap: true,
    },
    {
      name: "Date",
      selector: (row) => new Date(row.createdAt).toLocaleString(),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <Button variant="danger" size="sm" onClick={() => handleDelete(row._id)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Customer Help & Support</h2>

      <input
        type="text"
        placeholder="Search by name, email, subject, or message"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="form-control"
      />

      <hr />

      <DataTable
        columns={columns}
        data={filteredTickets}
        progressPending={loading}
        pagination
        highlightOnHover
        responsive
        striped
        noHeader
      />
    </div>
  );
};

export default CustomerHelpSupport;
