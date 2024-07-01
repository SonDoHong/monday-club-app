import React, { useEffect, useState } from "react";

function TotalAchievement({ members, v2s }: any) {
    const [memberStarts, setMemberStats] = useState([]);

    useEffect(() => {
        // Tính tổng ghiban và kiento cho từng memberId
        const stats = members.map((member: { id: any }) => {
            const memberAchievements = v2s.filter((v2: any) => v2.memberId === member.id);
            console.log(memberAchievements);
            const totalScored = memberAchievements.reduce(
                (sum: any, ach: any) => sum + ach.scored,
                0
            );
            const totalAssist = memberAchievements.reduce(
                (sum: any, ach: any) => sum + ach.assist,
                0
            );

            return {
                ...member,
                totalScored,
                totalAssist,
            };
        });

        setMemberStats(stats);
    }, [members, v2s]);

    return (
        <div>
            <table className="detail_table" border={1}>
                <thead>
                    <tr>
                        <th>Thành viên</th>
                        <th>Ghi bàn</th>
                        <th>Kiến tạo</th>
                    </tr>
                </thead>
                <tbody>
                    {memberStarts.map((member: any) => {
                        return (
                            <React.Fragment key={member.id}>
                                <tr>
                                    <td>
                                        <button type="button" style={{ width: "100%" }}>
                                            {member.name}
                                        </button>
                                    </td>
                                    <td>{member.totalScored}</td>
                                    <td>{member.totalAssist}</td>
                                </tr>
                            </React.Fragment>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default TotalAchievement;
