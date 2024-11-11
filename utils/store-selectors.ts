import type { StoreApi, UseBoundStore } from 'zustand';

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

export const createSelectors = <
  S extends UseBoundStore<StoreApi<Record<string, unknown>>>
>(
  internalStore: S
) => {
  const store = internalStore as WithSelectors<typeof internalStore>;
  store.use = {};

  const keys = Object.keys(store.getState());
  keys.forEach((key) => {
    store.use[key] = () => store((s) => s[key]);
  });

  return store;
};
