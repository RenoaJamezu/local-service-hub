import { useContext } from "react";
import { ServiceContext } from "../context/ServiceContext";

export function useService() {
  const ctx = useContext(ServiceContext);
  if (!ctx) throw new Error("useService must be used inside ServiceProvider");
  return ctx;
};