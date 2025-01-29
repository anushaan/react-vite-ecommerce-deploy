import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthenicated, user, children }) => {
  const location = useLocation();

  console.log(location.pathname, isAuthenicated);

  if (location.pathname === "/") {
    if (!isAuthenicated) {
      return <Navigate to="/auth/login" />;
    } else {
      if (user?.role === "admin") {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/shop/home" />;
      }
    }
  }

  if (
    !isAuthenicated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  )
    return <Navigate to="/auth/login" />;

  if (
    isAuthenicated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }
  if (
    isAuthenicated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }
  if (
    isAuthenicated &&
    user?.role === "admin" &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to="/admin/dashbord" />;
  }

  return <>{children}</>;
};

export default CheckAuth;
