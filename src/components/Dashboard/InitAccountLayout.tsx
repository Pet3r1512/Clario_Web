import { LoaderCircle } from "lucide-react";

export default function InitAccount() {
  return (
    <center className="space-y-4 h-full">
      <p className="text-2xl lg:text-3xl font-bold text-primary">
        Setting Up Your Account
      </p>
      <p className="text-gray-400 font-semibold">
        This will only take a moment...
      </p>
      <LoaderCircle
        size={48}
        strokeWidth={2.5}
        className="text-primary animate-spin"
      />
    </center>
  );
}
