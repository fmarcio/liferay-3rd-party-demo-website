const RECOMMENDATIONS_KEY = "LIFERAY_CITY_RECOMMENDATIONS_KEY";
const USERS_KEY = "LIFERAY_CITY_USERS_KEY";
const USER_ID_KEY = "LIFERAY_CITY_USER_ID_KEY";

export const setRecommendationsOnLocalStorage = (userId, items) => {
  localStorage.setItem(
    `${RECOMMENDATIONS_KEY}_${userId}`,
    JSON.stringify(items)
  );
};

export const getRecommendationsFromLocalStorage = (userId) => {
  const recommendations = localStorage.getItem(
    `${RECOMMENDATIONS_KEY}_${userId}`
  );

  return recommendations ? JSON.parse(recommendations) : null;
};

export const setUsersOnLocalStorage = (items) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(items));
};

export const getUsersFromLocalStorage = () => {
  const users = localStorage.getItem(USERS_KEY);

  return users ? JSON.parse(users) : null;
};

export const setUserIdOnLocalStorage = (userId) => {
  localStorage.setItem(USER_ID_KEY, userId);
};

export const getUserIdFromLocalStorage = () => {
  const userId = localStorage.getItem(USER_ID_KEY);

  return userId;
};
