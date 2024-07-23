import { useState } from "react";

import DetailAchievement from "../../components/DetailAchievement";
import TotalAchievement from "../../components/TotalAchievement";
import styles from "./V2.module.css";

const V2 = ({ members, memberStats, updateData }: any) => {
    
    const [content, setContent] = useState("detail");

    // NGÀY THEO YÊU CẦU
    const requestDate = {
        fullDate: false,
        startDate: "2024-03-01",
        endDate: "2024-06-30",
    };

    const handleRequestDates = (date: string) => {
        if (
            requestDate.fullDate ||
            (new Date(date) >= new Date(requestDate.startDate) &&
                new Date(date) <= new Date(requestDate.endDate))
        ) {
            return date;
        }
        return null;
    };

    const uniqueDates = [
        ...new Set(memberStats.map((stats: any) => handleRequestDates(stats.date))),
    ]
        .filter((date) => date !== null)
        .sort();
    // END NGÀY THEO YÊU CẦU

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
                <TotalAchievement
                    members={members}
                    memberStats={memberStats}
                    uniqueDates={uniqueDates}
                />
            ) : (
                <DetailAchievement
                    members={members}
                    memberStats={memberStats}
                    updateData={updateData}
                    uniqueDates={uniqueDates}
                />
            )}
        </div>
    );
};

export default V2;
