// Blog API functions - hardcoded for now
// In a real application, these would make actual API calls

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  tags: string[];
  status: "draft" | "published" | "archived";
  views: number;
}

export interface CreateBlogPostParams {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  image: string;
  tags: string[];
  status: "draft" | "published";
}

export interface UpdateBlogPostParams extends CreateBlogPostParams {
  id: string;
}

// Hardcoded blog data
const blogPosts: BlogPost[] = [
  {
    id: "cafe-hopping-brunch-trail",
    title: "Cafe Hopping & Brunch Trail: The Ultimate Guide",
    excerpt: "Discover the best cafés and brunch spots in the city. From cozy corners to Instagram-worthy lattes, plan your perfect morning adventure.",
    content: `
      <h2>Why Cafe Hopping Makes the Perfect Date</h2>
      <p>Cafe hopping isn't just about coffee—it's about creating shared experiences and discovering new places together. This date idea combines adventure, conversation, and delicious treats in a relaxed setting.</p>
      
      <h3>Planning Your Cafe Trail</h3>
      <p>Start by researching cafes in your area. Look for places with different vibes: a cozy corner cafe for intimate conversation, a trendy spot for Instagram photos, and a hidden gem for authentic local flavor.</p>
      
      <h3>What to Order</h3>
      <ul>
        <li><strong>First Stop:</strong> Light pastries and coffee to start the day</li>
        <li><strong>Second Stop:</strong> Hearty brunch items and specialty drinks</li>
        <li><strong>Final Stop:</strong> Dessert and a final coffee to end on a sweet note</li>
      </ul>
    `,
    author: "Sarah Chen",
    date: "20 Jan, 2025",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop",
    tags: ["Coffee", "Brunch", "Adventure", "Food"],
    status: "published",
    views: 1250,
  },
  {
    id: "movie-chill-night-guide",
    title: "Movie & Chill Night: Perfect Low-Key Evening Plan",
    excerpt: "Everything you need for the perfect movie night at home. From snack ideas to film recommendations that spark conversation.",
    content: `
      <h2>Creating the Perfect Movie Night Atmosphere</h2>
      <p>A movie night at home offers intimacy and comfort that theaters can't match. It's perfect for couples who want quality time without the crowds or expense of going out.</p>
      
      <h3>Setting the Scene</h3>
      <p>Transform your living space into a cozy cinema. Dim the lights, arrange comfortable seating with blankets and pillows, and prepare your favorite snacks.</p>
      
      <h3>Movie Selection Tips</h3>
      <ul>
        <li><strong>Romantic Comedies:</strong> Light-hearted and conversation-friendly</li>
        <li><strong>Thrillers:</strong> Keep you both engaged and on edge</li>
        <li><strong>Documentaries:</strong> Spark interesting discussions</li>
        <li><strong>Classic Films:</strong> Share cultural experiences</li>
      </ul>
    `,
    author: "Alex Rodriguez",
    date: "18 Jan, 2025",
    image: "https://images.unsplash.com/photo-1489599808420-5b2b1b4b4b4b?q=80&w=1200&auto=format&fit=crop",
    tags: ["Movies", "Home", "Cozy", "Entertainment"],
    status: "published",
    views: 980,
  },
  {
    id: "beach-picnic-sunset-walk",
    title: "Beach Picnic & Sunset Walk: Romance by the Sea",
    excerpt: "Plan the perfect beach date with our guide to sunset picnics, romantic walks, and creating unforgettable moments by the water.",
    content: `
      <h2>The Magic of Beach Dates</h2>
      <p>There's something inherently romantic about the beach—the sound of waves, the golden hour light, and the endless horizon create the perfect backdrop for connection.</p>
      
      <h3>Planning Your Beach Picnic</h3>
      <p>Choose a beach that's not too crowded, preferably with facilities nearby. Pack a waterproof blanket, bring finger foods that won't spoil, and don't forget sunscreen and water.</p>
      
      <h3>Picnic Essentials</h3>
      <ul>
        <li><strong>Food:</strong> Sandwiches, fruit, cheese, and crackers</li>
        <li><strong>Drinks:</strong> Water, sparkling beverages, or wine</li>
        <li><strong>Comfort:</strong> Blankets, pillows, and towels</li>
        <li><strong>Entertainment:</strong> Music, games, or books</li>
      </ul>
    `,
    author: "Emma Thompson",
    date: "16 Jan, 2025",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop",
    tags: ["Beach", "Sunset", "Picnic", "Romance"],
    status: "draft",
    views: 0,
  },
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Get all blog posts
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  await delay(500); // Simulate API call
  return [...blogPosts];
};

// Get single blog post by ID
export const getBlogPost = async (id: string): Promise<BlogPost | null> => {
  await delay(300); // Simulate API call
  return blogPosts.find(post => post.id === id) || null;
};

// Create new blog post
export const createBlogPost = async (params: CreateBlogPostParams): Promise<BlogPost> => {
  await delay(800); // Simulate API call
  
  const newPost: BlogPost = {
    id: `post-${Date.now()}`, // Generate unique ID
    ...params,
    date: new Date().toLocaleDateString("en-US", { 
      year: "numeric", 
      month: "short", 
      day: "numeric" 
    }),
    views: 0,
  };
  
  blogPosts.push(newPost);
  return newPost;
};

// Update existing blog post
export const updateBlogPost = async (params: UpdateBlogPostParams): Promise<BlogPost> => {
  await delay(800); // Simulate API call
  
  const index = blogPosts.findIndex(post => post.id === params.id);
  if (index === -1) {
    throw new Error("Blog post not found");
  }
  
  const updatedPost: BlogPost = {
    ...blogPosts[index],
    ...params,
  };
  
  blogPosts[index] = updatedPost;
  return updatedPost;
};

// Delete blog post
export const deleteBlogPost = async (id: string): Promise<void> => {
  await delay(500); // Simulate API call
  
  const index = blogPosts.findIndex(post => post.id === id);
  if (index === -1) {
    throw new Error("Blog post not found");
  }
  
  blogPosts.splice(index, 1);
};

// Get published blog posts for public display
export const getPublishedBlogPosts = async (): Promise<BlogPost[]> => {
  await delay(300); // Simulate API call
  return blogPosts.filter(post => post.status === "published");
};

// Increment view count
export const incrementBlogPostViews = async (id: string): Promise<void> => {
  await delay(200); // Simulate API call
  
  const post = blogPosts.find(post => post.id === id);
  if (post) {
    post.views += 1;
  }
};
