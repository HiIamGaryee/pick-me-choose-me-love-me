export interface MovieDataType {
  id: string;
  title: string;
  thumbnail: {
    trending?: {
      small: string;
      large: string;
    };
    regular: {
      small: string;
      medium: string;
      large: string;
    };
  };
  year: number;
  category: string;
  rating: string;
  isBookmarked: boolean;
  isTrending: boolean;
}

export const moviesData = [
  {
    id: "1",
    title: "Beyond Earth",
    thumbnail: {
      trending: {
        small: "./thumbnails/beyond-earth/trending/small.jpg",
        large: "./thumbnails/beyond-earth/trending/large.jpg",
      },
      regular: {
        small: "./thumbnails/beyond-earth/regular/small.jpg",
        medium: "./thumbnails/beyond-earth/regular/medium.jpg",
        large: "./thumbnails/beyond-earth/regular/large.jpg",
      },
    },
    year: 2019,
    category: "Movie",
    rating: "PG",
    isBookmarked: false,
    isTrending: true,
  },
  {
    id: "2",
    title: "Bottom Gear",
    thumbnail: {
      trending: {
        small: "./thumbnails/bottom-gear/trending/small.jpg",
        large: "./thumbnails/bottom-gear/trending/large.jpg",
      },
      regular: {
        small: "./thumbnails/bottom-gear/regular/small.jpg",
        medium: "./thumbnails/bottom-gear/regular/medium.jpg",
        large: "./thumbnails/bottom-gear/regular/large.jpg",
      },
    },
    year: 2021,
    category: "Movie",
    rating: "PG",
    isBookmarked: false,
    isTrending: true,
  },
  {
    id: "3",
    title: "Undiscovered Cities",
    thumbnail: {
      trending: {
        small: "./thumbnails/undiscovered-cities/trending/small.jpg",
        large: "./thumbnails/undiscovered-cities/trending/large.jpg",
      },
      regular: {
        small: "./thumbnails/undiscovered-cities/regular/small.jpg",
        medium: "./thumbnails/undiscovered-cities/regular/medium.jpg",
        large: "./thumbnails/undiscovered-cities/regular/large.jpg",
      },
    },
    year: 2019,
    category: "TV Series",
    rating: "E",
    isBookmarked: false,
    isTrending: true,
  },
  {
    id: "4",
    title: "1998",
    thumbnail: {
      trending: {
        small: "./thumbnails/1998/trending/small.jpg",
        large: "./thumbnails/1998/trending/large.jpg",
      },
      regular: {
        small: "./thumbnails/1998/regular/small.jpg",
        medium: "./thumbnails/1998/regular/medium.jpg",
        large: "./thumbnails/1998/regular/large.jpg",
      },
    },
    year: 2021,
    category: "Movie",
    rating: "18+",
    isBookmarked: false,
    isTrending: true,
  },
  {
    id: "5",
    title: "Dark Side of the Moon",
    thumbnail: {
      trending: {
        small: "./thumbnails/dark-side-of-the-moon/trending/small.jpg",
        large: "./thumbnails/dark-side-of-the-moon/trending/large.jpg",
      },
      regular: {
        small: "./thumbnails/dark-side-of-the-moon/regular/small.jpg",
        medium: "./thumbnails/dark-side-of-the-moon/regular/medium.jpg",
        large: "./thumbnails/dark-side-of-the-moon/regular/large.jpg",
      },
    },
    year: 2018,
    category: "TV Series",
    rating: "PG",
    isBookmarked: true,
    isTrending: true,
  },
  {
    id: "6",
    title: "The Great Lands",
    thumbnail: {
      regular: {
        small: "./thumbnails/the-great-lands/regular/small.jpg",
        medium: "./thumbnails/the-great-lands/regular/medium.jpg",
        large: "./thumbnails/the-great-lands/regular/large.jpg",
      },
    },
    year: 2019,
    category: "Movie",
    rating: "E",
    isBookmarked: false,
    isTrending: false,
  },
  {
    id: "7",
    title: "The Diary",
    thumbnail: {
      regular: {
        small: "./thumbnails/the-diary/regular/small.jpg",
        medium: "./thumbnails/the-diary/regular/medium.jpg",
        large: "./thumbnails/the-diary/regular/large.jpg",
      },
    },
    year: 2019,
    category: "TV Series",
    rating: "PG",
    isBookmarked: false,
    isTrending: false,
  },
  {
    id: "8",
    title: "Earth’s Untouched",
    thumbnail: {
      regular: {
        small: "./thumbnails/earths-untouched/regular/small.jpg",
        medium: "./thumbnails/earths-untouched/regular/medium.jpg",
        large: "./thumbnails/earths-untouched/regular/large.jpg",
      },
    },
    year: 2017,
    category: "Movie",
    rating: "18+",
    isBookmarked: true,
    isTrending: false,
  },
  {
    id: "9",
    title: "No Land Beyond",
    thumbnail: {
      regular: {
        small: "./thumbnails/no-land-beyond/regular/small.jpg",
        medium: "./thumbnails/no-land-beyond/regular/medium.jpg",
        large: "./thumbnails/no-land-beyond/regular/large.jpg",
      },
    },
    year: 2019,
    category: "Movie",
    rating: "E",
    isBookmarked: false,
    isTrending: false,
  },
  {
    id: "10",
    title: "During the Hunt",
    thumbnail: {
      regular: {
        small: "./thumbnails/during-the-hunt/regular/small.jpg",
        medium: "./thumbnails/during-the-hunt/regular/medium.jpg",
        large: "./thumbnails/during-the-hunt/regular/large.jpg",
      },
    },
    year: 2016,
    category: "TV Series",
    rating: "PG",
    isBookmarked: false,
    isTrending: false,
  },
  {
    id: "11",
    title: "Autosport the Series",
    thumbnail: {
      regular: {
        small: "./thumbnails/autosport-the-series/regular/small.jpg",
        medium: "./thumbnails/autosport-the-series/regular/medium.jpg",
        large: "./thumbnails/autosport-the-series/regular/large.jpg",
      },
    },
    year: 2016,
    category: "TV Series",
    rating: "18+",
    isBookmarked: false,
    isTrending: false,
  },
  {
    id: "12",
    title: "Same Answer II",
    thumbnail: {
      regular: {
        small: "./thumbnails/same-answer-2/regular/small.jpg",
        medium: "./thumbnails/same-answer-2/regular/medium.jpg",
        large: "./thumbnails/same-answer-2/regular/large.jpg",
      },
    },
    year: 2017,
    category: "Movie",
    rating: "E",
    isBookmarked: false,
    isTrending: false,
  },
  {
    id: "13",
    title: "Below Echo",
    thumbnail: {
      regular: {
        small: "./thumbnails/below-echo/regular/small.jpg",
        medium: "./thumbnails/below-echo/regular/medium.jpg",
        large: "./thumbnails/below-echo/regular/large.jpg",
      },
    },
    year: 2016,
    category: "TV Series",
    rating: "PG",
    isBookmarked: false,
    isTrending: false,
  },
  {
    id: "14",
    title: "The Rockies",
    thumbnail: {
      regular: {
        small: "./thumbnails/the-rockies/regular/small.jpg",
        medium: "./thumbnails/the-rockies/regular/medium.jpg",
        large: "./thumbnails/the-rockies/regular/large.jpg",
      },
    },
    year: 2015,
    category: "TV Series",
    rating: "E",
    isBookmarked: true,
    isTrending: false,
  },
  {
    id: "15",
    title: "Relentless",
    thumbnail: {
      regular: {
        small: "./thumbnails/relentless/regular/small.jpg",
        medium: "./thumbnails/relentless/regular/medium.jpg",
        large: "./thumbnails/relentless/regular/large.jpg",
      },
    },
    year: 2017,
    category: "Movie",
    rating: "PG",
    isBookmarked: true,
    isTrending: false,
  },
  {
    id: "16",
    title: "Community of Ours",
    thumbnail: {
      regular: {
        small: "./thumbnails/community-of-ours/regular/small.jpg",
        medium: "./thumbnails/community-of-ours/regular/medium.jpg",
        large: "./thumbnails/community-of-ours/regular/large.jpg",
      },
    },
    year: 2018,
    category: "TV Series",
    rating: "18+",
    isBookmarked: false,
    isTrending: false,
  },
  {
    id: "17",
    title: "Van Life",
    thumbnail: {
      regular: {
        small: "./thumbnails/van-life/regular/small.jpg",
        medium: "./thumbnails/van-life/regular/medium.jpg",
        large: "./thumbnails/van-life/regular/large.jpg",
      },
    },
    year: 2015,
    category: "Movie",
    rating: "PG",
    isBookmarked: false,
    isTrending: false,
  },
  {
    id: "18",
    title: "The Heiress",
    thumbnail: {
      regular: {
        small: "./thumbnails/the-heiress/regular/small.jpg",
        medium: "./thumbnails/the-heiress/regular/medium.jpg",
        large: "./thumbnails/the-heiress/regular/large.jpg",
      },
    },
    year: 2021,
    category: "Movie",
    rating: "PG",
    isBookmarked: true,
    isTrending: false,
  },
  {
    id: "19",
    title: "Off the Track",
    thumbnail: {
      regular: {
        small: "./thumbnails/off-the-track/regular/small.jpg",
        medium: "./thumbnails/off-the-track/regular/medium.jpg",
        large: "./thumbnails/off-the-track/regular/large.jpg",
      },
    },
    year: 2017,
    category: "Movie",
    rating: "18+",
    isBookmarked: true,
    isTrending: false,
  },
  {
    id: "20",
    title: "Whispering Hill",
    thumbnail: {
      regular: {
        small: "./thumbnails/whispering-hill/regular/small.jpg",
        medium: "./thumbnails/whispering-hill/regular/medium.jpg",
        large: "./thumbnails/whispering-hill/regular/large.jpg",
      },
    },
    year: 2017,
    category: "Movie",
    rating: "E",
    isBookmarked: false,
    isTrending: false,
  },
  {
    id: "21",
    title: "112",
    thumbnail: {
      regular: {
        small: "./thumbnails/112/regular/small.jpg",
        medium: "./thumbnails/112/regular/medium.jpg",
        large: "./thumbnails/112/regular/large.jpg",
      },
    },
    year: 2013,
    category: "TV Series",
    rating: "PG",
    isBookmarked: false,
    isTrending: false,
  },
  {
    id: "22",
    title: "Lone Heart",
    thumbnail: {
      regular: {
        small: "./thumbnails/lone-heart/regular/small.jpg",
        medium: "./thumbnails/lone-heart/regular/medium.jpg",
        large: "./thumbnails/lone-heart/regular/large.jpg",
      },
    },
    year: 2017,
    category: "Movie",
    rating: "E",
    isBookmarked: true,
    isTrending: false,
  },
  {
    id: "23",
    title: "Production Line",
    thumbnail: {
      regular: {
        small: "./thumbnails/production-line/regular/small.jpg",
        medium: "./thumbnails/production-line/regular/medium.jpg",
        large: "./thumbnails/production-line/regular/large.jpg",
      },
    },
    year: 2018,
    category: "TV Series",
    rating: "PG",
    isBookmarked: false,
    isTrending: false,
  },
  {
    id: "25",
    title: "Dogs",
    thumbnail: {
      regular: {
        small: "./thumbnails/dogs/regular/small.jpg",
        medium: "./thumbnails/dogs/regular/medium.jpg",
        large: "./thumbnails/dogs/regular/large.jpg",
      },
    },
    year: 2016,
    category: "TV Series",
    rating: "E",
    isBookmarked: true,
    isTrending: false,
  },
  {
    id: "26",
    title: "Asia in 24 Days",
    thumbnail: {
      regular: {
        small: "./thumbnails/asia-in-24-days/regular/small.jpg",
        medium: "./thumbnails/asia-in-24-days/regular/medium.jpg",
        large: "./thumbnails/asia-in-24-days/regular/large.jpg",
      },
    },
    year: 2020,
    category: "TV Series",
    rating: "PG",
    isBookmarked: false,
    isTrending: false,
  },
  {
    id: "27",
    title: "The Tasty Tour",
    thumbnail: {
      regular: {
        small: "./thumbnails/the-tasty-tour/regular/small.jpg",
        medium: "./thumbnails/the-tasty-tour/regular/medium.jpg",
        large: "./thumbnails/the-tasty-tour/regular/large.jpg",
      },
    },
    year: 2016,
    category: "TV Series",
    rating: "PG",
    isBookmarked: false,
    isTrending: false,
  },
  {
    id: "28",
    title: "Darker",
    thumbnail: {
      regular: {
        small: "./thumbnails/darker/regular/small.jpg",
        medium: "./thumbnails/darker/regular/medium.jpg",
        large: "./thumbnails/darker/regular/large.jpg",
      },
    },
    year: 2017,
    category: "Movie",
    rating: "18+",
    isBookmarked: true,
    isTrending: false,
  },
  {
    id: "29",
    title: "Unresolved Cases",
    thumbnail: {
      regular: {
        small: "./thumbnails/unresolved-cases/regular/small.jpg",
        medium: "./thumbnails/unresolved-cases/regular/medium.jpg",
        large: "./thumbnails/unresolved-cases/regular/large.jpg",
      },
    },
    year: 2018,
    category: "TV Series",
    rating: "18+",
    isBookmarked: false,
    isTrending: false,
  },
  {
    id: "30",
    title: "Mission: Saturn",
    thumbnail: {
      regular: {
        small: "./thumbnails/mission-saturn/regular/small.jpg",
        medium: "./thumbnails/mission-saturn/regular/medium.jpg",
        large: "./thumbnails/mission-saturn/regular/large.jpg",
      },
    },
    year: 2017,
    category: "Movie",
    rating: "PG",
    isBookmarked: true,
    isTrending: false,
  },
];

