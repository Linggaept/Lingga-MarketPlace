/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import React from "react";

const Card = ({ card }) => {
  return (
    <div className="max-w-80 h-96 bg-gray-400 mb-3 rounded-lg overflow-hidden">
      <Link to={`/product/${card.id}`}>
        <img
          src={card.image}
          alt={card.title}
          className="w-full h-60 object-cover rounded-t-lg"
        />
        <div className="">
          <h1 className="text-lg h-10 overflow-hidden text-left p-2 font-bold">
            {card.title}
          </h1>
          <p className="text-left p-2">${card.price}</p>
          <p className="text-left p-2 overflow-hidden h-14">
            {card.description}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
