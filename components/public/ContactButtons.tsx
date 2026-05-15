import Link from "next/link";
import { contactInfo } from "@/lib/content";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/public/SocialIcons";
import { cn } from "@/lib/utils";

type ContactButtonsProps = {
  className?: string;
  layout?: "grid" | "row";
};

const buttonClass =
  "group inline-flex items-center justify-center gap-2.5 rounded-full border border-[#7d97ff]/22 bg-[#07102a]/50 px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-[#f5f7ff] transition duration-500 hover:-translate-y-0.5 hover:border-[#9eb0ff]/65 hover:bg-[#10246d]/40 hover:shadow-[0_0_34px_rgba(63,91,255,0.28)]";

export function ContactButtons({ className = "", layout = "grid" }: ContactButtonsProps) {
  return (
    <div
      className={cn(
        layout === "grid" ? "grid gap-3 sm:grid-cols-2" : "flex flex-wrap gap-3",
        className,
      )}
    >
      <Link className={cn(buttonClass, "bg-[#f5f7ff] text-[#050505] hover:bg-white")} href={contactInfo.whatsapp}>
        <WhatsAppIcon className="size-4" />
        WhatsApp
      </Link>
      <Link className={buttonClass} href={contactInfo.call}>
        <PhoneIcon className="size-4" />
        Call
      </Link>
      <Link className={buttonClass} href={contactInfo.instagram} rel="noopener noreferrer" target="_blank">
        <InstagramIcon className="size-4" />
        Instagram
      </Link>
      <Link className={buttonClass} href={contactInfo.linkedin} rel="noopener noreferrer" target="_blank">
        <LinkedinIcon className="size-4" />
        LinkedIn
      </Link>
      <Link className={buttonClass} href={contactInfo.facebook} rel="noopener noreferrer" target="_blank">
        <FacebookIcon className="size-4" />
        Facebook
      </Link>
    </div>
  );
}
