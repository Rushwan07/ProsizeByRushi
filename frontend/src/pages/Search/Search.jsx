import { Link } from "react-router-dom";
import "./search.scss";
import React, { useState, useEffect } from "react";
const Search = ({ query, setQuery }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(query);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let response;

        if (query.length > 0) {
          console.log(query);
          response = await fetch("/api/cloth/search/" + query);
        }

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const json = await response.json();
        setProducts(json);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);
  console.log(products);
  return (
    <div>
      {loading ? (
        <p className="text-center mt-5">Loading...</p>
      ) : (
        <div className="cardz">
          <small className="container text-muted d-flex justify-content-end mt-5 align-items-center">
            <b>{products.length} results</b>
          </small>
          {products.length > 0 ? (
            products.map((product) => (
              <div class="car ">
                <img src={product.images[0]} alt={product.images[0]} />
                <div class="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    {/* <h5 class="card-title">{product.heading}</h5> */}
                    <Link to={"/view/" + product._id}>
                      <a onClick={() => setQuery("")} href="/">
                        {product.heading}
                      </a>
                    </Link>
                  </div>
                  <h5>Rs.{product.price}.00</h5>
                  {/* <small>{product.description}</small> */}
                </div>
                {/* <button>ADD</button> */}
              </div>
            ))
          ) : (
            <p className="text-center mt-5">No products found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;

// import React, { useState, useEffect } from "react";
// import "./search.scss";
// const Search = ({ query }) => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         let response;

//         if (query.length > 0) {
//           console.log(query);
//           response = await fetch("/api/cloth/search/" + query);
//         }

//         if (!response.ok) {
//           throw new Error("Failed to fetch products");
//         }

//         const json = await response.json();
//         setProducts(json);
//       } catch (error) {
//         console.error("Error fetching products:", error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [query]);

//   return (
//     <div>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div className="cards">
//           {products.length > 0 ? (
//             products.map((product) => (
//               <div class="card mt-5">
//                 <img src={product.images[0]} alt="..." />
//                 <div class="card-body">
//                   <div className="d-flex justify-content-between align-items-center">
//                     <h5 class="card-title">{product.heading}</h5>
//                   </div>
//                   <h5>Rs.{product.price}.00</h5>
//                   {/* <small>{product.description}</small> */}
//                 </div>
//                 <button>ADD</button>
//               </div>
//             ))
//           ) : (
//             <p>No products found</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Search;
