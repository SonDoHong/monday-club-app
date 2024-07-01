// import { useState } from 'react';
// import db from './firebase'
// import { DocumentData, QueryDocumentSnapshot, collection, getDocs } from "firebase/firestore";

interface Member {
    assist: number,
    createdAt: Date,
    jerseyNumber: number,
    multiplier: string,
    name: string,
    scored: number
    id: string,
    test?: string
}


// const [members, setMember] = useState<Member[]>([])
// const fetchAPI = async () => {
//     const members1: Member[] = []
//     const querySnapshot = await getDocs(collection(db, "members"));
    
//     querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
//         // console.log(doc.data());
//         // members1.push({ ...doc.data(), id: doc.id });

//     });

//     setMember(querySnapshot)
// }

// fetchAPI()

export type { Member }

// đang All Failed