import GoogleSVG from "@/components/svg/GoogleSVG";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SignInFormType } from "@/lib/types/signinform";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import FormErrorMessage from "../FormErrorMessage";
import { useMutation } from "@tanstack/react-query";
import SignInEmail from "@/api/users/auth/SignInEmail";
import { toast } from "sonner";

export default function SignInForm({ className }: { className?: string }) {
  const [hidePassword, setHidePassword] = useState<boolean>(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormType>();

  const mutation = useMutation({
    mutationKey: ["signin"],
    mutationFn: SignInEmail,
    onError: (error) => {
      return toast.error(error.message);
    },
    onSuccess: (res) => {
      return toast.success(res.message);
    },
  });

  const onSubmit: SubmitHandler<SignInFormType> = (credential) => {
    mutation.mutate(credential);
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-6 w-full md:max-w-md lg:max-w-lg",
        className,
      )}
    >
      <Card className="dark:bg-black/50 shadow-2xl">
        <CardHeader className="text-center flex flex-col items-center gap-y-3">
          <div className="flex items-center gap-x-2.5">
            <img src="/logo/Icon.png" alt="" className="w-auto h-8" />
            <p className="font-semibold text-primary text-lg">Clario</p>
          </div>
          <CardTitle className="text-xl lg:text-2xl text-primary-dark">
            Welcome back
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4 relative">
                <p className="absolute -top-3 -right-4.5 text-white rounded-2xl font-semibold text-xs bg-blue-400 px-1.5 py-0.5">
                  Coming Soon
                </p>
                <Button variant="outline" className="w-full">
                  <GoogleSVG />
                  Login with Google
                </Button>
              </div>
              <p className="bg-card text-center text-muted-foreground relative z-10 px-2">
                Or continue with
              </p>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && errors.email.message && (
                    <FormErrorMessage message={errors.email.message} />
                  )}
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={hidePassword ? "password" : "text"}
                      {...register("password", {
                        required: "Password is required",
                      })}
                    />
                    <button
                      className="absolute top-1/2 right-2.5 -translate-y-1/2"
                      onClick={() => {
                        setHidePassword(!hidePassword);
                      }}
                    >
                      {hidePassword ? <Eye /> : <EyeOff />}
                    </button>
                  </div>
                  {errors.password && errors.password.message && (
                    <FormErrorMessage message={errors.password.message} />
                  )}
                </div>
                <Button
                  disabled={mutation.isPending}
                  type="submit"
                  className="w-full bg-primary-dark"
                >
                  {mutation.isPending ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    <p>Sign In</p>
                  )}
                </Button>
              </div>
              <div className="text-center text-sm">
                Don't have an account?{" "}
                <a
                  href="/auth/signup"
                  className="underline underline-offset-4 font-semibold"
                >
                  Sign Up
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
