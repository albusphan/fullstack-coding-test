import firebase from "firebase/app";

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { auth } from "configs/firebase";
import { useRouter } from "next/router";

const useAuthProvider = () => {
  const router = useRouter();

  const [user, setUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState(true);

  const signIn = (email: string, password: string) => auth.signInWithEmailAndPassword(email, password);

  const signUp = (email: string, password: string) => auth.createUserWithEmailAndPassword(email, password);

  const signOut = async () => {
    await auth.signOut();
    router.push("/sign-in");
  };

  useEffect(() => {
    const cancelAuthListener = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => {
      cancelAuthListener();
    };
  }, []);

  return {
    user,
    loading,
    signIn,
    signOut,
    signUp,
  };
};

type AuthContextType = {
  user: firebase.User | null;
  loading: boolean;
  signIn?: (email: string, password: string) => Promise<firebase.auth.UserCredential>;
  signUp?: (email: string, password: string) => Promise<firebase.auth.UserCredential>;
  signOut?: () => Promise<void>;
};

const authContext = createContext<AuthContextType>({ user: null, loading: true });

export function AuthProvider(props: { children: ReactNode }): JSX.Element {
  const auth = useAuthProvider();
  return <authContext.Provider value={auth}>{props.children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};
