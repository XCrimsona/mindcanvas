interface InputTextProps {
  id: string;
  className: string;
  placeholder?: string;
  value: string;
  onChange?: React.ReactEventHandler;
  onDoubleClick?: React.ReactEventHandler;
}

//Text Component Input
export const MassInputDisabledText = ({
  id,
  className,
  value,
  onChange,
  onDoubleClick,
}: InputTextProps) => {
  return (
    <input
      type="text"
      id={id}
      minLength={1}
      maxLength={10000}
      disabled
      autoComplete="off"
      className={className}
      value={value}
      onChange={onChange}
    />
  );
};

export const MassInputEnabledText = ({
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
      maxLength={10000}
      autoComplete="off"
      placeholder={placeholder}
      className={className}
      value={value}
      onChange={onChange}
      required
    />
  );
};

//Audio Component Input
export const MassInputDisabledAudio = ({
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
      maxLength={10000}
      disabled
      autoComplete="off"
      className={className}
      value={value}
      onChange={onChange}
    />
  );
};

export const MassInputEnabled = ({
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
      maxLength={10000}
      autoComplete="off"
      placeholder={placeholder}
      className={className}
      value={value}
      onChange={onChange}
      required
    />
  );
};
