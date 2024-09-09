import { useLocation } from "react-router-dom";

export const useQuery = (param) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const value = queryParams.get(param);

  return value;
};
