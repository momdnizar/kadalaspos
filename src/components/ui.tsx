import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import BrandMark from "./BrandMark";
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <a
      className={`logo ${light ? "logo-light" : ""}`}
      href="#home"
      aria-label="Kadalas POS home"
    >
      <BrandMark className="website-wordmark" />
    </a>
  );
}
export function Button({
  children,
  onClick,
  href,
  secondary = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  secondary?: boolean;
}) {
  const cls = `button ${secondary ? "button-secondary" : ""}`;
  return href ? (
    <a className={cls} href={href}>
      {children}
      <ArrowUpRight size={17} />
    </a>
  ) : (
    <button className={cls} onClick={onClick}>
      {children}
      <ArrowUpRight size={17} />
    </button>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="section-heading">
      <span className="eyebrow">
        <span /> {eyebrow}
      </span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
