import { useGetDetailMaster } from "../../../features/householdRegisterDaily/hooks/useDetailMaster";
import type { DailyDetailForm } from "../../organisms/register_daily_detail/dailyDetailForm";
import { Select } from "./v4";
import type { SelectProps } from "./v4";

type TemplateSelectProps = {
  label?: string;
  value: string;
  setValue: (value: string) => void;
  onTemplateSelect: (form: Partial<DailyDetailForm>) => void;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  compact?: boolean;
};

export const TemplateSelect = ({
  label = "テンプレート",
  value,
  setValue,
  onTemplateSelect,
  required,
  placeholder = "テンプレートを選択",
  disabled,
  compact = false,
}: TemplateSelectProps) => {
  const { getTemplates } = useGetDetailMaster();
  const templates = getTemplates();

  const handleChange = (selectedValue: string) => {
    setValue(selectedValue);

    if (selectedValue) {
      const selectedTemplate = templates.find((t) => t.id === selectedValue);

      if (selectedTemplate) {
        onTemplateSelect({
          iocomeType: selectedTemplate.iocomeType,
          genreId: selectedTemplate.genreId,
          categoryId: selectedTemplate.categoryId,
          accountId: selectedTemplate.accountId,
          amount: selectedTemplate.amount,
          memo: selectedTemplate.memo || "",
        });
      }
    }
  };

  const templateData: SelectProps<string>["data"] = templates.map(
    (template) => ({
      label: template.name,
      value: template.id,
    }),
  );

  return (
    <Select
      label={compact ? "" : label}
      value={value}
      setValue={handleChange}
      data={templateData}
      required={required}
      placeholder={compact ? "テンプレート" : placeholder}
      disabled={disabled}
    />
  );
};
