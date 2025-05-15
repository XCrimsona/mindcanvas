import { useRef } from "react";

export const useDataScrollBoardRef = () => {
  const dataScrollBoard = useRef<HTMLDivElement>(null);
  // dataScrollBoard.current/
  return dataScrollBoard;
};
