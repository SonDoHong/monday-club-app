import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import db from "../firebase/firebase";
import { Member } from "../firebase/getMembers";
import { publicRoute } from "./routes";
import DefaultLayout from "./components/Layout/DefaultLayout";

function App() {
    const [members, setMember] = useState<Member[]>([]);

    const [v2s, setV2s] = useState([]);

    const updateData = () => {
        fetchMembers();

        fetchV2();
    };

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

        let v2s: any = [];
        querySnapshot.forEach((doc) => {
            // console.log(doc.data());
            const data = doc.data();

            v2s = [
                ...v2s,
                {
                    id: doc.id,
                    memberId: data.memberId,
                    assist: data.assist,
                    scored: data.scored,
                    date: data.date,
                },
            ];
        });
        setV2s(v2s);
    };

    useEffect(() => {
        updateData();
    }, []);

    return (
        <div>
            {/* <V2 members={members} updateData={updateData} memberStats={v2s}/> */}
            <Router>
                <Routes>
                    {publicRoute.map((route, index) => {
                        let Layout = DefaultLayout;

                        let Page = route.element;

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page
                                            members={members}
                                            updateData={updateData}
                                            memberStats={v2s}
                                        />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </Router>
        </div>
    );
}

export default App;
