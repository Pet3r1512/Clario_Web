import SignIn from "@/components/Auth/SignIn";
import Page from "@/components/Layout/Page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/signin")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Page>
      <SignIn />
    </Page>
  );
}
