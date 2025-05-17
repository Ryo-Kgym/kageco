import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal, ScrollView } from "react-native";
import { formatTime, formatMinutes, formatSeconds } from "./utils";
import type { DayAttendance } from "./types";

interface DailyAttendanceDetailProps {
  day: DayAttendance;
  onClose: () => void;
  visible: boolean;
}

/**
 * 日毎の勤怠詳細を表示するコンポーネント
 */
export const DailyAttendanceDetail = ({ day, onClose, visible }: DailyAttendanceDetailProps) => {
  // 日付を整形
  const formattedDate = day.date.toString().replace(/(\d{4})-(\d{2})-(\d{2})/, "$1年$2月$3日");
  
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>{formattedDate}（{day.dayOfWeek}）</Text>
          
          {/* 勤怠情報 */}
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>出勤時間:</Text>
              <Text style={styles.infoValue}>
                {day.startDatetime ? formatTime(day.startDatetime.parseDate()) : "-"}
              </Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>退勤時間:</Text>
              <Text style={styles.infoValue}>
                {day.endDatetime ? formatTime(day.endDatetime.parseDate()) : "-"}
              </Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>休憩時間:</Text>
              <Text style={styles.infoValue}>
                {formatMinutes(day.breakSecond)}分
              </Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>勤務時間:</Text>
              <Text style={styles.infoValue}>
                {formatSeconds(day.workSecond)}
              </Text>
            </View>
          </View>
          
          {/* ログ履歴 */}
          {day.logs && day.logs.length > 0 && (
            <View style={styles.logsContainer}>
              <Text style={styles.sectionTitle}>ログ履歴</Text>
              <ScrollView style={styles.logsList}>
                {day.logs.map((log, index) => (
                  <View key={log.id} style={styles.logItem}>
                    <Text style={styles.logTime}>
                      {formatTime(log.datetime.parseDate())}
                    </Text>
                    <Text style={styles.logState}>
                      {log.state === "attend" ? "出勤" : "退勤"}
                    </Text>
                    {log.memo && <Text style={styles.logMemo}>{log.memo}</Text>}
                  </View>
                ))}
              </ScrollView>
            </View>
          )}
          
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text style={styles.closeButtonText}>閉じる</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  infoLabel: {
    fontSize: 16,
    color: "#555",
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  logsContainer: {
    marginBottom: 20,
  },
  logsList: {
    maxHeight: 200,
  },
  logItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  logTime: {
    fontSize: 14,
    marginRight: 10,
    width: 60,
  },
  logState: {
    fontSize: 14,
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: "hidden",
  },
  logMemo: {
    fontSize: 14,
    marginLeft: 10,
    color: "#666",
    flex: 1,
  },
  closeButton: {
    backgroundColor: "#2196F3",
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});