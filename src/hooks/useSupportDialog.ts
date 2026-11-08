import { useRef } from "react";

const useSupportDialog = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  return {
    dialogRef,
    openSupport: () => dialogRef.current?.showModal(),
    closeSupport: () => dialogRef.current?.close(),
  };
};

export { useSupportDialog };
