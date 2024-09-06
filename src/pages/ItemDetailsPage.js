import React from "react";
import { useRecommendations } from "../contexts/RecommendationsContext";
import { Link } from "react-router-dom";

const ItemDetailsPage = () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const user = params.get("user");

  const { items } = useRecommendations();

  return (
    <div>
      <h1>{"jjjj"}</h1>
      {"minha id: "} {id}
      <Link to={`/home?user=${user}`}>Back to recommendations</Link>
    </div>
  );
};

export default ItemDetailsPage;
