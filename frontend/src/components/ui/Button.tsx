import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost";
  type?: "button" | "submit" | "reset";
};

export default function Button({className, variant, type, ...props}: ButtonProps) {
  return <button type={type} {...props} className={cn(buttonVariants({ variant }), className)} />
}

const buttonVariants = cva("px-4 py-2 rounded-lg",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow",
        outline: "border-2 border-muted-foreground",
        ghost: "hover:bg-secondary",
      }
    },
    defaultVariants: {
      variant: "default",
    },
  }
)