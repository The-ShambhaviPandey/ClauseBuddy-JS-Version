const _jsxFileName = "Frontend/src/components/ui/skeleton.tsx";import { cn } from "./utils";

function Skeleton({ className, ...props }) {
  return (
    React.createElement('div', {
      'data-slot': "skeleton",
      className: cn("bg-accent animate-pulse rounded-md", className),
      ...props, __self: this, __source: {fileName: _jsxFileName, lineNumber: 5}}
    )
  );
}

export { Skeleton };
