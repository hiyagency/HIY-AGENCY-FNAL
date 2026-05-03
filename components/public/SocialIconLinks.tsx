import Link from "next/link";
import { contactInfo } from "@/lib/content";

const socialLinks = [
  {
    label: "Instagram",
    href: contactInfo.instagram,
    icon: InstagramIcon,
  },
  {
    label: "Facebook",
    href: contactInfo.facebook,
    icon: FacebookIcon,
  },
];

export function SocialIconLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {socialLinks.map(({ label, href, icon: Icon }) => (
        <Link
          aria-label={label}
          className="group inline-flex size-12 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-white/70 transition duration-500 hover:-translate-y-1 hover:border-white/38 hover:bg-white hover:text-black"
          href={href}
          key={label}
        >
          <Icon className="size-5 transition duration-500 group-hover:scale-105" />
        </Link>
      ))}
    </div>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect height="16" rx="5" stroke="currentColor" strokeWidth="1.8" width="16" x="4" y="4" />
      <circle cx="12" cy="12" r="3.4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="16.8" cy="7.2" fill="currentColor" r="1" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 8.4h2V5.2c-.7-.1-1.5-.2-2.4-.2-2.4 0-4 1.5-4 4.2v2.3H7v3.6h2.6V21h3.7v-5.9h2.5l.4-3.6h-2.9V9.6c0-.8.2-1.2.7-1.2Z"
        fill="currentColor"
      />
    </svg>
  );
}
