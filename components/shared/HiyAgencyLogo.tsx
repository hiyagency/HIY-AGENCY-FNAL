import Image from "next/image";
import { cn } from "@/lib/utils";

type HiyAgencyLogoProps = {
  className?: string;
  priority?: boolean;
};

export function HiyAgencyLogo({ className, priority = false }: HiyAgencyLogoProps) {
  return (
    <Image
      alt="HIY AGENCY"
      className={cn("h-auto w-[170px]", className)}
      height={64}
      priority={priority}
      src="/hiy-agency-logo.svg"
      width={228}
    />
  );
}
