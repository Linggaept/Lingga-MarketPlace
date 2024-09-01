import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
const DetailProduct = () => {
  document.title = "Product";

  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((json) => {
        setProduct(json);
        setLoading(false);
      })
      .catch(() => setLoading(!loading));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {loading && <Loading />}
      <div className={loading ? "hidden" : "container mx-auto p-4"}>
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-96 object-cover mt-4"
        />
        <p className="mt-4 text-lg">${product.price}</p>
        <p className="mt-4">{product.description}</p>
      </div>
    </div>
  );
};

export default DetailProduct;
