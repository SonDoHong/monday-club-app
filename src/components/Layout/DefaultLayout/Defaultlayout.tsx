import { ReactNode } from "react";
import Header from "../components/Header";

interface Props {
    children: ReactNode;
}

function Defaultlayout ({ children }: Props): JSX.Element {
    return (
        <div>
            <div>
                <Header />
            </div>

            <div>{children}</div>
        </div>
    );
}

export default Defaultlayout;
