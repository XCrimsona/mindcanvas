import Image from "next/image";
import Div from "./Div";

const RightArrow = ({
  className,
  classNameDiv,
  src,
  alt,
  width,
  height,
}: {
  className: string;
  classNameDiv: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}) => {
  return (
    <Div className={classNameDiv}>
      <Image
        className={className}
        width={width}
        height={height}
        src={`${src}`}
        alt={alt}
      />
    </Div>
  );
};

export default RightArrow;
