import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/config';

const useFetchCollection = (collectionName) => {
    const [data, setData] = useState([]);

    const getCollection = () => {
        try{
          const docRef = collection(db, collectionName);
          const q = query(docRef, orderBy("createdAt"));
    
          onSnapshot(q, (snapshot) => {
            const allData = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            
            setData(allData);
          });
        } catch (error) {
            console.log(error.message);
        };
    };

    useEffect(() => {
        getCollection()
    }, []);

    return {
        data
    }
}

export default useFetchCollection;