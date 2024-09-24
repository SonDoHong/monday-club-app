import { ReactNode } from "react";
import './GlobalStyles.css'

function GlobalStyles({ children }: { children: ReactNode }) {
    return <div>{children}</div>;
}

export default GlobalStyles;
