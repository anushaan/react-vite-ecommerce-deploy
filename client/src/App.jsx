import { Routes, Route } from "react-router-dom";
import AuthLayout from "./components/auth/AuthLayout";
import AuthLogin from "./pages/auth/AuthLogin";
import AuthRegister from "./pages/auth/AuthRegister";
import AdminView from "./components/admin-view/AdminView";
import AdminDashboard from "./pages/admin-view/AdminDashboard";
import AdminFeatures from "./pages/admin-view/AdminFeatures";
import AdminOrders from "./pages/admin-view/AdminOrders";
import AdminProducts from "./pages/admin-view/AdminProducts";
import ShoppingView from "./components/shopping-view/ShoppingView";
import NotFound from "./components/auth/not-found/NotFound";
import ShoppingAccount from "./pages/shopping-view/ShoppingAccount";
import ShoppingCheckout from "./pages/shopping-view/ShoppingCheckout";
import ShoppingHome from "./pages/shopping-view/ShoppingHome";
import ShoppingListing from "./pages/shopping-view/ShoppingListing";
import CheckAuth from "./components/common/CheckAuth";
import UnauthPage from "./pages/unauth-page/UnauthPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";

function App() {

  const {isAuthenticated, user, isLoading} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])
  
  if(isLoading) return <Skeleton className="w-[800] bg-black h-[600px]" />


  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenicated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenicated={isAuthenticated} user={user}>
              <AdminView />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="features" element={<AdminFeatures />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
        </Route>
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenicated={isAuthenticated} user={user}>
              <ShoppingView />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/unauth-page" element={<UnauthPage />} />
      </Routes>
    </div>
  );
}

export default App;
