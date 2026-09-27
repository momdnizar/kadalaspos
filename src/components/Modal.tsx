import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, CheckCircle2, Copy, X } from "lucide-react";
import { resources } from "./Resources";
export type ModalState = "start" | "partner" | "support" | number | null;
export default function Modal({
  kind,
  onClose,
}: {
  kind: Exclude<ModalState, null>;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [draft, setDraft] = useState("");
  const [copied, setCopied] = useState(false);
  const article = typeof kind === "number" ? resources[kind] : null;
  const title =
    article?.title ??
    (kind === "partner"
      ? "Let’s grow together."
      : kind === "support"
        ? "How can we help?"
        : "A simpler business starts here.");
  useEffect(() => {
    const previous = document.activeElement as HTMLElement;
    dialog.current?.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      className="modal"
      aria-labelledby="modal-title"
      onCancel={onClose}
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) {
          const rect = e.currentTarget.getBoundingClientRect();
          if (
            e.clientX < rect.left ||
            e.clientX > rect.right ||
            e.clientY < rect.top ||
            e.clientY > rect.bottom
          )
            onClose();
        }
      }}
    >
      <button
        className="modal-close"
        aria-label="Close dialog"
        onClick={onClose}
      >
        <X size={21} />
      </button>
      <span className="eyebrow">KADALAS POS</span>
      <h2 id="modal-title">{title}</h2>
      {article ? (
        <div className="article-content">
          {article.content.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      ) : draft ? (
        <div className="draft-result">
          <CheckCircle2 size={35} />
          <h3>Your enquiry is ready.</h3>
          <p>
            This preview isn’t connected to a contact service yet. Copy your
            enquiry to share with the Kadalas POS team. Nothing has been sent.
          </p>
          <pre>{draft}</pre>
          <button
            className="button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(draft);
                setCopied(true);
              } catch {
                setCopied(false);
              }
            }}
          >
            <Copy size={16} />
            {copied ? "Copied to clipboard" : "Copy enquiry"}
          </button>
        </div>
      ) : (
        <>
          <p className="modal-description">
            {kind === "partner"
              ? "Tell us a little about yourself and your network."
              : kind === "support"
                ? "Tell us what you need help with."
                : "Tell us about your business so we can help you find the right fit."}
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              setDraft(
                `Kadalas POS — ${kind === "partner" ? "Partner enquiry" : kind === "support" ? "Support request" : "Getting started"}\n\nName: ${data.get("name")}\nEmail: ${data.get("email")}\nBusiness: ${data.get("business")}\n\n${data.get("message")}`,
              );
            }}
          >
            <label>
              Your name
              <input
                name="name"
                autoComplete="name"
                placeholder="Full name"
                required
                maxLength={100}
              />
            </label>
            <label>
              Email address
              <input
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@yourbusiness.com"
                required
                maxLength={200}
              />
            </label>
            <label>
              Business name
              <input
                name="business"
                autoComplete="organization"
                placeholder="Your café, restaurant or business"
                required
                maxLength={160}
              />
            </label>
            <label>
              {kind === "support"
                ? "What can we help with?"
                : "Tell us a little more"}
              <textarea
                name="message"
                placeholder={
                  kind === "support"
                    ? "Describe your question or issue…"
                    : "Your business, number of outlets, and what you’re looking for…"
                }
                rows={3}
                required
                maxLength={3000}
              />
            </label>
            <p className="form-note">
              Preview mode: prepare and copy an enquiry. No information is sent
              or stored.
            </p>
            <button className="button" type="submit">
              Prepare enquiry <ArrowUpRight size={17} />
            </button>
          </form>
        </>
      )}
    </dialog>
  );
}
