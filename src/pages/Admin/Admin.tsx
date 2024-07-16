import { useState } from "react";

import DetailAchievement from "../../components/DetailAchievement";
import TotalAchievement from "../../components/TotalAchievement";
import styles from "./Admin.module.css";

const Admin = ({ members, memberStats, updateData }: any) => {
    const requestDate = {
        startDate: "2024-03-01",
        endDate: "2024-06-30",
        fullDate: true,
    };

    const [content, setContent] = useState("detail");

    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title_content}>Thành tích của các thành viên</h2>

            <div className={styles.directional}>
                <button
                    className={`${styles.bn39} ${content === "detail" ? styles.active : ""}`}
                    onClick={() => setContent("detail")}
                >
                    <span className={styles.bn39span}>Chi tiết</span>
                </button>

                <button
                    className={`${styles.bn39} ${content === "total" ? styles.active : ""}`}
                    onClick={() => setContent("total")}
                >
                    <span className={styles.bn39span}>Tổng</span>
                </button>
            </div>

            {content === "total" ? (
                <TotalAchievement members={members} v2s={memberStats} />
            ) : (
                <DetailAchievement
                    members={members}
                    memberStats={memberStats}
                    updateData={updateData}
                    requestDate={requestDate}
                    admin={true}
                />
            )}
        </div>
    );
};

export default Admin;
