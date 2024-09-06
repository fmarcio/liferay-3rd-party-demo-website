export const getUserId = () => {
  const params = new URLSearchParams(window.location.search);
  const user = params.get("userId");

  return user;
};

export const getContentId = () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("contentId");

  return id;
};
