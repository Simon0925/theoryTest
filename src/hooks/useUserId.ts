import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const useUserId = () => {
  const userId = useSelector((state: RootState) => state.auth.userId);

  return userId;
};

export default useUserId;