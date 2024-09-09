import React from "react";
import ClayCard from "@clayui/card";
import ClayIcon from "@clayui/icon";
import { Link } from "react-router-dom";
import { url } from "../utils/constants";
import { Text } from "@clayui/core";
import { useQuery } from "../hooks/useQuery";

const ItemCard = ({ description, id, image, title }) => {
  const userId = useQuery("userId");

  return (
    <ClayCard displayType={image ? "image" : "file"}>
      {!image && (
        <ClayCard.AspectRatio className="card-item-first">
          <div className="aspect-ratio-item aspect-ratio-item-center-middle aspect-ratio-item-fluid card-type-asset-icon">
            <ClayIcon symbol="web-content" />
          </div>
        </ClayCard.AspectRatio>
      )}

      {image && (
        <ClayCard.AspectRatio className="card-item-first">
          <img
            alt="thumbnail"
            className="aspect-ratio-item aspect-ratio-item-center-middle aspect-ratio-item-fluid"
            src={url + image}
          />
        </ClayCard.AspectRatio>
      )}

      <ClayCard.Body>
        <ClayCard.Description displayType="title">
          <Text size={5}>{title}</Text>
        </ClayCard.Description>

        <ClayCard.Description truncate displayType="text">
          <Text size={3}>{description}</Text>
        </ClayCard.Description>

        <ClayCard.Description displayType="text">
          <Link to={`/details?userId=${userId}&contentId=${id}`}>
            Read more
          </Link>
        </ClayCard.Description>
      </ClayCard.Body>
    </ClayCard>
  );
};

export default ItemCard;
