import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  updateEmail,
  updatePassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { auth } from './firebase';
import Loading from '../components/Loading';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const register = async (name, email, password) => {
    await createUserWithEmailAndPassword(auth, email, password);
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

  const getToken = async () => {
    return await auth.currentUser.getIdToken();
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    });

    return unsub;
  }, []);

  const value = {
    user,
    getToken,
    register,
    login,
    logout,
    updateUserName,
    updateUserEmail,
    updateUserPassword,
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
