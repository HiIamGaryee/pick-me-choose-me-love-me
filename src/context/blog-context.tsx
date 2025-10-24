import React, { createContext, ReactNode, useContext, useReducer } from "react";
import { Blog, BlogList } from "../api/blog";

// State interface
interface BlogState {
  blogs: BlogList[];
  currentBlog: Blog | null;
  loading: boolean;
  error: string | null;
  totalCount: number;
}

// Action types
type BlogAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_BLOGS"; payload: { blogs: BlogList[]; totalCount?: number } }
  | { type: "SET_CURRENT_BLOG"; payload: Blog | null }
  | { type: "ADD_BLOG"; payload: Blog }
  | { type: "UPDATE_BLOG"; payload: Blog }
  | { type: "DELETE_BLOG"; payload: number }
  | { type: "CLEAR_ERROR" };

// Initial state
const initialState: BlogState = {
  blogs: [],
  currentBlog: null,
  loading: false,
  error: null,
  totalCount: 0,
};

// Reducer
const blogReducer = (state: BlogState, action: BlogAction): BlogState => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };

    case "SET_BLOGS":
      return {
        ...state,
        blogs: action.payload.blogs,
        totalCount: action.payload.totalCount || action.payload.blogs.length,
        loading: false,
        error: null,
      };

    case "SET_CURRENT_BLOG":
      return {
        ...state,
        currentBlog: action.payload,
        loading: false,
        error: null,
      };

    case "ADD_BLOG":
      return {
        ...state,
        blogs: [action.payload, ...state.blogs],
        totalCount: state.totalCount + 1,
        loading: false,
        error: null,
      };

    case "UPDATE_BLOG":
      return {
        ...state,
        blogs: state.blogs.map((blog) =>
          blog.id === action.payload.id ? action.payload : blog
        ),
        currentBlog:
          state.currentBlog?.id === action.payload.id
            ? action.payload
            : state.currentBlog,
        loading: false,
        error: null,
      };

    case "DELETE_BLOG":
      return {
        ...state,
        blogs: state.blogs.filter((blog) => blog.id !== action.payload),
        totalCount: state.totalCount - 1,
        loading: false,
        error: null,
      };

    case "CLEAR_ERROR":
      return { ...state, error: null };

    default:
      return state;
  }
};

// Context interface
interface BlogContextType {
  state: BlogState;
  dispatch: React.Dispatch<BlogAction>;
  // Helper functions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

// Create context
const BlogContext = createContext<BlogContextType | undefined>(undefined);

// Provider component
interface BlogProviderProps {
  children: ReactNode;
}

export const BlogProvider: React.FC<BlogProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(blogReducer, initialState);

  // Helper functions
  const setLoading = (loading: boolean) => {
    dispatch({ type: "SET_LOADING", payload: loading });
  };

  const setError = (error: string | null) => {
    dispatch({ type: "SET_ERROR", payload: error });
  };

  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  const value: BlogContextType = {
    state,
    dispatch,
    setLoading,
    setError,
    clearError,
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};

// Custom hook to use blog context
export const useBlog = (): BlogContextType => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error("useBlog must be used within a BlogProvider");
  }
  return context;
};

// Custom hooks for specific blog operations
export const useBlogs = () => {
  const { state, dispatch } = useBlog();

  return {
    blogs: state.blogs,
    loading: state.loading,
    error: state.error,
    totalCount: state.totalCount,
    dispatch,
  };
};

export const useCurrentBlog = () => {
  const { state, dispatch } = useBlog();

  return {
    blog: state.currentBlog,
    loading: state.loading,
    error: state.error,
    dispatch,
  };
};
