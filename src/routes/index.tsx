import { createFileRoute } from "@tanstack/react-router";
import { ClientOnly } from "@tanstack/react-router";
import PrmptLanding from "@/components/PrmptLanding";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <ClientOnly fallback={<div style={{ background: "#fff", minHeight: "100vh" }} />}>
      <PrmptLanding />
    </ClientOnly>
  );
}
