import React, { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import ClayLoadingIndicator from "@clayui/loading-indicator";
import { useFetchRecommendations, useFetchUser } from "../hooks/useFetch";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getUserId } from "../utils/url";

const Home = () => {
  const { items, loading } = useFetchRecommendations();
  const [filteredItems, setFilteredItems] = useState([]);
  const [filteredValue, setFilteredValue] = useState("");

  const userId = getUserId();
  const { item, loading: loadingUser } = useFetchUser(userId);

  useEffect(() => {
    setFilteredItems(
      filteredValue
        ? items.filter(({ title }) =>
            title.toLowerCase().includes(filteredValue)
          )
        : items
    );
  }, [filteredValue, items]);

  useEffect(() => {
    if (window.Analytics && !loadingUser) {
      window.Analytics.setIdentity({
        email: item?.emailAddress,
        name: item?.name,
      });

      window.Analytics.send("pageViewed", "Page");
    }
  }, [item?.emailAddress, item?.name, loadingUser]);

  return (
    <div>
      <Header
        userName={item?.name}
        onChange={({ target: { value } }) => setFilteredValue(value)}
        value={filteredValue}
      />

      <div className="content py-4">
        {loading && (
          <>
            <ClayLoadingIndicator displayType="secondary" size="md" />
          </>
        )}

        {!loading &&
          (items.length ? (
            <div className="container">
              <div className="row">
                {filteredItems.map(({ contentFields, id, title }) => {
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
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <p>No recommendations available</p>
          ))}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
