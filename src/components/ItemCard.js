import React from "react";
import ClayCard from "@clayui/card";
import ClayIcon from "@clayui/icon";
import ClayLink from "@clayui/link";
import { Link, useLocation } from "react-router-dom";

const ItemCard = ({ description, id, image, title, user }) => {
  const url = "https://webserver-lctgvrnmnt-prd.lfr.cloud";

  return (
    <ClayCard displayType={image ? "image" : "file"}>
      {!image && (
        <ClayCard.AspectRatio className="card-item-first">
          <div className="aspect-ratio-item aspect-ratio-item-center-middle aspect-ratio-item-fluid card-type-asset-icon">
            <ClayIcon symbol="documents-and-media" />
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
          <Link to={`/details?user=${user}&id=${id}`}>{title}</Link>
        </ClayCard.Description>

        <ClayCard.Description truncate displayType="text">
          {description}
        </ClayCard.Description>
      </ClayCard.Body>
    </ClayCard>
  );
};

export default ItemCard;
