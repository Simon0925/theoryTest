export const toggleFlag = (
  id: string,
  flagged: boolean,
  setFlagged: (flagged: boolean) => void,
  onFlagChange: (id: string, newFlag: boolean) => void
) => {
  
  const localS = localStorage.getItem("result");
  if (localS) {
    const data = JSON.parse(localS);
    const updatedData = data.map((e: any) =>
      e.id === id ? { ...e, flag: !flagged } : e
    );
    localStorage.setItem("result", JSON.stringify(updatedData));
    setFlagged(!flagged);
    onFlagChange(id, !flagged); 
  }
};


export const handlePageNavigation = (
  currentPage: number,
  click: (e: number) => void,
  maxPage: number,
  direction: "previous" | "next",
  review:(e: boolean) => void
) => {
  if (direction === "previous" && currentPage > 0) {
    click(currentPage - 1);
  } else if (direction === "next" && currentPage < maxPage - 1) {
    click(currentPage + 1);
  }
  if(direction === "next" && currentPage === maxPage - 1) review(true);
};

export const isCurrentQuestionAnswered = (
  id: string,
  selectedAnswer: string
): boolean => {
  return selectedAnswer === id;
};

