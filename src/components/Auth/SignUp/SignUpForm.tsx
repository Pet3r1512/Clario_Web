import GoogleSVG from "@/components/svg/GoogleSVG";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignUpFormType } from "@/lib/types/signupform";

export default function SignUpForm({ className }: { className?: string }) {
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState<boolean>(true);

  const {
    register,
    handleSubmit,
    // watch,
    // formState: { errors },
  } = useForm<SignUpFormType>();

  const onSubmit: SubmitHandler<SignUpFormType> = (credential) => {
    console.log(credential);
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
            Create An Account
          </CardTitle>
          <CardDescription>
            Sign up to get started with <strong>Clario</strong>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 relative">
            <p className="absolute -top-3 -right-4.5 text-white rounded-2xl font-semibold text-xs bg-blue-400 px-1.5 py-0.5">
              Coming Soon
            </p>
            <Button variant="outline" className="w-full">
              <GoogleSVG />
              Login with Google
            </Button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <p className="bg-card text-center text-muted-foreground relative z-10 px-2 mt-8">
                Or continue with
              </p>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email", {
                      required: true,
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid email address",
                      },
                      minLength: {
                        value: 5,
                        message: "Email is too short",
                      },
                    })}
                    placeholder="example@email.com"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="example_username"
                    required
                    {...register("username")}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={hidePassword ? "password" : "text"}
                      required
                      {...register("password")}
                    />
                    <button
                      tabIndex={-1}
                      className="absolute top-1/2 right-2.5 -translate-y-1/2"
                      onClick={() => {
                        setHidePassword(!hidePassword);
                      }}
                    >
                      {hidePassword ? <Eye /> : <EyeOff />}
                    </button>
                  </div>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={hideConfirmPassword ? "password" : "text"}
                      required
                      {...register("confirmPassword")}
                    />
                    <button
                      tabIndex={-1}
                      className="absolute top-1/2 right-2.5 -translate-y-1/2"
                      onClick={() => {
                        setHideConfirmPassword(!hideConfirmPassword);
                      }}
                    >
                      {hideConfirmPassword ? <Eye /> : <EyeOff />}
                    </button>
                  </div>
                </div>
                <Button type="submit" className="w-full bg-primary-dark">
                  <p>Create New Account</p>
                </Button>
              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <a
                  href="/auth/signin"
                  className="underline underline-offset-4 font-semibold"
                >
                  Sign In
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
