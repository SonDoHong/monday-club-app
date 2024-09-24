import { Fragment, useState } from "react";

import DetailAchievement from "../../components/DetailAchievement";
import TotalAchievement from "../../components/TotalAchievement";
import "./Admin.css";

const Admin = ({ members, memberStats, updateData }: any) => {
    const [content, setContent] = useState("detail");

    const [password, setPassword] = useState("");

    const [showTableAdmin, setShowTableAdmin] = useState(false);

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

    const handleSignInAdmin = () => {
        if (password === "hongson123") {
            setShowTableAdmin(true);
        } else {
            setShowTableAdmin(false);
            alert("Sai mật khẩu");
        }
    };

    return (
        <div className={"wrapper_admin"}>
            {!showTableAdmin ? (
                <div className="">
                    <h2 className="title_content">Mật khẩu quản lý</h2>

                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />

                    <button onClick={handleSignInAdmin}>Đăng nhập</button>
                </div>
            ) : (
                <Fragment>
                    <h2 className={"title_content"}>Thành tích của các thành viên</h2>

                    <div className={"directional"}>
                        <button
                            className={`${"bn39"} ${content === "detail" ? "active" : ""}`}
                            onClick={() => setContent("detail")}
                        >
                            <span className={"bn39span"}>Chi tiết</span>
                        </button>

                        <button
                            className={`${"bn39"} ${content === "total" ? "active" : ""}`}
                            onClick={() => setContent("total")}
                        >
                            <span className={"bn39span"}>Tổng</span>
                        </button>
                    </div>

                    {content === "total" ? (
                        <TotalAchievement
                            className={"total_table"}
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
                            admin={true}
                        />
                    )}
                </Fragment>
            )}
        </div>
    );
};

export default Admin;
