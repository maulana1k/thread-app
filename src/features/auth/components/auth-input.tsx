import { InputHTMLAttributes, forwardRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ className, label, error, type = "text", ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const inputType = type === "password" && showPassword ? "text" : type;

    return (
      <div className="relative w-full">
        <div className="relative">
          <input
            ref={ref}
            type={inputType}
            className={cn(
              "w-full bg-muted/50 border-0 rounded-[12px] px-4 pt-6 pb-2 text-[17px]",
              "focus:bg-muted/70 focus:ring-2 focus:ring-[var(--ios-blue)]/20 focus:outline-none",
              "transition-all duration-200",
              "placeholder:text-transparent",
              type === "password" && "pr-12",
              error && "ring-2 ring-destructive/50",
              className,
            )}
            placeholder={label}
            onFocus={() => setIsFocused(true)}
            onBlur={(e) => {
              setIsFocused(false);
              setHasValue(!!e.target.value);
            }}
            onChange={(e) => {
              setHasValue(!!e.target.value);
              props.onChange?.(e);
            }}
            {...props}
          />
          <label
            className={cn(
              "absolute left-4 text-muted-foreground pointer-events-none transition-all duration-200",
              isFocused || hasValue || props.value
                ? "top-2 text-xs font-medium"
                : "top-1/2 -translate-y-1/2 text-[17px]",
            )}
          >
            {label}
          </label>
          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          )}
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-destructive px-1 animate-in slide-in-from-top-1 duration-200">
            {error}
          </p>
        )}
      </div>
    );
  },
);

AuthInput.displayName = "AuthInput";
