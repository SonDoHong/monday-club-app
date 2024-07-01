import { useEffect, useState } from "react";
import "./App.css";

import db from "../firebase/firebase";
import { Member } from "../firebase/getMembers";
import { collection, getDocs } from "firebase/firestore";
import V2 from "./pages/V2";

function App() {
    const [members, setMember] = useState<Member[]>([]);

    const [v2s, setV2s] = useState([]);

    const updateData = () => {
        fetchMembers()

        fetchV2()
    }

    const fetchMembers = async () => {
        const members1: Member[] = [];
        const querySnapshot = await getDocs(collection(db, "members"));

        querySnapshot.forEach((doc) => {
            // console.log(doc.data());
            const data = doc.data();

            const member = {
                ...data,
                id: doc.id,
                name: data.name,
                assist: data.assist,
                createdAt: data.createdAt,
                jerseyNumber: data.jerseyNumber,
                multiplier: data.multiplier,
                scored: data.scored,
            };

            members1.push(member);
        });

        setMember(members1);
    };

    const fetchV2 = async () => {
        const querySnapshot = await getDocs(collection(db, "v2"));
        
        let v2s: any = []
        querySnapshot.forEach((doc) => {
            // console.log(doc.data());
            const data = doc.data();

            v2s = [...v2s, {
                id: doc.id,
                memberId: data.memberId,
                assist: data.assist,
                scored: data.scored,
                date: data.date
            }];

            });
        setV2s(v2s)
    }

    useEffect(() => {
        updateData()
    }, []);

    return (
        <div>
            <V2 members={members} updateData={updateData} memberStats={v2s}/>
        </div>
    );
}

export default App;
