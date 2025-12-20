import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost" | "active" | "destructive";
};

export default function Button({className, variant, ...props}: ButtonProps) {
  return <button {...props} className={cn(buttonVariants({ variant }), className)} />
}

const buttonVariants = cva("px-4 py-2 rounded-lg",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80 shadow",
        outline: "outline outline-muted-foreground hover:bg-secondary",
        ghost: "hover:bg-secondary",
        active: "text-primary border-primary bg-primary/5",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/80 shadow",
      }
    },
    defaultVariants: {
      variant: "default",
    },
  }
)