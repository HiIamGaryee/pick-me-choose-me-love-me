import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./AuthProvider";
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
                <RouterProvider router={router} />
              </ReviewProvider>
            </SalesProvider>
          </MovieProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
