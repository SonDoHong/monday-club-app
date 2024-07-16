import { ReactNode } from "react";
import './GlobalStyles.module.css'

function GlobalStyles({ children }: { children: ReactNode }) {
    return <div>{children}</div>;
}

export default GlobalStyles;
