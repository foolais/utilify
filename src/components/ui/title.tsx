import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

const titleVariants = cva("font-semibold tracking-wide", {
  variants: {
    size: {
      sm: "text-base",
      default: "text-xl",
      lg: "text-2xl",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

type TitleProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof titleVariants> & {
    className?: string;
  };

const Title = ({ className, size }: TitleProps) => {
  return (
    <div className={cn(titleVariants({ size }), className)}>
      <span className="text-primary">Util</span>ify
    </div>
  );
};

export default Title;
