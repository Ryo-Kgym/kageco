// GraphQL: ログIDから対象ログと所属する日次勤怠および同日ログを取得
import type { YYYY_MM_DD } from "@/util/date/date";
import type { AttendanceState } from "@/util/domain/business/timecard/attendance-state";
import type { TypedDocumentNode } from "@v3/graphql/document";

export const GetAttendanceLogByPkDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getAttendanceLogByPk" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "businessDailyAttendanceLogByPk" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "state" } },
                { kind: "Field", name: { kind: "Name", value: "memo" } },
                { kind: "Field", name: { kind: "Name", value: "datetime" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "dailyAttendance" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "date" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "startDatetime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "endDatetime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "breakSecond" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "logs" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "state" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "memo" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "datetime" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as TypedDocumentNode<
  {
    __typename?: "query_root";
    businessDailyAttendanceLogByPk: {
      id: string;
      state: AttendanceState;
      memo: string | null;
      datetime: string;
      dailyAttendance: {
        id: string;
        date: YYYY_MM_DD;
        startDatetime: string;
        endDatetime: string;
        breakSecond: number;
        logs: {
          id: string;
          state: AttendanceState;
          memo: string | null;
          datetime: string;
        }[];
      } | null;
    } | null;
  },
  { id: string }
>;
