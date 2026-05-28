import { useEffect, useState } from "react";
import {
  createClassroomReview,
  getClassroomReviews,
} from "../api/classroomApi";
import { getReviewTags } from "../api/tagApi";

function ReviewPage({ classroom, onBack }) {
  const [reviewTags, setReviewTags] = useState([]);
  const [classroomReviews, setClassroomReviews] = useState([]);
  const [selectedTagIds, setSelectedTagIds] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const quietTagIds = reviewTags
    .filter((tag) => ["QUIET", "NOISY"].includes(tag.code))
    .map((tag) => tag.tagId);
  const outletTagIds = reviewTags
    .filter((tag) => ["OUTLET_ENOUGH", "OUTLET_LACK"].includes(tag.code))
    .map((tag) => tag.tagId);

  useEffect(() => {
    async function loadReviewData() {
      try {
        const [tagResponse, reviewResponse] = await Promise.all([
          getReviewTags(),
          getClassroomReviews(classroom.classroomId),
        ]);

        setReviewTags(tagResponse.tags ?? []);
        setClassroomReviews(reviewResponse.reviews ?? []);
      } catch (error) {
        alert(error.message || "리뷰 정보를 불러오지 못했습니다.");
      }
    }

    loadReviewData();
  }, [classroom.classroomId]);

  const selectTag = (tagId, sameGroupIds) => {
    setSelectedTagIds((prev) => [
      ...prev.filter((id) => !sameGroupIds.includes(id)),
      tagId,
    ]);
  };

  const handleSubmit = async () => {
    const hasQuietTag = selectedTagIds.some((id) => quietTagIds.includes(id));
    const hasOutletTag = selectedTagIds.some((id) => outletTagIds.includes(id));

    if (!hasQuietTag || !hasOutletTag) {
      alert("모든 항목을 선택해주세요.");
      return;
    }

    try {
      setIsSubmitting(true);
      await createClassroomReview(classroom.classroomId, {
        tagIds: selectedTagIds,
      });
      alert("리뷰가 등록되었습니다.");
      onBack();
    } catch (error) {
      alert(error.message || "리뷰 등록에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="page">
      <button className="back-button" onClick={onBack}>
        ← 뒤로가기
      </button>

      <h1>
        {classroom.buildingName} {classroom.roomName} 리뷰 작성
      </h1>

      <section className="review-box review-form-box">
        <div className="review-question">
          <p>조용한가요?</p>
          <div className="review-choice-row">
            {reviewTags
              .filter((tag) => quietTagIds.includes(tag.tagId))
              .map((tag) => (
                <button
                  key={tag.tagId}
                  className={`choice-button ${
                    selectedTagIds.includes(tag.tagId) ? "selected" : ""
                  }`}
                  onClick={() => selectTag(tag.tagId, quietTagIds)}
                >
                  {tag.displayName}
                </button>
              ))}
          </div>
        </div>

        <div className="review-question">
          <p>콘센트가 충분한가요?</p>
          <div className="review-choice-row">
            {reviewTags
              .filter((tag) => outletTagIds.includes(tag.tagId))
              .map((tag) => (
                <button
                  key={tag.tagId}
                  className={`choice-button ${
                    selectedTagIds.includes(tag.tagId) ? "selected" : ""
                  }`}
                  onClick={() => selectTag(tag.tagId, outletTagIds)}
                >
                  {tag.displayName}
                </button>
              ))}
          </div>
        </div>

        <div className="review-submit-row">
          <button
            className="primary-button"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "등록 중" : "리뷰 등록"}
          </button>
        </div>
      </section>

      <section className="review-list-box">
        <h2>작성된 리뷰</h2>

        {classroomReviews.length === 0 ? (
          <p className="empty-review">아직 작성된 리뷰가 없습니다.</p>
        ) : (
          classroomReviews.map((review) => (
            <p key={review.reviewId} className="review-list-item">
              {(review.tags ?? []).map((tag) => tag.displayName).join(" / ")}
            </p>
          ))
        )}
      </section>
    </main>
  );
}

export default ReviewPage;
