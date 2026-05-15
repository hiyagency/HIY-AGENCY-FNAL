export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect height="16" rx="5" stroke="currentColor" strokeWidth="1.8" width="16" x="4" y="4" />
      <circle cx="12" cy="12" r="3.4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="16.8" cy="7.2" fill="currentColor" r="1" />
    </svg>
  );
}

export function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14 8.4h2V5.2c-.7-.1-1.5-.2-2.4-.2-2.4 0-4 1.5-4 4.2v2.3H7v3.6h2.6V21h3.7v-5.9h2.5l.4-3.6h-2.9V9.6c0-.8.2-1.2.7-1.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect height="16" rx="3" stroke="currentColor" strokeWidth="1.8" width="16" x="4" y="4" />
      <path d="M8 10v7M8 7.2v.01M12 17v-4.2c0-1.2.9-2.2 2-2.2s2 1 2 2.2V17" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

export function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.2 4.5c.4-.9 1.5-1.2 2.3-.6l1.4 1c.8.6.9 1.7.3 2.4l-.8 1c.8 1.8 2.2 3.2 4 4l1-.8c.7-.6 1.8-.5 2.4.3l1 1.4c.6.8.3 1.9-.6 2.3-1.2.5-2.5.8-3.8.8-4.8 0-8.7-3.9-8.7-8.7 0-1.3.3-2.6.8-3.8Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.3 18.7 6 15.9A7.5 7.5 0 1 1 8.1 18l-2.8.7Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path
        d="M9.2 8.8c.2-.5.5-.5.8-.5h.5c.2 0 .4.1.5.4l.6 1.4c.1.2.1.4-.1.6l-.4.5c.6 1 1.4 1.8 2.5 2.4l.5-.4c.2-.2.4-.2.6-.1l1.4.6c.3.1.4.3.4.6v.4c0 .4-.2.7-.5.8-.5.2-1 .3-1.5.3-2.7 0-6.1-3.1-6.1-6 0-.4.1-.8.3-1.2Z"
        fill="currentColor"
      />
    </svg>
  );
}
