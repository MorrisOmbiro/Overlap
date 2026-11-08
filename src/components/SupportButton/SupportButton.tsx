import type React from "react";
import { useSupportDialog } from "../../hooks";
import { getSupportUrl } from "../../utils/support";
import "./SupportButton.css";

const supportUrl = getSupportUrl(import.meta.env.VITE_SUPPORT_URL);

const SupportButton: React.FC = () => {
  const { dialogRef, openSupport, closeSupport } = useSupportDialog();

  return (
    <>
      <button className="support-button" onClick={openSupport}>
        <span aria-hidden="true">♡</span> Support
      </button>
      <dialog
        ref={dialogRef}
        className="support-dialog"
        aria-labelledby="support-title"
      >
        <button
          className="close"
          aria-label="Close support"
          onClick={closeSupport}
        >
          ×
        </button>
        <span className="eyebrow">THANK YOU FOR PLAYING</span>
        <h2 id="support-title">Support Overlap</h2>
        <p>
          Enjoying the game? You can help support its development with a
          voluntary contribution. Playing is free, and support is never
          required.
        </p>
        {supportUrl ? (
          <a
            className="primary support-link"
            href={supportUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Leave a tip <span aria-hidden="true">↗</span>
          </a>
        ) : (
          <p>
            Contributions aren’t available yet. Thanks for being here and
            playing!
          </p>
        )}
        {supportUrl && (
          <p className="support-note">
            Opens a secure payment page in a new tab.
          </p>
        )}
        <button className="quiet" onClick={closeSupport}>
          Keep playing
        </button>
      </dialog>
    </>
  );
};

export default SupportButton;
