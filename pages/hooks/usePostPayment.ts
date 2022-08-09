import useSWR from "swr";

// @ts-ignore:next-line
const fetcher = (...args) => fetch(...args).then((res) => res.json());
// @ts-ignore

export default function usePostPayment(page: number) {
  const { data, error } = useSWR(`/api/addpayment/`, fetcher(method: 'post'));
  return {
    isLoading: !error && !data,
    isError: error,
  };
}
