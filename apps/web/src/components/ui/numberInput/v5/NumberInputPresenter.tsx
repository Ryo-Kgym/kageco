import { NumberInput } from "@mantine/core";
import type { CSSProperties } from "react";

// iOSでの自動ズームを防止するスタイル
const preventZoomStyle: CSSProperties = {
  fontSize: "16px", // 16px以上のフォントサイズを設定
  transform: "scale(0.875)", // 見た目のサイズを小さくする（16px * 0.875 = 14px相当）
  transformOrigin: "left top",
  width: "114%", // スケール変換による幅の調整（1/0.875 ≈ 1.14）
};

/**
 * @package
 */
export const NumberInputPresenter = ({
  label,
  value,
  onChange,
  placeholder,
  error,
  withAsterisk,
  disabled,
}: {
  label: string;
  value: number | "";
  onChange: (_: string | number) => void;
  placeholder?: string;
  error: string;
  withAsterisk?: boolean;
  disabled: boolean;
}) => (
  <>
    <div style={{ touchAction: "manipulation" }}>
      <NumberInput
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        label={label}
        error={error}
        size="xs"
        withAsterisk={withAsterisk}
        hideControls
        disabled={disabled}
        type="tel"
        styles={{
          input: {
            ...preventZoomStyle,
            // 追加のiOS対策
            WebkitTextSizeAdjust: "100%",
            WebkitTapHighlightColor: "rgba(0,0,0,0)",
          },
        }}
      />
    </div>
  </>
);
