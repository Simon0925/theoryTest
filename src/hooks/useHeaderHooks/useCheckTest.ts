import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateBurgerMenu } from "../../store/burgerMenu/burgerMenu.slice";

export const useCheckTest = (currentTestInProgress: boolean) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [pendingPath, setPendingPath] = useState("");

  const checkTest = useCallback(
    (path: string, event: React.MouseEvent<HTMLAnchorElement>) => {
      if (currentTestInProgress) {
        event.preventDefault();
        setPendingPath(path);
        setModalVisible(true);
        dispatch(updateBurgerMenu(false))
      } else {
        dispatch(updateBurgerMenu(false))
        navigate(path);
      }
    },
    [currentTestInProgress, navigate]
  );

  return { modalVisible, setModalVisible, pendingPath, checkTest };
};
