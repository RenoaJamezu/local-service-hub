import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "active" | "destructive";
};

export default function Button({className, variant, ...props}: ButtonProps) {
  return <button {...props} className={cn(buttonVariants({ variant }), className)} />
}

const buttonVariants = cva("px-4 py-2 rounded-lg",
  {
    variants: {
      variant: {
        default: "shadow bg-primary text-primary-foreground hover:bg-primary/80 hover:shadow-lg",
        outline: "shadow bg-white hover:bg-muted hover:shadow-lg",
        active: "shadow text-primary border-primary bg-primary/5 hover:shadow-lg",
        destructive: "shadow bg-destructive text-destructive-foreground hover:bg-destructive/80 hover:shadow-lg",
      }
    },
    defaultVariants: {
      variant: "default",
    },
  }
)