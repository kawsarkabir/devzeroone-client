import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase";
import api from "@/services/api";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, clearUser, setLoading } from "@/store/slices/authSlice";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const firebaseToken = await user.getIdToken();

          const res = await api.post("/auth/login", {
            firebaseToken,
            email: user.email,
          });
          console.log(res.data);
          localStorage.setItem("token", res.data.token);
          dispatch(setUser(res.data.user));
        } catch (err) {
          console.error("Auth sync failed:", err);
          dispatch(clearUser());
          localStorage.removeItem("token");
        }
      } else {
        dispatch(clearUser());
        localStorage.removeItem("token");
      }

      dispatch(setLoading(false));
    });

    return () => unsubscribe();
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthProvider;
