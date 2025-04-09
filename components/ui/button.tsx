import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[#ff66cc] text-white hover:bg-[#ff33cc] transform hover:rotate-1 transition-all border-2 border-white shadow-md",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 transform hover:-rotate-1 transition-all border-2 border-white shadow-md",
        outline:
          "border-2 border-[#ff99cc] border-dashed bg-background hover:bg-[#ffccff] hover:text-[#ff3399] transform hover:rotate-1 transition-all shadow-sm",
        secondary:
          "bg-[#cc99ff] text-white hover:bg-[#9966ff] transform hover:-rotate-1 transition-all border-2 border-white shadow-md",
        ghost: "hover:bg-accent hover:text-accent-foreground transform hover:scale-110 transition-all",
        link: "text-[#9933cc] underline-offset-4 hover:underline transform hover:scale-110 transition-all",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
