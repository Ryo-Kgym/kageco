import { useMemo } from "react";
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { EditableDateTime } from "~/ui/editable/EditableDateTime";
import type { AttendanceLog } from "./types";

interface Props {
  visible: boolean;
  selectedLog: AttendanceLog | null;
  editableDateTime: string;
  setEditableDateTime: (value: string) => void;
  editableMemo: string;
  setEditableMemo: (value: string) => void;
  onClose: () => void;
  onUpdate: () => void;
}

/**
 * 勤怠ログ編集用のモーダルコンポーネント
 * 親コンポーネントから状態とハンドラを受け取り、UI 表示のみを担う。
 */
export const AttendanceEditModal = ({
  visible,
  selectedLog,
  editableDateTime,
  setEditableDateTime,
  editableMemo,
  setEditableMemo,
  onClose,
  onUpdate,
}: Props) => {
  const dateValue = useMemo(
    () => (editableDateTime ? new Date(editableDateTime) : undefined),
    [editableDateTime],
  );

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalBackdrop}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>勤怠ログの編集</Text>

          <View style={styles.modalRow}>
            <Text style={styles.modalLabel}>種別</Text>
            <Text style={styles.modalValue}>
              {selectedLog?.state === "attend" ? "出勤" : "退勤"}
            </Text>
          </View>

          <View style={styles.modalRow}>
            <Text style={styles.modalLabel}>日時</Text>
            <EditableDateTime
              value={dateValue}
              setValue={(d) => setEditableDateTime(d ? d.toISOString() : "")}
              loadingValue={editableDateTime || "読み込み中"}
              disabled={false}
            />
          </View>

          <View style={styles.modalRow}>
            <Text style={styles.modalLabel}>メモ</Text>
            <TextInput
              style={[styles.input, styles.memoInput]}
              value={editableMemo}
              onChangeText={setEditableMemo}
              placeholder="メモを入力"
              multiline
            />
          </View>

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.smallButton, styles.secondaryButton]}
              onPress={onClose}
            >
              <Text style={styles.smallButtonText}>閉じる</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.smallButton, styles.primaryButton]} onPress={onUpdate}>
              <Text style={styles.smallButtonText}>更新</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  modalContainer: {
    width: "100%",
    maxWidth: 520,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 12,
  },
  modalRow: {
    marginBottom: 12,
  },
  modalLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 6,
  },
  modalValue: {
    fontSize: 16,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#fafafa",
  },
  memoInput: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
  },
  smallButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  primaryButton: {
    backgroundColor: "#1976D2",
  },
  secondaryButton: {
    backgroundColor: "#9E9E9E",
  },
  smallButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
