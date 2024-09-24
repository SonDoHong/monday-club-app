import { useState } from "react";

import DetailAchievement from "../../components/DetailAchievement";
import TotalAchievement from "../../components/TotalAchievement";
import "./Admin.css";

const Admin = ({ members, memberStats, updateData }: any) => {
    const [content, setContent] = useState("detail");

    // NGÀY THEO YÊU CẦU
    const requestDate = {
        startDate: "2024-03-01",
        endDate: "2024-06-30",
        fullDate: true,
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
        <div className={'wrapper_app'}>
            <h2 className={'title_content'}>Thành tích của các thành viên</h2>

            <div className={'directional'}>
                <button
                    className={`${'bn39'} ${content === "detail" ? 'active' : ""}`}
                    onClick={() => setContent("detail")}
                >
                    <span className={'bn39span'}>Chi tiết</span>
                </button>

                <button
                    className={`${'bn39'} ${content === "total" ? 'active' : ""}`}
                    onClick={() => setContent("total")}
                >
                    <span className={'bn39span'}>Tổng</span>
                </button>
            </div>

            {content === "total" ? (
                <TotalAchievement className={'total_table'} members={members} memberStats={memberStats} uniqueDates={uniqueDates} />
            ) : (
                <DetailAchievement
                    members={members}
                    memberStats={memberStats}
                    updateData={updateData}
                    uniqueDates={uniqueDates}
                    admin={true}
                />
            )}
        </div>
    );
};

export default Admin;
