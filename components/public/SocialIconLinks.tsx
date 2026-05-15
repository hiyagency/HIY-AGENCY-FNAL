import Link from "next/link";
import { contactInfo } from "@/lib/content";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  PhoneIcon,
} from "@/components/public/SocialIcons";

const socialLinks = [
  {
    label: "WhatsApp / Call",
    href: contactInfo.whatsapp,
    icon: PhoneIcon,
  },
  {
    label: "Instagram",
    href: contactInfo.instagram,
    icon: InstagramIcon,
  },
  {
    label: "LinkedIn",
    href: contactInfo.linkedin,
    icon: LinkedinIcon,
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
          className="group inline-flex size-12 items-center justify-center rounded-full border border-[#7d97ff]/18 bg-[#07102a]/46 text-[#c7d1ff]/74 transition duration-500 hover:-translate-y-1 hover:border-[#9eb0ff]/70 hover:bg-[#f5f7ff] hover:text-[#050505] hover:shadow-[0_0_34px_rgba(63,91,255,0.35)]"
          href={href}
          key={label}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          target={href.startsWith("http") ? "_blank" : undefined}
        >
          <Icon className="size-5 transition duration-500 group-hover:scale-105" />
        </Link>
      ))}
    </div>
  );
}
