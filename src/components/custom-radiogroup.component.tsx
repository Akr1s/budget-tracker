import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface IOption {
  label: string;
  value: string;
}

interface IProps {
  items: IOption[];
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

export default function CustomRadioGroup({ items, value, onValueChange, className }: IProps) {
  return (
    <RadioGroup value={value} onValueChange={onValueChange} className={className}>
      {items.map((item) => (
        <div key={item.value} className="flex items-center gap-2">
          <RadioGroupItem id={item.value} value={item.value} />
          <Label htmlFor={item.value}>{item.label}</Label>
        </div>
      ))}
    </RadioGroup>
  );
}
