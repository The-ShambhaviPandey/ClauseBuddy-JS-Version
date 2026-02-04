const _jsxFileName = "Frontend/src/components/ui/collapsible.tsx";"use client";

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible@1.1.3";

function Collapsible({
  ...props
}) {
  return React.createElement(CollapsiblePrimitive.Root, { 'data-slot': "collapsible", ...props, __self: this, __source: {fileName: _jsxFileName, lineNumber: 8}} );
}

function CollapsibleTrigger({
  ...props
}) {
  return (
    React.createElement(CollapsiblePrimitive.CollapsibleTrigger, {
      'data-slot': "collapsible-trigger",
      ...props, __self: this, __source: {fileName: _jsxFileName, lineNumber: 15}}
    )
  );
}

function CollapsibleContent({
  ...props
}) {
  return (
    React.createElement(CollapsiblePrimitive.CollapsibleContent, {
      'data-slot': "collapsible-content",
      ...props, __self: this, __source: {fileName: _jsxFileName, lineNumber: 26}}
    )
  );
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
