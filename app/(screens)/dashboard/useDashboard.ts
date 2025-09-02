
import useSessionsList from "@/store/useSessionsList";
import { useEffect } from "react";

export const useSessions = (page: number = 1) => {
  const { sessions, count, next, previous, loading, fetchSessions } =
    useSessionsList();

  useEffect(() => {
    fetchSessions(page);
  }, [page, fetchSessions]);

  return {
    sessions,
    count,
    next,
    previous,
    loading,
    refetch: fetchSessions,
  };
};
