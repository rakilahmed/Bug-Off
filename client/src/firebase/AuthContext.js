import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  updateEmail,
  updatePassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { auth, db } from './firebase';
import { setDoc, doc, collection, getDoc } from 'firebase/firestore';
import Loading from '../components/Utils/Loading';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const register = async (name, type, email, password) => {
    await createUserWithEmailAndPassword(auth, email, password);
    setAccountType(type);
    return updateProfile(auth.currentUser, {
      displayName: name,
    });
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const updateUserName = (name) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
    });
  };

  const updateUserEmail = (email) => {
    return updateEmail(auth.currentUser, email);
  };

  const updateUserPassword = (password) => {
    return updatePassword(auth.currentUser, password);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const getToken = async () => {
    return await auth.currentUser?.getIdToken();
  };

  const setAccountType = async (type) => {
    await setDoc(doc(collection(db, 'users'), `${auth.currentUser.uid}`), {
      type,
    });
  };

  const getAccountType = async () => {
    const userData = await getDoc(doc(db, 'users', `${auth.currentUser?.uid}`));
    return userData.data() && userData.data().type;
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);

      setTimeout(() => {
        setLoading(false);
      }, 250);
    });

    return unsub;
  }, []);

  const value = {
    user,
    setAccountType,
    getAccountType,
    getToken,
    register,
    login,
    logout,
    updateUserName,
    updateUserEmail,
    updateUserPassword,
    resetPassword,
  };
  return loading ? (
    <Loading />
  ) : (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
