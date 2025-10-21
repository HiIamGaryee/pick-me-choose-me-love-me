export interface Review {
  id: string;
  rating: number; // 1-5 stars
  comment: string;
  reviewerName: string;
  reviewDate: string;
}

export interface SalesHistoryItem {
  plan_id: string;
  owner: {
    user_id: string;
    name: string;
    avatar: string;
    age_range: string;
    gender: string;
    looking_for_gender: string;
  };
  date_plan: {
    title: string;
    description: string;
    tags: string[];
    location: { city: string };
    timeline: Array<{ time: string; title: string }>;
    plan_status: string;
  };
  location_enhance?: string;
  status: 'completed' | 'upcoming' | 'cancelled';
  joinDate: string;
  scheduledDate: string;
  review?: Review;
}

export const salesHistoryData: SalesHistoryItem[] = [
  {
    plan_id: "history_001",
    owner: {
      user_id: "user_201",
      name: "Sarah",
      avatar: "https://i.pravatar.cc/100?img=15",
      age_range: "26–30",
      gender: "Female",
      looking_for_gender: "Male",
    },
    date_plan: {
      title: "Art Gallery & Coffee Date",
      description: "Explore contemporary art followed by intimate coffee conversations in a cozy café.",
      tags: ["Art", "Coffee", "Cultural"],
      location: { city: "Kuala Lumpur" },
      timeline: [
        { time: "2:00pm", title: "Art gallery tour" },
        { time: "4:30pm", title: "Coffee & conversation" },
        { time: "6:00pm", title: "Evening walk" },
      ],
      plan_status: "Completed",
    },
    status: "completed",
    joinDate: "2024-01-15",
    scheduledDate: "2024-01-20",
    review: {
      id: "review_001",
      rating: 5,
      comment: "Amazing experience! Sarah was wonderful company and the art gallery was beautiful. Highly recommend!",
      reviewerName: "John",
      reviewDate: "2024-01-21",
    },
  },
  {
    plan_id: "history_002",
    owner: {
      user_id: "user_202",
      name: "Mike",
      avatar: "https://i.pravatar.cc/100?img=25",
      age_range: "28–32",
      gender: "Male",
      looking_for_gender: "Female",
    },
    date_plan: {
      title: "Cooking Class & Wine Tasting",
      description: "Learn to cook Italian cuisine together, followed by wine tasting and dinner.",
      tags: ["Cooking", "Food", "Romantic"],
      location: { city: "Petaling Jaya" },
      timeline: [
        { time: "6:00pm", title: "Cooking class starts" },
        { time: "8:00pm", title: "Wine tasting" },
        { time: "9:30pm", title: "Dinner together" },
      ],
      plan_status: "Completed",
    },
    status: "completed",
    joinDate: "2024-01-10",
    scheduledDate: "2024-01-18",
    review: {
      id: "review_002",
      rating: 4,
      comment: "Great cooking experience! Mike was patient and fun. The wine selection was excellent.",
      reviewerName: "Emma",
      reviewDate: "2024-01-19",
    },
  },
  {
    plan_id: "history_003",
    owner: {
      user_id: "user_203",
      name: "Lisa",
      avatar: "https://i.pravatar.cc/100?img=35",
      age_range: "24–28",
      gender: "Female",
      looking_for_gender: "Any",
    },
    date_plan: {
      title: "Hiking Adventure & Picnic",
      description: "Morning hike to scenic viewpoint followed by a picnic lunch with beautiful views.",
      tags: ["Outdoor", "Adventure", "Nature"],
      location: { city: "Cameron Highlands" },
      timeline: [
        { time: "8:00am", title: "Start hiking" },
        { time: "11:00am", title: "Reach viewpoint" },
        { time: "12:00pm", title: "Picnic lunch" },
        { time: "2:00pm", title: "Return hike" },
      ],
      plan_status: "Upcoming",
    },
    status: "upcoming",
    joinDate: "2024-01-25",
    scheduledDate: "2024-02-05",
  },
  {
    plan_id: "history_004",
    owner: {
      user_id: "user_204",
      name: "David",
      avatar: "https://i.pravatar.cc/100?img=45",
      age_range: "30–35",
      gender: "Male",
      looking_for_gender: "Female",
    },
    date_plan: {
      title: "Movie Night & Late Dinner",
      description: "Catch the latest blockbuster followed by dinner at a trendy restaurant.",
      tags: ["Movie", "Dinner", "Night"],
      location: { city: "Kuala Lumpur" },
      timeline: [
        { time: "7:00pm", title: "Movie starts" },
        { time: "9:30pm", title: "Late dinner" },
        { time: "11:00pm", title: "Walk & chat" },
      ],
      plan_status: "Completed",
    },
    status: "completed",
    joinDate: "2024-01-12",
    scheduledDate: "2024-01-22",
    review: {
      id: "review_003",
      rating: 3,
      comment: "Movie was good but David seemed distracted. Dinner was nice though.",
      reviewerName: "Anna",
      reviewDate: "2024-01-23",
    },
  },
  {
    plan_id: "history_005",
    owner: {
      user_id: "user_205",
      name: "Rachel",
      avatar: "https://i.pravatar.cc/100?img=55",
      age_range: "25–29",
      gender: "Female",
      looking_for_gender: "Female",
    },
    date_plan: {
      title: "Spa Day & Brunch",
      description: "Relaxing spa treatments followed by a healthy brunch and wellness conversation.",
      tags: ["Spa", "Wellness", "Relaxing"],
      location: { city: "Bangsar" },
      timeline: [
        { time: "10:00am", title: "Spa treatments" },
        { time: "12:30pm", title: "Healthy brunch" },
        { time: "2:00pm", title: "Wellness chat" },
      ],
      plan_status: "Upcoming",
    },
    status: "upcoming",
    joinDate: "2024-01-28",
    scheduledDate: "2024-02-10",
  },
];

export type SalesHistoryType = typeof salesHistoryData[number];
