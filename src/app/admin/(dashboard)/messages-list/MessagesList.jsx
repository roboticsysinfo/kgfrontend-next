import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { Modal, Button, Form } from "react-bootstrap";
import {
  fetchAdminMessages,
  createAdminMessage,
  updateAdminMessage,
  deleteAdminMessage,
} from "../../../redux/slices/adminMessageSlice";

const MessagesList = () => {
  const dispatch = useDispatch();
  const { messages, status } = useSelector((state) => state.adminMessages);

  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add' or 'edit'
  const [formData, setFormData] = useState({ title: "", message: "", type: "farmer" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(fetchAdminMessages());
  }, [dispatch]);

  const filteredMessages = messages.filter((msg) =>
    (msg.title?.toLowerCase().includes(searchText.toLowerCase()) ||
     msg.message?.toLowerCase().includes(searchText.toLowerCase()))
  );

  const handleOpenAdd = () => {
    setModalMode("add");
    setFormData({ title: "", message: "", type: "farmer" });
    setShowModal(true);
  };

  const handleOpenEdit = (row) => {
    setModalMode("edit");
    setEditId(row._id);
    setFormData({ title: row.title, message: row.message, type: row.type || "farmer" });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      dispatch(deleteAdminMessage(id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalMode === "add") {
      dispatch(createAdminMessage(formData));
    } else {
      dispatch(updateAdminMessage({ id: editId, data: formData }));
    }
    setShowModal(false);
  };

  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Message",
      selector: (row) => row.message,
      wrap: true,
    },
    {
      name: "Type",
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => new Date(row.createdAt).toLocaleString(),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <Button size="sm" variant="warning" onClick={() => handleOpenEdit(row)} className="me-2">
            Edit
          </Button>
          <Button size="sm" variant="danger" onClick={() => handleDelete(row._id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Admin Messages</h2>

      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          placeholder="Search by title or message"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="form-control w-50"
        />

        <Button variant="success" onClick={handleOpenAdd}>
          Add New Message
        </Button>
      </div>

      <hr />

      <DataTable
        columns={columns}
        data={filteredMessages}
        progressPending={status === "loading"}
        pagination
        highlightOnHover
        responsive
        striped
        noHeader
      />

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalMode === "add" ? "Add New Message" : "Edit Message"}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select
                value={formData.type}
                required
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="farmer">Farmer</option>
                <option value="customer">Customer</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="success" type="submit">
              {modalMode === "add" ? "Add" : "Update"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default MessagesList;
