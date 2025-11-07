import { convertToYyyyMm } from "@/util/date/convert-to-yyyy-mm";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState, useEffect, useCallback } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { paths } from "~/app/paths";
import { useSaveUserId } from "~/hooks/user/useSaveUserId";

/**
 * 月次計画更新画面
 * 営業日数、計画労働時間（下限・上限）を入力して更新する
 */
export default function MonthlyPlanPage() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [id, setId] = useState("");
  const [businessDays, setBusinessDays] = useState("");
  const [plannedWorkingHoursLower, setPlannedWorkingHoursLower] = useState("");
  const [plannedWorkingHoursUpper, setPlannedWorkingHoursUpper] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const { userId } = useSaveUserId();
  const yearMonth = convertToYyyyMm(new Date());

  /**
   * 月次計画を取得する
   */
  const fetchMonthlyPlan = useCallback(async () => {
    if (!userId) {
      setIsInitializing(false);
      return;
    }

    try {
      const response = await fetch(paths.api.business.monthlyPlan.get({ userId, yearMonth }), {
        method: "GET",
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // フォームに値をセット
        setId(data.data.id || "");
        setBusinessDays(data.data.businessDays?.toString() || "");
        setPlannedWorkingHoursLower(data.data.workHoursLower?.toString() || "");
        setPlannedWorkingHoursUpper(data.data.workHoursUpper?.toString() || "");
      } else {
        console.log("Monthly plan not found or error:", data.error);
      }
    } catch (error) {
      console.error("Error fetching monthly plan:", error);
    } finally {
      setIsInitializing(false);
    }
  }, [userId, yearMonth]);

  // コンポーネントマウント時に月次計画を取得
  useEffect(() => {
    fetchMonthlyPlan();
  }, [fetchMonthlyPlan]);

  /**
   * 月次計画を更新する
   */
  const updateMonthlyPlan = async () => {
    if (!businessDays) {
      Alert.alert("エラー", "営業日数を入力してください");
      return;
    }

    if (!plannedWorkingHoursLower) {
      Alert.alert("エラー", "計画労働時間（下限）を入力してください");
      return;
    }

    if (!plannedWorkingHoursUpper) {
      Alert.alert("エラー", "計画労働時間（上限）を入力してください");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(paths.api.business.monthlyPlan.post(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          businessDays: Number(businessDays),
          plannedWorkingHoursLower: Number(plannedWorkingHoursLower),
          plannedWorkingHoursUpper: Number(plannedWorkingHoursUpper),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("成功", "月次計画を更新しました", [
          { text: "OK", onPress: () => router.back() },
        ]);
      } else {
        Alert.alert("エラー", data.error || "月次計画の更新に失敗しました");
      }
    } catch (error) {
      console.error("Error updating monthly plan:", error);
      Alert.alert("エラー", "月次計画の更新に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  // 初期化中はローディングを表示
  if (isInitializing) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>月次計画を読み込み中...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>月次計画更新</Text>
      <Text style={styles.yearMonth}>{yearMonth}</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>営業日数</Text>
        <TextInput
          style={styles.input}
          value={businessDays}
          onChangeText={setBusinessDays}
          placeholder="営業日数を入力"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>計画労働時間（下限）</Text>
        <TextInput
          style={styles.input}
          value={plannedWorkingHoursLower}
          onChangeText={setPlannedWorkingHoursLower}
          placeholder="計画労働時間（下限）を入力"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>計画労働時間（上限）</Text>
        <TextInput
          style={styles.input}
          value={plannedWorkingHoursUpper}
          onChangeText={setPlannedWorkingHoursUpper}
          placeholder="計画労働時間（上限）を入力"
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={updateMonthlyPlan}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>{isLoading ? "更新中..." : "更新する"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  yearMonth: {
    fontSize: 18,
    color: "#666",
    marginBottom: 24,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 24,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
