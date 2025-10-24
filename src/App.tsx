import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./AuthProvider";
import { BlogProvider } from "./context/blog-context";
import { MovieProvider } from "./context/movie-context";
import { ReviewProvider } from "./context/review-context";
import { SalesProvider } from "./context/sales-context";
import useMode from "./hooks/useMode";
import { router } from "./routes";

const queryClient = new QueryClient();

function App() {
  const { theme } = useMode();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <MovieProvider>
            <SalesProvider>
              <ReviewProvider>
                <BlogProvider>
                  <RouterProvider router={router} />
                </BlogProvider>
              </ReviewProvider>
            </SalesProvider>
          </MovieProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
