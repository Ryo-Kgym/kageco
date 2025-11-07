import { MonthlyPlan } from "@/core/domain/business/work/MonthlyPlan";
import type { YYYY_MM } from "@/util/date/date";
import { UpdateMonthlyPlanDocument } from "@v3/graphql/business/schema/mutate/v5/mutateMonthlyPlan.generated";
import { GetMonthlyPlanDocument } from "@v3/graphql/business/schema/query/v5/queryMonthlyPlan.generated";
import { NextResponse } from "next/server";
import { execMutation } from "../../../../persistence/database/server/execMutation";
import { execQuery } from "../../../../persistence/database/server/execQuery";

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

const getMonthlyPlan = async (params: {
  userId: string;
  yearMonth: YYYY_MM;
}): Promise<
  | (Pick<MonthlyPlan, "businessDays" | "workHoursUpper" | "workHoursLower"> & {
      id: string;
    })
  | null
> => {
  const { data } = await execQuery(GetMonthlyPlanDocument, {
    userId: params.userId,
    yearMonth: params.yearMonth,
  });

  if (!data.monthlyPlan?.[0]) {
    return null;
  }

  return {
    id: data.monthlyPlan[0].id,
    businessDays: data.monthlyPlan[0].businessDays,
    workHoursLower: data.monthlyPlan[0].plannedWorkingHoursLower,
    workHoursUpper: data.monthlyPlan[0].plannedWorkingHoursUpper,
  };
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
    const { businessDays, id, plannedWorkingHoursLower, plannedWorkingHoursUpper } = body;

    // Validate required parameters
    if (!businessDays || !id || !plannedWorkingHoursLower || !plannedWorkingHoursUpper) {
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
    return NextResponse.json({ error: "Failed to update monthly plan" }, { status: 500 });
  }
}

/**
 * 月次計画を取得するGETエンドポイント
 *
 * @example
 * // リクエスト例
 * fetch('/api/business/monthlyPlan?userId=user-id&yearMonth=2023-01', {
 *   method: 'GET',
 * });
 *
 * @param request GETリクエスト
 * @returns 月次計画のレスポンス
 */
export async function GET(request: Request) {
  try {
    // Get URL from request
    const url = new URL(request.url);

    // Extract query parameters
    const userId = url.searchParams.get("userId");
    const yearMonth = url.searchParams.get("yearMonth") as YYYY_MM | null;

    // Validate required parameters
    if (!userId || !yearMonth) {
      return NextResponse.json(
        {
          error: "Both userId and yearMonth parameters are required",
        },
        { status: 400 },
      );
    }

    // Validate yearMonth format
    const yearMonthRegex = /^20\d{2}-(?:0[1-9]|1[0-2])$/;
    if (!yearMonthRegex.test(yearMonth)) {
      return NextResponse.json(
        {
          error: "yearMonth must be in YYYY-MM format (e.g., 2023-01)",
        },
        { status: 400 },
      );
    }

    // Get monthly plan
    const monthlyPlan = await getMonthlyPlan({
      userId,
      yearMonth,
    });

    // Return response
    if (!monthlyPlan) {
      return NextResponse.json(
        {
          error: "Monthly plan not found",
        },
        { status: 404 },
      );
    }

    const monthlyPlanClass = new MonthlyPlan({
      businessDays: monthlyPlan.businessDays,
      workHoursLower: monthlyPlan.workHoursLower,
      workHoursUpper: monthlyPlan.workHoursUpper,
    });

    return NextResponse.json({
      success: true,
      data: {
        id: monthlyPlan.id,
        businessDays: monthlyPlanClass.businessDays,
        workHoursLower: monthlyPlanClass.workHoursLower,
        workHoursUpper: monthlyPlanClass.workHoursUpper,
        workSecondLower: monthlyPlanClass.workSecondLower,
        workSecondUpper: monthlyPlanClass.workSecondUpper,
      },
    });
  } catch (error) {
    console.error("Error in getMonthlyPlan API:", error);
    return NextResponse.json({ error: "Failed to get monthly plan" }, { status: 500 });
  }
}
