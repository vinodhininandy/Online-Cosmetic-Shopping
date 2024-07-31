import React, { useState, useEffect } from "react";
import { collection, query, onSnapshot, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import AddOrEditStudent from "./addEditStudent";

const StudentInfo = () => {
  const [currentId, setCurrentId] = useState("");
  const [studentObjects, setStudentObjects] = useState([]);
  const [sortAscending, setSortAscending] = useState(true); // State to toggle between ascending and descending

  const [filterValue, setFilterValue] = useState(""); // State for filter value
  const [uniqueCountries, setUniqueCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(5); // Number of students per page

  const getData = () => {
    const q = query(collection(db, "Product"));
    onSnapshot(q, (QuerySnapshot) => {
      let tes = [];
      QuerySnapshot.forEach((doc) => {
        let test = {
          id: doc.id,
          Name: doc.data().obj.Name,
          Product: doc.data().obj.Product,
          Price: doc.data().obj.Price,
          Color: doc.data().obj.Color,
          Quantity: doc.data().obj.Quantity,
        };
        tes.push(test);
      });
      setStudentObjects(tes);
    });
  };



  

  useEffect(() => {
    getData();
  }, []);
  const addOrEdit = async (obj) => {
    if (currentId === "") {
      try {
        await addDoc(collection(db, "Product"), {
          obj,
          completed: false,
        });
      } catch (err) {
        alert(err);
      }
    } else {
      const taskDocRef = doc(db, "Product", currentId);
      try {
        await updateDoc(taskDocRef, { obj });
      } catch (err) {
        alert(err);
      }
    }
  };




  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "Product"));
      const snapshot = await onSnapshot(q, (QuerySnapshot) => {
        let tes = [];
        QuerySnapshot.forEach((doc) => {
          let test = {
            id: doc.id,
            Name: doc.data().obj.Name,
          Product: doc.data().obj.Product,
          Price: doc.data().obj.Price,
          Color: doc.data().obj.Color,
          Quantity: doc.data().obj.Quantity,
          };
          tes.push(test);
        });
        setStudentObjects(tes);
      });
    };

    fetchData();
  }, []);

  useEffect(() => {
    const countries = [...new Set(studentObjects.map((student) => student.Color))];
    setUniqueCountries(countries);
  }, [studentObjects]);

  const handleFilterValueChange = (e) => {
    setCurrentPage(1); // Reset to first page when a filter value changes
    setFilterValue(e.target.value);
  };

  const filteredStudents = studentObjects.filter((student) => {
    if (filterValue === "") {
      return true; // Show all students if no country is selected
    } else {
      return student.Color.toLowerCase() === filterValue.toLowerCase();
    }
  });

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSort = (key) => {
    const sorted = [...filteredStudents];
    sorted.sort((a, b) => {
      if (sortAscending) {
        return a[key] > b[key] ? 1 : -1;
      } else {
        return b[key] > a[key] ? 1 : -1;
      }
    });

    setSortAscending(!sortAscending);
    setStudentObjects(sorted);
  };

  const sortIcon = sortAscending ? "▲" : "▼";
  const onDelete = async (id) => {
    if (window.confirm("Are you sure to delete this record?")) {
      const taskDocRef = doc(db, "Product", id);
      try {
        await deleteDoc(taskDocRef);
        getData();
      } catch (err) {
        alert(err);
      }
    }
  };
  return (
    <div className="card">
      <div className="card-body pb-0">
        <div className="card">
          <div className="card-header main-search dash-search">
            <h3>Product Information Details</h3>
          </div>
        </div>

        <div className="row">
          <AddOrEditStudent {...{ currentId, studentObjects, addOrEdit }}></AddOrEditStudent>
          <div className="col-12 col-md-12">
            <div className="card">
              <div className="card-header">Product Management</div>
              <div className="filter-section">
                <label>Filter by Color: </label>
                <select value={filterValue} onChange={handleFilterValueChange}>
                  <option value="">All</option>
                  {uniqueCountries.map((Color, index) => (
                    <option key={index} value={Color}>
                      {Color}
                    </option>
                  ))}
                </select>
              </div>
              <div className="card-body position-relative">
                <div className="table-responsive cnstr-record product-tbl">
                  <table className="table table-bordered heading-hvr">
                    <thead>
                      <tr>
                        <th className="active" onClick={() => handleSort("Name")}>
                          Name {sortIcon}
                        </th>
                        <th onClick={() => handleSort("Product")}>
                          Product {sortIcon}
                        </th>
                        <th onClick={() => handleSort("Price")}>
                          Price {sortIcon}
                        </th>
                        <th onClick={() => handleSort("Color")}>
                          Color {sortIcon}
                        </th>
                        <th onClick={() => handleSort("Quantity")}>
                          Quantity {sortIcon}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentStudents.map((student) => (
                        <tr key={student.id}>
                          <td>{student.Name}</td>
                          <td>{student.Product}</td>
                          <td>{student.Price}</td>
                          <td>{student.Color}</td>
                          <td>{student.Quantity}</td>
                          <td className="case-record">
                            <button
                              type="button"
                              className="btn btn-info"
                              onClick={() => {
                                setCurrentId(student.id);
                              }}
                            >
                              Edit
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() => {
                                onDelete(student.id);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Pagination */}
                <div className="pagination">
                  <ul>
                    {Array.from({ length: Math.ceil(filteredStudents.length / studentsPerPage) }).map((_, index) => (
                      <li key={index}>
                        <button onClick={() => paginate(index + 1)}>{index + 1}</button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentInfo;
