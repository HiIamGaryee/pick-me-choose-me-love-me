import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./AuthProvider";
import ProtectedRoute from "./ProtectedRoute";
import BlogDetailPage from "./pages/BlogDetailPage";
import BlogPage from "./pages/BlogPage";
import EventDetailPage from "./pages/EventDetailPage";
import EventsPage from "./pages/EventsPage";
import Faq from "./pages/FaqPage";
import Home from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Movie from "./pages/MoviePage";
import PackagePage from "./pages/PackagePage";
import Profile from "./pages/ProfilePage";
import ReferralPage from "./pages/ReferralPage";
import SignUp from "./pages/SignUpPage";
import TvSeries from "./pages/TvSeriesPage";
import UpcomingPage from "./pages/UpcomingPage";
import WizardzPage from "./pages/landings/wizardz";

import BookmarkPage from "./pages/BookmarkPage";
import ErrorPage from "./pages/ErrorPage";
import ServicesPage from "./pages/ServicesPage";
import AddListingPage from "./pages/admin/AddListing";
import ContactUsListPage from "./pages/admin/ContactUsListPage";
import ProductListPage from "./pages/admin/ProductListPage";
import SalesList from "./pages/admin/SalesList";
import AddSalesPage from "./pages/sales/AddSalesPage";
import SalesHistoryPage from "./pages/sales/SalesHistoryPage";

import SubscribleListPage from "./pages/admin/SubscribleListPage";
import CartPage from "./pages/sales/CartPage";
import SalesPage from "./pages/sales/SalesPage";

import CheckoutPage from "./pages/sales/CheckoutPage";
import ProductDetailPage from "./pages/sales/ProductDetailPage";
import ProductPage from "./pages/sales/ProductPage";

// Layout component that specifies the default error element
const Layout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Use the Layout as the top-level route element
    errorElement: <ErrorPage />, // Set a default error element here
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/sign-up", element: <SignUp /> },
      { path: "/movies", element: <Movie /> },
      { path: "/tv-series", element: <TvSeries /> },
      { path: "/bookmarks", element: <BookmarkPage /> },
      // { path: "/about-us", element: <AboutUsPage /> },
      { path: "/faq", element: <Faq /> },
      { path: "/referral", element: <ReferralPage /> },
      { path: "/package", element: <PackagePage /> },
      { path: "/services", element: <ServicesPage /> },
      { path: "/upcoming-movies", element: <UpcomingPage /> },
      { path: "/product", element: <ProductPage /> },
      { path: "product/:productCode", element: <ProductDetailPage /> },
      { path: "/sales", element: <SalesPage /> },
      { path: "/add-sales", element: <AddSalesPage /> },
      { path: "/sales-history", element: <SalesHistoryPage /> },

      { path: "/cart", element: <CartPage /> },
      { path: "/checkout", element: <CheckoutPage /> },
      { path: "/blog", element: <BlogPage /> },
      { path: "/blog/:slug", element: <BlogDetailPage /> },
      { path: "/events", element: <EventsPage /> },
      { path: "/events/:id", element: <EventDetailPage /> },
      { path: "/admin/add-listing", element: <AddListingPage /> },
      { path: "/admin/product-list", element: <ProductListPage /> },
      { path: "/admin/subscrible-list", element: <SubscribleListPage /> },
      { path: "/admin/sales-list", element: <SalesList /> },
      { path: "/admin/contact-us-list", element: <ContactUsListPage /> },
      { path: "/wizardz", element: <WizardzPage /> },
      {
        path: "/member/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function AppRouter() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default AppRouter;
