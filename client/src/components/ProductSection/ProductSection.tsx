import { ReactNode } from "react";
import { DivClass } from "../../ui/Div";

interface ProductSectionProps {
  className: string;
  children: ReactNode;
}

const ProductSection = ({ className, children }: ProductSectionProps) => {
  return <DivClass className={className}>{children}</DivClass>;
};

export default ProductSection;
