import { Link, NavLink } from "react-router-dom";
import config from "../../../../config";
import "./Header.css";

function Header() {
    return (
        <div className={'wrapper_header'}>
            <div className={'nav_list'}>
                <Link className={`${'nav_item'} ${'nav_title'}`} to={config.routes.home}>
                    MONDAY FC
                </Link>
                
                <NavLink
                    className={({ isActive }) => (isActive ? 'active' : 'nav_item')}
                    to={config.routes.v1}
                >
                    v1
                </NavLink>

                <NavLink
                    className={({ isActive }) => (isActive ? 'active' : 'nav_item')}
                    to={config.routes.v2}
                >
                    v2
                </NavLink>

                <NavLink
                    className={({ isActive }) => (isActive ? 'active' : 'nav_item')}
                    to={config.routes.v3}
                >
                    v3
                </NavLink>

                {false && <NavLink
                    style={{display: 'none'}}
                    className={({ isActive }) => (isActive ? 'active' : 'nav_item')}
                    to={config.routes.admin}
                >
                    Admin
                </NavLink>}
            </div>
        </div>
    );
}

export default Header;