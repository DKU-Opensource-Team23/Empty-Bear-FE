import { useState } from "react";
import ReviewWriteModal from "../components/ReviewWriteModal";
import useClassroomReviews from "../utils/useClassroomReviews";

function ReviewPage({ classroom, onBack }) {
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const { reviews, myReview, isLoading, submitReview, removeReview } =
    useClassroomReviews(classroom.classroomId);

  const handleDelete = async () => {
    if (!myReview) {
      return;
    }

    const isConfirmed = window.confirm("내 리뷰를 삭제할까요?");

    if (!isConfirmed) {
      return;
    }

    try {
      const response = await removeReview(myReview.reviewId);
      alert(response?.message || "리뷰가 삭제되었습니다.");
    } catch (error) {
      alert(error.message || "리뷰 삭제에 실패했습니다.");
    }
  };

  return (
    <main className="page">
      <button className="back-button" onClick={onBack}>
        ← 뒤로가기
      </button>

      <div className="review-page-header">
        <span>{classroom.buildingName}</span>
        <h1>{classroom.roomName} 리뷰</h1>
      </div>

      <section className="review-box review-my-box">
        <div className="page-title-row">
          <h2>내 리뷰</h2>
          {!myReview && (
            <button
              className="primary-button"
              onClick={() => setIsWriteModalOpen(true)}
            >
              리뷰 작성
            </button>
          )}
        </div>

        {myReview ? (
          <>
            <div className="review-list-item my-review-item">
              {(myReview.tags ?? []).map((tag) => (
                <span key={tag.tagId ?? tag.displayName}>{tag.displayName}</span>
              ))}
            </div>
            <div className="review-submit-row">
              <button className="ghost-button danger-button" onClick={handleDelete}>
                삭제
              </button>
            </div>
          </>
        ) : (
          <div className="empty-state">아직 작성한 리뷰가 없습니다.</div>
        )}
      </section>

      <section className="review-list-box">
        <h2>전체 리뷰</h2>

        {isLoading ? (
          <div className="empty-state">리뷰를 불러오는 중입니다.</div>
        ) : reviews.length === 0 ? (
          <p className="empty-review">아직 작성된 리뷰가 없습니다.</p>
        ) : (
          reviews.map((review) => (
            <div key={review.reviewId} className="review-list-item">
              <strong className="review-author-name">
                {review.user?.nickname ?? "익명"}
              </strong>
              {(review.tags ?? []).map((tag) => (
                <span key={tag.tagId ?? tag.displayName}>{tag.displayName}</span>
              ))}
            </div>
          ))
        )}
      </section>

      <ReviewWriteModal
        isOpen={isWriteModalOpen}
        classroom={classroom}
        onClose={() => setIsWriteModalOpen(false)}
        onSubmit={submitReview}
      />
    </main>
  );
}

export default ReviewPage;
