"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext/auth";
import { db } from "@/firebase/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

export default function TestChatPage() {
  const { currentUser } = useAuth();
  const conversationId = "test-chat"; // Hard-coded conversation id for testing
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Listen to messages in the "test-chat" conversation
  useEffect(() => {
    if (!conversationId) return;
    const messagesRef = collection(
      db,
      "conversations",
      conversationId,
      "messages"
    );
    const q = query(messagesRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [conversationId]);

  // Handle sending a message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const messagesRef = collection(
      db,
      "conversations",
      conversationId,
      "messages"
    );
    try {
      await addDoc(messagesRef, {
        text: newMessage,
        senderId: currentUser.uid,
        timestamp: serverTimestamp(),
      });
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

return (
  <div className="flex flex-col h-full p-4  w-screen">
    {/* Chat messages */}
    <div className="flex-1  ">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`p-2 rounded max-w-xs break-words ${
            msg.senderId === currentUser.uid
              ? "self-end bg-blue-200 text-right"
              : "self-start bg-gray-200 text-left"
          }`}
        >
          {msg.text}
        </div>
      ))}
    </div>

    {/* Message input */}
    <form onSubmit={handleSendMessage} className="mt-4 flex mb-20">
      <input
        type="text"
        className="flex-1 p-2 border rounded-l"
        placeholder="Type a message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-r">
        Send
      </button>
    </form>
  </div>
);
}

// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { useAuth } from "@/context/authContext/auth";
// import { db } from "@/firebase/firebase"; // Ensure you have initialized Firebase and exported your Firestore instance.
// import {
//   collection,
//   query,
//   orderBy,
//   onSnapshot,
//   addDoc,
//   serverTimestamp,
// } from "firebase/firestore";

// // Import shadcn/ui components (adjust the paths as needed)
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// export default function ChatPage() {
//   const { currentUser } = useAuth();
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const messagesEndRef = useRef(null);

//   // Subscribe to messages from Firestore
//   useEffect(() => {
//     const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
//     });
//     return () => unsubscribe();
//   }, []);

//   // Scroll to the latest message when messages change
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     await addDoc(collection(db, "messages"), {
//       text: input,
//       uid: currentUser.uid,
//       displayName: currentUser.displayName,
//       photoURL: currentUser.photoURL,
//       createdAt: serverTimestamp(),
//     });

//     setInput("");
//   };

//   return (
//     <div className="flex flex-col h-screen min-w-[20rem] ">
//       {/* Message List */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         {messages.map((msg) => {
//           // Align messages based on whether they were sent by the current user.
//           const isOwnMessage = msg.uid === currentUser.uid;
//           return (
//             <div
//               key={msg.id}
//               className={`flex items-start ${
//                 isOwnMessage ? "justify-end" : "justify-start"
//               }`}
//             >
//               {!isOwnMessage && (
//                 <Avatar className="mr-2 h-8 w-8">
//                   <AvatarImage src={msg.photoURL} alt={msg.displayName} />
//                   <AvatarFallback>{msg.displayName?.[0] || "U"}</AvatarFallback>
//                 </Avatar>
//               )}
//               <div
//                 className={`max-w-xs p-2 rounded-md ${
//                   isOwnMessage
//                     ? "bg-blue-500 text-white"
//                     : "bg-gray-200 text-black"
//                 }`}
//               >
//                 <p className="text-sm">{msg.text}</p>
//               </div>
//             </div>
//           );
//         })}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input Field */}
//       <div className="p-4 border-t border-gray-300 flex gap-2">
//         <Input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type your message..."
//           className="flex-1"
//         />
//         <Button onClick={sendMessage}>Send</Button>
//       </div>
//     </div>
//   );
// }

// export default function ChatPage() {
//     return (
//         <div className="flex min-h-screen flex-col items-center w-screen justify-center p-4">
//             <h1 className="text-2xl font-bold mb-4">Chat</h1>
//             <div className="w-full max-w-2xl bg-gray-100 rounded-lg p-6">
//                 <p className="text-gray-600 text-center">
//                     Coming soon...
//                 </p>
//             </div>
//         </div>
//     );
// }
