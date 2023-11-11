export interface IRoute {
  path: string;
  name: string;
  onModal?: boolean;
  onModalAndNavbar?: boolean;
  outMenu?: boolean;
  soon?: boolean;
  forAdmins?: boolean;
  isNew?: boolean;
  color?: string;
}
export const routeNames = {
  home: "/",
  dashboard: "/dashboard",
  swap: "/swap",
  farms: "/farms",
  Pools: "/pools",
  hub: "/hub",
  dca: "/dca",
  rewards: "/qrewards",
  heroes: "/qheroes",
  admin: "/admin-panel",
  panel: "/panel",
  hypezone: "/hypezone",
  converter: "/raretopia",
  moondustx: "/moondustx",
  qtags: "/qtags",
  marketplace: "/marketplace",
};

export const routes: {
  dashboard: IRoute;
  swap: IRoute;
  farms: IRoute;
  pools: IRoute;
  hub: IRoute;
  // dca: IRoute;
  rewards: IRoute;
  // heroes: IRoute;
  admin: IRoute;
  panel: IRoute;
  hypezone: IRoute;
  // converter: IRoute;
  moondustx: IRoute;
  // marketplace: IRoute;
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
    // onModalAndNavbar: true,
  },
  hypezone: {
    path: routeNames.hypezone,
    name: "Hypezone",
    onModalAndNavbar: true,
  },
  hub: {
    path: routeNames.hub,
    name: "Hub",
    onModalAndNavbar: true,
  },
  // dca: {
  //   path: routeNames.dca,
  //   name: "Dollar Cost Averaging",
  //   onModal: true,
  // },
  rewards: {
    path: routeNames.rewards,
    name: "QuantumX Rewards",
    onModal: true,
  },
  // converter: {
  //   path: routeNames.converter,
  //   name: "Raretopia",
  //   onModalAndNavbar: true,
  // },
  moondustx: {
    path: routeNames.moondustx,
    name: "MoonDustX",
    onModal: true,
  },
  // marketplace: {
  //   path: routeNames.marketplace,
  //   name: "QXTags Marketplace",
  //   onModal: true,
  //   isNew: true,
  // },
  // heroes: {
  //   path: routeNames.heroes,
  //   name: "QuantumX Heroes",
  //   onModal: true,
  // },
  panel: {
    path: routeNames.panel,
    name: "Quantum Panel",
    onModal: true,
    color: "warning",
  },
  admin: {
    path: routeNames.admin,
    name: "Admin Panel",
    onModal: true,
    forAdmins: true,
    color: "danger",
  }
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
