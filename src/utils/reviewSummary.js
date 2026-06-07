export function getReviewTagKey(tag) {
  if (tag?.code) {
    return tag.code;
  }

  if (tag?.tagId !== undefined && tag?.tagId !== null) {
    return String(tag.tagId);
  }

  return tag?.displayName ?? "";
}

export function summarizeReviewTags(reviews) {
  const summaryMap = new Map();

  (reviews ?? []).forEach((review) => {
    (review.tags ?? []).forEach((tag) => {
      const key = getReviewTagKey(tag);

      if (!key) {
        return;
      }

      const existing = summaryMap.get(key);

      if (existing) {
        existing.count += 1;
        return;
      }

      summaryMap.set(key, {
        key,
        count: 1,
        displayName: tag.displayName ?? key,
      });
    });
  });

  return Array.from(summaryMap.values()).sort((left, right) => {
    if (right.count !== left.count) {
      return right.count - left.count;
    }

    return left.displayName.localeCompare(right.displayName, "ko");
  });
}

export function findMyReview(reviews, myReviewId) {
  if (!myReviewId) {
    return null;
  }

  return (reviews ?? []).find((review) => review.reviewId === myReviewId) ?? null;
}
