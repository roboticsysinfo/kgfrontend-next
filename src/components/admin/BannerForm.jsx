"use client"
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBanners, addBanner, updateBanner, deleteBanner } from "@/redux/slices/bannersSlice";
import { fetchCategories } from "@/redux/slices/categorySlice";
import { Modal, Button } from "react-bootstrap";
import Resizer from "react-image-file-resizer";

const BannerForm = () => {
    const dispatch = useDispatch();
    const { banners, status } = useSelector((state) => state.banners);
    const { categories } = useSelector((state) => state.categories);

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [banner_image, setBannerImage] = useState(null);
    const [editBannerId, setEditBannerId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        dispatch(fetchBanners());
        dispatch(fetchCategories());
    }, [dispatch]);

    const resetForm = () => {
        setTitle("");
        setCategory("");
        setBannerImage(null);
        setEditBannerId(null);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            Resizer.imageFileResizer(
                file,
                800, // max width
                400, // max height
                "PNG",
                80, // quality
                0, // rotation
                (uri) => {
                    const resizedFile = new File([uri], file.name, { type: "image/PNG" });
                    setBannerImage(resizedFile);
                },
                "blob"
            );
        } catch (err) {
            console.error("Image resizing failed:", err);
        }
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("category", category);

        if (!banner_image) {
            alert("⚠ Banner image is required!");
            return;
        }
        formData.append("banner_image", banner_image);

        await dispatch(addBanner(formData));
        resetForm();
    };

    const handleEdit = (banner) => {
        setTitle(banner.title);
        setCategory(banner.category);
        setEditBannerId(banner._id);
        setShowModal(true);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("category", category);

        if (banner_image) {
            formData.append("banner_image", banner_image);
        }

        await dispatch(updateBanner({ bannerId: editBannerId, bannerData: formData }));
        setShowModal(false);
        resetForm();
    };

    const handleDelete = (bannerId) => {
        if (window.confirm("Are you sure you want to delete this banner?")) {
            dispatch(deleteBanner(bannerId));
        }
    };

    return (
        <div className="p-40 border border-rounded">
            <h2 className="text-xl">Upload Banner</h2>
            <hr />
            <form onSubmit={handleAddSubmit} encType="multipart/form-data">
                <div className="form-group mb-30">
                    <label>Title:</label>
                    <input className="form-control" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="form-group mb-30">
                    <label>Category:</label>
                    <select className="form-control" value={category} onChange={(e) => setCategory(e.target.value)} required>
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group mb-30">
                    <label>Banner Image:</label>
                    <input className="form-control" type="file" onChange={handleFileChange} />
                </div>
                <button className="btn btn-primary" type="submit">Add Banner</button>
            </form>

            <hr />
            <h3 className="mt-40">Existing Banners</h3>
            <hr />
            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Banner Title</th>
                            <th>Banner Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {status === "loading" ? (
                            <tr><td colSpan="3">Loading...</td></tr>
                        ) : (
                            banners.map((banner) => (
                                <tr key={banner._id}>
                                    <td>{banner.title}</td>
                                    <td>
                                        <img src={`${process.env.REACT_APP_BASE_URL_SECONDARY}${banner.banner_image}`} alt={banner.title} width="100" />
                                    </td>
                                    <td>
                                        <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(banner)}>Edit</button>
                                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(banner._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Edit Banner Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Banner</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleEditSubmit} encType="multipart/form-data">
                    <Modal.Body>
                        <div className="form-group mb-3">
                            <label>Title:</label>
                            <input className="form-control" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                        </div>
                        <div className="form-group mb-3">
                            <label>Category:</label>
                            <select className="form-control" value={category} onChange={(e) => setCategory(e.target.value)} required>
                                <option value="">Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group mb-3">
                            <label>Banner Image:</label>
                            <input className="form-control" type="file" onChange={handleFileChange} />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                        <Button variant="primary" type="submit">Update Banner</Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
};

export default BannerForm;