export const dateData = [
  {
    plan_id: "plan_001",
    owner: {
      user_id: "user_101",
      name: "Jamie",
      age_range: "25-30",
      gender: "Female",
      sexuality: "Straight",
      occupation: "UX Designer",
      hobbies: ["Skateboarding", "Wall bouldering", "Coffee tasting", "Indie films"],
      bio: "Half caffeine, half chaos. Believes good dates start with bad jokes."
    },
    date_plan: {
      title: "Boulders, Brew & Banter",
      description: "Let’s spend the day climbing, caffeinating, and laughing — from morning bouldering to sunset walks and dinner that’s more about the vibe than the menu.",
      activities: [
        "Morning wall bouldering at Camp5",
        "Coffee tasting at VCR Café",
        "Evening stroll at Desa ParkCity",
        "Dinner at a cozy pasta bar"
      ],
      tags: ["Active", "Coffee", "Chill", "Fun"],
      location: {
        place_name: "Klang Valley",
        city: "Petaling Jaya",
        country: "Malaysia"
      },
      budget_range: "RM80–RM120 per person",
      duration: "Full day",
      date_time: "Saturday, flexible",
      vibe: "Adventurous, relaxed, caffeine-fueled.",
      looking_for: {
        preferred_gender: "Male",
        preferred_age_range: "25–35",
        preferred_vibe: "Chill, outdoorsy, can laugh when falling off the wall."
      },
      plan_status: "Active",
      created_at: "2025-10-12T14:35:00Z"
    },
    tokens: [
      {
        plan_id: "plan_001",
        remaining_edits: 2,
        used_edits: 1,
        can_delete_free: false,
        token_balance: 3
      },
      {
        plan_id: "plan_002",
        remaining_edits: 3,
        used_edits: 0,
        can_delete_free: true,
        token_balance: 5
      }
    ],
    ratings: {
      total_dates: 2,
      average_score: 4.6
    }
  },
  {
    plan_id: "plan_002",
    owner: {
      user_id: "user_102",
      name: "Riley",
      age_range: "27-32",
      gender: "Male",
      sexuality: "Gay",
      occupation: "Barista & Music Producer",
      hobbies: ["Guitar", "Cooking", "Photography", "Night markets"],
      bio: "If love had latte art, I’d make it heart-shaped. Looking for someone who dances off-beat but means it."
    },
    date_plan: {
      title: "Groove, Grind & Glow",
      description: "A day of vibes — start with brunch beats, stroll through a local art market, record a quick jam, and end with rooftop cocktails.",
      activities: [
        "Brunch with live music at The Hungry Tapir",
        "Photo walk at Zhongshan Building",
        "Mini jam session at my studio",
        "Sunset drinks at Wet Deck, W Hotel"
      ],
      tags: ["Music", "Art", "Relaxed", "Creative"],
      location: {
        place_name: "Kuala Lumpur",
        city: "Kuala Lumpur",
        country: "Malaysia"
      },
      budget_range: "RM100–RM150 per person",
      duration: "Full day",
      date_time: "Sunday afternoon",
      vibe: "Artistic, spontaneous, meaningful.",
      looking_for: {
        preferred_gender: "Male",
        preferred_age_range: "25–35",
        preferred_vibe: "Warm, talkative, creative."
      },
      plan_status: "Active",
      created_at: "2025-10-12T09:20:00Z"
    },
    tokens: [
      {
        plan_id: "plan_002",
        remaining_edits: 1,
        used_edits: 2,
        can_delete_free: false,
        token_balance: 2
      }
    ],
    ratings: {
      total_dates: 3,
      average_score: 4.8
    }
  },
  {
    plan_id: "plan_003",
    owner: {
      user_id: "user_103",
      name: "Ava",
      age_range: "24-28",
      gender: "Female",
      sexuality: "Bisexual",
      occupation: "Marketing Specialist",
      hobbies: ["Painting", "Yoga", "Brunch hopping", "Reading rom-coms"],
      bio: "I love art galleries, iced lattes, and people who can match sarcasm with kindness."
    },
    date_plan: {
      title: "Canvas, Croissants & Conversations",
      description: "Start with a morning art class, grab croissants, visit a hidden bookstore, and finish with rooftop tea — gentle chaos guaranteed.",
      activities: [
        "Painting workshop at Art & Bonding",
        "Pastry stop at Huckleberry",
        "Hidden bookstore exploration",
        "Evening tea at The Roof"
      ],
      tags: ["Art", "Calm", "Foodie", "Creative"],
      location: {
        place_name: "Bangsar & Damansara",
        city: "Kuala Lumpur",
        country: "Malaysia"
      },
      budget_range: "RM60–RM100 per person",
      duration: "Full day",
      date_time: "Weekend, flexible timing",
      vibe: "Cozy, artsy, low-key romantic.",
      looking_for: {
        preferred_gender: "Any",
        preferred_age_range: "23–32",
        preferred_vibe: "Kind, witty, and open-minded."
      },
      plan_status: "Active",
      created_at: "2025-10-11T17:45:00Z"
    },
    tokens: [
      {
        plan_id: "plan_003",
        remaining_edits: 3,
        used_edits: 0,
        can_delete_free: true,
        token_balance: 4
      }
    ],
    ratings: {
      total_dates: 1,
      average_score: 4.4
    }
  },
  {
    plan_id: "plan_004",
    owner: {
      user_id: "user_104",
      name: "Leo",
      age_range: "29-35",
      gender: "Male",
      sexuality: "Straight",
      occupation: "Software Engineer",
      hobbies: ["Gaming", "Cooking", "Running", "Anime"],
      bio: "Equal parts code and curry. Can cook, can debug, sometimes can dance."
    },
    date_plan: {
      title: "Food, Film & Midnight Drive",
      description: "Let’s cook lunch together, catch a late movie, then hit a quiet midnight drive — music optional, conversation not.",
      activities: [
        "Cooking class at ABC Culinary Studio",
        "Evening movie at TGV Pavilion",
        "Midnight drive to Genting viewpoint",
        "Late supper with hot cocoa"
      ],
      tags: ["Chill", "Romantic", "Movie", "Food"],
      location: {
        place_name: "Kuala Lumpur – Genting",
        city: "Kuala Lumpur",
        country: "Malaysia"
      },
      budget_range: "RM90–RM130 per person",
      duration: "Full day",
      date_time: "Saturday evening till midnight",
      vibe: "Comfortable, cinematic, low drama.",
      looking_for: {
        preferred_gender: "Female",
        preferred_age_range: "25–32",
        preferred_vibe: "Sweet, easygoing, laughs easily."
      },
      plan_status: "Active",
      created_at: "2025-10-10T11:00:00Z"
    },
    tokens: [
      {
        plan_id: "plan_004",
        remaining_edits: 2,
        used_edits: 1,
        can_delete_free: false,
        token_balance: 3
      }
    ],
    ratings: {
      total_dates: 2,
      average_score: 4.7
    }
  },
  {
    plan_id: "plan_005",
    owner: {
      user_id: "user_105",
      name: "Kai",
      age_range: "26-31",
      gender: "Female",
      sexuality: "Lesbian",
      occupation: "Event Planner",
      hobbies: ["Surfing", "Photography", "Live concerts", "Skateboarding"],
      bio: "Sunburned, slightly sarcastic, and probably thinking about my next trip."
    },
    date_plan: {
      title: "Waves, Wheels & Chill",
      description: "A whole-day adventure — sunrise surf, brunch by the beach, afternoon skating, and a sunset photo walk.",
      activities: [
        "Sunrise surf at Cherating Beach",
        "Brunch at beachside café",
        "Skate session at Kuantan Skatepark",
        "Sunset photo walk along the coast",
        "Dinner with sea breeze and stories"
      ],
      tags: ["Outdoor", "Adventure", "Beach", "Photography"],
      location: {
        place_name: "Cherating Beach",
        city: "Kuantan",
        country: "Malaysia"
      },
      budget_range: "RM100–RM180 per person",
      duration: "Full day",
      date_time: "Sunday, sunrise start",
      vibe: "Active, beachy, spontaneous.",
      looking_for: {
        preferred_gender: "Female",
        preferred_age_range: "24–35",
        preferred_vibe: "Free-spirited, sporty, fun."
      },
      plan_status: "Active",
      created_at: "2025-10-09T08:00:00Z"
    },
    tokens: [
      {
        plan_id: "plan_005",
        remaining_edits: 3,
        used_edits: 0,
        can_delete_free: true,
        token_balance: 5
      },
      {
        plan_id: "plan_006",
        remaining_edits: 2,
        used_edits: 1,
        can_delete_free: false,
        token_balance: 2
      }
    ],
    ratings: {
      total_dates: 1,
      average_score: 4.5
    }
  }
];
