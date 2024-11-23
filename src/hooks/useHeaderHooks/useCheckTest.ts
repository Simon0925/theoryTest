import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const useCheckTest = (currentTestInProgress: boolean) => {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [pendingPath, setPendingPath] = useState("");

  const checkTest = useCallback(
    (path: string, event: React.MouseEvent<HTMLAnchorElement>) => {
      if (currentTestInProgress) {
        event.preventDefault();
        setPendingPath(path);
        setModalVisible(true);
      } else {
        navigate(path);
      }
    },
    [currentTestInProgress, navigate]
  );

  return { modalVisible, setModalVisible, pendingPath, checkTest };
};
