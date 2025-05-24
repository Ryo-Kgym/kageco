import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { paths } from "~/app/paths";

/**
 * 月次計画更新画面
 * 営業日数、計画労働時間（下限・上限）を入力して更新する
 */
export default function MonthlyPlanPage() {
  const router = useRouter();
  const [id, setId] = useState("");
  const [businessDays, setBusinessDays] = useState("");
  const [plannedWorkingHoursLower, setPlannedWorkingHoursLower] = useState("");
  const [plannedWorkingHoursUpper, setPlannedWorkingHoursUpper] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /**
   * 月次計画を更新する
   */
  const updateMonthlyPlan = async () => {
    if (!id) {
      Alert.alert("エラー", "月次計画IDを入力してください");
      return;
    }

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>月次計画更新</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>月次計画ID</Text>
        <TextInput
          style={styles.input}
          value={id}
          onChangeText={setId}
          placeholder="月次計画IDを入力"
          keyboardType="default"
        />
      </View>

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
        <Text style={styles.buttonText}>
          {isLoading ? "更新中..." : "更新する"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
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
