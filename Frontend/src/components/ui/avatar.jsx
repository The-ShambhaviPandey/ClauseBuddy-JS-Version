const _jsxFileName = "Frontend/src/components/ui/avatar.tsx";"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar@1.1.3";

import { cn } from "./utils";

const Avatar = React.forwardRef


(({ className, ...props }, ref) => (
  React.createElement(AvatarPrimitive.Root, {
    ref: ref,
    'data-slot': "avatar",
    className: cn(
      "relative flex size-10 shrink-0 overflow-hidden rounded-full",
      className,
    ),
    ...props, __self: this, __source: {fileName: _jsxFileName, lineNumber: 12}}
  )
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef


(({ className, ...props }, ref) => (
  React.createElement(AvatarPrimitive.Image, {
    ref: ref,
    'data-slot': "avatar-image",
    className: cn("aspect-square size-full", className),
    ...props, __self: this, __source: {fileName: _jsxFileName, lineNumber: 28}}
  )
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef


(({ className, ...props }, ref) => (
  React.createElement(AvatarPrimitive.Fallback, {
    ref: ref,
    'data-slot': "avatar-fallback",
    className: cn(
      "bg-muted flex size-full items-center justify-center rounded-full",
      className,
    ),
    ...props, __self: this, __source: {fileName: _jsxFileName, lineNumber: 41}}
  )
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
