import { useEffect, useState } from "react";
import { getContentId, getUserId } from "../utils/url";

export const useFetchRecommendations = () => {
  const userId = getUserId();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { loading: loadingUser, item } = useFetchUser(userId);

  useEffect(() => {
    const fetchRecommentation = async () => {
      try {
        const response = await fetch(
          `https://webserver-lctgvrnmnt-prd.lfr.cloud/o/headless-delivery/v1.0/sites/46872/content-set-providers/by-key/com.liferay.analytics.machine.learning.internal.recommendation.info.collection.provider.UserContentRecommendationInfoItemCollectionProvider/content-set-elements`,
          {
            headers: {
              Authorization: `Basic ${btoa(
                `${item.alternateName}:thisisanalmostunguessablebutanywayunimportantpassword`
              )}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();

          const itemsContent = data.items.map((item) => item.content);

          setItems(itemsContent);
          setLoading(false);
        } else {
          setItems([]);
          setLoading(false);

          throw new Error();
        }
      } catch (error) {
        console.log("ERROR: " + error);
      }
    };

    if (!loadingUser) {
      fetchRecommentation();
    }
  }, [item, loadingUser]);

  return { items, loading };
};

export const useFetchRecommendationItem = () => {
  const contentId = getContentId();
  const { items, loading } = useFetchRecommendations();

  return {
    item: items.find(({ id }) => contentId === String(id)),
    loading: loading,
  };
};

export const useFetchUsers = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `https://webserver-lctgvrnmnt-prd.lfr.cloud/o/headless-admin-user/v1.0/user-accounts?search=ac`,
          {
            headers: {
              Authorization:
                "Basic YWMxOnRoaXNpc2FuYWxtb3N0dW5ndWVzc2FibGVidXRhbnl3YXl1bmltcG9ydGFudHBhc3N3b3Jk",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();

          setItems(data.items);
          setLoading(false);
        } else {
          setLoading(false);

          throw new Error();
        }
      } catch (error) {
        console.log("ERROR: " + error);
      }
    };

    fetchUsers();
  }, []);

  return {
    items,
    loading,
  };
};

export const useFetchUser = (userId) => {
  const { items, loading } = useFetchUsers();

  return { loading, item: items.find(({ id }) => String(id) === userId) };
};
