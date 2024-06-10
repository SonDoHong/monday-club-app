import { useEffect, useState } from "react";
import "./App.css";

import db from '../firebase/firebase'
import { Member } from '../firebase/getMembers'
import { collection, getDocs } from "firebase/firestore";

function App() {

    const [members, setMember] = useState<Member[]>([]);
    const fetchAPI = async () => {
        const members1: Member[] = [];
        const querySnapshot = await getDocs(collection(db, "members"));

        querySnapshot.forEach((doc) => {
            // console.log(doc.data());
            const data = doc.data()

            const member = {
                ...data,
                id: doc.id,
                name: data.name,
                assist: data.assist,
                createdAt: data.createdAt,
                jerseyNumber: data.jerseyNumber,
                multiplier: data.multiplier,
                scored: data.scored
            }

            members1.push(member)
        });

        setMember(members1);
    };

    useEffect(() => {
        fetchAPI();

    }, [])


    console.log(members)

    return (
        <div>
            <h2>Thành tích của các thành viên</h2>

            <div>
                {members.map(member => {
                    return <div key={member.id}>
                        <p>Name: {member.name}</p>
                    </div>
                })}
            </div>
        </div>
    );
}

export default App;
