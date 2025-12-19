import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline";
  type?: "button" | "submit" | "reset";
};

export default function Button({className, variant, type, ...props}: ButtonProps) {
  return <button type={type} {...props} className={cn(buttonVariants({ variant }), className)} />
}

const buttonVariants = cva("px-4 py-2 rounded-lg",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft hover:shadow-elevated active:scale-[0.98]",
        outline: "border-2 border-muted-foreground",
      }
    },
    defaultVariants: {
      variant: "default",
    },
  }
)