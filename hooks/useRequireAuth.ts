import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "./useAuth";

export const useRequireAuth = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      router.push("/sign-in");
    }
  });
};
