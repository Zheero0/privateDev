// utils/conversation.js
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";

export async function getOrCreateConversation(userId1, userId2) {
  const convosRef = collection(db, "conversations");

  // Query for any conversation that contains userId1.
  // Then, among those, check if userId2 is also a participant.
  const q = query(convosRef, where("participants", "array-contains", userId1));
  const querySnapshot = await getDocs(q);
  let conversation = null;

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (data.participants.includes(userId2)) {
      conversation = { id: doc.id, ...data };
    }
  });

  // If no conversation exists, create a new one.
  if (!conversation) {
    const docRef = await addDoc(convosRef, {
      participants: [userId1, userId2],
      createdAt: serverTimestamp(),
      lastMessage: "",
      lastMessageTimestamp: serverTimestamp(),
      // Optional: other metadata fields like topic, otherUserName, etc.
    });
    conversation = { id: docRef.id };
  }

  return conversation;
}
