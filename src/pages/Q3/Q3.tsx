import { useState } from "react";

import DetailAchievement from "../../components/DetailAchievement";
import TotalAchievement from "../../components/TotalAchievement";
import "./Q3.css";

const Q3 = ({ members, memberStats, updateData }: any) => {
    
    const [content, setContent] = useState("total");

    // NGÀY THEO YÊU CẦU
    const requestDate = {
        fullDate: false,
        startDate: "2024-07-01",
        endDate: "2024-09-30",
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
        <div className={'wrapper_Q3'}>
            <h2 className={'title_content'}>Thành tích của các thành viên</h2>

            <div className={'directional'}>
                <button
                    className={`${'bn39'} ${content === "total" ? 'active' : ""}`}
                    onClick={() => setContent("total")}
                >
                    <span className={'bn39span'}>Tổng</span>
                </button>

                <button
                    className={`${'bn39'} ${content === "detail" ? 'active' : ""}`}
                    onClick={() => setContent("detail")}
                >
                    <span className={'bn39span'}>Chi tiết</span>
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

export default Q3;
