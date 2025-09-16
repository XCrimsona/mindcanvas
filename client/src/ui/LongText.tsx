import { ReactNode } from "react";

interface LongTextProps {
  id?: string;
  className: string;
  children: ReactNode;
  onDoubleClick?: React.ReactEventHandler;
  // onClick?: React.ReactEventHandler;
  onChange?: React.ReactEventHandler;
}
const LongText = ({
  id,
  className,
  children,
  onDoubleClick,
}: LongTextProps) => {
  return (
    <p id={id} className={className} onDoubleClick={onDoubleClick}>
      {children}
    </p>
  );
};

export default LongText;
