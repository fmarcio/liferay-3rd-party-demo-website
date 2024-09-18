import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useFetchRecommendationItem, useFetchUser } from "../hooks/useFetch";
import ClayLoadingIndicator from "@clayui/loading-indicator";
import { documentTitle, url } from "../utils/constants";
import Header from "../components/Header";
import { useQuery } from "../hooks/useQuery";
import { startAnalyticsScript } from "../utils/analytics-script";

const DetailsPage = () => {
  const { item, loading: loadingItem } = useFetchRecommendationItem();
  const userId = useQuery("userId");
  const imageField = item?.contentFields?.find(({ label }) => label === "Image")
    ?.contentFieldValue?.image?.contentUrl;

  const content = item?.contentFields?.find(({ label }) => label === "Content")
    ?.contentFieldValue?.data;

  const { item: user, loading: loadingUser } = useFetchUser(userId);

  useEffect(() => {
    document.title = `${documentTitle} - ${item?.title}`;

    if (!loadingUser && !loadingItem) {
      startAnalyticsScript(user);
    }
  }, [loadingUser, user, item?.title, loadingItem]);

  function formatContent(content, url) {
    const regex = /src=["']([^"']+)["']/;

    const match = content?.match(regex);

    if (match && match[1]) {
      const resultString = content.replace(match[0], `src="${url}${match[1]}"`);

      return resultString;
    } else {
      return content;
    }
  }

  return (
    <>
      <Header showFilter={false} userName={user?.name} />

      <div className="content pb-4">
        {!loadingItem ? (
          <>
            <div
              data-analytics-asset-id={item.id}
              data-analytics-asset-title={item.title}
              data-analytics-asset-type="web-content"
            >
              {imageField && (
                <div className="content-full__image">
                  <img src={url + imageField} alt="content" />
                </div>
              )}

              <div className="container pt-4">
                <div className="row">
                  <div className="col col-12">
                    <h1 className="mb-4">{item.title}</h1>

                    <div
                      dangerouslySetInnerHTML={{
                        __html: formatContent(content, url),
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="container">
              <div className="row">
                <div className="col col-12">
                  <Link to={`/home?userId=${userId}`}>Back to home</Link>
                </div>
              </div>
            </div>
          </>
        ) : (
          <ClayLoadingIndicator
            displayType="secondary"
            size="md"
            className="mt-4"
          />
        )}
      </div>
    </>
  );
};

export default DetailsPage;
