import { Suspense, type ComponentType, type ReactElement } from "react";
import { PageLoader } from "@/shared/components/PageLoader";

// eslint-disable-next-line react-refresh/only-export-components
export function withSuspense(Component: ComponentType): ReactElement {
  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  );
}