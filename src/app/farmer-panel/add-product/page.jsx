"use client"
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, resetAddProductState } from "@/redux/slices/productSlice";
import { fetchCategories } from "@/redux/slices/categorySlice"; // Assuming you have this slice
import { toast } from "react-hot-toast";


const AddProduct = ({ isEdit, productData }) => {

  const dispatch = useDispatch();
  const { addProductStatus, addProductError } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories); // Get categories from category slice

  const [product, setProduct] = useState(
    productData || {
      name: "",
      season: "",
      price_per_unit: "",
      quantity: "",
      unit: "",
      description: "",
      harvest_date: "",
      product_image: null,
      category_id: "",
    }
  );

  // Fetch categories when component mounts
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);


  useEffect(() => {
    if (addProductStatus === "succeeded") {
      toast.success("Product added successfully!");
      dispatch(resetAddProductState());
      setProduct({
        name: "",
        season: "",
        price_per_unit: "",
        quantity: "",
        unit: "",
        description: "",
        harvest_date: "",
        product_image: null,
        category_id: "",
        sub_category_id: "",
      });
    } else if (addProductStatus === "failed") {
      toast.error(addProductError || "Failed to add product");
      dispatch(resetAddProductState());
    }
  }, [addProductStatus, addProductError, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProduct({ ...product, product_image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in product) {
      formData.append(key, product[key]);
    }
    dispatch(addProduct(formData));
  };

  return (

    <div className="container">
      <form className="p-40" onSubmit={handleSubmit} encType="multipart/form-data">
        <h3>{isEdit ? "Edit Product" : "Add Product"}</h3>

        <hr></hr>

        <div className="row">

          <div className="form-group mb-30">

            <label>Name</label>
            <input
              className="form-control"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
            />

          </div>

        </div>

        <div className="row">
          <div className="col-lg-4 col-xs-12 col-sm-12">

            <div className="form-group mb-30">

              <label>Season</label>
              <input
                className="form-control"
                name="season"
                value={product.season}
                onChange={handleChange}
                required
              />

            </div>

          </div>

          <div className="col-lg-4 col-xs-12 col-sm-12">

            <div className="form-group mb-30">

              <label>Price per Unit</label>
              <input
                className="form-control"
                name="price_per_unit"
                type="number"
                value={product.price_per_unit}
                onChange={handleChange}
                required
              />

            </div>

          </div>

          <div className="col-lg-4 col-xs-12">

            <label>Quantity</label>
            <input
              className="form-control"
              name="quantity"
              type="number"
              value={product.quantity}
              onChange={handleChange}
              required
            />

          </div>

        </div>


        <div className="row">

          <div className="col-lg-4 col-xs-12 col-sm-12">

            <div className="form-group mb-30">

              <label>Unit</label>
              <select
                className="form-control"
                name="unit"
                value={product.unit}
                onChange={handleChange}
                required
              >
                <option value="">Select Unit</option>
                <option value="quintal">quintal</option>
                <option value="kg">kg</option>
                <option value="liters">liters</option>
                <option value="tons">tons</option>
                <option value="pieces">pieces</option>
              </select>

            </div>

          </div>

          <div className="col-lg-4 col-xs-12 col-sm-12">


            <div className="form-group">

              <label>Category</label>
              <select
                className="form-control"
                name="category_id"
                value={product.category_id}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {categories && categories.length > 0 ? (
                  categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))
                ) : (
                  <option disabled>No categories available</option>
                )}
              </select>

            </div>

          </div>

          <div className="col-lg-4 col-xs-12 col-sm-12">

            <div className="form-group mb-30">

              <label>Harvest Date</label>
              <input
                className="form-control"
                name="harvest_date"
                type="date"
                value={product.harvest_date}
                onChange={handleChange}
                required
              />

            </div>

          </div>

        </div>


        <div className="form-group mb-30">


          <label>Description</label>
          <textarea
            className="form-control"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />

        </div>

        <div className="form-group mb-30">

          <label>Product Image</label>
          <input
            className="form-control"
            name="product_image"
            type="file"
            onChange={handleImageChange}
            required
          />

        </div>

        <button className="btn btn-main d-inline-flex align-items-center rounded-pill gap-8 mt-24" type="submit" disabled={addProductStatus === "loading"}>Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
