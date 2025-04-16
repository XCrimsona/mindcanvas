"use client";
interface SVGProps {
  src: string;
  className: string;
  alt: string;
}
const SVG = ({ src, className, alt }: SVGProps) => {
  return <img src={src} className={className} alt={alt} />;
};

export default SVG;
