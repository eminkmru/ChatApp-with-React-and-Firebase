import React, { useContext, useState } from "react";
import { db } from "../firebase";
import {
  Timestamp,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";

function Search() {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      console.log(error);
      setErr(true);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSelect = async () => {
    const combineId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combineId));

      if (!res.exists()) {
        // create a chat in chats collection
        await setDoc(doc(db, "chats", combineId), { messages: [] });

        // create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combineId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combineId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", user.uid), {
          [combineId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combineId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      console.log(error);
    }

    setUserName("");
    setUser(null);
  };
  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Search a user "
          onChange={(e) => setUserName(e.target.value)}
          onKeyDown={(e) => {
            handleKey(e);
          }}
          value={userName}
        />
      </div>
      {err && <span>User not found</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img
            src={
              user?.photoURL ? user.photoURL : "https://i.imgur.com/6VBx3io.png"
            }
            alt=""
          />
          <div className="userChatInfo">
            <span>{user?.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
