import { DOMAttributes, FC, memo, ReactNode } from "react";
import { Button } from "@mantine/core";

type Props = {
  type: "button" | "reset" | "submit";
  variant?: "filled" | "outline" | "light" | "gradient" | "white" | "default" | "subtle";
  color: "gray" | "red" | "blue" | "white" | "default";
  radius: "xs" | "md" | "lg" | "xl";
  size: "xs" | "md" | "lg" | "xl";
  className?: string;
  compact?: boolean;
  children: ReactNode;
  onClick?: DOMAttributes<HTMLButtonElement>["onClick"];
};

export const AppButton: FC<Props> = memo(
  ({ type, variant, color, radius, size, compact, className, children, onClick }) => {
    return (
      <>
        <Button
          type={type}
          variant={variant}
          color={color}
          radius={radius}
          size={size}
          compact={compact}
          className={className}
          onClick={onClick}
        >
          {children}
        </Button>
      </>
    );
  }
);
AppButton.displayName = "AppButton";
