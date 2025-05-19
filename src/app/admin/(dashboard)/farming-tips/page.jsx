"use client"
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchFarmerTips,
  deleteFarmingTip,
  updateFarmingTip,
  createFarmingTip,
  clearTipMessages
} from '@/redux/slices/farmingTipsSlice';
import { Modal, Button, Form } from 'react-bootstrap';
import toast from 'react-hot-toast';

const Page = () => {

  const dispatch = useDispatch();
  const { tips, loading, error, successMessage } = useSelector((state) => state.farmingTips);

  const [selectedTip, setSelectedTip] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [addModal, setAddModal] = useState(false);

  const [editData, setEditData] = useState({ title: '', youtubeLink: '' });
  const [addData, setAddData] = useState({ title: '', youtubeLink: '' });

  useEffect(() => {
    dispatch(fetchFarmerTips());
  }, [dispatch]);

  useEffect(() => {
    if (successMessage) toast.success(successMessage);
    if (error) toast.error(error);
    dispatch(clearTipMessages());
  }, [successMessage, error, dispatch]);

  const handleEditClick = (tip) => {
    setSelectedTip(tip);
    setEditData({ title: tip.title, youtubeLink: tip.youtubeLink });
    setEditModal(true);
  };

  const handleUpdate = () => {
    dispatch(updateFarmingTip({ id: selectedTip._id, tipData: editData }));
    setEditModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this tip?')) {
      dispatch(deleteFarmingTip(id));
    }
  };

  const handleAdd = () => {
    dispatch(createFarmingTip(addData));
    setAddModal(false);
    setAddData({ title: '', youtubeLink: '' });
  };

  const columns = [
    { name: 'Title', selector: (row) => row.title, sortable: true },
    {
      name: 'YouTube Link',
      selector: (row) => row.youtubeLink,
      wrap: true,
      cell: (row) => (
        <a href={row.youtubeLink} target="_blank" rel="noopener noreferrer">
          Watch Video
        </a>
      ),
    },
    {
      name: 'Actions',
      cell: (row) => (
        <>
          <Button variant="warning" size="sm" onClick={() => handleEditClick(row)} className="me-2">
            Edit
          </Button>
          <Button variant="danger" size="sm" onClick={() => handleDelete(row._id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h4>Farming Tips</h4>
        <Button variant="success" onClick={() => setAddModal(true)}>Add Tip</Button>
      </div>

      <hr />

      <DataTable
        columns={columns}
        data={tips}
        progressPending={loading}
        pagination
        highlightOnHover
        responsive
        persistTableHead
      />

      {/* Edit Modal */}
      <Modal show={editModal} onHide={() => setEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Farming Tip</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={editData.title}
                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="editYoutubeLink" className="mt-3">
              <Form.Label>YouTube Link</Form.Label>
              <Form.Control
                type="text"
                value={editData.youtubeLink}
                onChange={(e) => setEditData({ ...editData, youtubeLink: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Modal */}
      <Modal show={addModal} onHide={() => setAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Farming Tip</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="addTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={addData.title}
                onChange={(e) => setAddData({ ...addData, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="addYoutubeLink" className="mt-3">
              <Form.Label>YouTube Link</Form.Label>
              <Form.Control
                type="text"
                value={addData.youtubeLink}
                onChange={(e) => setAddData({ ...addData, youtubeLink: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setAddModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAdd}>
            Add Tip
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Page;
