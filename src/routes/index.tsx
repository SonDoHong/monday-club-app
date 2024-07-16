import config from "../config";
import Admin from "../pages/Admin";
import Home from "../pages/Home";
import V1 from "../pages/V1";
import V2 from "../pages/V2";
import V3 from "../pages/V3";

const publicRoute = [
    { path: config.routes.home, element: Home },
    { path: config.routes.admin, element: Admin },
    { path: config.routes.v1, element: V1 },
    { path: config.routes.v2, element: V2 },
    { path: config.routes.v3, element: V3 },
]

export { publicRoute }