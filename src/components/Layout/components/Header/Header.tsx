import { Link, NavLink } from "react-router-dom";
import config from "../../../../config";
import styles from "./Header.module.css";

function Header() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.nav_list}>
                <Link className={`${styles.nav_item} ${styles.nav_title}`} to={config.routes.home}>
                    MONDAY FC
                </Link>
                
                <NavLink
                    className={({ isActive }) => (isActive ? styles.active : styles.nav_item)}
                    to={config.routes.v1}
                >
                    v1
                </NavLink>

                <NavLink
                    className={({ isActive }) => (isActive ? styles.active : styles.nav_item)}
                    to={config.routes.v2}
                >
                    v2
                </NavLink>

                <NavLink
                    className={({ isActive }) => (isActive ? styles.active : styles.nav_item)}
                    to={config.routes.v3}
                >
                    v3
                </NavLink>
            </div>
        </div>
    );
}

export default Header;