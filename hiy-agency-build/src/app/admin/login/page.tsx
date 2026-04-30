import { Suspense } from "react";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <main className="noise-layer grid min-h-screen place-items-center bg-black px-4 py-12 text-white">
      <Suspense>
        <AdminLoginForm />
      </Suspense>
    </main>
  );
}
