import { cn } from "@/lib/utils";
import React from "react";

type BackgroundProps = React.ComponentProps<"div"> & {
  size?: number;
};

const Background = ({
  size = 24,
  className,
  style,
  ...props
}: BackgroundProps) => {
  const backgroundImage = `radial-gradient(var(--background-dot) 1px, transparent 1px)`;
  const backgroundSize = `${size}px ${size}px`;
  const maskClass =
    "[mask-image:radial-gradient(ellipse_at_center,transparent,var(--background))]";

  return (
    <div
      className={cn("fixed inset-0 z-[-10] size-full", maskClass, className)}
      style={{
        backgroundImage,
        backgroundSize,
        ...style,
      }}
      {...props}
    />
  );
};

Background.displayName = "Background";
export { Background };
