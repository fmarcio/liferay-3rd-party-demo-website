import React, { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import ClayLoadingIndicator from "@clayui/loading-indicator";
import { useFetchRecommendations, useFetchUser } from "../hooks/useFetch";
import Header from "../components/Header";
import { documentTitle } from "../utils/constants";
import { useQuery } from "../hooks/useQuery";
import { startAnalyticsScript } from "../utils/analytics-script";

const HomePage = () => {
  const { items, loading } = useFetchRecommendations();
  const [filteredItems, setFilteredItems] = useState([]);
  const [filteredValue, setFilteredValue] = useState("");

  const userId = useQuery("userId");
  const { item: user, loading: loadingUser } = useFetchUser(userId);

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
    if (!loadingUser && !loading) {
      document.title = documentTitle;

      startAnalyticsScript(user);
    }
  }, [loadingUser, loading, user]);

  return (
    <div>
      <Header
        userName={user?.name}
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

                  return (
                    <div className="col-lg-4 col-md-12" key={id}>
                      <ItemCard
                        description={
                          subtitleField?.contentFieldValue?.data ||
                          "No subtitle available"
                        }
                        id={id}
                        title={title}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <p>No recommendations available for you</p>
          ))}
      </div>
    </div>
  );
};

export default HomePage;
