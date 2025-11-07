import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import type { TooltipProps } from "recharts/types/component/Tooltip";

export const TooltipContent = ({ label, payload }: TooltipProps<ValueType, NameType>) => (
  <div className={"space-y-3 bg-white p-3"}>
    <span className={"font-bold"}>{label}</span>
    {payload?.map((p) => (
      <span key={p.name} className={"flex items-center justify-between space-x-5"}>
        <span>{p.name}</span>
        <span
          style={{
            color: p.color,
          }}
        >
          {p.value?.toLocaleString()}
        </span>
      </span>
    ))}
  </div>
);
