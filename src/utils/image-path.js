export const getImagePath = () => {
  return window.location.hostname === "localhost"
    ? "liferay-3rd-party-demo-website"
    : ".";
};
