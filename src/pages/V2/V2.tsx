import { useState } from "react";

import DetailAchievement from "../../components/DetailAchievement";
import TotalAchievement from "../../components/TotalAchievement";
import "./V2.css";

const V2 = ({ members, memberStats, updateData }: any) => {
    const [content, setContent] = useState("total");

    return (
        <div className="v2-wrapper">
            <h2 className="v2-title">Thành tích của các thành viên</h2>

            <div className="v2-directional">
                <button
                    className={content === "total" ? "active" : ""}
                    onClick={() => setContent("total")}
                >
                    Tổng
                </button>
                <button
                    className={content === "detail" ? "active" : ""}
                    onClick={() => setContent("detail")}
                >
                    Chi tiết
                </button>
            </div>

            {content === "total" ? (
                <TotalAchievement members={members} v2s={memberStats} />
            ) : (
                <DetailAchievement
                    members={members}
                    memberStats={memberStats}
                    updateData={updateData}
                />
            )}
        </div>
    );
};

export default V2;
