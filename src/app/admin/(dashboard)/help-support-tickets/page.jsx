"use client"
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { fetchHelpSupportTickets } from "@/redux/slices/adminSlice"; // adjust path

const HelpSupportQuery = () => {

  const dispatch = useDispatch();
  const { supportTickets, status } = useSelector((state) => state.admins);

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    dispatch(fetchHelpSupportTickets());
  }, [dispatch]);


  const filteredTickets = supportTickets.filter((ticket) =>
    ticket.name.toLowerCase().includes(searchText.toLowerCase()) ||
    ticket.email.toLowerCase().includes(searchText.toLowerCase()) ||
    ticket.subject.toLowerCase().includes(searchText.toLowerCase()) ||
    ticket.message.toLowerCase().includes(searchText.toLowerCase())
  );


  const columns = [
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
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Help & Support Tickets</h2>

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
        progressPending={status === "loading"}
        pagination
        highlightOnHover
        responsive
        striped
        noHeader
      />
    </div>
  );
};

export default HelpSupportQuery;
