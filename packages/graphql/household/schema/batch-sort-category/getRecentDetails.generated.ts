import { YYYY_MM_DD, YYYY_MM_DD_HH_MM_SS } from "@/type/date/date";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

import * as Types from "../../generated/typed";

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  bpchar: string;
  date: YYYY_MM_DD;
  json: unknown;
  numeric: number;
  timestamp: string;
  timestamptz: YYYY_MM_DD_HH_MM_SS;
};

export type AffiliationAggregateBoolExp = {
  count: InputMaybe<AffiliationAggregateBoolExpCount>;
};

/** order by aggregate values of table "affiliation" */
export type AffiliationAggregateOrderBy = {
  count: InputMaybe<OrderBy>;
  max: InputMaybe<AffiliationMaxOrderBy>;
  min: InputMaybe<AffiliationMinOrderBy>;
};

/** input type for inserting array relation for remote table "affiliation" */
export type AffiliationArrRelInsertInput = {
  data: Array<AffiliationInsertInput>;
  /** upsert condition */
  onConflict: InputMaybe<AffiliationOnConflict>;
};

/** Boolean expression to filter rows from the table "affiliation". All fields are combined with a logical 'AND'. */
export type AffiliationBoolExp = {
  _and: InputMaybe<Array<AffiliationBoolExp>>;
  _not: InputMaybe<AffiliationBoolExp>;
  _or: InputMaybe<Array<AffiliationBoolExp>>;
  group: InputMaybe<GroupBoolExp>;
  groupId: InputMaybe<StringComparisonExp>;
  groupRole: InputMaybe<StringComparisonExp>;
  id: InputMaybe<StringComparisonExp>;
  user: InputMaybe<UserBoolExp>;
  userId: InputMaybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "affiliation" */
export type AffiliationConstraint =
  /** unique or primary key constraint on columns "id" */
  "affiliation_pkey";

/** input type for inserting data into table "affiliation" */
export type AffiliationInsertInput = {
  groupId: InputMaybe<Scalars["String"]>;
  groupRole: InputMaybe<Scalars["String"]>;
  id: InputMaybe<Scalars["String"]>;
  user: InputMaybe<UserObjRelInsertInput>;
  userId: InputMaybe<Scalars["String"]>;
};

/** order by max() on columns of table "affiliation" */
export type AffiliationMaxOrderBy = {
  groupId: InputMaybe<OrderBy>;
  groupRole: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  userId: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "affiliation" */
export type AffiliationMinOrderBy = {
  groupId: InputMaybe<OrderBy>;
  groupRole: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  userId: InputMaybe<OrderBy>;
};

/** on_conflict condition type for table "affiliation" */
export type AffiliationOnConflict = {
  constraint: AffiliationConstraint;
  updateColumns: Array<AffiliationUpdateColumn>;
  where: InputMaybe<AffiliationBoolExp>;
};

/** Ordering options when selecting data from "affiliation". */
export type AffiliationOrderBy = {
  group: InputMaybe<GroupOrderBy>;
  groupId: InputMaybe<OrderBy>;
  groupRole: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  user: InputMaybe<UserOrderBy>;
  userId: InputMaybe<OrderBy>;
};

/** select columns of table "affiliation" */
export type AffiliationSelectColumn =
  /** column name */
  | "groupId"
  /** column name */
  | "groupRole"
  /** column name */
  | "id"
  /** column name */
  | "userId";

/** Streaming cursor of the table "affiliation" */
export type AffiliationStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: AffiliationStreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type AffiliationStreamCursorValueInput = {
  groupId: InputMaybe<Scalars["String"]>;
  groupRole: InputMaybe<Scalars["String"]>;
  id: InputMaybe<Scalars["String"]>;
  userId: InputMaybe<Scalars["String"]>;
};

/** placeholder for update columns of table "affiliation" (current role has no relevant permissions) */
export type AffiliationUpdateColumn =
  /** placeholder (do not use) */
  "_PLACEHOLDER";

/** order by aggregate values of table "app" */
export type AppAggregateOrderBy = {
  count: InputMaybe<OrderBy>;
  max: InputMaybe<AppMaxOrderBy>;
  min: InputMaybe<AppMinOrderBy>;
};

/** Boolean expression to filter rows from the table "app". All fields are combined with a logical 'AND'. */
export type AppBoolExp = {
  _and: InputMaybe<Array<AppBoolExp>>;
  _not: InputMaybe<AppBoolExp>;
  _or: InputMaybe<Array<AppBoolExp>>;
  group: InputMaybe<GroupBoolExp>;
  groupId: InputMaybe<StringComparisonExp>;
  id: InputMaybe<StringComparisonExp>;
  name: InputMaybe<StringComparisonExp>;
};

/** order by max() on columns of table "app" */
export type AppMaxOrderBy = {
  groupId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  name: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "app" */
export type AppMinOrderBy = {
  groupId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  name: InputMaybe<OrderBy>;
};

/** Ordering options when selecting data from "app". */
export type AppOrderBy = {
  group: InputMaybe<GroupOrderBy>;
  groupId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  name: InputMaybe<OrderBy>;
};

/** select columns of table "app" */
export type AppSelectColumn =
  /** column name */
  | "groupId"
  /** column name */
  | "id"
  /** column name */
  | "name";

/** Streaming cursor of the table "app" */
export type AppStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: AppStreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type AppStreamCursorValueInput = {
  groupId: InputMaybe<Scalars["String"]>;
  id: InputMaybe<Scalars["String"]>;
  name: InputMaybe<Scalars["String"]>;
};

/** Boolean expression to filter rows from the table "application". All fields are combined with a logical 'AND'. */
export type ApplicationBoolExp = {
  _and: InputMaybe<Array<ApplicationBoolExp>>;
  _not: InputMaybe<ApplicationBoolExp>;
  _or: InputMaybe<Array<ApplicationBoolExp>>;
  groupApplications: InputMaybe<GroupApplicationBoolExp>;
  groupApplicationsAggregate: InputMaybe<GroupApplicationAggregateBoolExp>;
  id: InputMaybe<StringComparisonExp>;
  name: InputMaybe<StringComparisonExp>;
  topUrl: InputMaybe<StringComparisonExp>;
  validFlag: InputMaybe<BooleanComparisonExp>;
};

/** Ordering options when selecting data from "application". */
export type ApplicationOrderBy = {
  groupApplicationsAggregate: InputMaybe<GroupApplicationAggregateOrderBy>;
  id: InputMaybe<OrderBy>;
  name: InputMaybe<OrderBy>;
  topUrl: InputMaybe<OrderBy>;
  validFlag: InputMaybe<OrderBy>;
};

/** select columns of table "application" */
export type ApplicationSelectColumn =
  /** column name */
  | "id"
  /** column name */
  | "name"
  /** column name */
  | "topUrl"
  /** column name */
  | "validFlag";

/** Streaming cursor of the table "application" */
export type ApplicationStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: ApplicationStreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type ApplicationStreamCursorValueInput = {
  id: InputMaybe<Scalars["String"]>;
  name: InputMaybe<Scalars["String"]>;
  topUrl: InputMaybe<Scalars["String"]>;
  validFlag: InputMaybe<Scalars["Boolean"]>;
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type BooleanComparisonExp = {
  _eq: InputMaybe<Scalars["Boolean"]>;
  _gt: InputMaybe<Scalars["Boolean"]>;
  _gte: InputMaybe<Scalars["Boolean"]>;
  _in: InputMaybe<Array<Scalars["Boolean"]>>;
  _isNull: InputMaybe<Scalars["Boolean"]>;
  _lt: InputMaybe<Scalars["Boolean"]>;
  _lte: InputMaybe<Scalars["Boolean"]>;
  _neq: InputMaybe<Scalars["Boolean"]>;
  _nin: InputMaybe<Array<Scalars["Boolean"]>>;
};

/** Boolean expression to compare columns of type "bpchar". All fields are combined with logical 'AND'. */
export type BpcharComparisonExp = {
  _eq: InputMaybe<Scalars["bpchar"]>;
  _gt: InputMaybe<Scalars["bpchar"]>;
  _gte: InputMaybe<Scalars["bpchar"]>;
  /** does the column match the given case-insensitive pattern */
  _ilike: InputMaybe<Scalars["bpchar"]>;
  _in: InputMaybe<Array<Scalars["bpchar"]>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex: InputMaybe<Scalars["bpchar"]>;
  _isNull: InputMaybe<Scalars["Boolean"]>;
  /** does the column match the given pattern */
  _like: InputMaybe<Scalars["bpchar"]>;
  _lt: InputMaybe<Scalars["bpchar"]>;
  _lte: InputMaybe<Scalars["bpchar"]>;
  _neq: InputMaybe<Scalars["bpchar"]>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike: InputMaybe<Scalars["bpchar"]>;
  _nin: InputMaybe<Array<Scalars["bpchar"]>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex: InputMaybe<Scalars["bpchar"]>;
  /** does the column NOT match the given pattern */
  _nlike: InputMaybe<Scalars["bpchar"]>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex: InputMaybe<Scalars["bpchar"]>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar: InputMaybe<Scalars["bpchar"]>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex: InputMaybe<Scalars["bpchar"]>;
  /** does the column match the given SQL regular expression */
  _similar: InputMaybe<Scalars["bpchar"]>;
};

/** order by aggregate values of table "business.daily_attendance" */
export type BusinessDailyAttendanceAggregateOrderBy = {
  avg: InputMaybe<BusinessDailyAttendanceAvgOrderBy>;
  count: InputMaybe<OrderBy>;
  max: InputMaybe<BusinessDailyAttendanceMaxOrderBy>;
  min: InputMaybe<BusinessDailyAttendanceMinOrderBy>;
  stddev: InputMaybe<BusinessDailyAttendanceStddevOrderBy>;
  stddevPop: InputMaybe<BusinessDailyAttendanceStddevPopOrderBy>;
  stddevSamp: InputMaybe<BusinessDailyAttendanceStddevSampOrderBy>;
  sum: InputMaybe<BusinessDailyAttendanceSumOrderBy>;
  varPop: InputMaybe<BusinessDailyAttendanceVarPopOrderBy>;
  varSamp: InputMaybe<BusinessDailyAttendanceVarSampOrderBy>;
  variance: InputMaybe<BusinessDailyAttendanceVarianceOrderBy>;
};

/** order by avg() on columns of table "business.daily_attendance" */
export type BusinessDailyAttendanceAvgOrderBy = {
  breakSecond: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "business.daily_attendance". All fields are combined with a logical 'AND'. */
export type BusinessDailyAttendanceBoolExp = {
  _and: InputMaybe<Array<BusinessDailyAttendanceBoolExp>>;
  _not: InputMaybe<BusinessDailyAttendanceBoolExp>;
  _or: InputMaybe<Array<BusinessDailyAttendanceBoolExp>>;
  breakSecond: InputMaybe<IntComparisonExp>;
  dailyAttendanceLogs: InputMaybe<BusinessDailyAttendanceLogBoolExp>;
  date: InputMaybe<DateComparisonExp>;
  endDatetime: InputMaybe<TimestamptzComparisonExp>;
  group: InputMaybe<GroupBoolExp>;
  groupId: InputMaybe<StringComparisonExp>;
  id: InputMaybe<StringComparisonExp>;
  startDatetime: InputMaybe<TimestamptzComparisonExp>;
  user: InputMaybe<UserBoolExp>;
  userId: InputMaybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "business.daily_attendance" */
export type BusinessDailyAttendanceConstraint =
  /** unique or primary key constraint on columns "id" */
  "daily_attendance_pkey";

/** input type for incrementing numeric columns in table "business.daily_attendance" */
export type BusinessDailyAttendanceIncInput = {
  breakSecond: InputMaybe<Scalars["Int"]>;
};

/** input type for inserting data into table "business.daily_attendance" */
export type BusinessDailyAttendanceInsertInput = {
  breakSecond: InputMaybe<Scalars["Int"]>;
  dailyAttendanceLogs: InputMaybe<BusinessDailyAttendanceLogArrRelInsertInput>;
  date: InputMaybe<Scalars["date"]>;
  endDatetime: InputMaybe<Scalars["timestamptz"]>;
  groupId: InputMaybe<Scalars["String"]>;
  id: InputMaybe<Scalars["String"]>;
  startDatetime: InputMaybe<Scalars["timestamptz"]>;
  user: InputMaybe<UserObjRelInsertInput>;
  userId: InputMaybe<Scalars["String"]>;
};

/** order by aggregate values of table "business.daily_attendance_log" */
export type BusinessDailyAttendanceLogAggregateOrderBy = {
  count: InputMaybe<OrderBy>;
  max: InputMaybe<BusinessDailyAttendanceLogMaxOrderBy>;
  min: InputMaybe<BusinessDailyAttendanceLogMinOrderBy>;
};

/** input type for inserting array relation for remote table "business.daily_attendance_log" */
export type BusinessDailyAttendanceLogArrRelInsertInput = {
  data: Array<BusinessDailyAttendanceLogInsertInput>;
  /** upsert condition */
  onConflict: InputMaybe<BusinessDailyAttendanceLogOnConflict>;
};

/** Boolean expression to filter rows from the table "business.daily_attendance_log". All fields are combined with a logical 'AND'. */
export type BusinessDailyAttendanceLogBoolExp = {
  _and: InputMaybe<Array<BusinessDailyAttendanceLogBoolExp>>;
  _not: InputMaybe<BusinessDailyAttendanceLogBoolExp>;
  _or: InputMaybe<Array<BusinessDailyAttendanceLogBoolExp>>;
  dailyAttendance: InputMaybe<BusinessDailyAttendanceBoolExp>;
  dailyAttendanceId: InputMaybe<StringComparisonExp>;
  datetime: InputMaybe<TimestamptzComparisonExp>;
  id: InputMaybe<StringComparisonExp>;
  memo: InputMaybe<StringComparisonExp>;
  state: InputMaybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "business.daily_attendance_log" */
export type BusinessDailyAttendanceLogConstraint =
  /** unique or primary key constraint on columns "id" */
  "daily_attendance_log_pkey";

/** input type for inserting data into table "business.daily_attendance_log" */
export type BusinessDailyAttendanceLogInsertInput = {
  dailyAttendance: InputMaybe<BusinessDailyAttendanceObjRelInsertInput>;
  dailyAttendanceId: InputMaybe<Scalars["String"]>;
  datetime: InputMaybe<Scalars["timestamptz"]>;
  id: InputMaybe<Scalars["String"]>;
  memo: InputMaybe<Scalars["String"]>;
  state: InputMaybe<Scalars["String"]>;
};

/** order by max() on columns of table "business.daily_attendance_log" */
export type BusinessDailyAttendanceLogMaxOrderBy = {
  dailyAttendanceId: InputMaybe<OrderBy>;
  datetime: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  memo: InputMaybe<OrderBy>;
  state: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "business.daily_attendance_log" */
export type BusinessDailyAttendanceLogMinOrderBy = {
  dailyAttendanceId: InputMaybe<OrderBy>;
  datetime: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  memo: InputMaybe<OrderBy>;
  state: InputMaybe<OrderBy>;
};

/** on_conflict condition type for table "business.daily_attendance_log" */
export type BusinessDailyAttendanceLogOnConflict = {
  constraint: BusinessDailyAttendanceLogConstraint;
  updateColumns: Array<BusinessDailyAttendanceLogUpdateColumn>;
  where: InputMaybe<BusinessDailyAttendanceLogBoolExp>;
};

/** Ordering options when selecting data from "business.daily_attendance_log". */
export type BusinessDailyAttendanceLogOrderBy = {
  dailyAttendance: InputMaybe<BusinessDailyAttendanceOrderBy>;
  dailyAttendanceId: InputMaybe<OrderBy>;
  datetime: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  memo: InputMaybe<OrderBy>;
  state: InputMaybe<OrderBy>;
};

/** select columns of table "business.daily_attendance_log" */
export type BusinessDailyAttendanceLogSelectColumn =
  /** column name */
  | "dailyAttendanceId"
  /** column name */
  | "datetime"
  /** column name */
  | "id"
  /** column name */
  | "memo"
  /** column name */
  | "state";

/** Streaming cursor of the table "business_daily_attendance_log" */
export type BusinessDailyAttendanceLogStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: BusinessDailyAttendanceLogStreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type BusinessDailyAttendanceLogStreamCursorValueInput = {
  dailyAttendanceId: InputMaybe<Scalars["String"]>;
  datetime: InputMaybe<Scalars["timestamptz"]>;
  id: InputMaybe<Scalars["String"]>;
  memo: InputMaybe<Scalars["String"]>;
  state: InputMaybe<Scalars["String"]>;
};

/** placeholder for update columns of table "business.daily_attendance_log" (current role has no relevant permissions) */
export type BusinessDailyAttendanceLogUpdateColumn =
  /** placeholder (do not use) */
  "_PLACEHOLDER";

/** order by max() on columns of table "business.daily_attendance" */
export type BusinessDailyAttendanceMaxOrderBy = {
  breakSecond: InputMaybe<OrderBy>;
  date: InputMaybe<OrderBy>;
  endDatetime: InputMaybe<OrderBy>;
  groupId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  startDatetime: InputMaybe<OrderBy>;
  userId: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "business.daily_attendance" */
export type BusinessDailyAttendanceMinOrderBy = {
  breakSecond: InputMaybe<OrderBy>;
  date: InputMaybe<OrderBy>;
  endDatetime: InputMaybe<OrderBy>;
  groupId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  startDatetime: InputMaybe<OrderBy>;
  userId: InputMaybe<OrderBy>;
};

/** input type for inserting object relation for remote table "business.daily_attendance" */
export type BusinessDailyAttendanceObjRelInsertInput = {
  data: BusinessDailyAttendanceInsertInput;
  /** upsert condition */
  onConflict: InputMaybe<BusinessDailyAttendanceOnConflict>;
};

/** on_conflict condition type for table "business.daily_attendance" */
export type BusinessDailyAttendanceOnConflict = {
  constraint: BusinessDailyAttendanceConstraint;
  updateColumns: Array<BusinessDailyAttendanceUpdateColumn>;
  where: InputMaybe<BusinessDailyAttendanceBoolExp>;
};

/** Ordering options when selecting data from "business.daily_attendance". */
export type BusinessDailyAttendanceOrderBy = {
  breakSecond: InputMaybe<OrderBy>;
  dailyAttendanceLogsAggregate: InputMaybe<BusinessDailyAttendanceLogAggregateOrderBy>;
  date: InputMaybe<OrderBy>;
  endDatetime: InputMaybe<OrderBy>;
  group: InputMaybe<GroupOrderBy>;
  groupId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  startDatetime: InputMaybe<OrderBy>;
  user: InputMaybe<UserOrderBy>;
  userId: InputMaybe<OrderBy>;
};

/** primary key columns input for table: business.daily_attendance */
export type BusinessDailyAttendancePkColumnsInput = {
  id: Scalars["String"];
};

/** select columns of table "business.daily_attendance" */
export type BusinessDailyAttendanceSelectColumn =
  /** column name */
  | "breakSecond"
  /** column name */
  | "date"
  /** column name */
  | "endDatetime"
  /** column name */
  | "groupId"
  /** column name */
  | "id"
  /** column name */
  | "startDatetime"
  /** column name */
  | "userId";

/** input type for updating data in table "business.daily_attendance" */
export type BusinessDailyAttendanceSetInput = {
  breakSecond: InputMaybe<Scalars["Int"]>;
  endDatetime: InputMaybe<Scalars["timestamptz"]>;
  startDatetime: InputMaybe<Scalars["timestamptz"]>;
};

/** order by stddev() on columns of table "business.daily_attendance" */
export type BusinessDailyAttendanceStddevOrderBy = {
  breakSecond: InputMaybe<OrderBy>;
};

/** order by stddevPop() on columns of table "business.daily_attendance" */
export type BusinessDailyAttendanceStddevPopOrderBy = {
  breakSecond: InputMaybe<OrderBy>;
};

/** order by stddevSamp() on columns of table "business.daily_attendance" */
export type BusinessDailyAttendanceStddevSampOrderBy = {
  breakSecond: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "business_daily_attendance" */
export type BusinessDailyAttendanceStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: BusinessDailyAttendanceStreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type BusinessDailyAttendanceStreamCursorValueInput = {
  breakSecond: InputMaybe<Scalars["Int"]>;
  date: InputMaybe<Scalars["date"]>;
  endDatetime: InputMaybe<Scalars["timestamptz"]>;
  groupId: InputMaybe<Scalars["String"]>;
  id: InputMaybe<Scalars["String"]>;
  startDatetime: InputMaybe<Scalars["timestamptz"]>;
  userId: InputMaybe<Scalars["String"]>;
};

/** order by sum() on columns of table "business.daily_attendance" */
export type BusinessDailyAttendanceSumOrderBy = {
  breakSecond: InputMaybe<OrderBy>;
};

/** update columns of table "business.daily_attendance" */
export type BusinessDailyAttendanceUpdateColumn =
  /** column name */
  | "breakSecond"
  /** column name */
  | "endDatetime"
  /** column name */
  | "startDatetime";

export type BusinessDailyAttendanceUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc: InputMaybe<BusinessDailyAttendanceIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set: InputMaybe<BusinessDailyAttendanceSetInput>;
  /** filter the rows which have to be updated */
  where: BusinessDailyAttendanceBoolExp;
};

/** order by varPop() on columns of table "business.daily_attendance" */
export type BusinessDailyAttendanceVarPopOrderBy = {
  breakSecond: InputMaybe<OrderBy>;
};

/** order by varSamp() on columns of table "business.daily_attendance" */
export type BusinessDailyAttendanceVarSampOrderBy = {
  breakSecond: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "business.daily_attendance" */
export type BusinessDailyAttendanceVarianceOrderBy = {
  breakSecond: InputMaybe<OrderBy>;
};

/** ordering argument of a cursor */
export type CursorOrdering =
  /** ascending ordering of the cursor */
  | "ASC"
  /** descending ordering of the cursor */
  | "DESC";

/** Boolean expression to compare columns of type "date". All fields are combined with logical 'AND'. */
export type DateComparisonExp = {
  _eq: InputMaybe<Scalars["date"]>;
  _gt: InputMaybe<Scalars["date"]>;
  _gte: InputMaybe<Scalars["date"]>;
  _in: InputMaybe<Array<Scalars["date"]>>;
  _isNull: InputMaybe<Scalars["Boolean"]>;
  _lt: InputMaybe<Scalars["date"]>;
  _lte: InputMaybe<Scalars["date"]>;
  _neq: InputMaybe<Scalars["date"]>;
  _nin: InputMaybe<Array<Scalars["date"]>>;
};

export type GroupApplicationAggregateBoolExp = {
  count: InputMaybe<GroupApplicationAggregateBoolExpCount>;
};

/** order by aggregate values of table "group_application" */
export type GroupApplicationAggregateOrderBy = {
  count: InputMaybe<OrderBy>;
  max: InputMaybe<GroupApplicationMaxOrderBy>;
  min: InputMaybe<GroupApplicationMinOrderBy>;
};

/** Boolean expression to filter rows from the table "group_application". All fields are combined with a logical 'AND'. */
export type GroupApplicationBoolExp = {
  _and: InputMaybe<Array<GroupApplicationBoolExp>>;
  _not: InputMaybe<GroupApplicationBoolExp>;
  _or: InputMaybe<Array<GroupApplicationBoolExp>>;
  application: InputMaybe<ApplicationBoolExp>;
  applicationId: InputMaybe<StringComparisonExp>;
  group: InputMaybe<GroupBoolExp>;
  groupId: InputMaybe<StringComparisonExp>;
  id: InputMaybe<StringComparisonExp>;
};

/** order by max() on columns of table "group_application" */
export type GroupApplicationMaxOrderBy = {
  applicationId: InputMaybe<OrderBy>;
  groupId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "group_application" */
export type GroupApplicationMinOrderBy = {
  applicationId: InputMaybe<OrderBy>;
  groupId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
};

/** Ordering options when selecting data from "group_application". */
export type GroupApplicationOrderBy = {
  application: InputMaybe<ApplicationOrderBy>;
  applicationId: InputMaybe<OrderBy>;
  group: InputMaybe<GroupOrderBy>;
  groupId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
};

/** select columns of table "group_application" */
export type GroupApplicationSelectColumn =
  /** column name */
  | "applicationId"
  /** column name */
  | "groupId"
  /** column name */
  | "id";

/** Streaming cursor of the table "group_application" */
export type GroupApplicationStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: GroupApplicationStreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type GroupApplicationStreamCursorValueInput = {
  applicationId: InputMaybe<Scalars["String"]>;
  groupId: InputMaybe<Scalars["String"]>;
  id: InputMaybe<Scalars["String"]>;
};

/** Boolean expression to filter rows from the table "group". All fields are combined with a logical 'AND'. */
export type GroupBoolExp = {
  _and: InputMaybe<Array<GroupBoolExp>>;
  _not: InputMaybe<GroupBoolExp>;
  _or: InputMaybe<Array<GroupBoolExp>>;
  accounts: InputMaybe<HouseholdAccountBoolExp>;
  accountsAggregate: InputMaybe<HouseholdAccountAggregateBoolExp>;
  affiliations: InputMaybe<AffiliationBoolExp>;
  affiliationsAggregate: InputMaybe<AffiliationAggregateBoolExp>;
  apps: InputMaybe<AppBoolExp>;
  categories: InputMaybe<HouseholdCategoryBoolExp>;
  conditionSessions: InputMaybe<HouseholdConditionSessionBoolExp>;
  creditCardDetails: InputMaybe<HouseholdCreditCardDetailBoolExp>;
  creditCardSummaries: InputMaybe<HouseholdCreditCardSummaryBoolExp>;
  creditCardSummariesAggregate: InputMaybe<HouseholdCreditCardSummaryAggregateBoolExp>;
  dailyAttendances: InputMaybe<BusinessDailyAttendanceBoolExp>;
  dailyDetails: InputMaybe<HouseholdDailyDetailBoolExp>;
  dashboardSettings: InputMaybe<HouseholdDashboardSettingBoolExp>;
  depositCategories: InputMaybe<HouseholdDepositCategoryBoolExp>;
  depositCategoriesAggregate: InputMaybe<HouseholdDepositCategoryAggregateBoolExp>;
  details: InputMaybe<HouseholdAllDetailViewBoolExp>;
  detailsAggregate: InputMaybe<HouseholdAllDetailViewAggregateBoolExp>;
  favoriteFilters: InputMaybe<HouseholdFavoriteFilterBoolExp>;
  favoriteFiltersAggregate: InputMaybe<HouseholdFavoriteFilterAggregateBoolExp>;
  genres: InputMaybe<HouseholdGenreBoolExp>;
  genresAggregate: InputMaybe<HouseholdGenreAggregateBoolExp>;
  groupApplications: InputMaybe<GroupApplicationBoolExp>;
  groupApplicationsAggregate: InputMaybe<GroupApplicationAggregateBoolExp>;
  id: InputMaybe<StringComparisonExp>;
  importFileHistories: InputMaybe<HouseholdImportFileHistoryBoolExp>;
  importFileHistoriesAggregate: InputMaybe<HouseholdImportFileHistoryAggregateBoolExp>;
  name: InputMaybe<StringComparisonExp>;
  tags: InputMaybe<HouseholdTagBoolExp>;
  transferCategory: InputMaybe<HouseholdTransferCategoryBoolExp>;
};

/** Ordering options when selecting data from "group". */
export type GroupOrderBy = {
  accountsAggregate: InputMaybe<HouseholdAccountAggregateOrderBy>;
  affiliationsAggregate: InputMaybe<AffiliationAggregateOrderBy>;
  appsAggregate: InputMaybe<AppAggregateOrderBy>;
  categoriesAggregate: InputMaybe<HouseholdCategoryAggregateOrderBy>;
  conditionSessionsAggregate: InputMaybe<HouseholdConditionSessionAggregateOrderBy>;
  creditCardDetailsAggregate: InputMaybe<HouseholdCreditCardDetailAggregateOrderBy>;
  creditCardSummariesAggregate: InputMaybe<HouseholdCreditCardSummaryAggregateOrderBy>;
  dailyAttendancesAggregate: InputMaybe<BusinessDailyAttendanceAggregateOrderBy>;
  dailyDetailsAggregate: InputMaybe<HouseholdDailyDetailAggregateOrderBy>;
  dashboardSettingsAggregate: InputMaybe<HouseholdDashboardSettingAggregateOrderBy>;
  depositCategoriesAggregate: InputMaybe<HouseholdDepositCategoryAggregateOrderBy>;
  detailsAggregate: InputMaybe<HouseholdAllDetailViewAggregateOrderBy>;
  favoriteFiltersAggregate: InputMaybe<HouseholdFavoriteFilterAggregateOrderBy>;
  genresAggregate: InputMaybe<HouseholdGenreAggregateOrderBy>;
  groupApplicationsAggregate: InputMaybe<GroupApplicationAggregateOrderBy>;
  id: InputMaybe<OrderBy>;
  importFileHistoriesAggregate: InputMaybe<HouseholdImportFileHistoryAggregateOrderBy>;
  name: InputMaybe<OrderBy>;
  tagsAggregate: InputMaybe<HouseholdTagAggregateOrderBy>;
  transferCategory: InputMaybe<HouseholdTransferCategoryOrderBy>;
};

/** select columns of table "group" */
export type GroupSelectColumn =
  /** column name */
  | "id"
  /** column name */
  | "name";

/** Streaming cursor of the table "group" */
export type GroupStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: GroupStreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type GroupStreamCursorValueInput = {
  id: InputMaybe<Scalars["String"]>;
  name: InputMaybe<Scalars["String"]>;
};

export type HouseholdAccountAggregateBoolExp = {
  bool_and: InputMaybe<HouseholdAccountAggregateBoolExpBool_And>;
  bool_or: InputMaybe<HouseholdAccountAggregateBoolExpBool_Or>;
  count: InputMaybe<HouseholdAccountAggregateBoolExpCount>;
};

/** order by aggregate values of table "household.account" */
export type HouseholdAccountAggregateOrderBy = {
  avg: InputMaybe<HouseholdAccountAvgOrderBy>;
  count: InputMaybe<OrderBy>;
  max: InputMaybe<HouseholdAccountMaxOrderBy>;
  min: InputMaybe<HouseholdAccountMinOrderBy>;
  stddev: InputMaybe<HouseholdAccountStddevOrderBy>;
  stddevPop: InputMaybe<HouseholdAccountStddevPopOrderBy>;
  stddevSamp: InputMaybe<HouseholdAccountStddevSampOrderBy>;
  sum: InputMaybe<HouseholdAccountSumOrderBy>;
  varPop: InputMaybe<HouseholdAccountVarPopOrderBy>;
  varSamp: InputMaybe<HouseholdAccountVarSampOrderBy>;
  variance: InputMaybe<HouseholdAccountVarianceOrderBy>;
};

/** order by avg() on columns of table "household.account" */
export type HouseholdAccountAvgOrderBy = {
  displayOrder: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "household.account". All fields are combined with a logical 'AND'. */
export type HouseholdAccountBoolExp = {
  _and: InputMaybe<Array<HouseholdAccountBoolExp>>;
  _not: InputMaybe<HouseholdAccountBoolExp>;
  _or: InputMaybe<Array<HouseholdAccountBoolExp>>;
  allDetailViews: InputMaybe<HouseholdAllDetailViewBoolExp>;
  allDetailViewsAggregate: InputMaybe<HouseholdAllDetailViewAggregateBoolExp>;
  creditCardSummaries: InputMaybe<HouseholdCreditCardSummaryBoolExp>;
  creditCardSummariesAggregate: InputMaybe<HouseholdCreditCardSummaryAggregateBoolExp>;
  dailyDetails: InputMaybe<HouseholdDailyDetailBoolExp>;
  displayOrder: InputMaybe<IntComparisonExp>;
  group: InputMaybe<GroupBoolExp>;
  groupId: InputMaybe<StringComparisonExp>;
  id: InputMaybe<StringComparisonExp>;
  name: InputMaybe<StringComparisonExp>;
  validFlag: InputMaybe<BooleanComparisonExp>;
};

/** unique or primary key constraints on table "household.account" */
export type HouseholdAccountConstraint =
  /** unique or primary key constraint on columns "id" */
  "account_pkey";

/** input type for inserting data into table "household.account" */
export type HouseholdAccountInsertInput = {
  creditCardSummaries: InputMaybe<HouseholdCreditCardSummaryArrRelInsertInput>;
  dailyDetails: InputMaybe<HouseholdDailyDetailArrRelInsertInput>;
  displayOrder: InputMaybe<Scalars["Int"]>;
  groupId: InputMaybe<Scalars["String"]>;
  id: InputMaybe<Scalars["String"]>;
  name: InputMaybe<Scalars["String"]>;
  validFlag: InputMaybe<Scalars["Boolean"]>;
};

/** order by max() on columns of table "household.account" */
export type HouseholdAccountMaxOrderBy = {
  displayOrder: InputMaybe<OrderBy>;
  groupId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  name: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "household.account" */
export type HouseholdAccountMinOrderBy = {
  displayOrder: InputMaybe<OrderBy>;
  groupId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  name: InputMaybe<OrderBy>;
};

/** input type for inserting object relation for remote table "household.account" */
export type HouseholdAccountObjRelInsertInput = {
  data: HouseholdAccountInsertInput;
  /** upsert condition */
  onConflict: InputMaybe<HouseholdAccountOnConflict>;
};

/** on_conflict condition type for table "household.account" */
export type HouseholdAccountOnConflict = {
  constraint: HouseholdAccountConstraint;
  updateColumns: Array<HouseholdAccountUpdateColumn>;
  where: InputMaybe<HouseholdAccountBoolExp>;
};

/** Ordering options when selecting data from "household.account". */
export type HouseholdAccountOrderBy = {
  allDetailViewsAggregate: InputMaybe<HouseholdAllDetailViewAggregateOrderBy>;
  creditCardSummariesAggregate: InputMaybe<HouseholdCreditCardSummaryAggregateOrderBy>;
  dailyDetailsAggregate: InputMaybe<HouseholdDailyDetailAggregateOrderBy>;
  displayOrder: InputMaybe<OrderBy>;
  group: InputMaybe<GroupOrderBy>;
  groupId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  name: InputMaybe<OrderBy>;
  validFlag: InputMaybe<OrderBy>;
};

/** select columns of table "household.account" */
export type HouseholdAccountSelectColumn =
  /** column name */
  | "displayOrder"
  /** column name */
  | "groupId"
  /** column name */
  | "id"
  /** column name */
  | "name"
  /** column name */
  | "validFlag";

/** select "householdAccountAggregateBoolExpBool_andArgumentsColumns" columns of table "household.account" */
export type HouseholdAccountSelectColumnHouseholdAccountAggregateBoolExpBool_AndArgumentsColumns =
  /** column name */
  "validFlag";

/** select "householdAccountAggregateBoolExpBool_orArgumentsColumns" columns of table "household.account" */
export type HouseholdAccountSelectColumnHouseholdAccountAggregateBoolExpBool_OrArgumentsColumns =
  /** column name */
  "validFlag";

/** order by stddev() on columns of table "household.account" */
export type HouseholdAccountStddevOrderBy = {
  displayOrder: InputMaybe<OrderBy>;
};

/** order by stddevPop() on columns of table "household.account" */
export type HouseholdAccountStddevPopOrderBy = {
  displayOrder: InputMaybe<OrderBy>;
};

/** order by stddevSamp() on columns of table "household.account" */
export type HouseholdAccountStddevSampOrderBy = {
  displayOrder: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "household_account" */
export type HouseholdAccountStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: HouseholdAccountStreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type HouseholdAccountStreamCursorValueInput = {
  displayOrder: InputMaybe<Scalars["Int"]>;
  groupId: InputMaybe<Scalars["String"]>;
  id: InputMaybe<Scalars["String"]>;
  name: InputMaybe<Scalars["String"]>;
  validFlag: InputMaybe<Scalars["Boolean"]>;
};

/** order by sum() on columns of table "household.account" */
export type HouseholdAccountSumOrderBy = {
  displayOrder: InputMaybe<OrderBy>;
};

/** placeholder for update columns of table "household.account" (current role has no relevant permissions) */
export type HouseholdAccountUpdateColumn =
  /** placeholder (do not use) */
  "_PLACEHOLDER";

/** order by varPop() on columns of table "household.account" */
export type HouseholdAccountVarPopOrderBy = {
  displayOrder: InputMaybe<OrderBy>;
};

/** order by varSamp() on columns of table "household.account" */
export type HouseholdAccountVarSampOrderBy = {
  displayOrder: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "household.account" */
export type HouseholdAccountVarianceOrderBy = {
  displayOrder: InputMaybe<OrderBy>;
};

export type HouseholdAllDetailViewAggregateBoolExp = {
  count: InputMaybe<HouseholdAllDetailViewAggregateBoolExpCount>;
};

/** order by aggregate values of table "household.all_detail_view" */
export type HouseholdAllDetailViewAggregateOrderBy = {
  avg: InputMaybe<HouseholdAllDetailViewAvgOrderBy>;
  count: InputMaybe<OrderBy>;
  max: InputMaybe<HouseholdAllDetailViewMaxOrderBy>;
  min: InputMaybe<HouseholdAllDetailViewMinOrderBy>;
  stddev: InputMaybe<HouseholdAllDetailViewStddevOrderBy>;
  stddevPop: InputMaybe<HouseholdAllDetailViewStddevPopOrderBy>;
  stddevSamp: InputMaybe<HouseholdAllDetailViewStddevSampOrderBy>;
  sum: InputMaybe<HouseholdAllDetailViewSumOrderBy>;
  varPop: InputMaybe<HouseholdAllDetailViewVarPopOrderBy>;
  varSamp: InputMaybe<HouseholdAllDetailViewVarSampOrderBy>;
  variance: InputMaybe<HouseholdAllDetailViewVarianceOrderBy>;
};

/** order by avg() on columns of table "household.all_detail_view" */
export type HouseholdAllDetailViewAvgOrderBy = {
  originalAmount: InputMaybe<OrderBy>;
  signedAmount: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "household.all_detail_view". All fields are combined with a logical 'AND'. */
export type HouseholdAllDetailViewBoolExp = {
  _and: InputMaybe<Array<HouseholdAllDetailViewBoolExp>>;
  _not: InputMaybe<HouseholdAllDetailViewBoolExp>;
  _or: InputMaybe<Array<HouseholdAllDetailViewBoolExp>>;
  account: InputMaybe<HouseholdAccountBoolExp>;
  accountId: InputMaybe<StringComparisonExp>;
  category: InputMaybe<HouseholdCategoryBoolExp>;
  categoryId: InputMaybe<StringComparisonExp>;
  date: InputMaybe<DateComparisonExp>;
  detailTags: InputMaybe<HouseholdDetailTagBoolExp>;
  detailTagsAggregate: InputMaybe<HouseholdDetailTagAggregateBoolExp>;
  genre: InputMaybe<HouseholdGenreBoolExp>;
  genreId: InputMaybe<StringComparisonExp>;
  groupId: InputMaybe<StringComparisonExp>;
  id: InputMaybe<StringComparisonExp>;
  iocomeType: InputMaybe<StringComparisonExp>;
  memo: InputMaybe<StringComparisonExp>;
  originalAmount: InputMaybe<NumericComparisonExp>;
  settlementDate: InputMaybe<DateComparisonExp>;
  signedAmount: InputMaybe<NumericComparisonExp>;
  type: InputMaybe<StringComparisonExp>;
  withdrawalDate: InputMaybe<DateComparisonExp>;
};

/** order by max() on columns of table "household.all_detail_view" */
export type HouseholdAllDetailViewMaxOrderBy = {
  accountId: InputMaybe<OrderBy>;
  categoryId: InputMaybe<OrderBy>;
  date: InputMaybe<OrderBy>;
  genreId: InputMaybe<OrderBy>;
  groupId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  iocomeType: InputMaybe<OrderBy>;
  memo: InputMaybe<OrderBy>;
  originalAmount: InputMaybe<OrderBy>;
  settlementDate: InputMaybe<OrderBy>;
  signedAmount: InputMaybe<OrderBy>;
  type: InputMaybe<OrderBy>;
  withdrawalDate: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "household.all_detail_view" */
export type HouseholdAllDetailViewMinOrderBy = {
  accountId: InputMaybe<OrderBy>;
  categoryId: InputMaybe<OrderBy>;
  date: InputMaybe<OrderBy>;
  genreId: InputMaybe<OrderBy>;
  groupId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  iocomeType: InputMaybe<OrderBy>;
  memo: InputMaybe<OrderBy>;
  originalAmount: InputMaybe<OrderBy>;
  settlementDate: InputMaybe<OrderBy>;
  signedAmount: InputMaybe<OrderBy>;
  type: InputMaybe<OrderBy>;
  withdrawalDate: InputMaybe<OrderBy>;
};

/** Ordering options when selecting data from "household.all_detail_view". */
export type HouseholdAllDetailViewOrderBy = {
  account: InputMaybe<HouseholdAccountOrderBy>;
  accountId: InputMaybe<OrderBy>;
  category: InputMaybe<HouseholdCategoryOrderBy>;
  categoryId: InputMaybe<OrderBy>;
  date: InputMaybe<OrderBy>;
  detailTagsAggregate: InputMaybe<HouseholdDetailTagAggregateOrderBy>;
  genre: InputMaybe<HouseholdGenreOrderBy>;
  genreId: InputMaybe<OrderBy>;
  groupId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  iocomeType: InputMaybe<OrderBy>;
  memo: InputMaybe<OrderBy>;
  originalAmount: InputMaybe<OrderBy>;
  settlementDate: InputMaybe<OrderBy>;
  signedAmount: InputMaybe<OrderBy>;
  type: InputMaybe<OrderBy>;
  withdrawalDate: InputMaybe<OrderBy>;
};

/** select columns of table "household.all_detail_view" */
export type HouseholdAllDetailViewSelectColumn =
  /** column name */
  | "accountId"
  /** column name */
  | "categoryId"
  /** column name */
  | "date"
  /** column name */
  | "genreId"
  /** column name */
  | "groupId"
  /** column name */
  | "id"
  /** column name */
  | "iocomeType"
  /** column name */
  | "memo"
  /** column name */
  | "originalAmount"
  /** column name */
  | "settlementDate"
  /** column name */
  | "signedAmount"
  /** column name */
  | "type"
  /** column name */
  | "withdrawalDate";

/** order by stddev() on columns of table "household.all_detail_view" */
export type HouseholdAllDetailViewStddevOrderBy = {
  originalAmount: InputMaybe<OrderBy>;
  signedAmount: InputMaybe<OrderBy>;
};

/** order by stddevPop() on columns of table "household.all_detail_view" */
export type HouseholdAllDetailViewStddevPopOrderBy = {
  originalAmount: InputMaybe<OrderBy>;
  signedAmount: InputMaybe<OrderBy>;
};

/** order by stddevSamp() on columns of table "household.all_detail_view" */
export type HouseholdAllDetailViewStddevSampOrderBy = {
  originalAmount: InputMaybe<OrderBy>;
  signedAmount: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "household_all_detail_view" */
export type HouseholdAllDetailViewStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: HouseholdAllDetailViewStreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type HouseholdAllDetailViewStreamCursorValueInput = {
  accountId: InputMaybe<Scalars["String"]>;
  categoryId: InputMaybe<Scalars["String"]>;
  date: InputMaybe<Scalars["date"]>;
  genreId: InputMaybe<Scalars["String"]>;
  groupId: InputMaybe<Scalars["String"]>;
  id: InputMaybe<Scalars["String"]>;
  iocomeType: InputMaybe<Scalars["String"]>;
  memo: InputMaybe<Scalars["String"]>;
  originalAmount: InputMaybe<Scalars["numeric"]>;
  settlementDate: InputMaybe<Scalars["date"]>;
  signedAmount: InputMaybe<Scalars["numeric"]>;
  type: InputMaybe<Scalars["String"]>;
  withdrawalDate: InputMaybe<Scalars["date"]>;
};

/** order by sum() on columns of table "household.all_detail_view" */
export type HouseholdAllDetailViewSumOrderBy = {
  originalAmount: InputMaybe<OrderBy>;
  signedAmount: InputMaybe<OrderBy>;
};

/** order by varPop() on columns of table "household.all_detail_view" */
export type HouseholdAllDetailViewVarPopOrderBy = {
  originalAmount: InputMaybe<OrderBy>;
  signedAmount: InputMaybe<OrderBy>;
};

/** order by varSamp() on columns of table "household.all_detail_view" */
export type HouseholdAllDetailViewVarSampOrderBy = {
  originalAmount: InputMaybe<OrderBy>;
  signedAmount: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "household.all_detail_view" */
export type HouseholdAllDetailViewVarianceOrderBy = {
  originalAmount: InputMaybe<OrderBy>;
  signedAmount: InputMaybe<OrderBy>;
};

/** order by aggregate values of table "household.category" */
export type HouseholdCategoryAggregateOrderBy = {
  avg: InputMaybe<HouseholdCategoryAvgOrderBy>;
  count: InputMaybe<OrderBy>;
  max: InputMaybe<HouseholdCategoryMaxOrderBy>;
  min: InputMaybe<HouseholdCategoryMinOrderBy>;
  stddev: InputMaybe<HouseholdCategoryStddevOrderBy>;
  stddevPop: InputMaybe<HouseholdCategoryStddevPopOrderBy>;
  stddevSamp: InputMaybe<HouseholdCategoryStddevSampOrderBy>;
  sum: InputMaybe<HouseholdCategorySumOrderBy>;
  varPop: InputMaybe<HouseholdCategoryVarPopOrderBy>;
  varSamp: InputMaybe<HouseholdCategoryVarSampOrderBy>;
  variance: InputMaybe<HouseholdCategoryVarianceOrderBy>;
};

/** input type for inserting array relation for remote table "household.category" */
export type HouseholdCategoryArrRelInsertInput = {
  data: Array<HouseholdCategoryInsertInput>;
  /** upsert condition */
  onConflict: InputMaybe<HouseholdCategoryOnConflict>;
};

/** order by avg() on columns of table "household.category" */
export type HouseholdCategoryAvgOrderBy = {
  displayOrder: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "household.category". All fields are combined with a logical 'AND'. */
export type HouseholdCategoryBoolExp = {
  _and: InputMaybe<Array<HouseholdCategoryBoolExp>>;
  _not: InputMaybe<HouseholdCategoryBoolExp>;
  _or: InputMaybe<Array<HouseholdCategoryBoolExp>>;
  creditCardDetails: InputMaybe<HouseholdCreditCardDetailBoolExp>;
  dailyDetails: InputMaybe<HouseholdDailyDetailBoolExp>;
  depositCategory: InputMaybe<HouseholdDepositCategoryBoolExp>;
  details: InputMaybe<HouseholdAllDetailViewBoolExp>;
  detailsAggregate: InputMaybe<HouseholdAllDetailViewAggregateBoolExp>;
  displayOrder: InputMaybe<IntComparisonExp>;
  genre: InputMaybe<HouseholdGenreBoolExp>;
  genreId: InputMaybe<StringComparisonExp>;
  group: InputMaybe<GroupBoolExp>;
  groupId: InputMaybe<StringComparisonExp>;
  id: InputMaybe<StringComparisonExp>;
  name: InputMaybe<StringComparisonExp>;
  totalByCategoryViews: InputMaybe<HouseholdTotalByCategoryViewBoolExp>;
  transferCategories: InputMaybe<HouseholdTransferCategoryBoolExp>;
  transferCategoriesAggregate: InputMaybe<HouseholdTransferCategoryAggregateBoolExp>;
  validFlag: InputMaybe<BooleanComparisonExp>;
};

/** unique or primary key constraints on table "household.category" */
export type HouseholdCategoryConstraint =
  /** unique or primary key constraint on columns "id" */
  "category_pkey";

/** input type for incrementing numeric columns in table "household.category" */
export type HouseholdCategoryIncInput = {
  displayOrder: InputMaybe<Scalars["Int"]>;
};

/** input type for inserting data into table "household.category" */
export type HouseholdCategoryInsertInput = {
  creditCardDetails: InputMaybe<HouseholdCreditCardDetailArrRelInsertInput>;
  dailyDetails: InputMaybe<HouseholdDailyDetailArrRelInsertInput>;
  displayOrder: InputMaybe<Scalars["Int"]>;
  genre: InputMaybe<HouseholdGenreObjRelInsertInput>;
  genreId: InputMaybe<Scalars["String"]>;
  groupId: InputMaybe<Scalars["String"]>;
  id: InputMaybe<Scalars["String"]>;
  name: InputMaybe<Scalars["String"]>;
  validFlag: InputMaybe<Scalars["Boolean"]>;
};

/** order by max() on columns of table "household.category" */
export type HouseholdCategoryMaxOrderBy = {
  displayOrder: InputMaybe<OrderBy>;
  genreId: InputMaybe<OrderBy>;
  groupId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  name: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "household.category" */
export type HouseholdCategoryMinOrderBy = {
  displayOrder: InputMaybe<OrderBy>;
  genreId: InputMaybe<OrderBy>;
  groupId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  name: InputMaybe<OrderBy>;
};

/** input type for inserting object relation for remote table "household.category" */
export type HouseholdCategoryObjRelInsertInput = {
  data: HouseholdCategoryInsertInput;
  /** upsert condition */
  onConflict: InputMaybe<HouseholdCategoryOnConflict>;
};

/** on_conflict condition type for table "household.category" */
export type HouseholdCategoryOnConflict = {
  constraint: HouseholdCategoryConstraint;
  updateColumns: Array<HouseholdCategoryUpdateColumn>;
  where: InputMaybe<HouseholdCategoryBoolExp>;
};

/** Ordering options when selecting data from "household.category". */
export type HouseholdCategoryOrderBy = {
  creditCardDetailsAggregate: InputMaybe<HouseholdCreditCardDetailAggregateOrderBy>;
  dailyDetailsAggregate: InputMaybe<HouseholdDailyDetailAggregateOrderBy>;
  depositCategory: InputMaybe<HouseholdDepositCategoryOrderBy>;
  detailsAggregate: InputMaybe<HouseholdAllDetailViewAggregateOrderBy>;
  displayOrder: InputMaybe<OrderBy>;
  genre: InputMaybe<HouseholdGenreOrderBy>;
  genreId: InputMaybe<OrderBy>;
  group: InputMaybe<GroupOrderBy>;
  groupId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  name: InputMaybe<OrderBy>;
  totalByCategoryViewsAggregate: InputMaybe<HouseholdTotalByCategoryViewAggregateOrderBy>;
  transferCategoriesAggregate: InputMaybe<HouseholdTransferCategoryAggregateOrderBy>;
  validFlag: InputMaybe<OrderBy>;
};

/** primary key columns input for table: household.category */
export type HouseholdCategoryPkColumnsInput = {
  id: Scalars["String"];
};

/** select columns of table "household.category" */
export type HouseholdCategorySelectColumn =
  /** column name */
  | "displayOrder"
  /** column name */
  | "genreId"
  /** column name */
  | "groupId"
  /** column name */
  | "id"
  /** column name */
  | "name"
  /** column name */
  | "validFlag";

/** input type for updating data in table "household.category" */
export type HouseholdCategorySetInput = {
  displayOrder: InputMaybe<Scalars["Int"]>;
  genreId: InputMaybe<Scalars["String"]>;
  groupId: InputMaybe<Scalars["String"]>;
  id: InputMaybe<Scalars["String"]>;
  name: InputMaybe<Scalars["String"]>;
  validFlag: InputMaybe<Scalars["Boolean"]>;
};

/** order by stddev() on columns of table "household.category" */
export type HouseholdCategoryStddevOrderBy = {
  displayOrder: InputMaybe<OrderBy>;
};

/** order by stddevPop() on columns of table "household.category" */
export type HouseholdCategoryStddevPopOrderBy = {
  displayOrder: InputMaybe<OrderBy>;
};

/** order by stddevSamp() on columns of table "household.category" */
export type HouseholdCategoryStddevSampOrderBy = {
  displayOrder: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "household_category" */
export type HouseholdCategoryStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: HouseholdCategoryStreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type HouseholdCategoryStreamCursorValueInput = {
  displayOrder: InputMaybe<Scalars["Int"]>;
  genreId: InputMaybe<Scalars["String"]>;
  groupId: InputMaybe<Scalars["String"]>;
  id: InputMaybe<Scalars["String"]>;
  name: InputMaybe<Scalars["String"]>;
  validFlag: InputMaybe<Scalars["Boolean"]>;
};

/** order by sum() on columns of table "household.category" */
export type HouseholdCategorySumOrderBy = {
  displayOrder: InputMaybe<OrderBy>;
};

/** update columns of table "household.category" */
export type HouseholdCategoryUpdateColumn =
  /** column name */
  | "displayOrder"
  /** column name */
  | "genreId"
  /** column name */
  | "groupId"
  /** column name */
  | "id"
  /** column name */
  | "name"
  /** column name */
  | "validFlag";

export type HouseholdCategoryUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc: InputMaybe<HouseholdCategoryIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set: InputMaybe<HouseholdCategorySetInput>;
  /** filter the rows which have to be updated */
  where: HouseholdCategoryBoolExp;
};

/** order by varPop() on columns of table "household.category" */
export type HouseholdCategoryVarPopOrderBy = {
  displayOrder: InputMaybe<OrderBy>;
};

/** order by varSamp() on columns of table "household.category" */
export type HouseholdCategoryVarSampOrderBy = {
  displayOrder: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "household.category" */
export type HouseholdCategoryVarianceOrderBy = {
  displayOrder: InputMaybe<OrderBy>;
};

/** order by aggregate values of table "household.condition_session" */
export type HouseholdConditionSessionAggregateOrderBy = {
  count: InputMaybe<OrderBy>;
  max: InputMaybe<HouseholdConditionSessionMaxOrderBy>;
  min: InputMaybe<HouseholdConditionSessionMinOrderBy>;
};

/** Boolean expression to filter rows from the table "household.condition_session". All fields are combined with a logical 'AND'. */
export type HouseholdConditionSessionBoolExp = {
  _and: InputMaybe<Array<HouseholdConditionSessionBoolExp>>;
  _not: InputMaybe<HouseholdConditionSessionBoolExp>;
  _or: InputMaybe<Array<HouseholdConditionSessionBoolExp>>;
  dataType: InputMaybe<StringComparisonExp>;
  group: InputMaybe<GroupBoolExp>;
  groupId: InputMaybe<StringComparisonExp>;
  key: InputMaybe<StringComparisonExp>;
  value: InputMaybe<JsonArrayComparisonExp>;
};

/** unique or primary key constraints on table "household.condition_session" */
export type HouseholdConditionSessionConstraint =
  /** unique or primary key constraint on columns "key" */
  "condition_session_pkey";

/** input type for inserting data into table "household.condition_session" */
export type HouseholdConditionSessionInsertInput = {
  dataType: InputMaybe<Scalars["String"]>;
  groupId: InputMaybe<Scalars["String"]>;
  key: InputMaybe<Scalars["String"]>;
  value: InputMaybe<Array<Scalars["json"]>>;
};

/** order by max() on columns of table "household.condition_session" */
export type HouseholdConditionSessionMaxOrderBy = {
  dataType: InputMaybe<OrderBy>;
  groupId: InputMaybe<OrderBy>;
  key: InputMaybe<OrderBy>;
  value: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "household.condition_session" */
export type HouseholdConditionSessionMinOrderBy = {
  dataType: InputMaybe<OrderBy>;
  groupId: InputMaybe<OrderBy>;
  key: InputMaybe<OrderBy>;
  value: InputMaybe<OrderBy>;
};

/** on_conflict condition type for table "household.condition_session" */
export type HouseholdConditionSessionOnConflict = {
  constraint: HouseholdConditionSessionConstraint;
  updateColumns: Array<HouseholdConditionSessionUpdateColumn>;
  where: InputMaybe<HouseholdConditionSessionBoolExp>;
};

/** Ordering options when selecting data from "household.condition_session". */
export type HouseholdConditionSessionOrderBy = {
  dataType: InputMaybe<OrderBy>;
  group: InputMaybe<GroupOrderBy>;
  groupId: InputMaybe<OrderBy>;
  key: InputMaybe<OrderBy>;
  value: InputMaybe<OrderBy>;
};

/** primary key columns input for table: household.condition_session */
export type HouseholdConditionSessionPkColumnsInput = {
  key: Scalars["String"];
};

/** select columns of table "household.condition_session" */
export type HouseholdConditionSessionSelectColumn =
  /** column name */
  | "dataType"
  /** column name */
  | "groupId"
  /** column name */
  | "key"
  /** column name */
  | "value";

/** input type for updating data in table "household.condition_session" */
export type HouseholdConditionSessionSetInput = {
  dataType: InputMaybe<Scalars["String"]>;
  groupId: InputMaybe<Scalars["String"]>;
  key: InputMaybe<Scalars["String"]>;
  value: InputMaybe<Array<Scalars["json"]>>;
};

/** Streaming cursor of the table "household_condition_session" */
export type HouseholdConditionSessionStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: HouseholdConditionSessionStreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type HouseholdConditionSessionStreamCursorValueInput = {
  dataType: InputMaybe<Scalars["String"]>;
  groupId: InputMaybe<Scalars["String"]>;
  key: InputMaybe<Scalars["String"]>;
  value: InputMaybe<Array<Scalars["json"]>>;
};

/** update columns of table "household.condition_session" */
export type HouseholdConditionSessionUpdateColumn =
  /** column name */
  | "dataType"
  /** column name */
  | "groupId"
  /** column name */
  | "key"
  /** column name */
  | "value";

export type HouseholdConditionSessionUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set: InputMaybe<HouseholdConditionSessionSetInput>;
  /** filter the rows which have to be updated */
  where: HouseholdConditionSessionBoolExp;
};

/** order by aggregate values of table "household.credit_card_detail" */
export type HouseholdCreditCardDetailAggregateOrderBy = {
  avg: InputMaybe<HouseholdCreditCardDetailAvgOrderBy>;
  count: InputMaybe<OrderBy>;
  max: InputMaybe<HouseholdCreditCardDetailMaxOrderBy>;
  min: InputMaybe<HouseholdCreditCardDetailMinOrderBy>;
  stddev: InputMaybe<HouseholdCreditCardDetailStddevOrderBy>;
  stddevPop: InputMaybe<HouseholdCreditCardDetailStddevPopOrderBy>;
  stddevSamp: InputMaybe<HouseholdCreditCardDetailStddevSampOrderBy>;
  sum: InputMaybe<HouseholdCreditCardDetailSumOrderBy>;
  varPop: InputMaybe<HouseholdCreditCardDetailVarPopOrderBy>;
  varSamp: InputMaybe<HouseholdCreditCardDetailVarSampOrderBy>;
  variance: InputMaybe<HouseholdCreditCardDetailVarianceOrderBy>;
};

/** input type for inserting array relation for remote table "household.credit_card_detail" */
export type HouseholdCreditCardDetailArrRelInsertInput = {
  data: Array<HouseholdCreditCardDetailInsertInput>;
  /** upsert condition */
  onConflict: InputMaybe<HouseholdCreditCardDetailOnConflict>;
};

/** order by avg() on columns of table "household.credit_card_detail" */
export type HouseholdCreditCardDetailAvgOrderBy = {
  amount: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "household.credit_card_detail". All fields are combined with a logical 'AND'. */
export type HouseholdCreditCardDetailBoolExp = {
  _and: InputMaybe<Array<HouseholdCreditCardDetailBoolExp>>;
  _not: InputMaybe<HouseholdCreditCardDetailBoolExp>;
  _or: InputMaybe<Array<HouseholdCreditCardDetailBoolExp>>;
  amount: InputMaybe<NumericComparisonExp>;
  category: InputMaybe<HouseholdCategoryBoolExp>;
  categoryId: InputMaybe<StringComparisonExp>;
  creditCardSummary: InputMaybe<HouseholdCreditCardSummaryBoolExp>;
  date: InputMaybe<DateComparisonExp>;
  detailTags: InputMaybe<HouseholdDetailTagBoolExp>;
  detailTagsAggregate: InputMaybe<HouseholdDetailTagAggregateBoolExp>;
  genre: InputMaybe<HouseholdGenreBoolExp>;
  genreId: InputMaybe<StringComparisonExp>;
  group: InputMaybe<GroupBoolExp>;
  groupId: InputMaybe<StringComparisonExp>;
  id: InputMaybe<StringComparisonExp>;
  iocomeType: InputMaybe<StringComparisonExp>;
  memo: InputMaybe<StringComparisonExp>;
  summaryId: InputMaybe<StringComparisonExp>;
  user: InputMaybe<UserBoolExp>;
  userId: InputMaybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "household.credit_card_detail" */
export type HouseholdCreditCardDetailConstraint =
  /** unique or primary key constraint on columns "id" */
  "credit_card_detail_pkey";

/** input type for incrementing numeric columns in table "household.credit_card_detail" */
export type HouseholdCreditCardDetailIncInput = {
  amount: InputMaybe<Scalars["numeric"]>;
};

/** input type for inserting data into table "household.credit_card_detail" */
export type HouseholdCreditCardDetailInsertInput = {
  amount: InputMaybe<Scalars["numeric"]>;
  category: InputMaybe<HouseholdCategoryObjRelInsertInput>;
  categoryId: InputMaybe<Scalars["String"]>;
  creditCardSummary: InputMaybe<HouseholdCreditCardSummaryObjRelInsertInput>;
  date: InputMaybe<Scalars["date"]>;
  detailTags: InputMaybe<HouseholdDetailTagArrRelInsertInput>;
  genre: InputMaybe<HouseholdGenreObjRelInsertInput>;
  genreId: InputMaybe<Scalars["String"]>;
  groupId: InputMaybe<Scalars["String"]>;
  id: InputMaybe<Scalars["String"]>;
  iocomeType: InputMaybe<Scalars["String"]>;
  memo: InputMaybe<Scalars["String"]>;
  summaryId: InputMaybe<Scalars["String"]>;
  user: InputMaybe<UserObjRelInsertInput>;
  userId: InputMaybe<Scalars["String"]>;
};

/** order by max() on columns of table "household.credit_card_detail" */
export type HouseholdCreditCardDetailMaxOrderBy = {
  amount: InputMaybe<OrderBy>;
  categoryId: InputMaybe<OrderBy>;
  date: InputMaybe<OrderBy>;
  genreId: InputMaybe<OrderBy>;
  groupId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  iocomeType: InputMaybe<OrderBy>;
  memo: InputMaybe<OrderBy>;
  summaryId: InputMaybe<OrderBy>;
  userId: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "household.credit_card_detail" */
export type HouseholdCreditCardDetailMinOrderBy = {
  amount: InputMaybe<OrderBy>;
  categoryId: InputMaybe<OrderBy>;
  date: InputMaybe<OrderBy>;
  genreId: InputMaybe<OrderBy>;
  groupId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  iocomeType: InputMaybe<OrderBy>;
  memo: InputMaybe<OrderBy>;
  summaryId: InputMaybe<OrderBy>;
  userId: InputMaybe<OrderBy>;
};

/** on_conflict condition type for table "household.credit_card_detail" */
export type HouseholdCreditCardDetailOnConflict = {
  constraint: HouseholdCreditCardDetailConstraint;
  updateColumns: Array<HouseholdCreditCardDetailUpdateColumn>;
  where: InputMaybe<HouseholdCreditCardDetailBoolExp>;
};

/** Ordering options when selecting data from "household.credit_card_detail". */
export type HouseholdCreditCardDetailOrderBy = {
  amount: InputMaybe<OrderBy>;
  category: InputMaybe<HouseholdCategoryOrderBy>;
  categoryId: InputMaybe<OrderBy>;
  creditCardSummary: InputMaybe<HouseholdCreditCardSummaryOrderBy>;
  date: InputMaybe<OrderBy>;
  detailTagsAggregate: InputMaybe<HouseholdDetailTagAggregateOrderBy>;
  genre: InputMaybe<HouseholdGenreOrderBy>;
  genreId: InputMaybe<OrderBy>;
  group: InputMaybe<GroupOrderBy>;
  groupId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  iocomeType: InputMaybe<OrderBy>;
  memo: InputMaybe<OrderBy>;
  summaryId: InputMaybe<OrderBy>;
  user: InputMaybe<UserOrderBy>;
  userId: InputMaybe<OrderBy>;
};

/** primary key columns input for table: household.credit_card_detail */
export type HouseholdCreditCardDetailPkColumnsInput = {
  id: Scalars["String"];
};

/** select columns of table "household.credit_card_detail" */
export type HouseholdCreditCardDetailSelectColumn =
  /** column name */
  | "amount"
  /** column name */
  | "categoryId"
  /** column name */
  | "date"
  /** column name */
  | "genreId"
  /** column name */
  | "groupId"
  /** column name */
  | "id"
  /** column name */
  | "iocomeType"
  /** column name */
  | "memo"
  /** column name */
  | "summaryId"
  /** column name */
  | "userId";

/** input type for updating data in table "household.credit_card_detail" */
export type HouseholdCreditCardDetailSetInput = {
  amount: InputMaybe<Scalars["numeric"]>;
  categoryId: InputMaybe<Scalars["String"]>;
  genreId: InputMaybe<Scalars["String"]>;
  iocomeType: InputMaybe<Scalars["String"]>;
  memo: InputMaybe<Scalars["String"]>;
};

/** order by stddev() on columns of table "household.credit_card_detail" */
export type HouseholdCreditCardDetailStddevOrderBy = {
  amount: InputMaybe<OrderBy>;
};

/** order by stddevPop() on columns of table "household.credit_card_detail" */
export type HouseholdCreditCardDetailStddevPopOrderBy = {
  amount: InputMaybe<OrderBy>;
};

/** order by stddevSamp() on columns of table "household.credit_card_detail" */
export type HouseholdCreditCardDetailStddevSampOrderBy = {
  amount: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "household_credit_card_detail" */
export type HouseholdCreditCardDetailStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: HouseholdCreditCardDetailStreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type HouseholdCreditCardDetailStreamCursorValueInput = {
  amount: InputMaybe<Scalars["numeric"]>;
  categoryId: InputMaybe<Scalars["String"]>;
  date: InputMaybe<Scalars["date"]>;
  genreId: InputMaybe<Scalars["String"]>;
  groupId: InputMaybe<Scalars["String"]>;
  id: InputMaybe<Scalars["String"]>;
  iocomeType: InputMaybe<Scalars["String"]>;
  memo: InputMaybe<Scalars["String"]>;
  summaryId: InputMaybe<Scalars["String"]>;
  userId: InputMaybe<Scalars["String"]>;
};

/** order by sum() on columns of table "household.credit_card_detail" */
export type HouseholdCreditCardDetailSumOrderBy = {
  amount: InputMaybe<OrderBy>;
};

/** update columns of table "household.credit_card_detail" */
export type HouseholdCreditCardDetailUpdateColumn =
  /** column name */
  | "amount"
  /** column name */
  | "categoryId"
  /** column name */
  | "genreId"
  /** column name */
  | "iocomeType"
  /** column name */
  | "memo";

export type HouseholdCreditCardDetailUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc: InputMaybe<HouseholdCreditCardDetailIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set: InputMaybe<HouseholdCreditCardDetailSetInput>;
  /** filter the rows which have to be updated */
  where: HouseholdCreditCardDetailBoolExp;
};

/** order by varPop() on columns of table "household.credit_card_detail" */
export type HouseholdCreditCardDetailVarPopOrderBy = {
  amount: InputMaybe<OrderBy>;
};

/** order by varSamp() on columns of table "household.credit_card_detail" */
export type HouseholdCreditCardDetailVarSampOrderBy = {
  amount: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "household.credit_card_detail" */
export type HouseholdCreditCardDetailVarianceOrderBy = {
  amount: InputMaybe<OrderBy>;
};

export type HouseholdCreditCardSummaryAggregateBoolExp = {
  count: InputMaybe<HouseholdCreditCardSummaryAggregateBoolExpCount>;
};

/** order by aggregate values of table "household.credit_card_summary" */
export type HouseholdCreditCardSummaryAggregateOrderBy = {
  avg: InputMaybe<HouseholdCreditCardSummaryAvgOrderBy>;
  count: InputMaybe<OrderBy>;
  max: InputMaybe<HouseholdCreditCardSummaryMaxOrderBy>;
  min: InputMaybe<HouseholdCreditCardSummaryMinOrderBy>;
  stddev: InputMaybe<HouseholdCreditCardSummaryStddevOrderBy>;
  stddevPop: InputMaybe<HouseholdCreditCardSummaryStddevPopOrderBy>;
  stddevSamp: InputMaybe<HouseholdCreditCardSummaryStddevSampOrderBy>;
  sum: InputMaybe<HouseholdCreditCardSummarySumOrderBy>;
  varPop: InputMaybe<HouseholdCreditCardSummaryVarPopOrderBy>;
  varSamp: InputMaybe<HouseholdCreditCardSummaryVarSampOrderBy>;
  variance: InputMaybe<HouseholdCreditCardSummaryVarianceOrderBy>;
};

/** input type for inserting array relation for remote table "household.credit_card_summary" */
export type HouseholdCreditCardSummaryArrRelInsertInput = {
  data: Array<HouseholdCreditCardSummaryInsertInput>;
  /** upsert condition */
  onConflict: InputMaybe<HouseholdCreditCardSummaryOnConflict>;
};

/** order by avg() on columns of table "household.credit_card_summary" */
export type HouseholdCreditCardSummaryAvgOrderBy = {
  count: InputMaybe<OrderBy>;
  totalAmount: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "household.credit_card_summary". All fields are combined with a logical 'AND'. */
export type HouseholdCreditCardSummaryBoolExp = {
  _and: InputMaybe<Array<HouseholdCreditCardSummaryBoolExp>>;
  _not: InputMaybe<HouseholdCreditCardSummaryBoolExp>;
  _or: InputMaybe<Array<HouseholdCreditCardSummaryBoolExp>>;
  account: InputMaybe<HouseholdAccountBoolExp>;
  accountId: InputMaybe<StringComparisonExp>;
  count: InputMaybe<IntComparisonExp>;
  creditCard: InputMaybe<StringComparisonExp>;
  creditCardDetails: InputMaybe<HouseholdCreditCardDetailBoolExp>;
  group: InputMaybe<GroupBoolExp>;
  groupId: InputMaybe<StringComparisonExp>;
  id: InputMaybe<StringComparisonExp>;
  totalAmount: InputMaybe<NumericComparisonExp>;
  withdrawalDate: InputMaybe<DateComparisonExp>;
};

/** unique or primary key constraints on table "household.credit_card_summary" */
export type HouseholdCreditCardSummaryConstraint =
  /** unique or primary key constraint on columns "id" */
  "credit_card_summary_pkey";

/** input type for incrementing numeric columns in table "household.credit_card_summary" */
export type HouseholdCreditCardSummaryIncInput = {
  count: InputMaybe<Scalars["Int"]>;
  totalAmount: InputMaybe<Scalars["numeric"]>;
};

/** input type for inserting data into table "household.credit_card_summary" */
export type HouseholdCreditCardSummaryInsertInput = {
  account: InputMaybe<HouseholdAccountObjRelInsertInput>;
  accountId: InputMaybe<Scalars["String"]>;
  count: InputMaybe<Scalars["Int"]>;
  creditCard: InputMaybe<Scalars["String"]>;
  creditCardDetails: InputMaybe<HouseholdCreditCardDetailArrRelInsertInput>;
  groupId: InputMaybe<Scalars["String"]>;
  id: InputMaybe<Scalars["String"]>;
  totalAmount: InputMaybe<Scalars["numeric"]>;
  withdrawalDate: InputMaybe<Scalars["date"]>;
};

/** order by max() on columns of table "household.credit_card_summary" */
export type HouseholdCreditCardSummaryMaxOrderBy = {
  accountId: InputMaybe<OrderBy>;
  count: InputMaybe<OrderBy>;
  creditCard: InputMaybe<OrderBy>;
  groupId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  totalAmount: InputMaybe<OrderBy>;
  withdrawalDate: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "household.credit_card_summary" */
export type HouseholdCreditCardSummaryMinOrderBy = {
  accountId: InputMaybe<OrderBy>;
  count: InputMaybe<OrderBy>;
  creditCard: InputMaybe<OrderBy>;
  groupId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  totalAmount: InputMaybe<OrderBy>;
  withdrawalDate: InputMaybe<OrderBy>;
};

/** input type for inserting object relation for remote table "household.credit_card_summary" */
export type HouseholdCreditCardSummaryObjRelInsertInput = {
  data: HouseholdCreditCardSummaryInsertInput;
  /** upsert condition */
  onConflict: InputMaybe<HouseholdCreditCardSummaryOnConflict>;
};

/** on_conflict condition type for table "household.credit_card_summary" */
export type HouseholdCreditCardSummaryOnConflict = {
  constraint: HouseholdCreditCardSummaryConstraint;
  updateColumns: Array<HouseholdCreditCardSummaryUpdateColumn>;
  where: InputMaybe<HouseholdCreditCardSummaryBoolExp>;
};

/** Ordering options when selecting data from "household.credit_card_summary". */
export type HouseholdCreditCardSummaryOrderBy = {
  account: InputMaybe<HouseholdAccountOrderBy>;
  accountId: InputMaybe<OrderBy>;
  count: InputMaybe<OrderBy>;
  creditCard: InputMaybe<OrderBy>;
  creditCardDetailsAggregate: InputMaybe<HouseholdCreditCardDetailAggregateOrderBy>;
  group: InputMaybe<GroupOrderBy>;
  groupId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  totalAmount: InputMaybe<OrderBy>;
  withdrawalDate: InputMaybe<OrderBy>;
};

/** primary key columns input for table: household.credit_card_summary */
export type HouseholdCreditCardSummaryPkColumnsInput = {
  id: Scalars["String"];
};

/** select columns of table "household.credit_card_summary" */
export type HouseholdCreditCardSummarySelectColumn =
  /** column name */
  | "accountId"
  /** column name */
  | "count"
  /** column name */
  | "creditCard"
  /** column name */
  | "groupId"
  /** column name */
  | "id"
  /** column name */
  | "totalAmount"
  /** column name */
  | "withdrawalDate";

/** input type for updating data in table "household.credit_card_summary" */
export type HouseholdCreditCardSummarySetInput = {
  accountId: InputMaybe<Scalars["String"]>;
  count: InputMaybe<Scalars["Int"]>;
  creditCard: InputMaybe<Scalars["String"]>;
  groupId: InputMaybe<Scalars["String"]>;
  id: InputMaybe<Scalars["String"]>;
  totalAmount: InputMaybe<Scalars["numeric"]>;
  withdrawalDate: InputMaybe<Scalars["date"]>;
};

/** order by stddev() on columns of table "household.credit_card_summary" */
export type HouseholdCreditCardSummaryStddevOrderBy = {
  count: InputMaybe<OrderBy>;
  totalAmount: InputMaybe<OrderBy>;
};

/** order by stddevPop() on columns of table "household.credit_card_summary" */
export type HouseholdCreditCardSummaryStddevPopOrderBy = {
  count: InputMaybe<OrderBy>;
  totalAmount: InputMaybe<OrderBy>;
};

/** order by stddevSamp() on columns of table "household.credit_card_summary" */
export type HouseholdCreditCardSummaryStddevSampOrderBy = {
  count: InputMaybe<OrderBy>;
  totalAmount: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "household_credit_card_summary" */
export type HouseholdCreditCardSummaryStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: HouseholdCreditCardSummaryStreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type HouseholdCreditCardSummaryStreamCursorValueInput = {
  accountId: InputMaybe<Scalars["String"]>;
  count: InputMaybe<Scalars["Int"]>;
  creditCard: InputMaybe<Scalars["String"]>;
  groupId: InputMaybe<Scalars["String"]>;
  id: InputMaybe<Scalars["String"]>;
  totalAmount: InputMaybe<Scalars["numeric"]>;
  withdrawalDate: InputMaybe<Scalars["date"]>;
};

/** order by sum() on columns of table "household.credit_card_summary" */
export type HouseholdCreditCardSummarySumOrderBy = {
  count: InputMaybe<OrderBy>;
  totalAmount: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "household.credit_card_summary_total_by_account_view". All fields are combined with a logical 'AND'. */
export type HouseholdCreditCardSummaryTotalByAccountViewBoolExp = {
  _and: InputMaybe<Array<HouseholdCreditCardSummaryTotalByAccountViewBoolExp>>;
  _not: InputMaybe<HouseholdCreditCardSummaryTotalByAccountViewBoolExp>;
  _or: InputMaybe<Array<HouseholdCreditCardSummaryTotalByAccountViewBoolExp>>;
  accountId: InputMaybe<StringComparisonExp>;
  date: InputMaybe<DateComparisonExp>;
  displayOrder: InputMaybe<IntComparisonExp>;
  groupId: InputMaybe<StringComparisonExp>;
  iocomeType: InputMaybe<StringComparisonExp>;
  name: InputMaybe<StringComparisonExp>;
  total: InputMaybe<NumericComparisonExp>;
};

/** Ordering options when selecting data from "household.credit_card_summary_total_by_account_view". */
export type HouseholdCreditCardSummaryTotalByAccountViewOrderBy = {
  accountId: InputMaybe<OrderBy>;
  date: InputMaybe<OrderBy>;
  displayOrder: InputMaybe<OrderBy>;
  groupId: InputMaybe<OrderBy>;
  iocomeType: InputMaybe<OrderBy>;
  name: InputMaybe<OrderBy>;
  total: InputMaybe<OrderBy>;
};

/** select columns of table "household.credit_card_summary_total_by_account_view" */
export type HouseholdCreditCardSummaryTotalByAccountViewSelectColumn =
  /** column name */
  | "accountId"
  /** column name */
  | "date"
  /** column name */
  | "displayOrder"
  /** column name */
  | "groupId"
  /** column name */
  | "iocomeType"
  /** column name */
  | "name"
  /** column name */
  | "total";

/** Streaming cursor of the table "household_credit_card_summary_total_by_account_view" */
export type HouseholdCreditCardSummaryTotalByAccountViewStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: HouseholdCreditCardSummaryTotalByAccountViewStreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type HouseholdCreditCardSummaryTotalByAccountViewStreamCursorValueInput =
  {
    accountId: InputMaybe<Scalars["String"]>;
    date: InputMaybe<Scalars["date"]>;
    displayOrder: InputMaybe<Scalars["Int"]>;
    groupId: InputMaybe<Scalars["String"]>;
    iocomeType: InputMaybe<Scalars["String"]>;
    name: InputMaybe<Scalars["String"]>;
    total: InputMaybe<Scalars["numeric"]>;
  };

/** update columns of table "household.credit_card_summary" */
export type HouseholdCreditCardSummaryUpdateColumn =
  /** column name */
  | "accountId"
  /** column name */
  | "count"
  /** column name */
  | "creditCard"
  /** column name */
  | "groupId"
  /** column name */
  | "id"
  /** column name */
  | "totalAmount"
  /** column name */
  | "withdrawalDate";

export type HouseholdCreditCardSummaryUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc: InputMaybe<HouseholdCreditCardSummaryIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set: InputMaybe<HouseholdCreditCardSummarySetInput>;
  /** filter the rows which have to be updated */
  where: HouseholdCreditCardSummaryBoolExp;
};

/** order by varPop() on columns of table "household.credit_card_summary" */
export type HouseholdCreditCardSummaryVarPopOrderBy = {
  count: InputMaybe<OrderBy>;
  totalAmount: InputMaybe<OrderBy>;
};

/** order by varSamp() on columns of table "household.credit_card_summary" */
export type HouseholdCreditCardSummaryVarSampOrderBy = {
  count: InputMaybe<OrderBy>;
  totalAmount: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "household.credit_card_summary" */
export type HouseholdCreditCardSummaryVarianceOrderBy = {
  count: InputMaybe<OrderBy>;
  totalAmount: InputMaybe<OrderBy>;
};

/** order by aggregate values of table "household.daily_detail" */
export type HouseholdDailyDetailAggregateOrderBy = {
  avg: InputMaybe<HouseholdDailyDetailAvgOrderBy>;
  count: InputMaybe<OrderBy>;
  max: InputMaybe<HouseholdDailyDetailMaxOrderBy>;
  min: InputMaybe<HouseholdDailyDetailMinOrderBy>;
  stddev: InputMaybe<HouseholdDailyDetailStddevOrderBy>;
  stddevPop: InputMaybe<HouseholdDailyDetailStddevPopOrderBy>;
  stddevSamp: InputMaybe<HouseholdDailyDetailStddevSampOrderBy>;
  sum: InputMaybe<HouseholdDailyDetailSumOrderBy>;
  varPop: InputMaybe<HouseholdDailyDetailVarPopOrderBy>;
  varSamp: InputMaybe<HouseholdDailyDetailVarSampOrderBy>;
  variance: InputMaybe<HouseholdDailyDetailVarianceOrderBy>;
};

/** input type for inserting array relation for remote table "household.daily_detail" */
export type HouseholdDailyDetailArrRelInsertInput = {
  data: Array<HouseholdDailyDetailInsertInput>;
  /** upsert condition */
  onConflict: InputMaybe<HouseholdDailyDetailOnConflict>;
};

/** order by avg() on columns of table "household.daily_detail" */
export type HouseholdDailyDetailAvgOrderBy = {
  amount: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "household.daily_detail". All fields are combined with a logical 'AND'. */
export type HouseholdDailyDetailBoolExp = {
  _and: InputMaybe<Array<HouseholdDailyDetailBoolExp>>;
  _not: InputMaybe<HouseholdDailyDetailBoolExp>;
  _or: InputMaybe<Array<HouseholdDailyDetailBoolExp>>;
  account: InputMaybe<HouseholdAccountBoolExp>;
  accountId: InputMaybe<StringComparisonExp>;
  amount: InputMaybe<NumericComparisonExp>;
  category: InputMaybe<HouseholdCategoryBoolExp>;
  categoryId: InputMaybe<StringComparisonExp>;
  date: InputMaybe<DateComparisonExp>;
  detailTags: InputMaybe<HouseholdDetailTagBoolExp>;
  detailTagsAggregate: InputMaybe<HouseholdDetailTagAggregateBoolExp>;
  genre: InputMaybe<HouseholdGenreBoolExp>;
  genreId: InputMaybe<StringComparisonExp>;
  group: InputMaybe<GroupBoolExp>;
  groupId: InputMaybe<StringComparisonExp>;
  id: InputMaybe<StringComparisonExp>;
  iocomeType: InputMaybe<StringComparisonExp>;
  memo: InputMaybe<StringComparisonExp>;
  user: InputMaybe<UserBoolExp>;
  userId: InputMaybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "household.daily_detail" */
export type HouseholdDailyDetailConstraint =
  /** unique or primary key constraint on columns "id" */
  "daily_detail_pkey";

/** input type for incrementing numeric columns in table "household.daily_detail" */
export type HouseholdDailyDetailIncInput = {
  amount: InputMaybe<Scalars["numeric"]>;
};

/** input type for inserting data into table "household.daily_detail" */
export type HouseholdDailyDetailInsertInput = {
  account: InputMaybe<HouseholdAccountObjRelInsertInput>;
  accountId: InputMaybe<Scalars["String"]>;
  amount: InputMaybe<Scalars["numeric"]>;
  category: InputMaybe<HouseholdCategoryObjRelInsertInput>;
  categoryId: InputMaybe<Scalars["String"]>;
  date: InputMaybe<Scalars["date"]>;
  detailTags: InputMaybe<HouseholdDetailTagArrRelInsertInput>;
  genre: InputMaybe<HouseholdGenreObjRelInsertInput>;
  genreId: InputMaybe<Scalars["String"]>;
  groupId: InputMaybe<Scalars["String"]>;
  id: InputMaybe<Scalars["String"]>;
  iocomeType: InputMaybe<Scalars["String"]>;
  memo: InputMaybe<Scalars["String"]>;
  user: InputMaybe<UserObjRelInsertInput>;
  userId: InputMaybe<Scalars["String"]>;
};

/** order by max() on columns of table "household.daily_detail" */
export type HouseholdDailyDetailMaxOrderBy = {
  accountId: InputMaybe<OrderBy>;
  amount: InputMaybe<OrderBy>;
  categoryId: InputMaybe<OrderBy>;
  date: InputMaybe<OrderBy>;
  genreId: InputMaybe<OrderBy>;
  groupId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  iocomeType: InputMaybe<OrderBy>;
  memo: InputMaybe<OrderBy>;
  userId: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "household.daily_detail" */
export type HouseholdDailyDetailMinOrderBy = {
  accountId: InputMaybe<OrderBy>;
  amount: InputMaybe<OrderBy>;
  categoryId: InputMaybe<OrderBy>;
  date: InputMaybe<OrderBy>;
  genreId: InputMaybe<OrderBy>;
  groupId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  iocomeType: InputMaybe<OrderBy>;
  memo: InputMaybe<OrderBy>;
  userId: InputMaybe<OrderBy>;
};

/** on_conflict condition type for table "household.daily_detail" */
export type HouseholdDailyDetailOnConflict = {
  constraint: HouseholdDailyDetailConstraint;
  updateColumns: Array<HouseholdDailyDetailUpdateColumn>;
  where: InputMaybe<HouseholdDailyDetailBoolExp>;
};

/** Ordering options when selecting data from "household.daily_detail". */
export type HouseholdDailyDetailOrderBy = {
  account: InputMaybe<HouseholdAccountOrderBy>;
  accountId: InputMaybe<OrderBy>;
  amount: InputMaybe<OrderBy>;
  category: InputMaybe<HouseholdCategoryOrderBy>;
  categoryId: InputMaybe<OrderBy>;
  date: InputMaybe<OrderBy>;
  detailTagsAggregate: InputMaybe<HouseholdDetailTagAggregateOrderBy>;
  genre: InputMaybe<HouseholdGenreOrderBy>;
  genreId: InputMaybe<OrderBy>;
  group: InputMaybe<GroupOrderBy>;
  groupId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  iocomeType: InputMaybe<OrderBy>;
  memo: InputMaybe<OrderBy>;
  user: InputMaybe<UserOrderBy>;
  userId: InputMaybe<OrderBy>;
};

/** primary key columns input for table: household.daily_detail */
export type HouseholdDailyDetailPkColumnsInput = {
  id: Scalars["String"];
};

/** select columns of table "household.daily_detail" */
export type HouseholdDailyDetailSelectColumn =
  /** column name */
  | "accountId"
  /** column name */
  | "amount"
  /** column name */
  | "categoryId"
  /** column name */
  | "date"
  /** column name */
  | "genreId"
  /** column name */
  | "groupId"
  /** column name */
  | "id"
  /** column name */
  | "iocomeType"
  /** column name */
  | "memo"
  /** column name */
  | "userId";

/** input type for updating data in table "household.daily_detail" */
export type HouseholdDailyDetailSetInput = {
  accountId: InputMaybe<Scalars["String"]>;
  amount: InputMaybe<Scalars["numeric"]>;
  categoryId: InputMaybe<Scalars["String"]>;
  date: InputMaybe<Scalars["date"]>;
  genreId: InputMaybe<Scalars["String"]>;
  iocomeType: InputMaybe<Scalars["String"]>;
  memo: InputMaybe<Scalars["String"]>;
};

/** order by stddev() on columns of table "household.daily_detail" */
export type HouseholdDailyDetailStddevOrderBy = {
  amount: InputMaybe<OrderBy>;
};

/** order by stddevPop() on columns of table "household.daily_detail" */
export type HouseholdDailyDetailStddevPopOrderBy = {
  amount: InputMaybe<OrderBy>;
};

/** order by stddevSamp() on columns of table "household.daily_detail" */
export type HouseholdDailyDetailStddevSampOrderBy = {
  amount: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "household_daily_detail" */
export type HouseholdDailyDetailStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: HouseholdDailyDetailStreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type HouseholdDailyDetailStreamCursorValueInput = {
  accountId: InputMaybe<Scalars["String"]>;
  amount: InputMaybe<Scalars["numeric"]>;
  categoryId: InputMaybe<Scalars["String"]>;
  date: InputMaybe<Scalars["date"]>;
  genreId: InputMaybe<Scalars["String"]>;
  groupId: InputMaybe<Scalars["String"]>;
  id: InputMaybe<Scalars["String"]>;
  iocomeType: InputMaybe<Scalars["String"]>;
  memo: InputMaybe<Scalars["String"]>;
  userId: InputMaybe<Scalars["String"]>;
};

/** order by sum() on columns of table "household.daily_detail" */
export type HouseholdDailyDetailSumOrderBy = {
  amount: InputMaybe<OrderBy>;
};

/** update columns of table "household.daily_detail" */
export type HouseholdDailyDetailUpdateColumn =
  /** column name */
  | "accountId"
  /** column name */
  | "amount"
  /** column name */
  | "categoryId"
  /** column name */
  | "date"
  /** column name */
  | "genreId"
  /** column name */
  | "iocomeType"
  /** column name */
  | "memo";

export type HouseholdDailyDetailUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc: InputMaybe<HouseholdDailyDetailIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set: InputMaybe<HouseholdDailyDetailSetInput>;
  /** filter the rows which have to be updated */
  where: HouseholdDailyDetailBoolExp;
};

/** order by varPop() on columns of table "household.daily_detail" */
export type HouseholdDailyDetailVarPopOrderBy = {
  amount: InputMaybe<OrderBy>;
};

/** order by varSamp() on columns of table "household.daily_detail" */
export type HouseholdDailyDetailVarSampOrderBy = {
  amount: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "household.daily_detail" */
export type HouseholdDailyDetailVarianceOrderBy = {
  amount: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "household.daily_total_view". All fields are combined with a logical 'AND'. */
export type HouseholdDailyTotalViewBoolExp = {
  _and: InputMaybe<Array<HouseholdDailyTotalViewBoolExp>>;
  _not: InputMaybe<HouseholdDailyTotalViewBoolExp>;
  _or: InputMaybe<Array<HouseholdDailyTotalViewBoolExp>>;
  date: InputMaybe<DateComparisonExp>;
  groupId: InputMaybe<StringComparisonExp>;
  iocomeType: InputMaybe<StringComparisonExp>;
  total: InputMaybe<NumericComparisonExp>;
};

/** Ordering options when selecting data from "household.daily_total_view". */
export type HouseholdDailyTotalViewOrderBy = {
  date: InputMaybe<OrderBy>;
  groupId: InputMaybe<OrderBy>;
  iocomeType: InputMaybe<OrderBy>;
  total: InputMaybe<OrderBy>;
};

/** select columns of table "household.daily_total_view" */
export type HouseholdDailyTotalViewSelectColumn =
  /** column name */
  | "date"
  /** column name */
  | "groupId"
  /** column name */
  | "iocomeType"
  /** column name */
  | "total";

/** Streaming cursor of the table "household_daily_total_view" */
export type HouseholdDailyTotalViewStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: HouseholdDailyTotalViewStreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type HouseholdDailyTotalViewStreamCursorValueInput = {
  date: InputMaybe<Scalars["date"]>;
  groupId: InputMaybe<Scalars["String"]>;
  iocomeType: InputMaybe<Scalars["String"]>;
  total: InputMaybe<Scalars["numeric"]>;
};

/** order by aggregate values of table "household.dashboard_setting" */
export type HouseholdDashboardSettingAggregateOrderBy = {
  avg: InputMaybe<HouseholdDashboardSettingAvgOrderBy>;
  count: InputMaybe<OrderBy>;
  max: InputMaybe<HouseholdDashboardSettingMaxOrderBy>;
  min: InputMaybe<HouseholdDashboardSettingMinOrderBy>;
  stddev: InputMaybe<HouseholdDashboardSettingStddevOrderBy>;
  stddevPop: InputMaybe<HouseholdDashboardSettingStddevPopOrderBy>;
  stddevSamp: InputMaybe<HouseholdDashboardSettingStddevSampOrderBy>;
  sum: InputMaybe<HouseholdDashboardSettingSumOrderBy>;
  varPop: InputMaybe<HouseholdDashboardSettingVarPopOrderBy>;
  varSamp: InputMaybe<HouseholdDashboardSettingVarSampOrderBy>;
  variance: InputMaybe<HouseholdDashboardSettingVarianceOrderBy>;
};

/** order by aggregate values of table "household.dashboard_setting_args" */
export type HouseholdDashboardSettingArgsAggregateOrderBy = {
  count: InputMaybe<OrderBy>;
  max: InputMaybe<HouseholdDashboardSettingArgsMaxOrderBy>;
  min: InputMaybe<HouseholdDashboardSettingArgsMinOrderBy>;
};

/** input type for inserting array relation for remote table "household.dashboard_setting_args" */
export type HouseholdDashboardSettingArgsArrRelInsertInput = {
  data: Array<HouseholdDashboardSettingArgsInsertInput>;
  /** upsert condition */
  onConflict: InputMaybe<HouseholdDashboardSettingArgsOnConflict>;
};

/** Boolean expression to filter rows from the table "household.dashboard_setting_args". All fields are combined with a logical 'AND'. */
export type HouseholdDashboardSettingArgsBoolExp = {
  _and: InputMaybe<Array<HouseholdDashboardSettingArgsBoolExp>>;
  _not: InputMaybe<HouseholdDashboardSettingArgsBoolExp>;
  _or: InputMaybe<Array<HouseholdDashboardSettingArgsBoolExp>>;
  dashboardSetting: InputMaybe<HouseholdDashboardSettingBoolExp>;
  id: InputMaybe<StringComparisonExp>;
  settingId: InputMaybe<StringComparisonExp>;
  type: InputMaybe<StringComparisonExp>;
  value: InputMaybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "household.dashboard_setting_args" */
export type HouseholdDashboardSettingArgsConstraint =
  /** unique or primary key constraint on columns "id" */
  "dashboard_setting_args_pkey";

/** input type for inserting data into table "household.dashboard_setting_args" */
export type HouseholdDashboardSettingArgsInsertInput = {
  dashboardSetting: InputMaybe<HouseholdDashboardSettingObjRelInsertInput>;
  id: InputMaybe<Scalars["String"]>;
  settingId: InputMaybe<Scalars["String"]>;
  type: InputMaybe<Scalars["String"]>;
  value: InputMaybe<Scalars["String"]>;
};

/** order by max() on columns of table "household.dashboard_setting_args" */
export type HouseholdDashboardSettingArgsMaxOrderBy = {
  id: InputMaybe<OrderBy>;
  settingId: InputMaybe<OrderBy>;
  type: InputMaybe<OrderBy>;
  value: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "household.dashboard_setting_args" */
export type HouseholdDashboardSettingArgsMinOrderBy = {
  id: InputMaybe<OrderBy>;
  settingId: InputMaybe<OrderBy>;
  type: InputMaybe<OrderBy>;
  value: InputMaybe<OrderBy>;
};

/** on_conflict condition type for table "household.dashboard_setting_args" */
export type HouseholdDashboardSettingArgsOnConflict = {
  constraint: HouseholdDashboardSettingArgsConstraint;
  updateColumns: Array<HouseholdDashboardSettingArgsUpdateColumn>;
  where: InputMaybe<HouseholdDashboardSettingArgsBoolExp>;
};

/** Ordering options when selecting data from "household.dashboard_setting_args". */
export type HouseholdDashboardSettingArgsOrderBy = {
  dashboardSetting: InputMaybe<HouseholdDashboardSettingOrderBy>;
  id: InputMaybe<OrderBy>;
  settingId: InputMaybe<OrderBy>;
  type: InputMaybe<OrderBy>;
  value: InputMaybe<OrderBy>;
};

/** select columns of table "household.dashboard_setting_args" */
export type HouseholdDashboardSettingArgsSelectColumn =
  /** column name */
  | "id"
  /** column name */
  | "settingId"
  /** column name */
  | "type"
  /** column name */
  | "value";

/** Streaming cursor of the table "household_dashboard_setting_args" */
export type HouseholdDashboardSettingArgsStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: HouseholdDashboardSettingArgsStreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type HouseholdDashboardSettingArgsStreamCursorValueInput = {
  id: InputMaybe<Scalars["String"]>;
  settingId: InputMaybe<Scalars["String"]>;
  type: InputMaybe<Scalars["String"]>;
  value: InputMaybe<Scalars["String"]>;
};

/** placeholder for update columns of table "household.dashboard_setting_args" (current role has no relevant permissions) */
export type HouseholdDashboardSettingArgsUpdateColumn =
  /** placeholder (do not use) */
  "_PLACEHOLDER";

/** order by avg() on columns of table "household.dashboard_setting" */
export type HouseholdDashboardSettingAvgOrderBy = {
  order: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "household.dashboard_setting". All fields are combined with a logical 'AND'. */
export type HouseholdDashboardSettingBoolExp = {
  _and: InputMaybe<Array<HouseholdDashboardSettingBoolExp>>;
  _not: InputMaybe<HouseholdDashboardSettingBoolExp>;
  _or: InputMaybe<Array<HouseholdDashboardSettingBoolExp>>;
  dashboardSettingArgs: InputMaybe<HouseholdDashboardSettingArgsBoolExp>;
  feature: InputMaybe<StringComparisonExp>;
  group: InputMaybe<GroupBoolExp>;
  groupId: InputMaybe<StringComparisonExp>;
  id: InputMaybe<StringComparisonExp>;
  order: InputMaybe<IntComparisonExp>;
  user: InputMaybe<UserBoolExp>;
  userId: InputMaybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "household.dashboard_setting" */
export type HouseholdDashboardSettingConstraint =
  /** unique or primary key constraint on columns "id" */
  "dashboard_setting_pkey";

/** input type for incrementing numeric columns in table "household.dashboard_setting" */
export type HouseholdDashboardSettingIncInput = {
  order: InputMaybe<Scalars["Int"]>;
};

/** input type for inserting data into table "household.dashboard_setting" */
export type HouseholdDashboardSettingInsertInput = {
  dashboardSettingArgs: InputMaybe<HouseholdDashboardSettingArgsArrRelInsertInput>;
  feature: InputMaybe<Scalars["String"]>;
  groupId: InputMaybe<Scalars["String"]>;
  id: InputMaybe<Scalars["String"]>;
  order: InputMaybe<Scalars["Int"]>;
  user: InputMaybe<UserObjRelInsertInput>;
  userId: InputMaybe<Scalars["String"]>;
};

/** order by max() on columns of table "household.dashboard_setting" */
export type HouseholdDashboardSettingMaxOrderBy = {
  feature: InputMaybe<OrderBy>;
  groupId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  order: InputMaybe<OrderBy>;
  userId: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "household.dashboard_setting" */
export type HouseholdDashboardSettingMinOrderBy = {
  feature: InputMaybe<OrderBy>;
  groupId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  order: InputMaybe<OrderBy>;
  userId: InputMaybe<OrderBy>;
};

/** input type for inserting object relation for remote table "household.dashboard_setting" */
export type HouseholdDashboardSettingObjRelInsertInput = {
  data: HouseholdDashboardSettingInsertInput;
  /** upsert condition */
  onConflict: InputMaybe<HouseholdDashboardSettingOnConflict>;
};

/** on_conflict condition type for table "household.dashboard_setting" */
export type HouseholdDashboardSettingOnConflict = {
  constraint: HouseholdDashboardSettingConstraint;
  updateColumns: Array<HouseholdDashboardSettingUpdateColumn>;
  where: InputMaybe<HouseholdDashboardSettingBoolExp>;
};

/** Ordering options when selecting data from "household.dashboard_setting". */
export type HouseholdDashboardSettingOrderBy = {
  dashboardSettingArgsAggregate: InputMaybe<HouseholdDashboardSettingArgsAggregateOrderBy>;
  feature: InputMaybe<OrderBy>;
  group: InputMaybe<GroupOrderBy>;
  groupId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  order: InputMaybe<OrderBy>;
  user: InputMaybe<UserOrderBy>;
  userId: InputMaybe<OrderBy>;
};

/** primary key columns input for table: household.dashboard_setting */
export type HouseholdDashboardSettingPkColumnsInput = {
  id: Scalars["String"];
};

/** select columns of table "household.dashboard_setting" */
export type HouseholdDashboardSettingSelectColumn =
  /** column name */
  | "feature"
  /** column name */
  | "groupId"
  /** column name */
  | "id"
  /** column name */
  | "order"
  /** column name */
  | "userId";

/** input type for updating data in table "household.dashboard_setting" */
export type HouseholdDashboardSettingSetInput = {
  feature: InputMaybe<Scalars["String"]>;
  groupId: InputMaybe<Scalars["String"]>;
  id: InputMaybe<Scalars["String"]>;
  order: InputMaybe<Scalars["Int"]>;
  userId: InputMaybe<Scalars["String"]>;
};

/** order by stddev() on columns of table "household.dashboard_setting" */
export type HouseholdDashboardSettingStddevOrderBy = {
  order: InputMaybe<OrderBy>;
};

/** order by stddevPop() on columns of table "household.dashboard_setting" */
export type HouseholdDashboardSettingStddevPopOrderBy = {
  order: InputMaybe<OrderBy>;
};

/** order by stddevSamp() on columns of table "household.dashboard_setting" */
export type HouseholdDashboardSettingStddevSampOrderBy = {
  order: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "household_dashboard_setting" */
export type HouseholdDashboardSettingStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: HouseholdDashboardSettingStreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type HouseholdDashboardSettingStreamCursorValueInput = {
  feature: InputMaybe<Scalars["String"]>;
  groupId: InputMaybe<Scalars["String"]>;
  id: InputMaybe<Scalars["String"]>;
  order: InputMaybe<Scalars["Int"]>;
  userId: InputMaybe<Scalars["String"]>;
};

/** order by sum() on columns of table "household.dashboard_setting" */
export type HouseholdDashboardSettingSumOrderBy = {
  order: InputMaybe<OrderBy>;
};

/** update columns of table "household.dashboard_setting" */
export type HouseholdDashboardSettingUpdateColumn =
  /** column name */
  | "feature"
  /** column name */
  | "groupId"
  /** column name */
  | "id"
  /** column name */
  | "order"
  /** column name */
  | "userId";

export type HouseholdDashboardSettingUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc: InputMaybe<HouseholdDashboardSettingIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set: InputMaybe<HouseholdDashboardSettingSetInput>;
  /** filter the rows which have to be updated */
  where: HouseholdDashboardSettingBoolExp;
};

/** order by varPop() on columns of table "household.dashboard_setting" */
export type HouseholdDashboardSettingVarPopOrderBy = {
  order: InputMaybe<OrderBy>;
};

/** order by varSamp() on columns of table "household.dashboard_setting" */
export type HouseholdDashboardSettingVarSampOrderBy = {
  order: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "household.dashboard_setting" */
export type HouseholdDashboardSettingVarianceOrderBy = {
  order: InputMaybe<OrderBy>;
};

export type HouseholdDepositCategoryAggregateBoolExp = {
  count: InputMaybe<HouseholdDepositCategoryAggregateBoolExpCount>;
};

/** order by aggregate values of table "household.deposit_category" */
export type HouseholdDepositCategoryAggregateOrderBy = {
  count: InputMaybe<OrderBy>;
  max: InputMaybe<HouseholdDepositCategoryMaxOrderBy>;
  min: InputMaybe<HouseholdDepositCategoryMinOrderBy>;
};

/** Boolean expression to filter rows from the table "household.deposit_category". All fields are combined with a logical 'AND'. */
export type HouseholdDepositCategoryBoolExp = {
  _and: InputMaybe<Array<HouseholdDepositCategoryBoolExp>>;
  _not: InputMaybe<HouseholdDepositCategoryBoolExp>;
  _or: InputMaybe<Array<HouseholdDepositCategoryBoolExp>>;
  category: InputMaybe<HouseholdCategoryBoolExp>;
  categoryId: InputMaybe<StringComparisonExp>;
  group: InputMaybe<GroupBoolExp>;
  groupId: InputMaybe<StringComparisonExp>;
};

/** order by max() on columns of table "household.deposit_category" */
export type HouseholdDepositCategoryMaxOrderBy = {
  categoryId: InputMaybe<OrderBy>;
  groupId: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "household.deposit_category" */
export type HouseholdDepositCategoryMinOrderBy = {
  categoryId: InputMaybe<OrderBy>;
  groupId: InputMaybe<OrderBy>;
};

/** Ordering options when selecting data from "household.deposit_category". */
export type HouseholdDepositCategoryOrderBy = {
  category: InputMaybe<HouseholdCategoryOrderBy>;
  categoryId: InputMaybe<OrderBy>;
  group: InputMaybe<GroupOrderBy>;
  groupId: InputMaybe<OrderBy>;
};

/** select columns of table "household.deposit_category" */
export type HouseholdDepositCategorySelectColumn =
  /** column name */
  | "categoryId"
  /** column name */
  | "groupId";

/** Streaming cursor of the table "household_deposit_category" */
export type HouseholdDepositCategoryStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: HouseholdDepositCategoryStreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type HouseholdDepositCategoryStreamCursorValueInput = {
  categoryId: InputMaybe<Scalars["String"]>;
  groupId: InputMaybe<Scalars["String"]>;
};

export type HouseholdDetailTagAggregateBoolExp = {
  count: InputMaybe<HouseholdDetailTagAggregateBoolExpCount>;
};

/** order by aggregate values of table "household.detail_tag" */
export type HouseholdDetailTagAggregateOrderBy = {
  count: InputMaybe<OrderBy>;
  max: InputMaybe<HouseholdDetailTagMaxOrderBy>;
  min: InputMaybe<HouseholdDetailTagMinOrderBy>;
};

/** input type for inserting array relation for remote table "household.detail_tag" */
export type HouseholdDetailTagArrRelInsertInput = {
  data: Array<HouseholdDetailTagInsertInput>;
  /** upsert condition */
  onConflict: InputMaybe<HouseholdDetailTagOnConflict>;
};

/** Boolean expression to filter rows from the table "household.detail_tag". All fields are combined with a logical 'AND'. */
export type HouseholdDetailTagBoolExp = {
  _and: InputMaybe<Array<HouseholdDetailTagBoolExp>>;
  _not: InputMaybe<HouseholdDetailTagBoolExp>;
  _or: InputMaybe<Array<HouseholdDetailTagBoolExp>>;
  creditCardDetailsDetailTag: InputMaybe<HouseholdCreditCardDetailBoolExp>;
  dailyDetailsDetailTag: InputMaybe<HouseholdDailyDetailBoolExp>;
  detailId: InputMaybe<StringComparisonExp>;
  details: InputMaybe<HouseholdAllDetailViewBoolExp>;
  detailsAggregate: InputMaybe<HouseholdAllDetailViewAggregateBoolExp>;
  id: InputMaybe<StringComparisonExp>;
  tag: InputMaybe<HouseholdTagBoolExp>;
  tagId: InputMaybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "household.detail_tag" */
export type HouseholdDetailTagConstraint =
  /** unique or primary key constraint on columns "id" */
  "detail_tag_pkey";

/** input type for inserting data into table "household.detail_tag" */
export type HouseholdDetailTagInsertInput = {
  creditCardDetailsDetailTag: InputMaybe<HouseholdCreditCardDetailArrRelInsertInput>;
  dailyDetailsDetailTag: InputMaybe<HouseholdDailyDetailArrRelInsertInput>;
  detailId: InputMaybe<Scalars["String"]>;
  id: InputMaybe<Scalars["String"]>;
  tag: InputMaybe<HouseholdTagObjRelInsertInput>;
  tagId: InputMaybe<Scalars["String"]>;
};

/** order by max() on columns of table "household.detail_tag" */
export type HouseholdDetailTagMaxOrderBy = {
  detailId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  tagId: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "household.detail_tag" */
export type HouseholdDetailTagMinOrderBy = {
  detailId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  tagId: InputMaybe<OrderBy>;
};

/** on_conflict condition type for table "household.detail_tag" */
export type HouseholdDetailTagOnConflict = {
  constraint: HouseholdDetailTagConstraint;
  updateColumns: Array<HouseholdDetailTagUpdateColumn>;
  where: InputMaybe<HouseholdDetailTagBoolExp>;
};

/** Ordering options when selecting data from "household.detail_tag". */
export type HouseholdDetailTagOrderBy = {
  creditCardDetailsDetailTagAggregate: InputMaybe<HouseholdCreditCardDetailAggregateOrderBy>;
  dailyDetailsDetailTagAggregate: InputMaybe<HouseholdDailyDetailAggregateOrderBy>;
  detailId: InputMaybe<OrderBy>;
  detailsAggregate: InputMaybe<HouseholdAllDetailViewAggregateOrderBy>;
  id: InputMaybe<OrderBy>;
  tag: InputMaybe<HouseholdTagOrderBy>;
  tagId: InputMaybe<OrderBy>;
};

/** select columns of table "household.detail_tag" */
export type HouseholdDetailTagSelectColumn =
  /** column name */
  | "detailId"
  /** column name */
  | "id"
  /** column name */
  | "tagId";

/** Streaming cursor of the table "household_detail_tag" */
export type HouseholdDetailTagStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: HouseholdDetailTagStreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type HouseholdDetailTagStreamCursorValueInput = {
  detailId: InputMaybe<Scalars["String"]>;
  id: InputMaybe<Scalars["String"]>;
  tagId: InputMaybe<Scalars["String"]>;
};

/** placeholder for update columns of table "household.detail_tag" (current role has no relevant permissions) */
export type HouseholdDetailTagUpdateColumn =
  /** placeholder (do not use) */
  "_PLACEHOLDER";

export type HouseholdFavoriteFilterAggregateBoolExp = {
  count: InputMaybe<HouseholdFavoriteFilterAggregateBoolExpCount>;
};

/** order by aggregate values of table "household.favorite_filter" */
export type HouseholdFavoriteFilterAggregateOrderBy = {
  count: InputMaybe<OrderBy>;
  max: InputMaybe<HouseholdFavoriteFilterMaxOrderBy>;
  min: InputMaybe<HouseholdFavoriteFilterMinOrderBy>;
};

export type HouseholdFavoriteFilterArgsAggregateBoolExp = {
  count: InputMaybe<HouseholdFavoriteFilterArgsAggregateBoolExpCount>;
};

/** order by aggregate values of table "household.favorite_filter_args" */
export type HouseholdFavoriteFilterArgsAggregateOrderBy = {
  count: InputMaybe<OrderBy>;
  max: InputMaybe<HouseholdFavoriteFilterArgsMaxOrderBy>;
  min: InputMaybe<HouseholdFavoriteFilterArgsMinOrderBy>;
};

/** input type for inserting array relation for remote table "household.favorite_filter_args" */
export type HouseholdFavoriteFilterArgsArrRelInsertInput = {
  data: Array<HouseholdFavoriteFilterArgsInsertInput>;
  /** upsert condition */
  onConflict: InputMaybe<HouseholdFavoriteFilterArgsOnConflict>;
};

/** Boolean expression to filter rows from the table "household.favorite_filter_args". All fields are combined with a logical 'AND'. */
export type HouseholdFavoriteFilterArgsBoolExp = {
  _and: InputMaybe<Array<HouseholdFavoriteFilterArgsBoolExp>>;
  _not: InputMaybe<HouseholdFavoriteFilterArgsBoolExp>;
  _or: InputMaybe<Array<HouseholdFavoriteFilterArgsBoolExp>>;
  favoriteFilter: InputMaybe<HouseholdFavoriteFilterBoolExp>;
  favoriteFilterArgCategoryId: InputMaybe<HouseholdCategoryBoolExp>;
  filterId: InputMaybe<StringComparisonExp>;
  id: InputMaybe<StringComparisonExp>;
  key: InputMaybe<StringComparisonExp>;
  value: InputMaybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "household.favorite_filter_args" */
export type HouseholdFavoriteFilterArgsConstraint =
  /** unique or primary key constraint on columns "id" */
  "favorite_filter_args_pkey";

/** input type for inserting data into table "household.favorite_filter_args" */
export type HouseholdFavoriteFilterArgsInsertInput = {
  favoriteFilter: InputMaybe<HouseholdFavoriteFilterObjRelInsertInput>;
  favoriteFilterArgCategoryId: InputMaybe<HouseholdCategoryObjRelInsertInput>;
  filterId: InputMaybe<Scalars["String"]>;
  id: InputMaybe<Scalars["String"]>;
  key: InputMaybe<Scalars["String"]>;
  value: InputMaybe<Scalars["String"]>;
};

/** order by max() on columns of table "household.favorite_filter_args" */
export type HouseholdFavoriteFilterArgsMaxOrderBy = {
  filterId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  key: InputMaybe<OrderBy>;
  value: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "household.favorite_filter_args" */
export type HouseholdFavoriteFilterArgsMinOrderBy = {
  filterId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  key: InputMaybe<OrderBy>;
  value: InputMaybe<OrderBy>;
};

/** on_conflict condition type for table "household.favorite_filter_args" */
export type HouseholdFavoriteFilterArgsOnConflict = {
  constraint: HouseholdFavoriteFilterArgsConstraint;
  updateColumns: Array<HouseholdFavoriteFilterArgsUpdateColumn>;
  where: InputMaybe<HouseholdFavoriteFilterArgsBoolExp>;
};

/** Ordering options when selecting data from "household.favorite_filter_args". */
export type HouseholdFavoriteFilterArgsOrderBy = {
  favoriteFilter: InputMaybe<HouseholdFavoriteFilterOrderBy>;
  favoriteFilterArgCategoryId: InputMaybe<HouseholdCategoryOrderBy>;
  filterId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  key: InputMaybe<OrderBy>;
  value: InputMaybe<OrderBy>;
};

/** primary key columns input for table: household.favorite_filter_args */
export type HouseholdFavoriteFilterArgsPkColumnsInput = {
  id: Scalars["String"];
};

/** select columns of table "household.favorite_filter_args" */
export type HouseholdFavoriteFilterArgsSelectColumn =
  /** column name */
  | "filterId"
  /** column name */
  | "id"
  /** column name */
  | "key"
  /** column name */
  | "value";

/** input type for updating data in table "household.favorite_filter_args" */
export type HouseholdFavoriteFilterArgsSetInput = {
  key: InputMaybe<Scalars["String"]>;
  value: InputMaybe<Scalars["String"]>;
};

/** update columns of table "household.favorite_filter_args" */
export type HouseholdFavoriteFilterArgsUpdateColumn =
  /** column name */
  | "key"
  /** column name */
  | "value";

export type HouseholdFavoriteFilterArgsUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set: InputMaybe<HouseholdFavoriteFilterArgsSetInput>;
  /** filter the rows which have to be updated */
  where: HouseholdFavoriteFilterArgsBoolExp;
};

/** Boolean expression to filter rows from the table "household.favorite_filter". All fields are combined with a logical 'AND'. */
export type HouseholdFavoriteFilterBoolExp = {
  _and: InputMaybe<Array<HouseholdFavoriteFilterBoolExp>>;
  _not: InputMaybe<HouseholdFavoriteFilterBoolExp>;
  _or: InputMaybe<Array<HouseholdFavoriteFilterBoolExp>>;
  favoriteFilterArgs: InputMaybe<HouseholdFavoriteFilterArgsBoolExp>;
  favoriteFilterArgsAggregate: InputMaybe<HouseholdFavoriteFilterArgsAggregateBoolExp>;
  group: InputMaybe<GroupBoolExp>;
  groupId: InputMaybe<StringComparisonExp>;
  id: InputMaybe<StringComparisonExp>;
  name: InputMaybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "household.favorite_filter" */
export type HouseholdFavoriteFilterConstraint =
  /** unique or primary key constraint on columns "id" */
  "favorite_filter_pkey";

/** input type for inserting data into table "household.favorite_filter" */
export type HouseholdFavoriteFilterInsertInput = {
  favoriteFilterArgs: InputMaybe<HouseholdFavoriteFilterArgsArrRelInsertInput>;
  groupId: InputMaybe<Scalars["String"]>;
  id: InputMaybe<Scalars["String"]>;
  name: InputMaybe<Scalars["String"]>;
};

/** order by max() on columns of table "household.favorite_filter" */
export type HouseholdFavoriteFilterMaxOrderBy = {
  groupId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  name: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "household.favorite_filter" */
export type HouseholdFavoriteFilterMinOrderBy = {
  groupId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  name: InputMaybe<OrderBy>;
};

/** input type for inserting object relation for remote table "household.favorite_filter" */
export type HouseholdFavoriteFilterObjRelInsertInput = {
  data: HouseholdFavoriteFilterInsertInput;
  /** upsert condition */
  onConflict: InputMaybe<HouseholdFavoriteFilterOnConflict>;
};

/** on_conflict condition type for table "household.favorite_filter" */
export type HouseholdFavoriteFilterOnConflict = {
  constraint: HouseholdFavoriteFilterConstraint;
  updateColumns: Array<HouseholdFavoriteFilterUpdateColumn>;
  where: InputMaybe<HouseholdFavoriteFilterBoolExp>;
};

/** Ordering options when selecting data from "household.favorite_filter". */
export type HouseholdFavoriteFilterOrderBy = {
  favoriteFilterArgsAggregate: InputMaybe<HouseholdFavoriteFilterArgsAggregateOrderBy>;
  group: InputMaybe<GroupOrderBy>;
  groupId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  name: InputMaybe<OrderBy>;
};

/** primary key columns input for table: household.favorite_filter */
export type HouseholdFavoriteFilterPkColumnsInput = {
  id: Scalars["String"];
};

/** select columns of table "household.favorite_filter" */
export type HouseholdFavoriteFilterSelectColumn =
  /** column name */
  | "groupId"
  /** column name */
  | "id"
  /** column name */
  | "name";

/** input type for updating data in table "household.favorite_filter" */
export type HouseholdFavoriteFilterSetInput = {
  name: InputMaybe<Scalars["String"]>;
};

/** update columns of table "household.favorite_filter" */
export type HouseholdFavoriteFilterUpdateColumn =
  /** column name */
  "name";

export type HouseholdFavoriteFilterUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set: InputMaybe<HouseholdFavoriteFilterSetInput>;
  /** filter the rows which have to be updated */
  where: HouseholdFavoriteFilterBoolExp;
};

export type HouseholdGenreAggregateBoolExp = {
  bool_and: InputMaybe<HouseholdGenreAggregateBoolExpBool_And>;
  bool_or: InputMaybe<HouseholdGenreAggregateBoolExpBool_Or>;
  count: InputMaybe<HouseholdGenreAggregateBoolExpCount>;
};

/** order by aggregate values of table "household.genre" */
export type HouseholdGenreAggregateOrderBy = {
  avg: InputMaybe<HouseholdGenreAvgOrderBy>;
  count: InputMaybe<OrderBy>;
  max: InputMaybe<HouseholdGenreMaxOrderBy>;
  min: InputMaybe<HouseholdGenreMinOrderBy>;
  stddev: InputMaybe<HouseholdGenreStddevOrderBy>;
  stddevPop: InputMaybe<HouseholdGenreStddevPopOrderBy>;
  stddevSamp: InputMaybe<HouseholdGenreStddevSampOrderBy>;
  sum: InputMaybe<HouseholdGenreSumOrderBy>;
  varPop: InputMaybe<HouseholdGenreVarPopOrderBy>;
  varSamp: InputMaybe<HouseholdGenreVarSampOrderBy>;
  variance: InputMaybe<HouseholdGenreVarianceOrderBy>;
};

/** order by avg() on columns of table "household.genre" */
export type HouseholdGenreAvgOrderBy = {
  displayOrder: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "household.genre". All fields are combined with a logical 'AND'. */
export type HouseholdGenreBoolExp = {
  _and: InputMaybe<Array<HouseholdGenreBoolExp>>;
  _not: InputMaybe<HouseholdGenreBoolExp>;
  _or: InputMaybe<Array<HouseholdGenreBoolExp>>;
  categories: InputMaybe<HouseholdCategoryBoolExp>;
  creditCardDetails: InputMaybe<HouseholdCreditCardDetailBoolExp>;
  dailyDetails: InputMaybe<HouseholdDailyDetailBoolExp>;
  displayOrder: InputMaybe<IntComparisonExp>;
  genreType: InputMaybe<StringComparisonExp>;
  group: InputMaybe<GroupBoolExp>;
  groupId: InputMaybe<StringComparisonExp>;
  id: InputMaybe<StringComparisonExp>;
  iocomeType: InputMaybe<StringComparisonExp>;
  name: InputMaybe<StringComparisonExp>;
  validFlag: InputMaybe<BooleanComparisonExp>;
};

/** unique or primary key constraints on table "household.genre" */
export type HouseholdGenreConstraint =
  /** unique or primary key constraint on columns "id" */
  "genre_pkey";

/** input type for incrementing numeric columns in table "household.genre" */
export type HouseholdGenreIncInput = {
  displayOrder: InputMaybe<Scalars["Int"]>;
};

/** input type for inserting data into table "household.genre" */
export type HouseholdGenreInsertInput = {
  categories: InputMaybe<HouseholdCategoryArrRelInsertInput>;
  creditCardDetails: InputMaybe<HouseholdCreditCardDetailArrRelInsertInput>;
  dailyDetails: InputMaybe<HouseholdDailyDetailArrRelInsertInput>;
  displayOrder: InputMaybe<Scalars["Int"]>;
  genreType: InputMaybe<Scalars["String"]>;
  groupId: InputMaybe<Scalars["String"]>;
  id: InputMaybe<Scalars["String"]>;
  iocomeType: InputMaybe<Scalars["String"]>;
  name: InputMaybe<Scalars["String"]>;
  validFlag: InputMaybe<Scalars["Boolean"]>;
};

/** order by max() on columns of table "household.genre" */
export type HouseholdGenreMaxOrderBy = {
  displayOrder: InputMaybe<OrderBy>;
  genreType: InputMaybe<OrderBy>;
  groupId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  iocomeType: InputMaybe<OrderBy>;
  name: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "household.genre" */
export type HouseholdGenreMinOrderBy = {
  displayOrder: InputMaybe<OrderBy>;
  genreType: InputMaybe<OrderBy>;
  groupId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  iocomeType: InputMaybe<OrderBy>;
  name: InputMaybe<OrderBy>;
};

/** input type for inserting object relation for remote table "household.genre" */
export type HouseholdGenreObjRelInsertInput = {
  data: HouseholdGenreInsertInput;
  /** upsert condition */
  onConflict: InputMaybe<HouseholdGenreOnConflict>;
};

/** on_conflict condition type for table "household.genre" */
export type HouseholdGenreOnConflict = {
  constraint: HouseholdGenreConstraint;
  updateColumns: Array<HouseholdGenreUpdateColumn>;
  where: InputMaybe<HouseholdGenreBoolExp>;
};

/** Ordering options when selecting data from "household.genre". */
export type HouseholdGenreOrderBy = {
  categoriesAggregate: InputMaybe<HouseholdCategoryAggregateOrderBy>;
  creditCardDetailsAggregate: InputMaybe<HouseholdCreditCardDetailAggregateOrderBy>;
  dailyDetailsAggregate: InputMaybe<HouseholdDailyDetailAggregateOrderBy>;
  displayOrder: InputMaybe<OrderBy>;
  genreType: InputMaybe<OrderBy>;
  group: InputMaybe<GroupOrderBy>;
  groupId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  iocomeType: InputMaybe<OrderBy>;
  name: InputMaybe<OrderBy>;
  validFlag: InputMaybe<OrderBy>;
};

/** primary key columns input for table: household.genre */
export type HouseholdGenrePkColumnsInput = {
  id: Scalars["String"];
};

/** select columns of table "household.genre" */
export type HouseholdGenreSelectColumn =
  /** column name */
  | "displayOrder"
  /** column name */
  | "genreType"
  /** column name */
  | "groupId"
  /** column name */
  | "id"
  /** column name */
  | "iocomeType"
  /** column name */
  | "name"
  /** column name */
  | "validFlag";

/** select "householdGenreAggregateBoolExpBool_andArgumentsColumns" columns of table "household.genre" */
export type HouseholdGenreSelectColumnHouseholdGenreAggregateBoolExpBool_AndArgumentsColumns =
  /** column name */
  "validFlag";

/** select "householdGenreAggregateBoolExpBool_orArgumentsColumns" columns of table "household.genre" */
export type HouseholdGenreSelectColumnHouseholdGenreAggregateBoolExpBool_OrArgumentsColumns =
  /** column name */
  "validFlag";

/** input type for updating data in table "household.genre" */
export type HouseholdGenreSetInput = {
  displayOrder: InputMaybe<Scalars["Int"]>;
  genreType: InputMaybe<Scalars["String"]>;
  groupId: InputMaybe<Scalars["String"]>;
  id: InputMaybe<Scalars["String"]>;
  iocomeType: InputMaybe<Scalars["String"]>;
  name: InputMaybe<Scalars["String"]>;
  validFlag: InputMaybe<Scalars["Boolean"]>;
};

/** order by stddev() on columns of table "household.genre" */
export type HouseholdGenreStddevOrderBy = {
  displayOrder: InputMaybe<OrderBy>;
};

/** order by stddevPop() on columns of table "household.genre" */
export type HouseholdGenreStddevPopOrderBy = {
  displayOrder: InputMaybe<OrderBy>;
};

/** order by stddevSamp() on columns of table "household.genre" */
export type HouseholdGenreStddevSampOrderBy = {
  displayOrder: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "household_genre" */
export type HouseholdGenreStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: HouseholdGenreStreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type HouseholdGenreStreamCursorValueInput = {
  displayOrder: InputMaybe<Scalars["Int"]>;
  genreType: InputMaybe<Scalars["String"]>;
  groupId: InputMaybe<Scalars["String"]>;
  id: InputMaybe<Scalars["String"]>;
  iocomeType: InputMaybe<Scalars["String"]>;
  name: InputMaybe<Scalars["String"]>;
  validFlag: InputMaybe<Scalars["Boolean"]>;
};

/** order by sum() on columns of table "household.genre" */
export type HouseholdGenreSumOrderBy = {
  displayOrder: InputMaybe<OrderBy>;
};

/** update columns of table "household.genre" */
export type HouseholdGenreUpdateColumn =
  /** column name */
  | "displayOrder"
  /** column name */
  | "genreType"
  /** column name */
  | "groupId"
  /** column name */
  | "id"
  /** column name */
  | "iocomeType"
  /** column name */
  | "name"
  /** column name */
  | "validFlag";

export type HouseholdGenreUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc: InputMaybe<HouseholdGenreIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set: InputMaybe<HouseholdGenreSetInput>;
  /** filter the rows which have to be updated */
  where: HouseholdGenreBoolExp;
};

/** order by varPop() on columns of table "household.genre" */
export type HouseholdGenreVarPopOrderBy = {
  displayOrder: InputMaybe<OrderBy>;
};

/** order by varSamp() on columns of table "household.genre" */
export type HouseholdGenreVarSampOrderBy = {
  displayOrder: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "household.genre" */
export type HouseholdGenreVarianceOrderBy = {
  displayOrder: InputMaybe<OrderBy>;
};

export type HouseholdImportFileHistoryAggregateBoolExp = {
  count: InputMaybe<HouseholdImportFileHistoryAggregateBoolExpCount>;
};

/** order by aggregate values of table "household.import_file_history" */
export type HouseholdImportFileHistoryAggregateOrderBy = {
  count: InputMaybe<OrderBy>;
  max: InputMaybe<HouseholdImportFileHistoryMaxOrderBy>;
  min: InputMaybe<HouseholdImportFileHistoryMinOrderBy>;
};

/** Boolean expression to filter rows from the table "household.import_file_history". All fields are combined with a logical 'AND'. */
export type HouseholdImportFileHistoryBoolExp = {
  _and: InputMaybe<Array<HouseholdImportFileHistoryBoolExp>>;
  _not: InputMaybe<HouseholdImportFileHistoryBoolExp>;
  _or: InputMaybe<Array<HouseholdImportFileHistoryBoolExp>>;
  fileName: InputMaybe<StringComparisonExp>;
  fileType: InputMaybe<StringComparisonExp>;
  group: InputMaybe<GroupBoolExp>;
  groupId: InputMaybe<StringComparisonExp>;
  id: InputMaybe<StringComparisonExp>;
  importDatetime: InputMaybe<TimestampComparisonExp>;
  importUserId: InputMaybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "household.import_file_history" */
export type HouseholdImportFileHistoryConstraint =
  /** unique or primary key constraint on columns "id" */
  "import_file_history_pkey";

/** input type for inserting data into table "household.import_file_history" */
export type HouseholdImportFileHistoryInsertInput = {
  fileName: InputMaybe<Scalars["String"]>;
  fileType: InputMaybe<Scalars["String"]>;
  groupId: InputMaybe<Scalars["String"]>;
  id: InputMaybe<Scalars["String"]>;
  importDatetime: InputMaybe<Scalars["timestamp"]>;
  importUserId: InputMaybe<Scalars["String"]>;
};

/** order by max() on columns of table "household.import_file_history" */
export type HouseholdImportFileHistoryMaxOrderBy = {
  fileName: InputMaybe<OrderBy>;
  fileType: InputMaybe<OrderBy>;
  groupId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  importDatetime: InputMaybe<OrderBy>;
  importUserId: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "household.import_file_history" */
export type HouseholdImportFileHistoryMinOrderBy = {
  fileName: InputMaybe<OrderBy>;
  fileType: InputMaybe<OrderBy>;
  groupId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  importDatetime: InputMaybe<OrderBy>;
  importUserId: InputMaybe<OrderBy>;
};

/** on_conflict condition type for table "household.import_file_history" */
export type HouseholdImportFileHistoryOnConflict = {
  constraint: HouseholdImportFileHistoryConstraint;
  updateColumns: Array<HouseholdImportFileHistoryUpdateColumn>;
  where: InputMaybe<HouseholdImportFileHistoryBoolExp>;
};

/** Ordering options when selecting data from "household.import_file_history". */
export type HouseholdImportFileHistoryOrderBy = {
  fileName: InputMaybe<OrderBy>;
  fileType: InputMaybe<OrderBy>;
  group: InputMaybe<GroupOrderBy>;
  groupId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  importDatetime: InputMaybe<OrderBy>;
  importUserId: InputMaybe<OrderBy>;
};

/** select columns of table "household.import_file_history" */
export type HouseholdImportFileHistorySelectColumn =
  /** column name */
  | "fileName"
  /** column name */
  | "fileType"
  /** column name */
  | "groupId"
  /** column name */
  | "id"
  /** column name */
  | "importDatetime"
  /** column name */
  | "importUserId";

/** Streaming cursor of the table "household_import_file_history" */
export type HouseholdImportFileHistoryStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: HouseholdImportFileHistoryStreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type HouseholdImportFileHistoryStreamCursorValueInput = {
  fileName: InputMaybe<Scalars["String"]>;
  fileType: InputMaybe<Scalars["String"]>;
  groupId: InputMaybe<Scalars["String"]>;
  id: InputMaybe<Scalars["String"]>;
  importDatetime: InputMaybe<Scalars["timestamp"]>;
  importUserId: InputMaybe<Scalars["String"]>;
};

/** placeholder for update columns of table "household.import_file_history" (current role has no relevant permissions) */
export type HouseholdImportFileHistoryUpdateColumn =
  /** placeholder (do not use) */
  "_PLACEHOLDER";

/** order by aggregate values of table "household.tag" */
export type HouseholdTagAggregateOrderBy = {
  avg: InputMaybe<HouseholdTagAvgOrderBy>;
  count: InputMaybe<OrderBy>;
  max: InputMaybe<HouseholdTagMaxOrderBy>;
  min: InputMaybe<HouseholdTagMinOrderBy>;
  stddev: InputMaybe<HouseholdTagStddevOrderBy>;
  stddevPop: InputMaybe<HouseholdTagStddevPopOrderBy>;
  stddevSamp: InputMaybe<HouseholdTagStddevSampOrderBy>;
  sum: InputMaybe<HouseholdTagSumOrderBy>;
  varPop: InputMaybe<HouseholdTagVarPopOrderBy>;
  varSamp: InputMaybe<HouseholdTagVarSampOrderBy>;
  variance: InputMaybe<HouseholdTagVarianceOrderBy>;
};

/** order by avg() on columns of table "household.tag" */
export type HouseholdTagAvgOrderBy = {
  displayOrder: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "household.tag". All fields are combined with a logical 'AND'. */
export type HouseholdTagBoolExp = {
  _and: InputMaybe<Array<HouseholdTagBoolExp>>;
  _not: InputMaybe<HouseholdTagBoolExp>;
  _or: InputMaybe<Array<HouseholdTagBoolExp>>;
  colorCode: InputMaybe<BpcharComparisonExp>;
  detailTags: InputMaybe<HouseholdDetailTagBoolExp>;
  detailTagsAggregate: InputMaybe<HouseholdDetailTagAggregateBoolExp>;
  displayOrder: InputMaybe<IntComparisonExp>;
  group: InputMaybe<GroupBoolExp>;
  groupId: InputMaybe<StringComparisonExp>;
  id: InputMaybe<StringComparisonExp>;
  name: InputMaybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "household.tag" */
export type HouseholdTagConstraint =
  /** unique or primary key constraint on columns "id" */
  "m_tag_pkey";

/** input type for incrementing numeric columns in table "household.tag" */
export type HouseholdTagIncInput = {
  displayOrder: InputMaybe<Scalars["Int"]>;
};

/** input type for inserting data into table "household.tag" */
export type HouseholdTagInsertInput = {
  colorCode: InputMaybe<Scalars["bpchar"]>;
  detailTags: InputMaybe<HouseholdDetailTagArrRelInsertInput>;
  displayOrder: InputMaybe<Scalars["Int"]>;
  groupId: InputMaybe<Scalars["String"]>;
  id: InputMaybe<Scalars["String"]>;
  name: InputMaybe<Scalars["String"]>;
};

/** order by max() on columns of table "household.tag" */
export type HouseholdTagMaxOrderBy = {
  colorCode: InputMaybe<OrderBy>;
  displayOrder: InputMaybe<OrderBy>;
  groupId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  name: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "household.tag" */
export type HouseholdTagMinOrderBy = {
  colorCode: InputMaybe<OrderBy>;
  displayOrder: InputMaybe<OrderBy>;
  groupId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  name: InputMaybe<OrderBy>;
};

/** input type for inserting object relation for remote table "household.tag" */
export type HouseholdTagObjRelInsertInput = {
  data: HouseholdTagInsertInput;
  /** upsert condition */
  onConflict: InputMaybe<HouseholdTagOnConflict>;
};

/** on_conflict condition type for table "household.tag" */
export type HouseholdTagOnConflict = {
  constraint: HouseholdTagConstraint;
  updateColumns: Array<HouseholdTagUpdateColumn>;
  where: InputMaybe<HouseholdTagBoolExp>;
};

/** Ordering options when selecting data from "household.tag". */
export type HouseholdTagOrderBy = {
  colorCode: InputMaybe<OrderBy>;
  detailTagsAggregate: InputMaybe<HouseholdDetailTagAggregateOrderBy>;
  displayOrder: InputMaybe<OrderBy>;
  group: InputMaybe<GroupOrderBy>;
  groupId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  name: InputMaybe<OrderBy>;
};

/** primary key columns input for table: household.tag */
export type HouseholdTagPkColumnsInput = {
  id: Scalars["String"];
};

/** select columns of table "household.tag" */
export type HouseholdTagSelectColumn =
  /** column name */
  | "colorCode"
  /** column name */
  | "displayOrder"
  /** column name */
  | "groupId"
  /** column name */
  | "id"
  /** column name */
  | "name";

/** input type for updating data in table "household.tag" */
export type HouseholdTagSetInput = {
  colorCode: InputMaybe<Scalars["bpchar"]>;
  displayOrder: InputMaybe<Scalars["Int"]>;
  name: InputMaybe<Scalars["String"]>;
};

/** order by stddev() on columns of table "household.tag" */
export type HouseholdTagStddevOrderBy = {
  displayOrder: InputMaybe<OrderBy>;
};

/** order by stddevPop() on columns of table "household.tag" */
export type HouseholdTagStddevPopOrderBy = {
  displayOrder: InputMaybe<OrderBy>;
};

/** order by stddevSamp() on columns of table "household.tag" */
export type HouseholdTagStddevSampOrderBy = {
  displayOrder: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "household_tag" */
export type HouseholdTagStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: HouseholdTagStreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type HouseholdTagStreamCursorValueInput = {
  colorCode: InputMaybe<Scalars["bpchar"]>;
  displayOrder: InputMaybe<Scalars["Int"]>;
  groupId: InputMaybe<Scalars["String"]>;
  id: InputMaybe<Scalars["String"]>;
  name: InputMaybe<Scalars["String"]>;
};

/** order by sum() on columns of table "household.tag" */
export type HouseholdTagSumOrderBy = {
  displayOrder: InputMaybe<OrderBy>;
};

/** update columns of table "household.tag" */
export type HouseholdTagUpdateColumn =
  /** column name */
  | "colorCode"
  /** column name */
  | "displayOrder"
  /** column name */
  | "name";

export type HouseholdTagUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc: InputMaybe<HouseholdTagIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set: InputMaybe<HouseholdTagSetInput>;
  /** filter the rows which have to be updated */
  where: HouseholdTagBoolExp;
};

/** order by varPop() on columns of table "household.tag" */
export type HouseholdTagVarPopOrderBy = {
  displayOrder: InputMaybe<OrderBy>;
};

/** order by varSamp() on columns of table "household.tag" */
export type HouseholdTagVarSampOrderBy = {
  displayOrder: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "household.tag" */
export type HouseholdTagVarianceOrderBy = {
  displayOrder: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "household.template". All fields are combined with a logical 'AND'. */
export type HouseholdTemplateBoolExp = {
  _and: InputMaybe<Array<HouseholdTemplateBoolExp>>;
  _not: InputMaybe<HouseholdTemplateBoolExp>;
  _or: InputMaybe<Array<HouseholdTemplateBoolExp>>;
  accountId: InputMaybe<StringComparisonExp>;
  amount: InputMaybe<IntComparisonExp>;
  categoryId: InputMaybe<StringComparisonExp>;
  genreId: InputMaybe<StringComparisonExp>;
  group: InputMaybe<GroupBoolExp>;
  groupId: InputMaybe<StringComparisonExp>;
  id: InputMaybe<StringComparisonExp>;
  iocomeType: InputMaybe<StringComparisonExp>;
  memo: InputMaybe<StringComparisonExp>;
  name: InputMaybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "household.template" */
export type HouseholdTemplateConstraint =
  /** unique or primary key constraint on columns "id" */
  "template_pkey";

/** input type for incrementing numeric columns in table "household.template" */
export type HouseholdTemplateIncInput = {
  amount: InputMaybe<Scalars["Int"]>;
};

/** input type for inserting data into table "household.template" */
export type HouseholdTemplateInsertInput = {
  accountId: InputMaybe<Scalars["String"]>;
  amount: InputMaybe<Scalars["Int"]>;
  categoryId: InputMaybe<Scalars["String"]>;
  genreId: InputMaybe<Scalars["String"]>;
  groupId: InputMaybe<Scalars["String"]>;
  id: InputMaybe<Scalars["String"]>;
  iocomeType: InputMaybe<Scalars["String"]>;
  memo: InputMaybe<Scalars["String"]>;
  name: InputMaybe<Scalars["String"]>;
};

/** on_conflict condition type for table "household.template" */
export type HouseholdTemplateOnConflict = {
  constraint: HouseholdTemplateConstraint;
  updateColumns: Array<HouseholdTemplateUpdateColumn>;
  where: InputMaybe<HouseholdTemplateBoolExp>;
};

/** Ordering options when selecting data from "household.template". */
export type HouseholdTemplateOrderBy = {
  accountId: InputMaybe<OrderBy>;
  amount: InputMaybe<OrderBy>;
  categoryId: InputMaybe<OrderBy>;
  genreId: InputMaybe<OrderBy>;
  group: InputMaybe<GroupOrderBy>;
  groupId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  iocomeType: InputMaybe<OrderBy>;
  memo: InputMaybe<OrderBy>;
  name: InputMaybe<OrderBy>;
};

/** primary key columns input for table: household.template */
export type HouseholdTemplatePkColumnsInput = {
  id: Scalars["String"];
};

/** select columns of table "household.template" */
export type HouseholdTemplateSelectColumn =
  /** column name */
  | "accountId"
  /** column name */
  | "amount"
  /** column name */
  | "categoryId"
  /** column name */
  | "genreId"
  /** column name */
  | "groupId"
  /** column name */
  | "id"
  /** column name */
  | "iocomeType"
  /** column name */
  | "memo"
  /** column name */
  | "name";

/** input type for updating data in table "household.template" */
export type HouseholdTemplateSetInput = {
  accountId: InputMaybe<Scalars["String"]>;
  amount: InputMaybe<Scalars["Int"]>;
  categoryId: InputMaybe<Scalars["String"]>;
  genreId: InputMaybe<Scalars["String"]>;
  groupId: InputMaybe<Scalars["String"]>;
  id: InputMaybe<Scalars["String"]>;
  iocomeType: InputMaybe<Scalars["String"]>;
  memo: InputMaybe<Scalars["String"]>;
  name: InputMaybe<Scalars["String"]>;
};

/** Streaming cursor of the table "household_template" */
export type HouseholdTemplateStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: HouseholdTemplateStreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type HouseholdTemplateStreamCursorValueInput = {
  accountId: InputMaybe<Scalars["String"]>;
  amount: InputMaybe<Scalars["Int"]>;
  categoryId: InputMaybe<Scalars["String"]>;
  genreId: InputMaybe<Scalars["String"]>;
  groupId: InputMaybe<Scalars["String"]>;
  id: InputMaybe<Scalars["String"]>;
  iocomeType: InputMaybe<Scalars["String"]>;
  memo: InputMaybe<Scalars["String"]>;
  name: InputMaybe<Scalars["String"]>;
};

/** update columns of table "household.template" */
export type HouseholdTemplateUpdateColumn =
  /** column name */
  | "accountId"
  /** column name */
  | "amount"
  /** column name */
  | "categoryId"
  /** column name */
  | "genreId"
  /** column name */
  | "groupId"
  /** column name */
  | "id"
  /** column name */
  | "iocomeType"
  /** column name */
  | "memo"
  /** column name */
  | "name";

export type HouseholdTemplateUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc: InputMaybe<HouseholdTemplateIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set: InputMaybe<HouseholdTemplateSetInput>;
  /** filter the rows which have to be updated */
  where: HouseholdTemplateBoolExp;
};

/** order by aggregate values of table "household.total_by_category_view" */
export type HouseholdTotalByCategoryViewAggregateOrderBy = {
  avg: InputMaybe<HouseholdTotalByCategoryViewAvgOrderBy>;
  count: InputMaybe<OrderBy>;
  max: InputMaybe<HouseholdTotalByCategoryViewMaxOrderBy>;
  min: InputMaybe<HouseholdTotalByCategoryViewMinOrderBy>;
  stddev: InputMaybe<HouseholdTotalByCategoryViewStddevOrderBy>;
  stddevPop: InputMaybe<HouseholdTotalByCategoryViewStddevPopOrderBy>;
  stddevSamp: InputMaybe<HouseholdTotalByCategoryViewStddevSampOrderBy>;
  sum: InputMaybe<HouseholdTotalByCategoryViewSumOrderBy>;
  varPop: InputMaybe<HouseholdTotalByCategoryViewVarPopOrderBy>;
  varSamp: InputMaybe<HouseholdTotalByCategoryViewVarSampOrderBy>;
  variance: InputMaybe<HouseholdTotalByCategoryViewVarianceOrderBy>;
};

/** order by avg() on columns of table "household.total_by_category_view" */
export type HouseholdTotalByCategoryViewAvgOrderBy = {
  total: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "household.total_by_category_view". All fields are combined with a logical 'AND'. */
export type HouseholdTotalByCategoryViewBoolExp = {
  _and: InputMaybe<Array<HouseholdTotalByCategoryViewBoolExp>>;
  _not: InputMaybe<HouseholdTotalByCategoryViewBoolExp>;
  _or: InputMaybe<Array<HouseholdTotalByCategoryViewBoolExp>>;
  category: InputMaybe<HouseholdCategoryBoolExp>;
  categoryId: InputMaybe<StringComparisonExp>;
  group: InputMaybe<GroupBoolExp>;
  groupId: InputMaybe<StringComparisonExp>;
  total: InputMaybe<NumericComparisonExp>;
  yyyyMm: InputMaybe<StringComparisonExp>;
};

/** order by max() on columns of table "household.total_by_category_view" */
export type HouseholdTotalByCategoryViewMaxOrderBy = {
  categoryId: InputMaybe<OrderBy>;
  groupId: InputMaybe<OrderBy>;
  total: InputMaybe<OrderBy>;
  yyyyMm: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "household.total_by_category_view" */
export type HouseholdTotalByCategoryViewMinOrderBy = {
  categoryId: InputMaybe<OrderBy>;
  groupId: InputMaybe<OrderBy>;
  total: InputMaybe<OrderBy>;
  yyyyMm: InputMaybe<OrderBy>;
};

/** Ordering options when selecting data from "household.total_by_category_view". */
export type HouseholdTotalByCategoryViewOrderBy = {
  category: InputMaybe<HouseholdCategoryOrderBy>;
  categoryId: InputMaybe<OrderBy>;
  group: InputMaybe<GroupOrderBy>;
  groupId: InputMaybe<OrderBy>;
  total: InputMaybe<OrderBy>;
  yyyyMm: InputMaybe<OrderBy>;
};

/** select columns of table "household.total_by_category_view" */
export type HouseholdTotalByCategoryViewSelectColumn =
  /** column name */
  | "categoryId"
  /** column name */
  | "groupId"
  /** column name */
  | "total"
  /** column name */
  | "yyyyMm";

/** order by stddev() on columns of table "household.total_by_category_view" */
export type HouseholdTotalByCategoryViewStddevOrderBy = {
  total: InputMaybe<OrderBy>;
};

/** order by stddevPop() on columns of table "household.total_by_category_view" */
export type HouseholdTotalByCategoryViewStddevPopOrderBy = {
  total: InputMaybe<OrderBy>;
};

/** order by stddevSamp() on columns of table "household.total_by_category_view" */
export type HouseholdTotalByCategoryViewStddevSampOrderBy = {
  total: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "household_total_by_category_view" */
export type HouseholdTotalByCategoryViewStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: HouseholdTotalByCategoryViewStreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type HouseholdTotalByCategoryViewStreamCursorValueInput = {
  categoryId: InputMaybe<Scalars["String"]>;
  groupId: InputMaybe<Scalars["String"]>;
  total: InputMaybe<Scalars["numeric"]>;
  yyyyMm: InputMaybe<Scalars["String"]>;
};

/** order by sum() on columns of table "household.total_by_category_view" */
export type HouseholdTotalByCategoryViewSumOrderBy = {
  total: InputMaybe<OrderBy>;
};

/** order by varPop() on columns of table "household.total_by_category_view" */
export type HouseholdTotalByCategoryViewVarPopOrderBy = {
  total: InputMaybe<OrderBy>;
};

/** order by varSamp() on columns of table "household.total_by_category_view" */
export type HouseholdTotalByCategoryViewVarSampOrderBy = {
  total: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "household.total_by_category_view" */
export type HouseholdTotalByCategoryViewVarianceOrderBy = {
  total: InputMaybe<OrderBy>;
};

export type HouseholdTransferCategoryAggregateBoolExp = {
  count: InputMaybe<HouseholdTransferCategoryAggregateBoolExpCount>;
};

/** order by aggregate values of table "household.transfer_category" */
export type HouseholdTransferCategoryAggregateOrderBy = {
  count: InputMaybe<OrderBy>;
  max: InputMaybe<HouseholdTransferCategoryMaxOrderBy>;
  min: InputMaybe<HouseholdTransferCategoryMinOrderBy>;
};

/** Boolean expression to filter rows from the table "household.transfer_category". All fields are combined with a logical 'AND'. */
export type HouseholdTransferCategoryBoolExp = {
  _and: InputMaybe<Array<HouseholdTransferCategoryBoolExp>>;
  _not: InputMaybe<HouseholdTransferCategoryBoolExp>;
  _or: InputMaybe<Array<HouseholdTransferCategoryBoolExp>>;
  categoryByIncomeCategoryId: InputMaybe<HouseholdCategoryBoolExp>;
  categoryByOutcomeCategoryId: InputMaybe<HouseholdCategoryBoolExp>;
  group: InputMaybe<GroupBoolExp>;
  groupId: InputMaybe<StringComparisonExp>;
  incomeCategoryId: InputMaybe<StringComparisonExp>;
  outcomeCategoryId: InputMaybe<StringComparisonExp>;
};

/** order by max() on columns of table "household.transfer_category" */
export type HouseholdTransferCategoryMaxOrderBy = {
  groupId: InputMaybe<OrderBy>;
  incomeCategoryId: InputMaybe<OrderBy>;
  outcomeCategoryId: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "household.transfer_category" */
export type HouseholdTransferCategoryMinOrderBy = {
  groupId: InputMaybe<OrderBy>;
  incomeCategoryId: InputMaybe<OrderBy>;
  outcomeCategoryId: InputMaybe<OrderBy>;
};

/** Ordering options when selecting data from "household.transfer_category". */
export type HouseholdTransferCategoryOrderBy = {
  categoryByIncomeCategoryId: InputMaybe<HouseholdCategoryOrderBy>;
  categoryByOutcomeCategoryId: InputMaybe<HouseholdCategoryOrderBy>;
  group: InputMaybe<GroupOrderBy>;
  groupId: InputMaybe<OrderBy>;
  incomeCategoryId: InputMaybe<OrderBy>;
  outcomeCategoryId: InputMaybe<OrderBy>;
};

/** select columns of table "household.transfer_category" */
export type HouseholdTransferCategorySelectColumn =
  /** column name */
  | "groupId"
  /** column name */
  | "incomeCategoryId"
  /** column name */
  | "outcomeCategoryId";

/** Streaming cursor of the table "household_transfer_category" */
export type HouseholdTransferCategoryStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: HouseholdTransferCategoryStreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type HouseholdTransferCategoryStreamCursorValueInput = {
  groupId: InputMaybe<Scalars["String"]>;
  incomeCategoryId: InputMaybe<Scalars["String"]>;
  outcomeCategoryId: InputMaybe<Scalars["String"]>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type IntComparisonExp = {
  _eq: InputMaybe<Scalars["Int"]>;
  _gt: InputMaybe<Scalars["Int"]>;
  _gte: InputMaybe<Scalars["Int"]>;
  _in: InputMaybe<Array<Scalars["Int"]>>;
  _isNull: InputMaybe<Scalars["Boolean"]>;
  _lt: InputMaybe<Scalars["Int"]>;
  _lte: InputMaybe<Scalars["Int"]>;
  _neq: InputMaybe<Scalars["Int"]>;
  _nin: InputMaybe<Array<Scalars["Int"]>>;
};

/** Boolean expression to compare columns of type "json". All fields are combined with logical 'AND'. */
export type JsonArrayComparisonExp = {
  /** is the array contained in the given array value */
  _containedIn: InputMaybe<Array<Scalars["json"]>>;
  /** does the array contain the given value */
  _contains: InputMaybe<Array<Scalars["json"]>>;
  _eq: InputMaybe<Array<Scalars["json"]>>;
  _gt: InputMaybe<Array<Scalars["json"]>>;
  _gte: InputMaybe<Array<Scalars["json"]>>;
  _in: InputMaybe<Array<Array<Scalars["json"]>>>;
  _isNull: InputMaybe<Scalars["Boolean"]>;
  _lt: InputMaybe<Array<Scalars["json"]>>;
  _lte: InputMaybe<Array<Scalars["json"]>>;
  _neq: InputMaybe<Array<Scalars["json"]>>;
  _nin: InputMaybe<Array<Array<Scalars["json"]>>>;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type NumericComparisonExp = {
  _eq: InputMaybe<Scalars["numeric"]>;
  _gt: InputMaybe<Scalars["numeric"]>;
  _gte: InputMaybe<Scalars["numeric"]>;
  _in: InputMaybe<Array<Scalars["numeric"]>>;
  _isNull: InputMaybe<Scalars["Boolean"]>;
  _lt: InputMaybe<Scalars["numeric"]>;
  _lte: InputMaybe<Scalars["numeric"]>;
  _neq: InputMaybe<Scalars["numeric"]>;
  _nin: InputMaybe<Array<Scalars["numeric"]>>;
};

/** column ordering options */
export type OrderBy =
  /** in ascending order, nulls last */
  | "ASC"
  /** in ascending order, nulls first */
  | "ASC_NULLS_FIRST"
  /** in ascending order, nulls last */
  | "ASC_NULLS_LAST"
  /** in descending order, nulls first */
  | "DESC"
  /** in descending order, nulls first */
  | "DESC_NULLS_FIRST"
  /** in descending order, nulls last */
  | "DESC_NULLS_LAST";

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type StringComparisonExp = {
  _eq: InputMaybe<Scalars["String"]>;
  _gt: InputMaybe<Scalars["String"]>;
  _gte: InputMaybe<Scalars["String"]>;
  /** does the column match the given case-insensitive pattern */
  _ilike: InputMaybe<Scalars["String"]>;
  _in: InputMaybe<Array<Scalars["String"]>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex: InputMaybe<Scalars["String"]>;
  _isNull: InputMaybe<Scalars["Boolean"]>;
  /** does the column match the given pattern */
  _like: InputMaybe<Scalars["String"]>;
  _lt: InputMaybe<Scalars["String"]>;
  _lte: InputMaybe<Scalars["String"]>;
  _neq: InputMaybe<Scalars["String"]>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike: InputMaybe<Scalars["String"]>;
  _nin: InputMaybe<Array<Scalars["String"]>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex: InputMaybe<Scalars["String"]>;
  /** does the column NOT match the given pattern */
  _nlike: InputMaybe<Scalars["String"]>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex: InputMaybe<Scalars["String"]>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar: InputMaybe<Scalars["String"]>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex: InputMaybe<Scalars["String"]>;
  /** does the column match the given SQL regular expression */
  _similar: InputMaybe<Scalars["String"]>;
};

/** Boolean expression to compare columns of type "timestamp". All fields are combined with logical 'AND'. */
export type TimestampComparisonExp = {
  _eq: InputMaybe<Scalars["timestamp"]>;
  _gt: InputMaybe<Scalars["timestamp"]>;
  _gte: InputMaybe<Scalars["timestamp"]>;
  _in: InputMaybe<Array<Scalars["timestamp"]>>;
  _isNull: InputMaybe<Scalars["Boolean"]>;
  _lt: InputMaybe<Scalars["timestamp"]>;
  _lte: InputMaybe<Scalars["timestamp"]>;
  _neq: InputMaybe<Scalars["timestamp"]>;
  _nin: InputMaybe<Array<Scalars["timestamp"]>>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type TimestamptzComparisonExp = {
  _eq: InputMaybe<Scalars["timestamptz"]>;
  _gt: InputMaybe<Scalars["timestamptz"]>;
  _gte: InputMaybe<Scalars["timestamptz"]>;
  _in: InputMaybe<Array<Scalars["timestamptz"]>>;
  _isNull: InputMaybe<Scalars["Boolean"]>;
  _lt: InputMaybe<Scalars["timestamptz"]>;
  _lte: InputMaybe<Scalars["timestamptz"]>;
  _neq: InputMaybe<Scalars["timestamptz"]>;
  _nin: InputMaybe<Array<Scalars["timestamptz"]>>;
};

/** Boolean expression to filter rows from the table "user". All fields are combined with a logical 'AND'. */
export type UserBoolExp = {
  _and: InputMaybe<Array<UserBoolExp>>;
  _not: InputMaybe<UserBoolExp>;
  _or: InputMaybe<Array<UserBoolExp>>;
  affiliations: InputMaybe<AffiliationBoolExp>;
  affiliationsAggregate: InputMaybe<AffiliationAggregateBoolExp>;
  creditCardDetails: InputMaybe<HouseholdCreditCardDetailBoolExp>;
  dailyDetails: InputMaybe<HouseholdDailyDetailBoolExp>;
  displayOrder: InputMaybe<IntComparisonExp>;
  email: InputMaybe<StringComparisonExp>;
  id: InputMaybe<StringComparisonExp>;
  name: InputMaybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "user" */
export type UserConstraint =
  /** unique or primary key constraint on columns "email" */
  | "user_email_key"
  /** unique or primary key constraint on columns "id" */
  | "user_pkey";

/** input type for inserting data into table "user" */
export type UserInsertInput = {
  affiliations: InputMaybe<AffiliationArrRelInsertInput>;
  creditCardDetails: InputMaybe<HouseholdCreditCardDetailArrRelInsertInput>;
  dailyDetails: InputMaybe<HouseholdDailyDetailArrRelInsertInput>;
  displayOrder: InputMaybe<Scalars["Int"]>;
  email: InputMaybe<Scalars["String"]>;
  id: InputMaybe<Scalars["String"]>;
  name: InputMaybe<Scalars["String"]>;
};

/** input type for inserting object relation for remote table "user" */
export type UserObjRelInsertInput = {
  data: UserInsertInput;
  /** upsert condition */
  onConflict: InputMaybe<UserOnConflict>;
};

/** on_conflict condition type for table "user" */
export type UserOnConflict = {
  constraint: UserConstraint;
  updateColumns: Array<UserUpdateColumn>;
  where: InputMaybe<UserBoolExp>;
};

/** Ordering options when selecting data from "user". */
export type UserOrderBy = {
  affiliationsAggregate: InputMaybe<AffiliationAggregateOrderBy>;
  creditCardDetailsAggregate: InputMaybe<HouseholdCreditCardDetailAggregateOrderBy>;
  dailyDetailsAggregate: InputMaybe<HouseholdDailyDetailAggregateOrderBy>;
  displayOrder: InputMaybe<OrderBy>;
  email: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  name: InputMaybe<OrderBy>;
};

/** select columns of table "user" */
export type UserSelectColumn =
  /** column name */
  | "displayOrder"
  /** column name */
  | "email"
  /** column name */
  | "id"
  /** column name */
  | "name";

/** Streaming cursor of the table "user" */
export type UserStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: UserStreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type UserStreamCursorValueInput = {
  displayOrder: InputMaybe<Scalars["Int"]>;
  email: InputMaybe<Scalars["String"]>;
  id: InputMaybe<Scalars["String"]>;
  name: InputMaybe<Scalars["String"]>;
};

/** placeholder for update columns of table "user" (current role has no relevant permissions) */
export type UserUpdateColumn =
  /** placeholder (do not use) */
  "_PLACEHOLDER";

export type AffiliationAggregateBoolExpCount = {
  arguments: InputMaybe<Array<AffiliationSelectColumn>>;
  distinct: InputMaybe<Scalars["Boolean"]>;
  filter: InputMaybe<AffiliationBoolExp>;
  predicate: IntComparisonExp;
};

export type DailyDetailByDateArgs = {
  from_date: InputMaybe<Scalars["date"]>;
  group_id: InputMaybe<Scalars["String"]>;
  to_date: InputMaybe<Scalars["date"]>;
};

export type GroupApplicationAggregateBoolExpCount = {
  arguments: InputMaybe<Array<GroupApplicationSelectColumn>>;
  distinct: InputMaybe<Scalars["Boolean"]>;
  filter: InputMaybe<GroupApplicationBoolExp>;
  predicate: IntComparisonExp;
};

export type HouseholdAccountAggregateBoolExpBool_And = {
  arguments: HouseholdAccountSelectColumnHouseholdAccountAggregateBoolExpBool_AndArgumentsColumns;
  distinct: InputMaybe<Scalars["Boolean"]>;
  filter: InputMaybe<HouseholdAccountBoolExp>;
  predicate: BooleanComparisonExp;
};

export type HouseholdAccountAggregateBoolExpBool_Or = {
  arguments: HouseholdAccountSelectColumnHouseholdAccountAggregateBoolExpBool_OrArgumentsColumns;
  distinct: InputMaybe<Scalars["Boolean"]>;
  filter: InputMaybe<HouseholdAccountBoolExp>;
  predicate: BooleanComparisonExp;
};

export type HouseholdAccountAggregateBoolExpCount = {
  arguments: InputMaybe<Array<HouseholdAccountSelectColumn>>;
  distinct: InputMaybe<Scalars["Boolean"]>;
  filter: InputMaybe<HouseholdAccountBoolExp>;
  predicate: IntComparisonExp;
};

export type HouseholdAllDetailViewAggregateBoolExpCount = {
  arguments: InputMaybe<Array<HouseholdAllDetailViewSelectColumn>>;
  distinct: InputMaybe<Scalars["Boolean"]>;
  filter: InputMaybe<HouseholdAllDetailViewBoolExp>;
  predicate: IntComparisonExp;
};

export type HouseholdCreditCardSummaryAggregateBoolExpCount = {
  arguments: InputMaybe<Array<HouseholdCreditCardSummarySelectColumn>>;
  distinct: InputMaybe<Scalars["Boolean"]>;
  filter: InputMaybe<HouseholdCreditCardSummaryBoolExp>;
  predicate: IntComparisonExp;
};

export type HouseholdDepositCategoryAggregateBoolExpCount = {
  arguments: InputMaybe<Array<HouseholdDepositCategorySelectColumn>>;
  distinct: InputMaybe<Scalars["Boolean"]>;
  filter: InputMaybe<HouseholdDepositCategoryBoolExp>;
  predicate: IntComparisonExp;
};

export type HouseholdDetailTagAggregateBoolExpCount = {
  arguments: InputMaybe<Array<HouseholdDetailTagSelectColumn>>;
  distinct: InputMaybe<Scalars["Boolean"]>;
  filter: InputMaybe<HouseholdDetailTagBoolExp>;
  predicate: IntComparisonExp;
};

export type HouseholdFavoriteFilterAggregateBoolExpCount = {
  arguments: InputMaybe<Array<HouseholdFavoriteFilterSelectColumn>>;
  distinct: InputMaybe<Scalars["Boolean"]>;
  filter: InputMaybe<HouseholdFavoriteFilterBoolExp>;
  predicate: IntComparisonExp;
};

export type HouseholdFavoriteFilterArgsAggregateBoolExpCount = {
  arguments: InputMaybe<Array<HouseholdFavoriteFilterArgsSelectColumn>>;
  distinct: InputMaybe<Scalars["Boolean"]>;
  filter: InputMaybe<HouseholdFavoriteFilterArgsBoolExp>;
  predicate: IntComparisonExp;
};

export type HouseholdGenreAggregateBoolExpBool_And = {
  arguments: HouseholdGenreSelectColumnHouseholdGenreAggregateBoolExpBool_AndArgumentsColumns;
  distinct: InputMaybe<Scalars["Boolean"]>;
  filter: InputMaybe<HouseholdGenreBoolExp>;
  predicate: BooleanComparisonExp;
};

export type HouseholdGenreAggregateBoolExpBool_Or = {
  arguments: HouseholdGenreSelectColumnHouseholdGenreAggregateBoolExpBool_OrArgumentsColumns;
  distinct: InputMaybe<Scalars["Boolean"]>;
  filter: InputMaybe<HouseholdGenreBoolExp>;
  predicate: BooleanComparisonExp;
};

export type HouseholdGenreAggregateBoolExpCount = {
  arguments: InputMaybe<Array<HouseholdGenreSelectColumn>>;
  distinct: InputMaybe<Scalars["Boolean"]>;
  filter: InputMaybe<HouseholdGenreBoolExp>;
  predicate: IntComparisonExp;
};

export type HouseholdImportFileHistoryAggregateBoolExpCount = {
  arguments: InputMaybe<Array<HouseholdImportFileHistorySelectColumn>>;
  distinct: InputMaybe<Scalars["Boolean"]>;
  filter: InputMaybe<HouseholdImportFileHistoryBoolExp>;
  predicate: IntComparisonExp;
};

export type HouseholdTransferCategoryAggregateBoolExpCount = {
  arguments: InputMaybe<Array<HouseholdTransferCategorySelectColumn>>;
  distinct: InputMaybe<Scalars["Boolean"]>;
  filter: InputMaybe<HouseholdTransferCategoryBoolExp>;
  predicate: IntComparisonExp;
};

export type GetRecentDetailsQueryVariables = Types.Exact<{
  groupId: Types.Scalars["String"];
  startDate: Types.Scalars["date"];
}>;

export type GetRecentDetailsQuery = {
  __typename?: "query_root";
  householdAllDetailView: Array<{
    __typename?: "HouseholdAllDetailView";
    id: string | null;
    categoryId: string | null;
  }>;
};

export const GetRecentDetailsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetRecentDetails" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "groupId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "startDate" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "date" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "householdAllDetailView" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "where" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "groupId" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "_eq" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "groupId" },
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "date" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "_gte" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "startDate" },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "categoryId" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetRecentDetailsQuery,
  GetRecentDetailsQueryVariables
>;
