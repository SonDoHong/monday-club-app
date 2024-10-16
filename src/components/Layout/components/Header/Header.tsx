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
                    to={config.routes.Q1}
                >
                    Q1
                </NavLink>

                <NavLink
                    className={({ isActive }) => (isActive ? 'active' : 'nav_item')}
                    to={config.routes.Q2}
                >
                    Q2
                </NavLink>

                <NavLink
                    className={({ isActive }) => (isActive ? 'active' : 'nav_item')}
                    to={config.routes.Q3}
                >
                    Q3
                </NavLink>

                <NavLink
                    className={({ isActive }) => (isActive ? 'active' : 'nav_item')}
                    to={config.routes.Q4}
                >
                    Q4
                </NavLink>

                <NavLink
                    // style={{display: 'none'}}
                    className={({ isActive }) => (isActive ? 'active' : 'nav_item') + ' ' + 'link_admin_btn'}
                    to={config.routes.admin}
                >
                    Admin
                </NavLink>
            </div>
        </div>
    );
}

export default Header;