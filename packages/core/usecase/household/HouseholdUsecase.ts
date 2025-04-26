export type HouseholdUsecase<I, O> = {
  handle: (input: I) => Promise<O>;
};
