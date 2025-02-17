import React, { useCallback, useEffect, useState } from "react";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import "../../css/module.css";

const List = React.memo(({ productList, handleDelete, handleUpdate }) => {
  // const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 5;

  // // calculate total pages
  // const totalPages = Math.ceil(productList.length / itemsPerPage);

  // //Get Products for the current page
  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentProducts = productList.slice(indexOfFirstItem, indexOfLastItem);

  // const handlePageChange = useCallback((pageNumber) => {
  //   setCurrentPage(pageNumber);
  // });

  return (
    <div>
      {productList.length > 0 ? (
        <div className="table-wrapper">
          <div className=" table-responsive  table-content   ">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Product name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Description</th>
                  <th scope="col">Date</th>
                  <th scope="col">Category</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {productList.map((product, index) => (
                  <tr key={index}>
                    <th scope="row">{product.productId}</th>
                    <td>{product.productName}</td>
                    <td>{product.price}</td>
                    <td>{product.quantity}</td>
                    <td>
                      {product.description.length > 40
                        ? product.description.substring(0, 35) + "..."
                        : product.description}
                    </td>
                    <td>{product.date}</td>
                    <td>{product.category ? product.category : "-"}</td>
                    <td>
                      <div>
                        <Button
                          handleClick={handleUpdate}
                          index={index}
                          label={<FontAwesomeIcon icon={faPenToSquare} />}
                          variant="btn-primary mx-2"
                        />
                        <Button
                          handleClick={handleDelete}
                          index={index}
                          label={<FontAwesomeIcon icon={faTrashCan} />}
                          variant="btn-danger"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            {/* <div className="d-flex justify-content-center mt-3">
              <nav>
                <ul className="pagination    ">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      Previous
                    </button>
                  </li>
                  {[...Array(totalPages)].map((_, i) => (
                    <li
                      key={i}
                      className={`page-item ${
                        currentPage === i + 1 ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(i + 1)}
                      >
                        {i + 1}
                      </button>
                    </li>
                  ))}
                  <li
                    className={`page-item ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div> */}
          </div>
        </div>
      ) : (
        <h2 className="text-center">No products found</h2>
      )}
    </div>
  );
});

export default List;
