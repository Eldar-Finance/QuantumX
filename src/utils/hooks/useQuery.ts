import { useRouter } from "next/router";

class QueryParameter {
  constructor(routerQuery: any) {
    //@ts-ignore
    this.routerQuery = routerQuery;
  }

  get(parameter) {
    //@ts-ignore
    return this.routerQuery[parameter];
  }
}
const useQuery = () => {
  const router = useRouter();
  const query = new QueryParameter(router.query);
  return query;
};

export default useQuery;
