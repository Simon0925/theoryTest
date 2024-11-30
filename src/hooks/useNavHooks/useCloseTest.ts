import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetStateAll, setTestInactive } from "../../store/currentData/currentData.slice";

export const useCloseTest = (setModalVisible: React.Dispatch<React.SetStateAction<boolean>>, pendingPath: string) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return useCallback(() => {
    setModalVisible(false);
    dispatch(resetStateAll());
    dispatch(setTestInactive(false));
    navigate(pendingPath);
  }, [dispatch, navigate, setModalVisible, pendingPath]);
};
