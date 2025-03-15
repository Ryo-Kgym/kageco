import type { YYYY_MM_DD } from "@/type/date/date";
import { UpdateCategoryDisplayOrderDocument } from "@v3/graphql/household/schema/mutation/v5/UpdateCategoryDisplayOrder.generated";
import { GetAllCategoriesDocument } from "@v3/graphql/household/schema/query/v5/GetAllCategories.generated";
import { GetRecentDetailsDocument } from "@v3/graphql/household/schema/query/v5/GetRecentDetails.generated";
import { findUser } from "../../persistence/browser/server/find-user";
import { execMutation } from "../../persistence/database/server/execMutation";
import { execQuery } from "../../persistence/database/server/execQuery";

export type CategoryDetail = {
  id: string;
  categoryId: string | null;
};

export type Category = {
  id: string;
  categoryName: string;
  displayOrder: number;
};

/**
 * カテゴリリポジトリのインターフェース
 */
export interface ICategoryRepository {
  getRecentDetails(): Promise<CategoryDetail[]>;
  getAllCategories(): Promise<Category[]>;
  updateCategoryDisplayOrder(
    categoryId: string,
    displayOrder: number,
  ): Promise<void>;
}

/**
 * カテゴリリポジトリの実装
 */
export class CategoryRepository implements ICategoryRepository {
  /**
   * 過去6ヶ月の明細を取得する
   */
  async getRecentDetails(): Promise<CategoryDetail[]> {
    const { group } = await findUser();

    // 過去6ヶ月の開始日を計算
    const today = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(today.getMonth() - 6);
    const startDateStr = sixMonthsAgo.toISOString().split("T")[0] as YYYY_MM_DD; // YYYY-MM-DD形式

    try {
      // 注意: 実際の実装では、生成されたGraphQLドキュメントを使用します
      // 一時的に型エラーを回避するためのモック
      const { data } = await execQuery(GetRecentDetailsDocument, {
        groupId: group.id,
        startDate: startDateStr,
      });

      return data.householdAllDetailView.map((detail) => ({
        id: detail.id as string,
        categoryId: detail.categoryId as string,
      }));
    } catch (error) {
      console.error("Error fetching recent details:", error);
      throw new Error("明細の取得に失敗しました");
    }
  }

  /**
   * すべてのカテゴリを取得する
   */
  async getAllCategories(): Promise<Category[]> {
    const { group } = await findUser();

    try {
      // 注意: 実際の実装では、生成されたGraphQLドキュメントを使用します
      // 一時的に型エラーを回避するためのモック
      const { data } = await execQuery(GetAllCategoriesDocument, {
        groupId: group.id,
      });

      return data.householdCategory.map((category) => ({
        id: category.id,
        categoryName: category.name,
        displayOrder: category.displayOrder,
      }));
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw new Error("カテゴリの取得に失敗しました");
    }
  }

  /**
   * カテゴリの表示順を更新する
   */
  async updateCategoryDisplayOrder(
    categoryId: string,
    displayOrder: number,
  ): Promise<void> {
    try {
      // 注意: 実際の実装では、生成されたGraphQLドキュメントを使用します
      // 一時的に型エラーを回避するためのモック
      await execMutation(UpdateCategoryDisplayOrderDocument, {
        categoryId,
        displayOrder,
      });
    } catch (error) {
      console.error("Error updating category display order:", error);
      throw new Error("カテゴリの表示順の更新に失敗しました");
    }
  }
}
