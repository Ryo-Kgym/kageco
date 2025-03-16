import type { YYYY_MM_DD } from "@/type/date/date";
import { GetAllCategoriesDocument } from "@v3/graphql/household/schema/batch-sort-category/getAllCategories.generated";
import { GetRecentDetailsDocument } from "@v3/graphql/household/schema/batch-sort-category/getRecentDetails.generated";
import { UpdateCategoryDisplayOrderDocument } from "@v3/graphql/household/schema/batch-sort-category/updateCategoryDisplayOrder.generated";
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
    console.log("[CategoryRepository] getRecentDetails 開始");
    const { group } = await findUser();
    console.log("[CategoryRepository] ユーザーのグループID:", group.id);

    // 過去6ヶ月の開始日を計算
    const today = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(today.getMonth() - 6);
    const startDateStr = sixMonthsAgo.toISOString().split("T")[0] as YYYY_MM_DD; // YYYY-MM-DD形式
    console.log("[CategoryRepository] 過去6ヶ月の開始日:", startDateStr);

    try {
      console.log("[CategoryRepository] GraphQLクエリ実行: GetRecentDetails");
      // 注意: 実際の実装では、生成されたGraphQLドキュメントを使用します
      // 一時的に型エラーを回避するためのモック
      const { data } = await execQuery(GetRecentDetailsDocument, {
        groupId: group.id,
        startDate: startDateStr,
      });
      console.log(
        `[CategoryRepository] 明細取得完了: ${data.householdAllDetailView.length}件`,
      );

      return data.householdAllDetailView.map((detail) => ({
        id: detail.id as string,
        categoryId: detail.categoryId as string,
      }));
    } catch (error) {
      console.error("[CategoryRepository] 明細取得エラー:", error);
      throw new Error("明細の取得に失敗しました");
    }
  }

  /**
   * すべてのカテゴリを取得する
   */
  async getAllCategories(): Promise<Category[]> {
    console.log("[CategoryRepository] getAllCategories 開始");
    const { group } = await findUser();
    console.log("[CategoryRepository] ユーザーのグループID:", group.id);

    try {
      console.log("[CategoryRepository] GraphQLクエリ実行: GetAllCategories");
      // 注意: 実際の実装では、生成されたGraphQLドキュメントを使用します
      // 一時的に型エラーを回避するためのモック
      const { data } = await execQuery(GetAllCategoriesDocument, {
        groupId: group.id,
      });
      console.log(
        `[CategoryRepository] カテゴリ取得完了: ${data.householdCategory.length}件`,
      );

      return data.householdCategory.map((category) => ({
        id: category.id,
        categoryName: category.name,
        displayOrder: category.displayOrder,
      }));
    } catch (error) {
      console.error("[CategoryRepository] カテゴリ取得エラー:", error);
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
    console.log(
      `[CategoryRepository] updateCategoryDisplayOrder 開始: ID=${categoryId}, 表示順=${displayOrder}`,
    );
    try {
      console.log(
        "[CategoryRepository] GraphQLミューテーション実行: UpdateCategoryDisplayOrder",
      );
      // 注意: 実際の実装では、生成されたGraphQLドキュメントを使用します
      // 一時的に型エラーを回避するためのモック
      await execMutation(UpdateCategoryDisplayOrderDocument, {
        categoryId,
        displayOrder,
      });
      console.log(
        `[CategoryRepository] カテゴリ表示順更新完了: ID=${categoryId}`,
      );
    } catch (error) {
      console.error(
        `[CategoryRepository] カテゴリ表示順更新エラー: ID=${categoryId}`,
        error,
      );
      throw new Error("カテゴリの表示順の更新に失敗しました");
    }
  }
}
