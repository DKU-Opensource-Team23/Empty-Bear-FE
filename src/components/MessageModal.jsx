function MessageModal({
  isOpen,
  title = "알림",
  message,
  confirmLabel = "확인",
  cancelLabel,
  onConfirm,
  onClose,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <section
        className="preference-modal message-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="message-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="message-modal-body">
          <h2 id="message-modal-title">{title}</h2>
          <p>{message}</p>
        </div>

        <div className="review-submit-row">
          {cancelLabel && (
            <button className="ghost-button" onClick={onClose}>
              {cancelLabel}
            </button>
          )}
          <button className="primary-button" onClick={onConfirm ?? onClose}>
            {confirmLabel}
          </button>
        </div>
      </section>
    </div>
  );
}

export default MessageModal;
