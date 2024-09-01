import { useState, useEffect } from "react";
import Card from "../components/CardCategories.jsx";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading.jsx";

const Category = () => {
  const { category } = useParams();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/category/${category}`)
      .then((res) => res.json())
      .then((json) => {
        setCards(json);
        setLoading(false);
      })
      .catch(() => setLoading(!loading));
  }, [category]);

  document.title = "Category";

  return (
    <>
      <h1>Category {category}</h1>

    {loading && <Loading />}
      <div className="mx-auto p-10 grid gap-4 grid-cols-4">
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </>
  );
};

export default Category;
