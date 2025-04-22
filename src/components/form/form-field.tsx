import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface iPropsInput<T> extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  error?: string[];
  value: string;
  setFormValues: React.Dispatch<React.SetStateAction<T>>;
}

export const FormFieldInput = <T,>({
  name,
  label,
  error,
  value,
  setFormValues,
  ...rest
}: iPropsInput<T>) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({ ...prev, [name]: e.target.value }));
  };

  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor={name as string}>{label}</Label>
      <Input
        id={name as string}
        name={name as string}
        value={value}
        onChange={handleChange}
        {...rest}
      />
      {error && (
        <div aria-live="polite" aria-atomic="true">
          <span className="error-message">{error.join(" & ")}</span>
        </div>
      )}
    </div>
  );
};
