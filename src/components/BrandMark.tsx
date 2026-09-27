export default function BrandMark({ className }: { className: string }) {
  return (
    <span className={`brand-wordmark ${className}`}>
      <img
        src="/logos/kadalaslogolong.png"
        alt="Kadalas POS"
        width={864}
        height={289}
      />
    </span>
  );
}
