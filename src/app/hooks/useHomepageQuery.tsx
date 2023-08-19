import { create } from "zustand";
import qs from "query-string";

type QueryParamsTypes = {
  query: string;
  setQuery: (oldQuery: any, newQuery: any) => void;
};

const useHomepageQuery = create<QueryParamsTypes>((set) => ({
  query: "/api/post",
  setQuery: (oldQuery, newQuery) => {
    let currentQuery = {};

    if (oldQuery.split("?").length > 0) {
      currentQuery = qs.parse(oldQuery.split("?")[1]);
    }

    const updatedQuery = {
      ...currentQuery,
      ...newQuery,
    };
    const url = qs.stringifyUrl(
      {
        url: "/api/post",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    set({ query: url });
  },
}));

export default useHomepageQuery;
