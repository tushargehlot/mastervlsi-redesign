import { Suspense, lazy } from "react";

const ChipScene = lazy(() => import("./ChipScene"));

export function Hero3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <Suspense fallback={null}>
        <ChipScene />
      </Suspense>
    </div>
  );
}
