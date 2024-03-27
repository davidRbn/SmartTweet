import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthContext } from "./AuthContext";
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";

interface CreditContextType {
  credit: number;
  addCredit: (amount: number) => void;
  removeCredit: () => void;
}

export const CreditContext = createContext<CreditContextType>({
  credit: 5,
  addCredit: () => {},
  removeCredit: () => {},
});

export const CreditProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [credit, setCredit] = useState<number>(5);
  const { user } = useContext(AuthContext);
  const db = getFirestore();

  const addCredit = (amount: number) => {
    setCredit((prevCredit) => prevCredit + amount);
  };

  const removeCredit = () => {
    const collectionRef = collection(db, "usersCollection");
    const docRef = doc(collectionRef, user?.uid);
    updateDoc(docRef, {
      credit: Math.max(0, credit - 1),
    })
      .then(() => {
        getCredit();
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
    // setCredit((prevCredit) => Math.max(0, prevCredit - amount));
  };

  const getCredit = useCallback(() => {
    const collectionRef = collection(db, "usersCollection");
    const docRef = doc(collectionRef, user?.uid);
    getDoc(docRef)
      .then((doc) => {
        if (doc.exists()) {
          const credit = doc.data().credit;
          setCredit(credit);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, [db, user?.uid]);

  useEffect(() => {
    user && getCredit();
  }, [credit, getCredit, user]);

  return (
    <CreditContext.Provider value={{ credit, addCredit, removeCredit }}>
      {children}
    </CreditContext.Provider>
  );
};
