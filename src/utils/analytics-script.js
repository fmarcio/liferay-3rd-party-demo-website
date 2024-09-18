import { getUserIdFromLocalStorage, setUserIdOnLocalStorage } from "./storage";

export function startAnalyticsScript(user, callback) {
  function init(u, c, a, m, o, l) {
    o = "script";
    l = document;
    a = l.createElement(o);
    m = l.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = u;
    a.onload = c;
    m.parentNode.insertBefore(a, m);
  }

  init("https://analytics-js-cdn.liferay.com/", function () {
    const previousUserId = getUserIdFromLocalStorage();

    window.Analytics.create({
      channelId: "702973878624560374",
      dataSourceId: "705569161019186100",
      endpointUrl: "https://osbasahpublisher-ac-internal.lfr.cloud",
      projectId: "asah0e05354c91a540b99810cc8a42f8e7ad",
    });

    if (user && previousUserId !== String(user?.id)) {
      setUserIdOnLocalStorage(user.id);

      window.Analytics.setIdentity({
        email: user?.emailAddress,
        name: user?.name,
      });
    }

    window.Analytics.send("pageViewed", "Page");

    callback && callback();
  });
}
