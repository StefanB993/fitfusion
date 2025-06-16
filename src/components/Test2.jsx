import { useQuery } from "@tanstack/react-query";

function Test2() {
  const { data, isPending } = useQuery({
    queryKey: ["countries"],
    queryFn: () =>
      fetch("https://restcountries.com/v3.1/all").then((res) => res.json()),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  console.log(data);

  return <div></div>;
}

export default Test2;
