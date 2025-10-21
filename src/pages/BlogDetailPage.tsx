import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../Layout";

type Post = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  tags: string[];
  readTime: string;
};

// Extended blog posts with full content
const blogPosts: Post[] = [
  {
    id: "cafe-hopping-brunch-trail",
    title: "Cafe Hopping & Brunch Trail: The Ultimate Guide",
    excerpt:
      "Discover the best cafés and brunch spots in the city. From cozy corners to Instagram-worthy lattes, plan your perfect morning adventure.",
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
      
      <h3>Conversation Starters</h3>
      <p>Use the different environments to spark conversations. Discuss the cafe's atmosphere, share food preferences, or talk about your favorite coffee memories.</p>
      
      <h3>Pro Tips</h3>
      <ul>
        <li>Plan 2-3 cafes maximum to avoid feeling rushed</li>
        <li>Check opening hours and make reservations if needed</li>
        <li>Bring cash for smaller cafes</li>
        <li>Take photos together at each location</li>
      </ul>
    `,
    author: "Sarah Chen",
    date: "20 Jan, 2025",
    image:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop",
    tags: ["Coffee", "Brunch", "Adventure", "Food"],
    readTime: "5 min read",
  },
  {
    id: "movie-chill-night-guide",
    title: "Movie & Chill Night: Perfect Low-Key Evening Plan",
    excerpt:
      "Everything you need for the perfect movie night at home. From snack ideas to film recommendations that spark conversation.",
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
      
      <h3>Snack Ideas</h3>
      <p>Prepare a mix of sweet and savory treats. Consider making popcorn, having chocolate, and preparing some finger foods that won't distract from the movie.</p>
      
      <h3>Making It Interactive</h3>
      <p>Pause the movie occasionally to discuss plot points, share reactions, or make predictions about what happens next. This keeps the date engaging and interactive.</p>
    `,
    author: "Alex Rodriguez",
    date: "18 Jan, 2025",
    image:
      "https://images.unsplash.com/photo-1489599808420-5b2b1b4b4b4b?q=80&w=1200&auto=format&fit=crop",
    tags: ["Movies", "Home", "Cozy", "Entertainment"],
    readTime: "4 min read",
  },
  {
    id: "beach-picnic-sunset-walk",
    title: "Beach Picnic & Sunset Walk: Romance by the Sea",
    excerpt:
      "Plan the perfect beach date with our guide to sunset picnics, romantic walks, and creating unforgettable moments by the water.",
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
      
      <h3>Sunset Timing</h3>
      <p>Check sunset times and arrive about an hour early to set up and enjoy the golden hour. The changing light creates beautiful photo opportunities and a romantic atmosphere.</p>
      
      <h3>Post-Picnic Walk</h3>
      <p>After your meal, take a leisurely walk along the shore. This is perfect for deeper conversation and enjoying the peaceful evening atmosphere.</p>
      
      <h3>Safety Tips</h3>
      <ul>
        <li>Check weather conditions before heading out</li>
        <li>Bring extra layers for when it gets cooler</li>
        <li>Stay aware of tide times</li>
        <li>Pack out all your trash</li>
      </ul>
    `,
    author: "Emma Thompson",
    date: "16 Jan, 2025",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop",
    tags: ["Beach", "Sunset", "Picnic", "Romance"],
    readTime: "6 min read",
  },
  {
    id: "wall-bouldering-coffee-date",
    title: "Wall Bouldering & Coffee: Climb, Laugh, and Caffeinate",
    excerpt:
      "Combine adventure with relaxation in this unique date idea. Perfect for active couples who love trying new things together.",
    content: `
      <h2>Why Bouldering Makes a Great Date</h2>
      <p>Bouldering combines physical challenge with mental problem-solving, making it perfect for couples who enjoy active dates. It's also a great way to support and encourage each other.</p>
      
      <h3>What is Bouldering?</h3>
      <p>Bouldering is rock climbing without ropes, typically on shorter walls with thick mats below. It focuses on technique and problem-solving rather than endurance.</p>
      
      <h3>Pre-Climb Preparation</h3>
      <ul>
        <li>Wear comfortable, flexible clothing</li>
        <li>Bring climbing shoes (most gyms rent them)</li>
        <li>Stay hydrated before climbing</li>
        <li>Warm up with light stretching</li>
      </ul>
      
      <h3>During the Climb</h3>
      <p>Start with easier routes and work your way up. Encourage each other, celebrate small victories, and don't be afraid to take breaks. The goal is fun, not competition.</p>
      
      <h3>Post-Climb Coffee</h3>
      <p>After climbing, head to a nearby cafe to refuel and discuss your experience. This is perfect for sharing what you learned about each other during the activity.</p>
      
      <h3>Benefits of This Date</h3>
      <ul>
        <li>Builds trust and teamwork</li>
        <li>Creates shared memories</li>
        <li>Provides natural conversation topics</li>
        <li>Offers physical and mental challenges</li>
      </ul>
    `,
    author: "Mike Johnson",
    date: "14 Jan, 2025",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=1200&auto=format&fit=crop",
    tags: ["Adventure", "Active", "Coffee", "Teamwork"],
    readTime: "5 min read",
  },
  {
    id: "art-gallery-dessert-date",
    title: "Art Gallery & Dessert Date: Feed Your Creativity",
    excerpt:
      "Explore local galleries followed by indulgent desserts. A perfect blend of culture and sweetness for art-loving couples.",
    content: `
      <h2>Combining Culture and Indulgence</h2>
      <p>Art galleries offer quiet, contemplative spaces perfect for meaningful conversation, while desserts provide a sweet ending that satisfies both your cultural and culinary cravings.</p>
      
      <h3>Choosing the Right Gallery</h3>
      <p>Look for galleries that match your interests: contemporary art for modern couples, classical galleries for traditional tastes, or local artist showcases for community connection.</p>
      
      <h3>Gallery Etiquette</h3>
      <ul>
        <li>Speak quietly to respect other visitors</li>
        <li>Don't touch the artwork</li>
        <li>Take your time to really look at pieces</li>
        <li>Ask questions about pieces that interest you</li>
      </ul>
      
      <h3>Making It Interactive</h3>
      <p>Discuss what you see, share interpretations, and talk about which pieces resonate with you. This creates natural conversation and helps you learn about each other's perspectives.</p>
      
      <h3>Dessert Selection</h3>
      <p>Choose a dessert spot near the gallery. Consider places with cozy atmospheres where you can continue your art discussions over something sweet.</p>
      
      <h3>Conversation Starters</h3>
      <ul>
        <li>"What does this piece make you think about?"</li>
        <li>"If you could take one piece home, which would it be?"</li>
        <li>"What emotions does this artwork evoke?"</li>
        <li>"How does this compare to other art you've seen?"</li>
      </ul>
    `,
    author: "Lisa Park",
    date: "12 Jan, 2025",
    image:
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=1200&auto=format&fit=crop",
    tags: ["Art", "Culture", "Dessert", "Creative"],
    readTime: "5 min read",
  },
  {
    id: "bookstore-tea-tasting",
    title: "Bookstore Hideout & Tea Tasting: Books, Tea, and Quiet Charm",
    excerpt:
      "Discover hidden bookstores and artisanal tea shops. Perfect for bookworms and tea enthusiasts seeking intimate conversations.",
    content: `
      <h2>The Charm of Quiet Dates</h2>
      <p>For couples who prefer intimate, low-key settings, bookstore and tea shop dates offer the perfect combination of intellectual stimulation and cozy atmosphere.</p>
      
      <h3>Finding the Perfect Bookstore</h3>
      <p>Look for independent bookstores with cozy reading nooks, cafes, or events. These places often have unique selections and knowledgeable staff who can make recommendations.</p>
      
      <h3>Bookstore Activities</h3>
      <ul>
        <li>Browse different sections together</li>
        <li>Recommend books to each other</li>
        <li>Read excerpts aloud</li>
        <li>Discuss favorite authors and genres</li>
      </ul>
      
      <h3>Tea Tasting Experience</h3>
      <p>Visit a tea shop that offers tastings or has a wide selection. Learn about different types of tea, their origins, and brewing methods together.</p>
      
      <h3>Creating Shared Experiences</h3>
      <p>Buy a book together to read and discuss later, or pick out teas to enjoy at home. These shared purchases create ongoing conversation topics.</p>
      
      <h3>Perfect for Introverts</h3>
      <p>This date idea is ideal for couples who prefer quiet, meaningful interactions over loud, crowded activities. It allows for deep conversation in a peaceful setting.</p>
      
      <h3>Follow-up Ideas</h3>
      <ul>
        <li>Read the same book and discuss it</li>
        <li>Have regular tea dates at home</li>
        <li>Explore other quiet venues together</li>
        <li>Start a shared reading list</li>
      </ul>
    `,
    author: "David Kim",
    date: "10 Jan, 2025",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1200&auto=format&fit=crop",
    tags: ["Books", "Tea", "Quiet", "Intellectual"],
    readTime: "6 min read",
  },
  {
    id: "food-truck-skyline-drive",
    title: "Food Truck Night & Skyline Drive: Urban Bites and Neon Views",
    excerpt:
      "Experience the city's vibrant food truck scene followed by a romantic drive with stunning skyline views.",
    content: `
      <h2>Urban Adventure Date</h2>
      <p>Food trucks offer variety and excitement, while a skyline drive provides romantic views and intimate conversation time. This date combines the best of city life with private moments.</p>
      
      <h3>Finding Food Truck Events</h3>
      <p>Look for food truck festivals, weekly gatherings, or popular spots where multiple trucks congregate. Check social media and local event listings for the best locations.</p>
      
      <h3>Food Truck Strategy</h3>
      <ul>
        <li>Arrive early to avoid long lines</li>
        <li>Share dishes to try more variety</li>
        <li>Bring cash as backup payment</li>
        <li>Check for dietary restrictions beforehand</li>
      </ul>
      
      <h3>Skyline Drive Planning</h3>
      <p>Research scenic routes with good city views. Consider timing your drive for sunset or after dark when city lights create a magical atmosphere.</p>
      
      <h3>Drive Essentials</h3>
      <ul>
        <li>Create a romantic playlist</li>
        <li>Bring blankets for comfort</li>
        <li>Pack water and light snacks</li>
        <li>Have a backup plan for weather</li>
      </ul>
      
      <h3>Making Memories</h3>
      <p>Take photos at scenic overlooks, share stories about the city, and enjoy the contrast between the bustling food truck scene and peaceful drive.</p>
      
      <h3>Safety Tips</h3>
      <ul>
        <li>Choose well-lit, safe areas for stops</li>
        <li>Let someone know your route</li>
        <li>Keep your phone charged</li>
        <li>Follow traffic laws and parking regulations</li>
      </ul>
    `,
    author: "Maria Garcia",
    date: "8 Jan, 2025",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop",
    tags: ["Food Trucks", "City", "Drive", "Urban"],
    readTime: "6 min read",
  },
  {
    id: "concert-late-night-supper",
    title: "Concert & Late Night Supper: Music, Laughter, and Noodles at 2am",
    excerpt:
      "From live music venues to late-night ramen spots. Experience the city's nightlife and create memories that last until dawn.",
    content: `
      <h2>Night Owl Date Adventure</h2>
      <p>For couples who love music and late-night adventures, this date combines live entertainment with intimate late-night dining for an unforgettable experience.</p>
      
      <h3>Concert Planning</h3>
      <p>Choose venues that match your music tastes and comfort level. Consider smaller venues for intimate experiences or larger venues for big-name acts.</p>
      
      <h3>Pre-Concert Preparation</h3>
      <ul>
        <li>Check venue policies (age restrictions, dress code)</li>
        <li>Arrive early for good spots</li>
        <li>Eat a light meal beforehand</li>
        <li>Bring ear protection if needed</li>
      </ul>
      
      <h3>During the Concert</h3>
      <p>Share the experience by dancing together, singing along, and discussing the music. These shared moments create lasting memories.</p>
      
      <h3>Late Night Supper Spots</h3>
      <p>Research restaurants that stay open late, especially those known for comfort food. Ramen shops, diners, and 24-hour cafes are perfect for post-concert dining.</p>
      
      <h3>Late Night Dining Tips</h3>
      <ul>
        <li>Choose places with good atmosphere</li>
        <li>Order comfort foods you both enjoy</li>
        <li>Take your time and enjoy the conversation</li>
        <li>Consider sharing dishes for variety</li>
      </ul>
      
      <h3>Creating the Perfect Night</h3>
      <p>The combination of live music and late-night food creates a unique energy. Use this excitement to fuel deep conversations and shared experiences.</p>
      
      <h3>Safety Considerations</h3>
      <ul>
        <li>Plan transportation in advance</li>
        <li>Stay aware of your surroundings</li>
        <li>Don't overindulge in alcohol</li>
        <li>Have a backup plan for getting home</li>
      </ul>
    `,
    author: "James Wilson",
    date: "6 Jan, 2025",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200&auto=format&fit=crop",
    tags: ["Music", "Nightlife", "Late Night", "Adventure"],
    readTime: "7 min read",
  },
  {
    id: "p1",
    title: "Best Movies to Watch on a Date in January 2025",
    excerpt:
      "From romantic comedies to thrilling adventures - discover the perfect films to share with your special someone this winter.",
    content: `
      <h2>Why Movies Make Perfect Dates</h2>
      <p>Movies provide a shared experience that sparks conversation and creates lasting memories. Whether you're looking for romance, laughter, or adventure, the right film can set the perfect mood for your date night.</p>
      
      <h3>Romantic Comedies</h3>
      <p>Perfect for couples who want to laugh together and feel the warmth of love stories. These films create a cozy, intimate atmosphere ideal for cuddling and sharing popcorn.</p>
      
      <h3>Thriller & Adventure</h3>
      <p>For couples who enjoy excitement and suspense. These films keep you on the edge of your seat and provide plenty to discuss afterward.</p>
      
      <h3>Classic Films</h3>
      <p>Timeless movies that never go out of style. Perfect for couples who appreciate cinema history and want to share cultural experiences.</p>
      
      <h3>Making It Special</h3>
      <ul>
        <li>Choose films that match both your interests</li>
        <li>Create a cozy viewing environment</li>
        <li>Prepare snacks and drinks together</li>
        <li>Discuss the film afterward</li>
      </ul>
    `,
    author: "Sarah Chen",
    date: "4 Jan, 2025",
    image:
      "https://images.unsplash.com/photo-1489599808420-5b2b1b4b4b4b?q=80&w=1200&auto=format&fit=crop",
    tags: ["Movies", "Entertainment", "Romance", "Winter"],
    readTime: "4 min read",
  },
  {
    id: "p2",
    title: "Dating a Nerd Boy: A Complete Guide",
    excerpt:
      "Everything you need to know about dating someone who's passionate about tech, games, and intellectual conversations.",
    content: `
      <h2>Understanding the Nerd Boy</h2>
      <p>Nerd boys are passionate, intelligent, and often deeply committed to their interests. They bring unique perspectives and genuine enthusiasm to relationships.</p>
      
      <h3>What Makes Them Special</h3>
      <ul>
        <li><strong>Passionate:</strong> They dive deep into their interests</li>
        <li><strong>Intelligent:</strong> Great conversationalists on topics they love</li>
        <li><strong>Loyal:</strong> Once committed, they're incredibly devoted</li>
        <li><strong>Creative:</strong> Often have unique hobbies and projects</li>
      </ul>
      
      <h3>Common Interests</h3>
      <p>Tech, gaming, science fiction, board games, coding, anime, comics, and intellectual discussions are common areas of passion.</p>
      
      <h3>How to Connect</h3>
      <ul>
        <li>Show genuine interest in their hobbies</li>
        <li>Ask questions about their projects</li>
        <li>Share your own interests</li>
        <li>Be patient with their enthusiasm</li>
      </ul>
      
      <h3>Date Ideas</h3>
      <p>Tech museums, gaming cafes, science centers, board game nights, and intellectual discussions over coffee are perfect for nerd boys.</p>
    `,
    author: "Alex Rodriguez",
    date: "12 Jan, 2025",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=1200&auto=format&fit=crop",
    tags: ["Nerds", "Tech", "Gaming", "Intellectual"],
    readTime: "5 min read",
  },
  {
    id: "p3",
    title: "10 Creative Date Ideas for Introverts",
    excerpt:
      "Perfect date activities for those who prefer intimate, low-key settings over crowded social gatherings.",
    content: `
      <h2>Introvert-Friendly Dating</h2>
      <p>Introverts thrive in quiet, intimate settings where they can connect deeply without the overwhelm of large crowds or noisy environments.</p>
      
      <h3>Home-Based Dates</h3>
      <ul>
        <li><strong>Cooking Together:</strong> Prepare a meal and enjoy quiet conversation</li>
        <li><strong>Movie Night:</strong> Curl up with films and snacks</li>
        <li><strong>Reading Together:</strong> Share books and discuss them</li>
        <li><strong>Board Games:</strong> Strategic games for two</li>
      </ul>
      
      <h3>Quiet Outdoor Activities</h3>
      <ul>
        <li><strong>Nature Walks:</strong> Peaceful trails and parks</li>
        <li><strong>Picnics:</strong> Secluded spots with beautiful views</li>
        <li><strong>Stargazing:</strong> Quiet nights under the stars</li>
        <li><strong>Gardening:</strong> Working together in nature</li>
      </ul>
      
      <h3>Cultural Activities</h3>
      <ul>
        <li><strong>Art Galleries:</strong> Quiet contemplation of art</li>
        <li><strong>Museums:</strong> Learning together in peaceful settings</li>
        <li><strong>Bookstores:</strong> Browsing and discussing literature</li>
        <li><strong>Tea Houses:</strong> Intimate conversations over tea</li>
      </ul>
      
      <h3>Tips for Success</h3>
      <p>Plan activities that allow for deep conversation, avoid crowded places, and give each other space to recharge when needed.</p>
    `,
    author: "Emma Thompson",
    date: "10 Jan, 2025",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=1200&auto=format&fit=crop",
    tags: ["Introverts", "Quiet", "Intimate", "Home"],
    readTime: "6 min read",
  },
  {
    id: "p4",
    title: "How to Plan the Perfect Coffee Date",
    excerpt:
      "From choosing the right café to conversation starters - master the art of the coffee date.",
    content: `
      <h2>The Art of the Coffee Date</h2>
      <p>Coffee dates are perfect for first meetings, casual catch-ups, and intimate conversations. They're low-pressure, affordable, and provide the perfect setting for getting to know someone.</p>
      
      <h3>Choosing the Right Café</h3>
      <ul>
        <li><strong>Atmosphere:</strong> Cozy, not too loud, comfortable seating</li>
        <li><strong>Location:</strong> Convenient for both parties</li>
        <li><strong>Menu:</strong> Good coffee and light food options</li>
        <li><strong>Privacy:</strong> Not too crowded or intimate</li>
      </ul>
      
      <h3>What to Order</h3>
      <p>Keep it simple - coffee, tea, or light snacks. Avoid messy foods that might distract from conversation.</p>
      
      <h3>Conversation Starters</h3>
      <ul>
        <li>Ask about their coffee preferences</li>
        <li>Discuss favorite cafés in the area</li>
        <li>Share weekend plans or hobbies</li>
        <li>Talk about work or studies</li>
      </ul>
      
      <h3>Timing</h3>
      <p>Plan for 1-2 hours. This gives enough time to connect without feeling rushed or awkward.</p>
      
      <h3>Making It Special</h3>
      <ul>
        <li>Arrive a few minutes early</li>
        <li>Put your phone away</li>
        <li>Listen actively</li>
        <li>Share genuine stories</li>
      </ul>
    `,
    author: "Marcus Johnson",
    date: "8 Jan, 2025",
    image:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop",
    tags: ["Coffee", "First Date", "Casual", "Conversation"],
    readTime: "5 min read",
  },
  {
    id: "p5",
    title: "First Date Conversation Topics That Actually Work",
    excerpt:
      "Skip the awkward silences with these engaging topics that help you connect on a deeper level.",
    content: `
      <h2>Mastering First Date Conversations</h2>
      <p>Great conversations are the foundation of any successful relationship. These topics help you connect authentically while avoiding awkward silences.</p>
      
      <h3>Safe Topics to Start</h3>
      <ul>
        <li><strong>Travel:</strong> Share favorite destinations and dream trips</li>
        <li><strong>Food:</strong> Discuss favorite cuisines and restaurants</li>
        <li><strong>Hobbies:</strong> Talk about interests and passions</li>
        <li><strong>Movies/Books:</strong> Share recommendations and favorites</li>
      </ul>
      
      <h3>Getting Personal (Gently)</h3>
      <ul>
        <li><strong>Family:</strong> Share fun stories about siblings or parents</li>
        <li><strong>Childhood:</strong> Discuss favorite memories or places</li>
        <li><strong>Goals:</strong> Talk about dreams and aspirations</li>
        <li><strong>Values:</strong> Share what matters most to you</li>
      </ul>
      
      <h3>Topics to Avoid</h3>
      <ul>
        <li>Past relationships (too personal for first date)</li>
        <li>Controversial topics (politics, religion)</li>
        <li>Complaints about work or life</li>
        <li>Personal problems or drama</li>
      </ul>
      
      <h3>Conversation Tips</h3>
      <ul>
        <li>Ask open-ended questions</li>
        <li>Listen actively and respond thoughtfully</li>
        <li>Share your own experiences</li>
        <li>Keep the mood light and positive</li>
      </ul>
    `,
    author: "Lisa Park",
    date: "5 Jan, 2025",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=1200&auto=format&fit=crop",
    tags: ["Conversation", "First Date", "Communication", "Tips"],
    readTime: "5 min read",
  },
  {
    id: "p6",
    title: "Dating Apps vs Real Life: Finding Love in 2025",
    excerpt:
      "Exploring the pros and cons of digital dating versus meeting someone organically in today's world.",
    content: `
      <h2>The Modern Dating Landscape</h2>
      <p>Today's dating world offers both digital and traditional ways to meet people. Understanding the pros and cons of each approach helps you choose what works best for you.</p>
      
      <h3>Dating Apps</h3>
      <h4>Pros:</h4>
      <ul>
        <li>Access to a larger pool of potential matches</li>
        <li>Convenient and accessible anytime</li>
        <li>Filter options to find compatible people</li>
        <li>Less pressure than approaching someone in person</li>
      </ul>
      
      <h4>Cons:</h4>
      <ul>
        <li>Can feel superficial or transactional</li>
        <li>Hard to gauge chemistry through screens</li>
        <li>Risk of catfishing or misrepresentation</li>
        <li>Can become addictive or overwhelming</li>
      </ul>
      
      <h3>Real Life Dating</h3>
      <h4>Pros:</h4>
      <ul>
        <li>Immediate chemistry and connection</li>
        <li>More authentic interactions</li>
        <li>Shared experiences and contexts</li>
        <li>Natural conversation flow</li>
      </ul>
      
      <h4>Cons:</h4>
      <ul>
        <li>Limited opportunities to meet new people</li>
        <li>More intimidating to approach someone</li>
        <li>Less control over who you meet</li>
        <li>Requires more confidence and social skills</li>
      </ul>
      
      <h3>Finding Balance</h3>
      <p>The best approach often combines both methods. Use apps for convenience while staying open to meeting people organically in your daily life.</p>
    `,
    author: "David Kim",
    date: "3 Jan, 2025",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=1200&auto=format&fit=crop",
    tags: ["Dating Apps", "Real Life", "Modern Dating", "Technology"],
    readTime: "6 min read",
  },
  {
    id: "p7",
    title: "The Art of Flirting: Subtle vs Direct Approaches",
    excerpt:
      "Learn when to be subtle and when to be direct in your romantic pursuits for maximum success.",
    content: `
      <h2>Mastering the Art of Flirting</h2>
      <p>Flirting is an art that balances subtlety with directness. Knowing when to use each approach can make all the difference in your romantic success.</p>
      
      <h3>Subtle Flirting</h3>
      <h4>When to Use:</h4>
      <ul>
        <li>First meetings or early interactions</li>
        <li>Professional or formal settings</li>
        <li>When you're unsure of their interest</li>
        <li>In group settings</li>
      </ul>
      
      <h4>Techniques:</h4>
      <ul>
        <li>Maintain eye contact slightly longer than normal</li>
        <li>Mirror their body language</li>
        <li>Find reasons to touch lightly (arm, shoulder)</li>
        <li>Ask questions that show genuine interest</li>
      </ul>
      
      <h3>Direct Flirting</h3>
      <h4>When to Use:</h4>
      <ul>
        <li>When you're confident they're interested</li>
        <li>In casual, relaxed settings</li>
        <li>When subtlety isn't working</li>
        <li>With people who appreciate honesty</li>
      </ul>
      
      <h4>Techniques:</h4>
      <ul>
        <li>Give genuine compliments</li>
        <li>Express interest directly</li>
        <li>Suggest specific activities together</li>
        <li>Be clear about your intentions</li>
      </ul>
      
      <h3>Reading the Signs</h3>
      <p>Pay attention to their responses. Positive body language, engaged conversation, and reciprocal flirting indicate interest. If they seem uncomfortable, dial it back.</p>
      
      <h3>Confidence is Key</h3>
      <p>Whether subtle or direct, confidence makes flirting more effective. Believe in your worth and approach interactions with genuine interest and respect.</p>
    `,
    author: "Sophie Williams",
    date: "1 Jan, 2025",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=1200&auto=format&fit=crop",
    tags: ["Flirting", "Confidence", "Communication", "Romance"],
    readTime: "6 min read",
  },
  {
    id: "p8",
    title: "Long Distance Dating: Making It Work",
    excerpt:
      "Essential tips and strategies for maintaining a strong connection when miles apart.",
    content: `
      <h2>Thriving in Long Distance Relationships</h2>
      <p>Long distance relationships require extra effort, but they can be incredibly rewarding. With the right strategies, you can maintain a strong connection despite the physical distance.</p>
      
      <h3>Communication is Everything</h3>
      <ul>
        <li><strong>Regular Schedule:</strong> Set consistent times to talk</li>
        <li><strong>Multiple Channels:</strong> Use video calls, texts, and voice messages</li>
        <li><strong>Quality Time:</strong> Focus on meaningful conversations</li>
        <li><strong>Share Daily Life:</strong> Include them in your routine</li>
      </ul>
      
      <h3>Creative Ways to Connect</h3>
      <ul>
        <li><strong>Virtual Dates:</strong> Watch movies together online</li>
        <li><strong>Shared Activities:</strong> Read the same book or cook the same recipe</li>
        <li><strong>Surprise Deliveries:</strong> Send gifts or care packages</li>
        <li><strong>Future Planning:</strong> Discuss visits and long-term goals</li>
      </ul>
      
      <h3>Managing Challenges</h3>
      <ul>
        <li><strong>Time Zones:</strong> Find overlapping free time</li>
        <li><strong>Jealousy:</strong> Build trust through transparency</li>
        <li><strong>Loneliness:</strong> Maintain your own social life</li>
        <li><strong>Miscommunication:</strong> Clarify intentions and feelings</li>
      </ul>
      
      <h3>Making Visits Special</h3>
      <p>Plan meaningful activities, create new memories, and make the most of your time together. Balance romantic moments with everyday experiences.</p>
      
      <h3>Building Toward the Future</h3>
      <p>Discuss your long-term goals and timeline for closing the distance. Having a plan gives you both something to work toward.</p>
    `,
    author: "Ryan Chen",
    date: "28 Dec, 2024",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=1200&auto=format&fit=crop",
    tags: ["Long Distance", "Communication", "Relationships", "Trust"],
    readTime: "7 min read",
  },
  {
    id: "p9",
    title: "Dating Someone with Different Interests: A Guide",
    excerpt:
      "How to navigate relationships when you and your partner have completely different hobbies and passions.",
    content: `
      <h2>Embracing Differences in Relationships</h2>
      <p>Having different interests can actually strengthen your relationship by bringing new perspectives and experiences into your life. The key is learning to appreciate and support each other's passions.</p>
      
      <h3>Benefits of Different Interests</h3>
      <ul>
        <li><strong>Personal Growth:</strong> Learn about new topics and activities</li>
        <li><strong>Independence:</strong> Maintain your own identity</li>
        <li><strong>Excitement:</strong> Discover new things together</li>
        <li><strong>Balance:</strong> Bring different strengths to the relationship</li>
      </ul>
      
      <h3>How to Support Each Other</h3>
      <ul>
        <li><strong>Show Interest:</strong> Ask questions about their hobbies</li>
        <li><strong>Participate Occasionally:</strong> Try their activities sometimes</li>
        <li><strong>Encourage:</strong> Support their goals and achievements</li>
        <li><strong>Respect:</strong> Don't dismiss what they love</li>
      </ul>
      
      <h3>Finding Common Ground</h3>
      <ul>
        <li><strong>Explore Together:</strong> Try new activities neither has done</li>
        <li><strong>Share Values:</strong> Focus on what you both care about</li>
        <li><strong>Create Traditions:</strong> Develop shared experiences</li>
        <li><strong>Compromise:</strong> Alternate between your interests</li>
      </ul>
      
      <h3>Managing Conflicts</h3>
      <p>When interests compete for time or resources, communicate openly about priorities and find solutions that work for both of you.</p>
      
      <h3>Celebrating Differences</h3>
      <p>Remember that your differences make you unique as a couple. Embrace the diversity and use it to enrich your relationship.</p>
    `,
    author: "Maya Patel",
    date: "25 Dec, 2024",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=1200&auto=format&fit=crop",
    tags: ["Differences", "Interests", "Relationships", "Compromise"],
    readTime: "6 min read",
  },
  {
    id: "p10",
    title: "The Science of Attraction: What Really Draws People Together",
    excerpt:
      "Exploring the psychological and biological factors that influence who we're attracted to.",
    content: `
      <h2>Understanding Attraction</h2>
      <p>Attraction is complex, involving both biological and psychological factors. Understanding these elements can help you better navigate the dating world.</p>
      
      <h3>Physical Attraction</h3>
      <ul>
        <li><strong>Symmetry:</strong> Balanced facial features are universally appealing</li>
        <li><strong>Health Indicators:</strong> Clear skin, good posture, energy</li>
        <li><strong>Personal Style:</strong> How someone presents themselves</li>
        <li><strong>Body Language:</strong> Confident, open posture</li>
      </ul>
      
      <h3>Emotional Attraction</h3>
      <ul>
        <li><strong>Similarity:</strong> Shared values, interests, and experiences</li>
        <li><strong>Compatibility:</strong> How well you work together</li>
        <li><strong>Emotional Intelligence:</strong> Understanding and empathy</li>
        <li><strong>Sense of Humor:</strong> Shared laughter and joy</li>
      </ul>
      
      <h3>Psychological Factors</h3>
      <ul>
        <li><strong>Proximity:</strong> Being around each other regularly</li>
        <li><strong>Reciprocity:</strong> Mutual interest and effort</li>
        <li><strong>Mystery:</strong> Having layers to discover</li>
        <li><strong>Challenge:</strong> Not being too easily available</li>
      </ul>
      
      <h3>Cultural Influences</h3>
      <p>Social norms, media, and cultural background all shape our ideas of attractiveness. Be aware of these influences while staying true to yourself.</p>
      
      <h3>Building Attraction</h3>
      <ul>
        <li>Take care of your physical and mental health</li>
        <li>Develop your interests and passions</li>
        <li>Practice good communication skills</li>
        <li>Be authentic and genuine</li>
      </ul>
    `,
    author: "Dr. James Wilson",
    date: "22 Dec, 2024",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=1200&auto=format&fit=crop",
    tags: ["Attraction", "Psychology", "Science", "Relationships"],
    readTime: "7 min read",
  },
  {
    id: "p11",
    title: "Budget-Friendly Date Ideas That Still Feel Special",
    excerpt:
      "Romantic and memorable date activities that won't break the bank but will create lasting memories.",
    content: `
      <h2>Romance on a Budget</h2>
      <p>Great dates don't have to be expensive. With creativity and thoughtfulness, you can create memorable experiences that strengthen your connection without straining your wallet.</p>
      
      <h3>Free Activities</h3>
      <ul>
        <li><strong>Nature Walks:</strong> Explore local parks and trails</li>
        <li><strong>Museum Days:</strong> Many museums have free admission days</li>
        <li><strong>Library Dates:</strong> Browse books and read together</li>
        <li><strong>Sunset Watching:</strong> Find a beautiful spot to watch the sunset</li>
      </ul>
      
      <h3>Low-Cost Options</h3>
      <ul>
        <li><strong>Coffee Shops:</strong> Intimate conversations over coffee</li>
        <li><strong>Farmer's Markets:</strong> Browse and sample local goods</li>
        <li><strong>Thrift Shopping:</strong> Hunt for treasures together</li>
        <li><strong>Picnics:</strong> Pack homemade food for outdoor dining</li>
      </ul>
      
      <h3>At-Home Dates</h3>
      <ul>
        <li><strong>Cooking Together:</strong> Prepare a meal from scratch</li>
        <li><strong>Movie Night:</strong> Create a cozy cinema experience</li>
        <li><strong>Game Night:</strong> Play board games or card games</li>
        <li><strong>Dance Party:</strong> Create playlists and dance together</li>
      </ul>
      
      <h3>Creative Ideas</h3>
      <ul>
        <li><strong>Photo Scavenger Hunt:</strong> Take pictures of specific items</li>
        <li><strong>Volunteer Together:</strong> Give back to your community</li>
        <li><strong>Learn Something New:</strong> Take a free online class together</li>
        <li><strong>Write Letters:</strong> Exchange handwritten notes</li>
      </ul>
      
      <h3>Making It Special</h3>
      <p>The key to budget-friendly dates is thoughtfulness. Put effort into planning, personalize the experience, and focus on quality time together.</p>
    `,
    author: "Jessica Lee",
    date: "20 Dec, 2024",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=1200&auto=format&fit=crop",
    tags: ["Budget", "Creative", "Romance", "Affordable"],
    readTime: "6 min read",
  },
  {
    id: "p12",
    title: "How to Know When You're Ready for a Relationship",
    excerpt:
      "Signs that indicate you're emotionally prepared to commit to a serious romantic relationship.",
    content: `
      <h2>Recognizing Relationship Readiness</h2>
      <p>Being ready for a relationship involves emotional maturity, self-awareness, and the ability to commit to another person. Here are the key indicators that you're prepared for this important step.</p>
      
      <h3>Emotional Readiness</h3>
      <ul>
        <li><strong>Self-Love:</strong> You're comfortable with who you are</li>
        <li><strong>Emotional Stability:</strong> You can handle ups and downs</li>
        <li><strong>Past Healing:</strong> You've processed previous relationships</li>
        <li><strong>Independence:</strong> You're not looking for someone to complete you</li>
      </ul>
      
      <h3>Life Readiness</h3>
      <ul>
        <li><strong>Stable Foundation:</strong> Your life is relatively settled</li>
        <li><strong>Time Availability:</strong> You can make time for someone else</li>
        <li><strong>Financial Stability:</strong> You're not dependent on a partner</li>
        <li><strong>Personal Goals:</strong> You know what you want in life</li>
      </ul>
      
      <h3>Communication Skills</h3>
      <ul>
        <li><strong>Open Expression:</strong> You can share your feelings honestly</li>
        <li><strong>Active Listening:</strong> You genuinely hear your partner</li>
        <li><strong>Conflict Resolution:</strong> You can work through disagreements</li>
        <li><strong>Boundaries:</strong> You know how to set and respect limits</li>
      </ul>
      
      <h3>Commitment Indicators</h3>
      <ul>
        <li><strong>Future Thinking:</strong> You can envision a long-term partnership</li>
        <li><strong>Compromise Willingness:</strong> You're ready to make sacrifices</li>
        <li><strong>Trust Building:</strong> You can be vulnerable and trusting</li>
        <li><strong>Growth Mindset:</strong> You're committed to growing together</li>
      </ul>
      
      <h3>Red Flags to Watch For</h3>
      <p>If you're still healing from past trauma, feeling desperate for love, or looking for someone to fix your problems, you might not be ready yet.</p>
      
      <h3>Taking the Next Step</h3>
      <p>When you feel confident in these areas, you're likely ready to pursue a meaningful relationship. Trust your instincts and take things at your own pace.</p>
    `,
    author: "Michael Brown",
    date: "18 Dec, 2024",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=1200&auto=format&fit=crop",
    tags: ["Readiness", "Relationships", "Emotional Health", "Commitment"],
    readTime: "7 min read",
  },
];

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const post = blogPosts.find((p) => p.id === slug);

  if (!post) {
    return (
      <Layout>
        <Box sx={{ px: { xs: 2, md: 6 }, py: { xs: 3, md: 6 } }}>
          <Typography variant="h4" textAlign="center" sx={{ mb: 4 }}>
            Blog Post Not Found
          </Typography>
          <Box textAlign="center">
            <Button
              variant="contained"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate("/blog")}
              sx={{ mb: 2 }}
            >
              Back to Blog
            </Button>
          </Box>
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box sx={{ px: { xs: 2, md: 6 }, py: { xs: 3, md: 6 } }}>
        {/* Back Button */}
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/blog")}
          sx={{ mb: 4 }}
        >
          Back to Blog
        </Button>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper
              elevation={0}
              sx={{
                border: (t) => `1px solid ${t.palette.divider}`,
                borderRadius: 1,
                overflow: "hidden",
                bgcolor: "#fff",
              }}
            >
              {/* Featured Image */}
              <Box
                sx={{
                  position: "relative",
                  pt: "56.25%",
                  backgroundImage: `url(${post.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: 2,
                }}
              />

              {/* Content */}
              <Box sx={{ p: { xs: 3, md: 4 } }}>
                {/* Title */}
                <Typography variant="h3" fontWeight={800} gutterBottom>
                  {post.title}
                </Typography>

                {/* Meta Info */}
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  sx={{ mb: 3 }}
                >
                  <Avatar sx={{ width: 40, height: 40 }}>
                    {post.author[0]}
                  </Avatar>
                  <Box>
                    <Typography variant="body1" fontWeight={600}>
                      {post.author}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {post.date} • {post.readTime}
                    </Typography>
                  </Box>
                </Stack>

                {/* Tags */}
                <Stack direction="row" spacing={1} sx={{ mb: 4 }}>
                  {post.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      variant="outlined"
                      sx={{ borderRadius: 2 }}
                    />
                  ))}
                </Stack>

                {/* Content */}
                <Box
                  sx={{
                    "& h2": {
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      mt: 4,
                      mb: 2,
                      color: "text.primary",
                    },
                    "& h3": {
                      fontSize: "1.25rem",
                      fontWeight: 600,
                      mt: 3,
                      mb: 1.5,
                      color: "text.primary",
                    },
                    "& p": {
                      fontSize: "1rem",
                      lineHeight: 1.7,
                      mb: 2,
                      color: "text.secondary",
                    },
                    "& ul": {
                      pl: 3,
                      mb: 2,
                    },
                    "& li": {
                      fontSize: "1rem",
                      lineHeight: 1.7,
                      mb: 1,
                      color: "text.secondary",
                    },
                    "& strong": {
                      fontWeight: 600,
                      color: "text.primary",
                    },
                  }}
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </Box>
            </Paper>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              {/* Author Info */}
              <Paper
                elevation={0}
                sx={{
                  border: (t) => `1px solid ${t.palette.divider}`,
                  borderRadius: 1,
                  p: 3,
                  bgcolor: "#fff",
                }}
              >
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  sx={{ mb: 2 }}
                >
                  <Avatar sx={{ width: 60, height: 60 }}>
                    {post.author[0]}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight={600}>
                      {post.author}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Dating & Relationship Writer
                    </Typography>
                  </Box>
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  Passionate about helping couples create meaningful connections
                  through thoughtful date planning and relationship advice.
                </Typography>
              </Paper>

              {/* Related Posts */}
              <Paper
                elevation={0}
                sx={{
                  border: (t) => `1px solid ${t.palette.divider}`,
                  borderRadius: 1,
                  p: 3,
                  bgcolor: "#fff",
                }}
              >
                <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                  More Date Ideas
                </Typography>
                <Stack spacing={2}>
                  {blogPosts
                    .filter((p) => p.id !== post.id)
                    .slice(0, 3)
                    .map((relatedPost) => (
                      <Box
                        key={relatedPost.id}
                        sx={{
                          cursor: "pointer",
                          "&:hover": { opacity: 0.8 },
                        }}
                        onClick={() => navigate(`/blog/${relatedPost.id}`)}
                      >
                        <Typography
                          variant="body2"
                          fontWeight={600}
                          sx={{ mb: 0.5 }}
                        >
                          {relatedPost.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {relatedPost.readTime}
                        </Typography>
                      </Box>
                    ))}
                </Stack>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
}
