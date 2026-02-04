const _jsxFileName = "Frontend/src/components/ui/progress.tsx";"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress@1.1.2";

import { cn } from "./utils";

const Progress = React.forwardRef


(({ className, value, ...props }, ref) => (
  React.createElement(ProgressPrimitive.Root, {
    ref: ref,
    'data-slot': "progress",
    className: cn(
      "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
      className,
    ),
    ...props, __self: this, __source: {fileName: _jsxFileName, lineNumber: 12}}

    , React.createElement(ProgressPrimitive.Indicator, {
      'data-slot': "progress-indicator",
      className: "bg-primary h-full w-full flex-1 transition-all"    ,
      style: { transform: `translateX(-${100 - (value || 0)}%)` }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 21}}
    )
  )
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
