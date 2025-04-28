import type { FC } from "react";
import { Button } from "../../../components/ui/button/v5";
import { TextInput } from "../../../components/ui/textInput/TextInput";

interface FreeeAuthCodeInputProps {
  authCode: string;
  setAuthCode: (value: string) => void;
  handleGetTokenClick: () => Promise<void>;
  isLoading: boolean;
}

/**
 * Freee認証コード入力フォームを表示するコンポーネント
 */
export const FreeeAuthCodeInput: FC<FreeeAuthCodeInputProps> = ({
  authCode,
  setAuthCode,
  handleGetTokenClick,
  isLoading,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <div className="text-sm text-gray-600">
        freee認証ページで認証を完了し、表示された認可コードを入力してください
      </div>
      <div className="flex space-x-2">
        <TextInput
          value={authCode}
          setValue={setAuthCode}
          placeholder="認可コードを入力"
          label=""
        />
        <Button
          label={"トークン取得"}
          onClick={handleGetTokenClick}
          type={"add"}
          disabled={isLoading}
        />
      </div>
    </div>
  );
};
