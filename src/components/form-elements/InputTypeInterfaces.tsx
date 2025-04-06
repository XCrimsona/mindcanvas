import React from "react";

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
      className={className}
      placeholder="Choose a color"
      name="color"
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
      className={className}
      placeholder={placeholder}
      name="email"
      onChange={onChange}
      value={value}
      required
    />
  );
};

interface InputTextProps {
  id: string;
  className: string;
  placeholder: string;
  value: string;
  onChange: React.ReactEventHandler;
  onFocus: React.ReactEventHandler;
}
export const InputText = ({
  id,
  className,
  placeholder,
  value,
  onChange,
  onFocus,
}: InputTextProps) => {
  return (
    <input
      type="text"
      id={id}
      className={className}
      placeholder={placeholder}
      name="text"
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      required
    />
  );
};

interface InputDateProps {
  id: string;
  className: string;
  placeholder: string;
  value: string;
  onChange: React.ReactEventHandler;
  onFocus: React.ReactEventHandler;
}
export const InputDate = ({
  id,
  className,
  placeholder,
  value,
  onChange,
  onFocus,
}: InputDateProps) => {
  return (
    <input
      type="date"
      id={id}
      className={className}
      placeholder={placeholder}
      name="date"
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      required
    />
  );
};

interface InputRangeProps {
  id: string;
  className: string;
  value: string;
  onChange: React.ReactEventHandler;
  onFocus?: React.ReactEventHandler;
}
export const Range = ({
  id,
  className,
  value,
  onChange,
  onFocus,
}: InputRangeProps) => {
  return (
    <input
      type="range"
      id={id}
      className={className}
      value={value}
      name="range"
      onChange={onChange}
      onFocus={onFocus}
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
      className={className}
      placeholder={placeholder}
      name="password"
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
  name: string;
  onChange: React.ReactEventHandler;
}
export const InputRadio = ({
  id,
  className,
  value,
  name,
  onChange,
}: InputRadioProps) => {
  return (
    <input
      type="radio"
      id={id}
      className={className}
      value={value}
      name={name}
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
      name="checkbox"
      onChange={onChange}
    />
  );
};

interface InputSearchProps {
  id: string;
  className: string;
  value: string;
  onChange: React.ReactEventHandler;
  onFocus: React.ReactEventHandler;
}
export const InputSearch = ({
  id,
  className,
  value,
  onChange,
  onFocus,
}: InputSearchProps) => {
  return (
    <input
      type="search"
      id={id}
      className={className}
      value={value}
      name="search"
      onChange={onChange}
      onFocus={onFocus}
      required
    />
  );
};

interface InputSubmitProps {
  id: string;
  className: string;
  value: string;
}

export const InputSubmit = ({ id, className, value }: InputSubmitProps) => {
  return (
    <input
      type="submit"
      id={id}
      className={className}
      value={value}
      name="submit"
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
      name="file"
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
      name="files"
      multiple
      onChange={onChange}
      required
    />
  );
};
