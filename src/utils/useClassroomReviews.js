import { useEffect, useState } from "react";
import {
  createClassroomReview,
  deleteClassroomReview,
  getClassroomReviews,
} from "../api/classroomApi";
import { findMyReview } from "./reviewSummary";

function useClassroomReviews(classroomId) {
  const [reviews, setReviews] = useState([]);
  const [myReviewId, setMyReviewId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadReviews = async () => {
    if (!classroomId) {
      setReviews([]);
      setMyReviewId(null);
      return { reviews: [], myReviewId: null };
    }

    setIsLoading(true);

    try {
      const response = await getClassroomReviews(classroomId);
      setReviews(response?.reviews ?? []);
      setMyReviewId(response?.myReviewId ?? null);
      return response;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, [classroomId]);

  const submitReview = async (tagIds) => {
    const response = await createClassroomReview(classroomId, { tagIds });
    await loadReviews();
    return response;
  };

  const removeReview = async (reviewId) => {
    const response = await deleteClassroomReview(classroomId, reviewId);
    await loadReviews();
    return response;
  };

  return {
    reviews,
    myReviewId,
    myReview: findMyReview(reviews, myReviewId),
    isLoading,
    refreshReviews: loadReviews,
    submitReview,
    removeReview,
  };
}

export default useClassroomReviews;
