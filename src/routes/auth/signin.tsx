import SignIn from "@/components/Auth/SignIn";
import Page from "@/components/Layout/Page";
import useAuth from "@/hooks/useAuth";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/auth/signin")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate({
        to: "/dashboard",
      });
    }
  }, [isAuthenticated, isLoading, navigate]);

  return (
    <Page>
      <SignIn />
    </Page>
  );
}
