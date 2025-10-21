import React, { createContext, ReactNode, useContext, useState } from "react";
import { Review } from "../pages/sales/data/salesHistoryData";

interface ReviewContextType {
  reviews: Review[];
  addReview: (planId: string, review: Omit<Review, "id">) => void;
  getReviewByPlanId: (planId: string) => Review | undefined;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export const useReviewContext = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error("useReviewContext must be used within a ReviewProvider");
  }
  return context;
};

interface ReviewProviderProps {
  children: ReactNode;
}

export const ReviewProvider: React.FC<ReviewProviderProps> = ({ children }) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  const addReview = (planId: string, reviewData: Omit<Review, "id">) => {
    const newReview: Review = {
      ...reviewData,
      id: `review_${Date.now()}`,
    };
    setReviews((prev) => [...prev, newReview]);
  };

  const getReviewByPlanId = (planId: string) => {
    return reviews.find((review) => review.id.includes(planId));
  };

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        addReview,
        getReviewByPlanId,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};
