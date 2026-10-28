import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { ConceptShell } from "@/components/concept/Shell";
import { isConceptId } from "@/content/concepts";

export const Route = createFileRoute("/concept/$c")({
  beforeLoad: ({ params }) => {
    if (!isConceptId(params.c)) throw notFound();
  },
  component: Layout,
});

function Layout() {
  const { c } = Route.useParams();
  if (!isConceptId(c)) return null;
  return (
    <ConceptShell c={c}>
      <Outlet />
    </ConceptShell>
  );
}
