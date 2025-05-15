//Hides/Masks sensitive workspace data
export const useMaskSensitiveData = () => {
  const maskSensitiveData = (text: string) => "*".repeat(text.length);
  return { maskSensitiveData };
};
