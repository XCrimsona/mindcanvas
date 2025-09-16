import React, { ReactNode } from "react";

interface InputColorProps {
  id: string;
  className: string;
  onChange: React.ReactEventHandler;
}
export const InputColor = ({ id, className, onChange }: InputColorProps) => {
  return (
    <input
      type="color"
      id={id}
      minLength={3}
      maxLength={10}
      className={className}
      placeholder="Choose a color"
      onChange={onChange}
      required
    />
  );
};

interface InputEmailProps {
  id: string;
  className: string;
  placeholder: string;
  value: string;
  onChange: React.ReactEventHandler;
}
export const InputEmail = ({
  id,
  className,
  placeholder,
  value,
  onChange,
}: InputEmailProps) => {
  return (
    <input
      type="email"
      id={id}
      minLength={2}
      maxLength={40}
      className={className}
      autoComplete="off"
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      required
    />
  );
};

interface InputTextProps {
  id: string;
  className: string;
  placeholder?: string;
  value: string;
  onChange?: React.ReactEventHandler;
  readonly?: boolean;
}

export const InputTextReadOnly = ({
  id,
  className,
  placeholder,
  value,
  onChange,
}: InputTextProps) => {
  return (
    <input
      type="text"
      id={id}
      readOnly
      minLength={1}
      maxLength={500}
      className={className}
      placeholder={placeholder}
      value={value}
      autoComplete="off"
      onChange={onChange}
      required
    />
  );
};

export const InputText = ({
  id,
  className,
  placeholder,
  value,
  onChange,
}: InputTextProps) => {
  return (
    <input
      type="text"
      id={id}
      minLength={1}
      maxLength={500}
      className={className}
      placeholder={placeholder}
      value={value}
      autoComplete="off"
      onChange={onChange}
      required
    />
  );
};

export const InputDisabledText = ({
  id,
  className,
  value,
  onChange,
}: InputTextProps) => {
  return (
    <input
      type="text"
      id={id}
      minLength={1}
      maxLength={500}
      disabled
      autoComplete="off"
      className={className}
      value={value}
      onChange={onChange}
      required
    />
  );
};

export const InputEnabledText = ({
  id,
  className,
  placeholder,
  value,
  onChange,
}: InputTextProps) => {
  return (
    <input
      type="text"
      id={id}
      minLength={1}
      maxLength={500}
      autoComplete="off"
      placeholder={placeholder}
      className={className}
      value={value}
      onChange={onChange}
      required
    />
  );
};

interface InputDateProps {
  id: string;
  className: string;
  value: string;
  onChange: React.ReactEventHandler;
}
export const InputDate = ({
  id,
  className,
  value,
  onChange,
}: InputDateProps) => {
  return (
    <input
      type="date"
      id={id}
      className={className}
      value={value}
      onChange={onChange}
      required
    />
  );
};

interface InputSelectProps {
  id: string;
  className: string;
  value: string;
  onChange: React.ReactEventHandler;
  children: ReactNode;
}
export const InputSelect = ({
  id,
  className,
  onChange,
  children,
  value,
}: InputSelectProps) => {
  return (
    <select id={id} value={value} className={className} onChange={onChange}>
      {children}
    </select>
  );
};

interface InputRangeProps {
  id: string;
  className: string;
  value: string;
  onChange: React.ReactEventHandler;
}
export const Range = ({ id, className, value, onChange }: InputRangeProps) => {
  return (
    <input
      type="range"
      id={id}
      minLength={1}
      maxLength={100}
      className={className}
      value={value}
      onChange={onChange}
    />
  );
};

interface InputPasswordProps {
  id: string;
  className: string;
  placeholder: string;
  value: string;
  onChange: React.ReactEventHandler;
}
export const InputPassword = ({
  id,
  className,
  placeholder,
  value,
  onChange,
}: InputPasswordProps) => {
  return (
    <input
      type="password"
      id={id}
      minLength={6}
      maxLength={140}
      className={className}
      placeholder={placeholder}
      value={value}
      required
      onChange={onChange}
    />
  );
};
export const InputConfirmPassword = ({
  id,
  className,
  placeholder,
  value,
  onChange,
}: InputPasswordProps) => {
  return (
    <input
      type="password"
      id={id}
      minLength={6}
      maxLength={140}
      className={className}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
    />
  );
};

interface InputRadioProps {
  id: string;
  className: string;
  value: string;
  onChange: React.ReactEventHandler;
}
export const InputRadio = ({
  id,
  className,
  value,
  onChange,
}: InputRadioProps) => {
  return (
    <input
      type="radio"
      id={id}
      className={className}
      value={value}
      onChange={onChange}
      required
    />
  );
};

interface InputCheckBoxProps {
  id: string;
  className: string;
  value: string;
  onChange: React.ReactEventHandler;
}
export const InputCheckBox = ({
  id,
  className,
  value,
  onChange,
}: InputCheckBoxProps) => {
  return (
    <input
      type="checkbox"
      id={id}
      className={className}
      value={value}
      onChange={onChange}
    />
  );
};

interface InputSearchProps {
  id: string;
  className: string;
  value: string;
  onChange: React.ReactEventHandler;
}
export const InputSearch = ({
  id,
  className,
  value,
  onChange,
}: InputSearchProps) => {
  return (
    <input
      type="search"
      id={id}
      minLength={2}
      maxLength={100}
      className={className}
      value={value}
      onChange={onChange}
      required
    />
  );
};

interface InputSubmitProps {
  id: string;
  className: string;
  value: string;
  onClick?: React.ReactEventHandler;
}

export const InputSubmit = ({
  id,
  className,
  onClick,
  value,
}: InputSubmitProps) => {
  return (
    <input
      type="submit"
      id={id}
      className={className}
      onClick={onClick}
      value={value}
    />
  );
};

interface InputFileProps {
  id: string;
  className: string;
  value: string;
  onChange: React.ReactEventHandler;
}
export const InputFile = ({
  id,
  className,
  value,
  onChange,
}: InputFileProps) => {
  return (
    <input
      type="file"
      id={id}
      className={className}
      value={value}
      onChange={onChange}
      required
    />
  );
};

interface InputFilesProps {
  id: string;
  className: string;
  value: string;
  onChange: React.ReactEventHandler;
}
export const InputFiles = ({
  id,
  className,
  value,
  onChange,
}: InputFilesProps) => {
  return (
    <input
      type="file"
      id={id}
      className={className}
      value={value}
      multiple
      onChange={onChange}
      required
    />
  );
};
