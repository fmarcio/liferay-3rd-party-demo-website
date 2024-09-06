import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from "react";

const RecommendationsContext = createContext();

export const RecommendationsProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const params = new URLSearchParams(window.location.search);
  const user = params.get("user");

  useEffect(() => {
    const fetchUserRecommendations = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `https://webserver-lctgvrnmnt-prd.lfr.cloud/o/headless-delivery/v1.0/sites/46872/content-set-providers/by-key/com.liferay.analytics.machine.learning.internal.recommendation.info.collection.provider.UserContentRecommendationInfoItemCollectionProvider/content-set-elements`,
          {
            headers: {
              Authorization: `Basic ${btoa(
                `${user}:thisisanalmostunguessablebutanywayunimportantpassword`
              )}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();

          const itemsContent = data.items.map((item) => item.content);

          setItems(itemsContent);

          console.log("Recommendations:", data);
          console.log("items content:", itemsContent);
        } else {
          console.error("Request error");
        }
      } catch (error) {
        console.log("ERROR: " + error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRecommendations();
  }, []);

  return (
    <RecommendationsContext.Provider value={{ items, loading }}>
      {children}
    </RecommendationsContext.Provider>
  );
};

export const useRecommendations = () => useContext(RecommendationsContext);
