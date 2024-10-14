import config from "../config";
import Admin from "../pages/Admin";
import Home from "../pages/Home";
// import Q1 from "../pages/Q1";
// import Q2 from "../pages/Q2";
// import Q3 from "../pages/Q3";
// import Q4 from "../pages/Q4";
import Q1 from "../pages/Q1";
import Q2 from "../pages/Q2";
import Q3 from "../pages/Q3";
import Q4 from "../pages/Q4"

const publicRoute = [
    { path: config.routes.home, element: Home },
    { path: config.routes.admin, element: Admin },
    { path: config.routes.Q1, element: Q1 },
    { path: config.routes.Q2, element: Q2 },
    { path: config.routes.Q3, element: Q3 },
    { path: config.routes.Q4, element: Q4 },
]

export { publicRoute }