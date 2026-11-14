import { useRef, useState } from "react";
import type { RoundOverlayProps } from "./types";
import "./ShareResults.css";

const ShareResults = ({
  score,
  summary,
}: Pick<RoundOverlayProps, "score" | "summary">) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const text = `I scored ${score.toLocaleString("en-US")} in Overlap! ${summary.wpm} WPM · ${summary.accuracy}% accuracy. Can you beat my score?`;
  const url = "https://www.overlap.run/";
  const copyText = `${text}\n${url}`;
  const encoded = encodeURIComponent(copyText);
  const platforms = [
    {
      name: "WhatsApp",
      icon: "◉",
      color: "#16b957",
      href: `https://wa.me/?text=${encoded}`,
    },
    {
      name: "X / Twitter",
      icon: "𝕏",
      color: "#080808",
      href: `https://x.com/intent/tweet?text=${encoded}`,
    },
    {
      name: "Threads",
      icon: "@",
      color: "#262626",
      href: `https://www.threads.com/intent/post?text=${encoded}`,
    },
    {
      name: "Facebook",
      icon: "f",
      color: "#1877f2",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      name: "Email",
      icon: "✉",
      color: "#687080",
      href: `mailto:?subject=My%20Overlap%20results&body=${encoded}`,
    },
  ];

  const copy = async (instagram = false) => {
    try {
      await navigator.clipboard.writeText(copyText);
      setMessage(
        instagram
          ? "Results copied. Open Instagram and paste them into a caption or message. Use Copy PNG for a results image."
          : "Results copied! Paste them to share.",
      );
    } catch {
      textRef.current?.focus();
      textRef.current?.select();
      setMessage("Select and copy your results below to share.");
    }
  };

  const copyPng = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 1080;
      canvas.height = 1080;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas unavailable");
      ctx.fillStyle = "#141918";
      ctx.fillRect(0, 0, 1080, 1080);
      ctx.fillStyle = "#d4ff63";
      ctx.font = "bold 64px sans-serif";
      ctx.fillText("OVERLAP", 80, 150);
      ctx.fillStyle = "#eef2ed";
      ctx.font = "32px sans-serif";
      ctx.fillText(
        summary.isNewBest ? "NEW PERSONAL BEST" : "MY RESULTS",
        80,
        260,
      );
      ctx.font = "bold 150px sans-serif";
      ctx.fillText(score.toLocaleString("en-US"), 80, 450);
      ctx.font = "40px sans-serif";
      ctx.fillText(
        `${summary.wpm} WPM  ·  ${summary.accuracy}% accuracy`,
        80,
        570,
      );
      ctx.fillText(`${summary.passagesCleared} passages cleared`, 80, 650);
      ctx.fillStyle = "#d4ff63";
      ctx.font = "36px sans-serif";
      ctx.fillText("Can you beat my score?", 80, 840);
      ctx.fillStyle = "#eef2ed";
      ctx.font = "32px sans-serif";
      ctx.fillText("www.overlap.run", 80, 940);
      const blobPromise = new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (blob) =>
            blob ? resolve(blob) : reject(new Error("Image unavailable")),
          "image/png",
        );
      });
      try {
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blobPromise }),
        ]);
        setMessage("Results image copied! Paste it into your post or message.");
      } catch {
        const blob = await blobPromise;
        const objectUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = objectUrl;
        link.download = "overlap-results.png";
        link.click();
        setTimeout(() => URL.revokeObjectURL(objectUrl), 10000);
        setMessage(
          "Results image downloaded. Upload it to your post or story.",
        );
      }
    } catch {
      setMessage(
        "Couldn’t create an image. You can copy the results text below.",
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="results-share">
      <button
        className="quiet"
        onClick={() => {
          setMessage("");
          dialogRef.current?.showModal();
        }}
      >
        Share results
      </button>
      <dialog
        ref={dialogRef}
        className="share-dialog"
        aria-labelledby="share-results-title"
      >
        <button
          className="close"
          aria-label="Close sharing"
          onClick={() => dialogRef.current?.close()}
        >
          ×
        </button>
        <h2 id="share-results-title">Share results</h2>
        <div className="share-platforms">
          <button className="share-platform" onClick={copyPng} disabled={busy}>
            <span className="share-icon share-copy-icon" aria-hidden="true">
              ▣
            </span>
            {busy ? "Creating…" : "Copy PNG"}
          </button>
          {platforms.slice(0, 3).map((platform) => (
            <a
              key={platform.name}
              className="share-platform"
              href={platform.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span
                className="share-icon"
                style={{ background: platform.color }}
                aria-hidden="true"
              >
                {platform.icon}
              </span>
              {platform.name}
            </a>
          ))}
          <button className="share-platform" onClick={() => void copy(true)}>
            <span
              className="share-icon share-instagram-icon"
              aria-hidden="true"
            >
              ◎
            </span>
            Instagram
          </button>
          {platforms.slice(3).map((platform) => (
            <a
              key={platform.name}
              className="share-platform"
              href={platform.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span
                className="share-icon"
                style={{ background: platform.color }}
                aria-hidden="true"
              >
                {platform.icon}
              </span>
              {platform.name}
            </a>
          ))}
        </div>
        <p className="share-hint">
          Instagram: copy an image for a post or story, or copy text for a
          caption. Facebook shares the game link; copy your results to add them
          to your post.
        </p>
        <div className="share-copy-row">
          <textarea
            ref={textRef}
            aria-label="Results to copy"
            readOnly
            value={copyText}
            onFocus={(event) => event.currentTarget.select()}
            rows={3}
          />
          <button className="share-copy-button" onClick={() => void copy()}>
            Copy
          </button>
        </div>
        <p className="share-message" role="status">
          {message}
        </p>
      </dialog>
    </div>
  );
};

export default ShareResults;
