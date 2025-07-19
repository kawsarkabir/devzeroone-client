import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { getProfile } from "@/services/userService";
import { setUser, clearUser, setLoading } from "@/store/slices/authSlice";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      dispatch(setLoading(true));
      try {
        const user = await getProfile();
        dispatch(setUser(user));
      } catch (err) {
        dispatch(clearUser());
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchUser();
  }, [dispatch]);

  return <>{children}</>;
};
export default AuthProvider;
