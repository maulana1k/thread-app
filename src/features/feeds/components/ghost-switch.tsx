"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { Ghost } from "@solar-icons/react";

import { cn } from "@/lib/utils";

const GhostSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    className={cn(
      "peer inline-flex h-10 w-16 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        "pointer-events-none flex items-center justify-center size-9 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0",
      )}
    >
      <Ghost
        size={20}
        className={cn(
          "transition-colors",
          props.checked ? "text-primary" : "text-muted-foreground",
        )}
        weight={props.checked ? "Bold" : "Linear"}
      />
    </SwitchPrimitive.Thumb>
  </SwitchPrimitive.Root>
));
GhostSwitch.displayName = SwitchPrimitive.Root.displayName;

export { GhostSwitch };
