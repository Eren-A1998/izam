import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2, // Retry failed queries up to 2 times
      refetchOnWindowFocus: false, // Disable refetching on window focus
      refetchOnMount: true,
      refetchOnReconnect: true,
      staleTime: 5 * 60 * 1000, // 5 minutes stale time
      // onSuccess(data) {
      //   console.log("success query", { data });
      // },
      // onError(error) {
      //   console.error("failed query", error);
      // },
    },
    mutations: {
      retry: 1, // Retry failed mutations once
      onSuccess(data, variables, context) {
        console.log({ data, variables, context });
      },
      onError(error, variables, context) {
        console.log({ error, variables, context });
      },
    },
  },
});
