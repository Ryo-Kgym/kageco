import { UpdateMonthlyPlanDocument } from "@v3/graphql/business/schema/mutate/v5/mutateMonthlyPlan.generated";
import { NextResponse } from "next/server";
import { execMutation } from "../../../../persistence/database/server/execMutation";

/**
 * 月次計画を更新する関数
 *
 * @param params 更新パラメータ
 * - businessDays: 営業日数
 * - id: 月次計画ID
 * - plannedWorkingHoursLower: 計画労働時間（下限）
 * - plannedWorkingHoursUpper: 計画労働時間（上限）
 * - userId: ユーザーID
 */
const updateMonthlyPlan = async (params: {
  id: string;
  businessDays: number;
  plannedWorkingHoursLower: number;
  plannedWorkingHoursUpper: number;
}) => {
  await execMutation(UpdateMonthlyPlanDocument, {
    id: params.id,
    set: {
      businessDays: params.businessDays,
      plannedWorkingHoursLower: params.plannedWorkingHoursLower,
      plannedWorkingHoursUpper: params.plannedWorkingHoursUpper,
    },
  });
};

/**
 * 月次計画を更新するPOSTエンドポイント
 *
 * @example
 * // リクエスト例
 * fetch('/api/business/monthlyPlan', {
 *   method: 'POST',
 *   headers: {
 *     'Content-Type': 'application/json',
 *   },
 *   body: JSON.stringify({
 *     businessDays: 20,
 *     id: "monthly-plan-id",
 *     plannedWorkingHoursLower: 120,
 *     plannedWorkingHoursUpper: 160,
 *     userId: "user-id"
 *   }),
 * });
 *
 * @param request POSTリクエスト
 * @returns 更新結果のレスポンス
 */
export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json();
    const {
      businessDays,
      id,
      plannedWorkingHoursLower,
      plannedWorkingHoursUpper,
    } = body;

    // Validate required parameters
    if (
      !businessDays ||
      !id ||
      !plannedWorkingHoursLower ||
      !plannedWorkingHoursUpper
    ) {
      return NextResponse.json(
        {
          error:
            "All parameters (businessDays, id, plannedWorkingHoursLower, plannedWorkingHoursUpper, userId) are required",
        },
        { status: 400 },
      );
    }

    // Validate numeric parameters
    if (
      typeof businessDays !== "number" ||
      typeof plannedWorkingHoursLower !== "number" ||
      typeof plannedWorkingHoursUpper !== "number"
    ) {
      return NextResponse.json(
        {
          error:
            "businessDays, plannedWorkingHoursLower, and plannedWorkingHoursUpper must be numbers",
        },
        { status: 400 },
      );
    }

    // Update monthly plan
    await updateMonthlyPlan({
      businessDays,
      id,
      plannedWorkingHoursLower,
      plannedWorkingHoursUpper,
    });

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Monthly plan updated successfully",
    });
  } catch (error) {
    console.error("Error in updateMonthlyPlan API:", error);
    return NextResponse.json(
      { error: "Failed to update monthly plan" },
      { status: 500 },
    );
  }
}
