import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useState, useEffect, createContext, ReactNode } from "react";
import app from "../Firebase/Firebase";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: User | null;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const auth = getAuth(app);
  const naviguate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user: User | null) => {
      if (user && user.emailVerified) {
        setUser(user);
        naviguate("/generate-image");
      } else {
        setUser(null);
      }
      setLoading(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading && children}
    </AuthContext.Provider>
  );
};
