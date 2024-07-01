import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import React, { useState } from "react";
import db from "../../../firebase/firebase";
import './DetailAchievement.css'

function DetailAchievement({ members, memberStats, updateData}: any) {
    const [memberData, setMemberData] = useState({ memberId: "", scored: 0, assist: 0, date: "" });

    const [selectedMember, setSelectedMember] = useState({ memberId: "", name: "" });

    const uniqueDates = [...new Set(memberStats.map((stats: any) => stats.date))].sort();

    const [sortedStats, setSortedStats] = useState([]);

    const [showAddMemberData, setShowAddMemberData] = useState(null);


    // Hàm để định dạng ngày tháng, bỏ năm
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { day: "2-digit", month: "2-digit" };
        return new Date(dateString).toLocaleDateString("vi-VN", options);
    };

    const handleChangeFormAddMemberData = (e: any) => {
        const { name, value } = e.target;

        setMemberData({
            ...memberData,
            [name]: name === 'scored' || name === 'assist' ? parseInt(value, 10) : value,
        });
    };

    const testDetail = (memberId: string, name: string) => {
        setSelectedMember({ memberId, name });

        const filteredStats = memberStats
            .filter((stats: { memberId: string }) => stats.memberId === memberId)
            .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

            console.log(filteredStats)

        setSortedStats(filteredStats);
    };

    const memberStatsByDate = memberStats.reduce((acc: any, stats: any) => {
        if (!acc[stats.memberId]) acc[stats.memberId] = {};
        acc[stats.memberId][stats.date] = stats;
        return acc;
    }, {});

    const handleAddMemberData = async (e: any, memberId: string) => {
        e.preventDefault();

        try {
            // Kiểm tra xem có dữ liệu cũ cùng ngày không
            const q = query(
                collection(db, "v2"),
                where("memberId", "==", memberId),
                where("date", "==", memberData.date)
            );
            const querySnapshot = await getDocs(q);

            // Xóa dữ liệu cũ nếu có
            querySnapshot.forEach(async (docSnapshot) => {
                await deleteDoc(doc(db, "v2", docSnapshot.id));
            });

            // Thêm dữ liệu mới
            const docRef = await addDoc(collection(db, "v2"), {
                ...memberData,
                memberId,
            });
            console.log("Document written with ID: ", docRef.id);
            postMessage("Dữ liệu đã được cập nhật thành công");
        } catch (e) {
            console.error("Error updating document: ", e);
            postMessage("Lỗi khi cập nhật dữ liệu");
        }

        setShowAddMemberData(null);

        updateData();

        setMemberData({ ...memberData ,memberId: "", scored: 0, assist: 0})
    };

    const deleteMemberData = async (id: string) => {
        try {
            await deleteDoc(doc(db, "v2", id));
            updateData(); // Cập nhật dữ liệu sau khi xóa thành công

            // Lọc lại dữ liệu và cập nhật trạng thái sortedStats
            const updatedStats = memberStats.filter((stats: any) => stats.id !== id);
            const filteredStats = updatedStats
                .filter((stats: { memberId: string }) => stats.memberId === selectedMember.memberId)
                .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

            setSortedStats(filteredStats);
        } catch (error) {
            console.error("Error removing document: ", error);
        }
    };

    return (
        <div className="detail_wrapper">
            <table className="detail_table" border={1}>
                <thead>
                    <tr>
                        <th>Thành viên</th>
                        {uniqueDates.map((date: any) => {
                            // console.log(date)
                            if (!date) return;
                            return <th key={date}>{formatDate(date)}</th>;
                        })}
                        <th>
                            Edit
                            <input
                                name="date"
                                type="date"
                                onChange={handleChangeFormAddMemberData}
                            />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((member: any) => (
                        <React.Fragment key={member.id}>
                            <tr>
                                <td>
                                    <button
                                        type="button"
                                        style={{ width: "100%" }}
                                        onClick={() => testDetail(member.id, member.name)}
                                    >
                                        {member.name}
                                    </button>
                                </td>
                                {uniqueDates.map((date: any) => {
                                    if (!date) return;
                                    const stats =
                                        memberStatsByDate[member.id] &&
                                        memberStatsByDate[member.id][date];

                                    return (
                                        <td key={date}>
                                            {stats ? (
                                                <div>
                                                    <div>Ghi bàn: {stats.scored}</div>
                                                    <div>Kiến tạo: {stats.assist}</div>
                                                </div>
                                            ) : (
                                                "Tịt Ngòi"
                                            )}
                                        </td>
                                    );
                                })}

                                <td>
                                    <button onClick={() => setShowAddMemberData(member.id)}>
                                        Thêm / Chỉnh sửa
                                    </button>
                                </td>
                            </tr>
                            {showAddMemberData === member.id && (
                                <tr>
                                    <td colSpan={uniqueDates.length + 2}>
                                        <form onSubmit={(e) => handleAddMemberData(e, member.id)}>
                                            <label>{member.name}</label>
                                            <input
                                                name="scored"
                                                type="number"
                                                value={memberData.scored}
                                                onChange={handleChangeFormAddMemberData}
                                            />
                                            <input
                                                name="assist"
                                                type="number"
                                                value={memberData.assist}
                                                onChange={handleChangeFormAddMemberData}
                                            />
                                            <input
                                                name="date"
                                                type="date"
                                                value={memberData.date}
                                                onChange={handleChangeFormAddMemberData}
                                            />

                                            <button
                                                type="button"
                                                onClick={() => setShowAddMemberData(null)}
                                            >
                                                Hủy
                                            </button>
                                            <button type="submit">Cập nhật</button>
                                        </form>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>

            {selectedMember.memberId && (
                <div>
                    <button onClick={() => setSelectedMember({ ...selectedMember, memberId: "" })}>
                        X
                    </button>
                    <table border={1}>
                        <thead>
                            <tr>
                                <th>Thành viên</th>
                                <th>Ngày</th>
                                <th>Ghi bàn</th>
                                <th>Kiến tạo</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedStats.length > 0 ? (
                                sortedStats.map((stats: any, index) => (
                                    <tr key={index}>
                                        {index === 0 && (
                                            <td rowSpan={sortedStats.length}>
                                                {selectedMember.name}
                                            </td>
                                        )}
                                        <td>{formatDate(stats.date)}</td>
                                        <td>{stats.scored}</td>
                                        <td>{parseInt(stats.assist)}</td>
                                        <td>
                                            <button onClick={() => deleteMemberData(stats.id)}>
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td>{selectedMember.name}</td>
                                    <td colSpan={4}>Chưa có thành tích nào</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default DetailAchievement;
