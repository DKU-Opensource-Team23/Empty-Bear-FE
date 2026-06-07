import { useEffect, useState } from "react";
import { getReviewTags } from "../api/tagApi";

function ReviewWriteModal({ isOpen, classroom, onClose, onSubmit }) {
  const [reviewTags, setReviewTags] = useState([]);
  const [selectedTagIds, setSelectedTagIds] = useState([]);
  const [isLoadingTags, setIsLoadingTags] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setSelectedTagIds([]);
      return;
    }

    async function loadReviewTags() {
      try {
        setIsLoadingTags(true);
        const response = await getReviewTags();
        setReviewTags(response.tags ?? []);
      } catch (error) {
        alert(error.message || "리뷰 태그를 불러오지 못했습니다.");
      } finally {
        setIsLoadingTags(false);
      }
    }

    loadReviewTags();
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const toggleTag = (tagId) => {
    setSelectedTagIds((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  const handleSubmit = async () => {
    if (selectedTagIds.length === 0) {
      alert("리뷰 태그를 하나 이상 선택해 주세요.");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await onSubmit(selectedTagIds);
      alert(response?.message || "리뷰가 등록되었습니다.");
      onClose();
    } catch (error) {
      alert(error.message || "리뷰 등록에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <section
        className="preference-modal review-write-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-write-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="page-title-row">
          <div>
            <span className="review-modal-caption">{classroom.buildingName}</span>
            <h2 id="review-write-modal-title">{classroom.roomName} 리뷰 작성</h2>
          </div>
        </div>

        <div className="review-question">
          <p>해당 강의실에 맞는 리뷰 태그를 선택해 주세요.</p>
          {isLoadingTags ? (
            <div className="empty-state">리뷰 태그를 불러오는 중입니다.</div>
          ) : (
            <div className="review-choice-row">
              {reviewTags.map((tag) => (
                <button
                  key={tag.tagId}
                  className={`choice-button ${
                    selectedTagIds.includes(tag.tagId) ? "selected" : ""
                  }`}
                  onClick={() => toggleTag(tag.tagId)}
                >
                  {tag.displayName}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="review-submit-row">
          <button className="ghost-button" onClick={onClose}>
            취소
          </button>
          <button
            className="primary-button"
            onClick={handleSubmit}
            disabled={isSubmitting || isLoadingTags}
          >
            {isSubmitting ? "등록 중" : "리뷰 등록"}
          </button>
        </div>
      </section>
    </div>
  );
}

export default ReviewWriteModal;
