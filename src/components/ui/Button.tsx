import type { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  className?: string;
};

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) => {
  const baseStyles =
    "px-6 py-2 md:px-8 md:py-3 rounded text-sm md:text-base font-medium transition-colors";

  const variantStyles = {
    primary: "bg-black text-white hover:bg-gray-800",
    secondary: "text-gray-700 hover:text-gray-900",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
