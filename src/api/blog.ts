import api from "../utils/axiosConfig.js";

// Blog Types
export interface Blog {
  id: number;
  title: string;
  content: string;
  excerpt?: string;
  slug: string;
  featured_image?: string;
  tags?: string;
  is_published: boolean;
  view_count: number;
  created_at: string;
  updated_at: string;
  author_id: number;
  author_name?: string;
}

export interface BlogCreate {
  title: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  tags?: string;
  is_published?: boolean;
  slug?: string;
}

export interface BlogUpdate {
  title?: string;
  content?: string;
  excerpt?: string;
  featured_image?: string;
  tags?: string;
  is_published?: boolean;
  slug?: string;
}

export interface BlogList {
  id: number;
  title: string;
  excerpt?: string;
  slug: string;
  featured_image?: string;
  tags?: string;
  is_published: boolean;
  view_count: number;
  created_at: string;
  updated_at: string;
  author_name?: string;
}

// Helper function to check API response
const checkResponse = (response: any) => {
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new Error(`API Error: ${response.status}`);
};

// Public Blog API (for members)
export const getPublishedBlogs = async (skip = 0, limit = 100): Promise<BlogList[]> => {
  try {
    const response = await api.get(`/blogs/?skip=${skip}&limit=${limit}`);
    return checkResponse(response);
  } catch (error) {
    console.error("Error fetching published blogs:", error);
    // Return empty array if API is not available
    console.warn("Blog API not available, returning empty array");
    return [];
  }
};

export const getBlogBySlug = async (slug: string): Promise<Blog> => {
  try {
    const response = await api.get(`/blogs/${slug}`);
    return checkResponse(response);
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    // Return a default blog object if API is not available
    console.warn("Blog API not available, returning default blog");
    throw new Error("Blog not found");
  }
};

export const getBlogById = async (id: number): Promise<Blog> => {
  try {
    const response = await api.get(`/blogs/id/${id}`);
    return checkResponse(response);
  } catch (error) {
    console.error("Error fetching blog by ID:", error);
    throw error;
  }
};

export const searchPublishedBlogs = async (query: string, skip = 0, limit = 10): Promise<BlogList[]> => {
  try {
    const response = await api.get(`/blogs/search/?q=${encodeURIComponent(query)}&skip=${skip}&limit=${limit}`);
    return checkResponse(response);
  } catch (error) {
    console.error("Error searching blogs:", error);
    throw error;
  }
};

export const getBlogsByTag = async (tag: string, skip = 0, limit = 10): Promise<BlogList[]> => {
  try {
    const response = await api.get(`/blogs/tags/${encodeURIComponent(tag)}?skip=${skip}&limit=${limit}`);
    return checkResponse(response);
  } catch (error) {
    console.error("Error fetching blogs by tag:", error);
    throw error;
  }
};

export const getBlogsByAuthor = async (authorId: number, skip = 0, limit = 10): Promise<BlogList[]> => {
  try {
    const response = await api.get(`/blogs/author/${authorId}?skip=${skip}&limit=${limit}`);
    return checkResponse(response);
  } catch (error) {
    console.error("Error fetching blogs by author:", error);
    throw error;
  }
};

// Admin Blog API
export const createBlog = async (blogData: BlogCreate): Promise<Blog> => {
  try {
    const response = await api.post("/admin/blogs/", blogData);
    return checkResponse(response);
  } catch (error) {
    console.error("Error creating blog:", error);
    throw error;
  }
};

export const getAllBlogsAdmin = async (skip = 0, limit = 100, publishedOnly = false): Promise<BlogList[]> => {
  try {
    const response = await api.get(`/admin/blogs/?skip=${skip}&limit=${limit}&published_only=${publishedOnly}`);
    return checkResponse(response);
  } catch (error) {
    console.error("Error fetching all blogs (admin):", error);
    // Return empty array if API is not available
    console.warn("Blog API not available, returning empty array");
    return [];
  }
};

export const getBlogAdmin = async (blogId: number): Promise<Blog> => {
  try {
    const response = await api.get(`/admin/blogs/${blogId}`);
    return checkResponse(response);
  } catch (error) {
    console.error("Error fetching blog (admin):", error);
    throw error;
  }
};

export const updateBlog = async (blogId: number, blogData: BlogUpdate): Promise<Blog> => {
  try {
    const response = await api.put(`/admin/blogs/${blogId}`, blogData);
    return checkResponse(response);
  } catch (error) {
    console.error("Error updating blog:", error);
    throw error;
  }
};

export const deleteBlog = async (blogId: number): Promise<{ message: string }> => {
  try {
    const response = await api.delete(`/admin/blogs/${blogId}`);
    return checkResponse(response);
  } catch (error) {
    console.error("Error deleting blog:", error);
    throw error;
  }
};

export const searchBlogsAdmin = async (query: string, skip = 0, limit = 10, publishedOnly = false): Promise<BlogList[]> => {
  try {
    const response = await api.get(`/admin/blogs/search/?q=${encodeURIComponent(query)}&skip=${skip}&limit=${limit}&published_only=${publishedOnly}`);
    return checkResponse(response);
  } catch (error) {
    console.error("Error searching blogs (admin):", error);
    throw error;
  }
};
