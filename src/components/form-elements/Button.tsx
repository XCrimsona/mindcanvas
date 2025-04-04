"use client";
interface ButtonProps {
  id: string;
  className: string;
  onClick?: React.ReactEventHandler;
}

const Button = ({ id, className, onClick }: ButtonProps) => {
  return <button id={id} className={className} onClick={onClick}></button>;
};

export default Button;
