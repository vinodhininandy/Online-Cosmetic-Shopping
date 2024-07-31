import React, { useState, useEffect } from "react";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const AddOrEditProduct = (props) => {
  const initialFieldValues = {
    Name: "",
    Product: "",
    Price: "",
    Color: "",
    Quantity: "",
  };

  var [values, setValues] = useState(initialFieldValues);
  var [id, setId] = useState("");

  const handleInputChange = (e) => {
    var { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    props.addOrEdit(values);
  };
  const getData = async () => {
    const taskDocRef = doc(db, "Product", props.currentId);
    const docSnap = await getDoc(taskDocRef);
    console.log(docSnap.data(), ";docSnap");
    setValues(docSnap.data().obj);
  };

  if (props.currentId !== id) {
    setId(props.currentId);
    getData();
  }

  return (
    <form autoComplete="off" onSubmit={handleFormSubmit}>


      
      <div className="col-12 col-md-12">
        <div className="card">
          <div className="card-header">
            <input
              value={
                props.currentId === ""
                  ? "Add Product Info"
                  : "Update Product Info"
              }
            />
          </div>
          <div className="card-body">
            <div className="center-form">
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label className="col-form-label">
                      Brand Name<span className="mandatoryFieldColor">*</span>
                    </label>
                    <input
                      value={values.Name}
                      onChange={handleInputChange}
                      type="text"
                      className="form-control"
                      name="Name"
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label className="col-form-label">
                      Product<span className="mandatoryFieldColor">*</span>
                    </label>
                    <input
                      value={values.Product}
                      onChange={handleInputChange}
                      type="text"
                      className="form-control"
                      name="Product"
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label className="col-form-label">
                      Color<span className="mandatoryFieldColor">*</span>
                    </label>
                    <div>
          <label>
            <input
              type="radio"
              value="White"
              checked={values.Color === 'White'}
              onChange={handleInputChange}
              name="Color"
            />
            White
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="Black"
              checked={values.Color === 'Black'}
              onChange={handleInputChange}
              name="Color"
            />
            Black
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="Red"
              checked={values.Color === 'Red'}
              onChange={handleInputChange}
              name="Color"
            />
            Red
          </label>
        </div>
        {/* Add more radio button options for other countries */}
                  </div>
                </div>
              
                
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label className="col-form-label">
                      Price<span className="mandatoryFieldColor">*</span>
                    </label>
                    <input
                      value={values.Price}
                      onChange={handleInputChange}
                      type="text"
                      className="form-control"
                      name="Price"
                    />
                  </div>
                </div>



                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label className="col-form-label">
                      Quantity<span className="mandatoryFieldColor">*</span>
                    </label>
                    <select
          value={values.Quantity}
          onChange={handleInputChange}
          className="form-control"
          name="Quantity"
        >
          <option value="">Quantity</option>
          <option value="1 ">1</option>
          <option value="5">5</option>
          <option value="10">10</option>
          
        </select>
                  </div>
                </div>


                
                <div className="col-12 col-md-12">
                  <div className="btn-group mb-3 mt-2 cmn-btn-grp">
                    <input
                      type="submit"
                      value={props.currentId === "" ? "Save" : "Update"}
                      className="btn btn-success btn-block"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddOrEditProduct;
