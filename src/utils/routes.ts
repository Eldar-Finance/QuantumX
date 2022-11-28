export interface IRoute {
  path: string;
  name: string;
  onModal?: boolean;
  onModalAndNavbar?: boolean;
  outMenu?: boolean;
}
export const routeNames = {
  home: "/",
  dashboard: "/dashboad",
  swap: "/jexpress-swap",
  farms: "/farms",
  Pools: "/proteo-elite",
  dca: "/dca",
  eLBadges: "/eLBadges",
  investors: "/investor-zone",
  admin: "/admin-panel",
};

export const routes: {
  dashboard: IRoute;
  swap: IRoute;
  farms: IRoute;
  pools: IRoute;
  dca: IRoute;
  eLBadges: IRoute;
  investors: IRoute;
  admin: IRoute;
} = {
  dashboard: {
    path: routeNames.dashboard,
    name: "Dashboard",
  },
  swap: {
    path: routeNames.swap,
    name: "Swap",
  },
  farms: {
    path: routeNames.farms,
    name: "Farms",
  },
  pools: {
    path: routeNames.Pools,
    name: "Pools",
    onModalAndNavbar: true,
  },
  dca: {
    path: routeNames.dca,
    name: "Dollar Cost Averaging",
    onModalAndNavbar: true,
  },
  eLBadges: {
    path: routeNames.eLBadges,
    name: "SFT Staking",
    onModal: true,
  },
  investors: {
    path: routeNames.investors,
    name: "Investors",
    onModal: true,
  },
  admin: {
    path: routeNames.admin,
    name: "Admin Panel",
    onModal: true,
  },
};

const getRoutesArr = () => {
  const arr: IRoute[] = [];
  for (const key in routes) {
    arr.push(routes[key]);
  }
  return arr;
};

export const routesArr: IRoute[] = getRoutesArr();

export const getWebUrl = (path = "") => {
  return `${window.location.origin + path}`;
};

export const getActiveRoute = (newRoutes) => {
  const routes = newRoutes.slice(1);
  routes.push(newRoutes[0]);
  const activeRoute = "Default Brand Text";
  for (let i = 0; i < routes.length; i++) {
    if (routes[i].collapse) {
      const collapseActiveRoute = getActiveRoute(routes[i].items);
      if (collapseActiveRoute !== activeRoute) {
        return collapseActiveRoute;
      }
    } else if (routes[i].category) {
      const categoryActiveRoute = getActiveRoute(routes[i].items);
      if (categoryActiveRoute !== activeRoute) {
        return categoryActiveRoute;
      }
    } else {
      if (
        window.location.href.substring(0, getWebUrl(routes[i].path).length) ===
        getWebUrl(routes[i].path)
      ) {
        return routes[i].name;
      }
    }
  }
  return activeRoute;
};

export const isActiveRoute = (routeName: string, location: string) => {
  if (routeName === "/") {
    return location === routeName;
  }
  return location.includes(routeName);
};
