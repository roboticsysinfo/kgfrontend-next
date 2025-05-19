import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../redux/slices/categorySlice";
import { Modal, Button, Form } from "react-bootstrap";

const CategoryList = () => {
  const dispatch = useDispatch();
  const { categories, status } = useSelector((state) => state.categories);
  const [showModal, setShowModal] = useState(false);
  const [categoryData, setCategoryData] = useState({ name: "", category_image: null });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setCategoryData({
      ...categoryData,
      [name]: files ? files[0] : value,
    });
  };

  const handleAddCategory = () => {
    const formData = new FormData();
    formData.append("name", categoryData.name);
    if (categoryData.category_image) {
      formData.append("category_image", categoryData.category_image);
    }

    if (isEditing) {
      dispatch(updateCategory({ id: editId, category: formData }));
    } else {
      dispatch(createCategory(formData));
    }

    setCategoryData({ name: "", category_image: null });
    setShowModal(false);
    setIsEditing(false);
    setEditId(null);
  };

  const handleEdit = (category) => {
    setCategoryData({ name: category.name, category_image: null });
    setIsEditing(true);
    setEditId(category._id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCategory(id));
    }
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Image",
      cell: (row) =>
        row.category_image ? (
          <img
            src={`${process.env.REACT_APP_BASE_URL_PRIMARY}/uploads/${row.category_image}`}
            alt={row.name}
            width="50"
          />
        ) : (
          "No Image"
        ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <Button
            variant="success"
            size="sm"
            onClick={() => handleEdit(row)}
            className="me-2"
          >
            Edit
          </Button>
          <Button variant="danger" size="sm" onClick={() => handleDelete(row._id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mt-5">

      <div className="row align-items-center mt-20">
        <div className="col-lg-6 col-xs-12 col-sm-12">
          <h3>Category List</h3>
        </div>

        <div className="col-lg-6 col-xs-12 col-sm-12 text-end">
          <Button variant="success" className="mb-3" onClick={() => setShowModal(true)}>
            Add Category
          </Button>
        </div>

      </div>

      <hr />

      <DataTable
        columns={columns}
        data={categories}
        progressPending={status === "loading"}
        pagination
      />

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Edit Category" : "Add Category"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form encType="multipart/form-data">
            <Form.Group className="mb-3">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={categoryData.name}
                onChange={handleInputChange}
                placeholder="Enter category name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category Image</Form.Label>
              <Form.Control
                type="file"
                name="category_image"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="success" onClick={handleAddCategory}>
            {isEditing ? "Update Category" : "Add Category"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CategoryList;
