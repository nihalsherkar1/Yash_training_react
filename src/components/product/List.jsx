import React from "react";

const List = ({ productList, handleDelete }) => {
  return (
    <div>
      {productList.length > 0 ? (
        <div className=" table-responsive     ">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Product name</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Description</th>
                <th scope="col">Date</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {productList.map((product, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{product.productName}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>
                    {product.description.length > 40
                      ? product.description.substring(0, 35) + "..."
                      : product.description}
                  </td>
                  <td>{product.date}</td>
                  <td>
                    <div>
                      <button className="btn btn-primary mx-2">Update</button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h2 className="text-center">No products found</h2>
      )}
    </div>
  );
};

export default List;
