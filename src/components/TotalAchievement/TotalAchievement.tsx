import React, { useEffect, useState } from "react";

function TotalAchievement({ members, memberStats, uniqueDates }: any) {
    const [sumOfMembers, setSumOfmember] = useState([]);

    useEffect(() => {
        // Tính tổng ghiban và kientao cho từng memberId
        const stats = members.map((member: { id: string; name: string }) => {
            const memberAchievements = memberStats.filter((memberStat: any) => {
                return memberStat.memberId === member.id;
            });

            const result = memberAchievements.filter((memberAchievement: any) =>
                uniqueDates.includes(memberAchievement.date)
            );

            const totalScored = result.reduce((sum: any, ach: any) => sum + ach.scored, 0);
            const totalAssist = result.reduce((sum: any, ach: any) => sum + ach.assist, 0);

            return {
                id: member.id,
                name: member.name,
                totalScored,
                totalAssist,
            };
        });

        setSumOfmember(stats);
    }, [memberStats]);

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
                    {sumOfMembers.map((member: any) => {
                        return (
                            <React.Fragment key={member.id}>
                                <tr>
                                    <td>{member.name}</td>
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
