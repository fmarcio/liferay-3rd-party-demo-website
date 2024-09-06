import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRecommendations } from "../contexts/RecommendationsContext";
import ItemCard from "../components/ItemCard";
import ClayAlert from "@clayui/alert";
import ClayLoadingIndicator from "@clayui/loading-indicator";

const Home = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const user = params.get("user");

  const { items, loading } = useRecommendations();

  console.log("ITEMS:", items);

  return (
    <div>
      <h1>Home</h1>
      <div>
        <h2>Recommendations:</h2>

        {loading && (
          <>
            <ClayLoadingIndicator displayType="secondary" size="md" />
          </>
        )}

        {items ? (
          <div className="container">
            <div className="row">
              {items.map(({ contentFields, id, title }) => {
                const subtitleField = contentFields?.find(
                  (field) => field.label === "Subtitle"
                );

                const imageField = contentFields?.find(
                  (field) => field.label === "Image"
                );

                return (
                  <div className="col-4" key={id}>
                    <ItemCard
                      description={
                        subtitleField?.contentFieldValue?.data ||
                        "No subtitle available"
                      }
                      id={id}
                      image={imageField?.contentFieldValue?.image?.contentUrl}
                      title={title}
                      user={user}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          // <ClayAlert displayType="danger" title="Danger" role={null}>
          //   No recommendations available
          // </ClayAlert>

          <p>No recommendations available</p>
        )}
      </div>
    </div>
  );
};

export default Home;
