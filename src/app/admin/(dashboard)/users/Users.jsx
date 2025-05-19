// src/components/Users.js
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdmins, createAdmin, deleteAdmin } from "../../../redux/slices/adminSlice";
import toast from "react-hot-toast";
import { Button } from "react-bootstrap";

const Users = () => {
  const dispatch = useDispatch();
  const { admins, status, error } = useSelector((state) => state.admins);

  const [showModal, setShowModal] = useState(false);
  const [adminData, setAdminData] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAdmins());
    }
  }, [dispatch, status]);

  const handleInputChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const handleCreateAdmin = async () => {
    try {
      await dispatch(createAdmin(adminData)).unwrap();
      toast.success("Admin created successfully!");
      setShowModal(false);
      setAdminData({ name: "", email: "", password: "" });
    } catch (error) {
      toast.error(error || "Failed to create admin");
    }
  };

  const handleDeleteAdmin = async (id) => {
    try {
      await dispatch(deleteAdmin(id)).unwrap();
      toast.success("Admin deleted successfully!");
    } catch (error) {
      toast.error(error || "Failed to delete admin");
    }
  };

  const columns = [
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Email", selector: (row) => row.email, sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <button
            className="btn btn-success btn-sm me-2"
            onClick={() => console.log("Edit Admin", row._id)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDeleteAdmin(row._id)}
          >
            Delete
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="container mt-5">

      <div className="row align-items-center mt-20">
        <div className="col-lg-6 col-xs-12 col-sm-12">
          <h3>Admin Users List</h3>
        </div>

        <div className="col-lg-6 col-xs-12 col-sm-12 text-end">
          <Button variant="success" className="mb-3" onClick={() => setShowModal(true)}>
            Add User
          </Button>
        </div>

      </div>

      <hr />

      {error && <div className="alert alert-danger">{error}</div>}
      <DataTable
        columns={columns}
        data={admins}
        progressPending={status === "loading"}
        pagination
      />

      {showModal && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create Admin</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Name"
                  name="name"
                  value={adminData.name}
                  onChange={handleInputChange}
                />
                <input
                  type="email"
                  className="form-control mb-2"
                  placeholder="Email"
                  name="email"
                  value={adminData.email}
                  onChange={handleInputChange}
                />
                <input
                  type="password"
                  className="form-control mb-2"
                  placeholder="Password"
                  name="password"
                  value={adminData.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleCreateAdmin}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
