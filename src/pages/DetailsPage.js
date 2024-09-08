import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useFetchRecommendationItem, useFetchUser } from "../hooks/useFetch";
import { getUserId } from "../utils/url";
import ClayLoadingIndicator from "@clayui/loading-indicator";
import { url } from "../utils/constants";
import Header from "../components/Header";
import Footer from "../components/Footer";

const DetailsPage = () => {
  const { item, loading } = useFetchRecommendationItem();
  const userId = getUserId();
  const imageField = item?.contentFields?.find(({ label }) => label === "Image")
    ?.contentFieldValue?.image?.contentUrl;

  const content = item?.contentFields?.find(({ label }) => label === "Content")
    ?.contentFieldValue?.data;

  const { item: user } = useFetchUser(userId);

  useEffect(() => {
    if (window.Analytics && !loading) {
      window.Analytics.setIdentity({
        email: user?.emailAddress,
        name: user?.name,
      });

      window.Analytics.track("recommendationContentViewed", {
        title: item?.title,
        id: item?.id,
      });

      window.Analytics.send("pageViewed", "Page");
    }
  }, [item?.id, item?.title, loading, user?.emailAddress, user?.name]);

  return (
    <div>
      <Header showFilter={false} userName={user?.name} />

      <div className="content pb-4">
        {!loading ? (
          <>
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
                      __html: content,
                    }}
                  />
                </div>
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

      <Footer />
    </div>
  );
};

export default DetailsPage;
