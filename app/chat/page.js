"use client";

import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "@/context/authContext/auth";
import { db } from "@/firebase/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  where,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProFeatureNotice from "@/app/components/ProFeatureNotice";

export default function ChatPage() {
  const { currentUser } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [otherUserName, setOtherUserName] = useState("");
  const [otherUserLocation, setOtherUserLocation] = useState("");
  const [showTimestamp, setShowTimestamp] = useState({});

  // Ref for scrolling to bottom
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch conversations for the current user
  useEffect(() => {
    if (!currentUser) return;

    const convosQuery = query(
      collection(db, "conversations"),
      where("participants", "array-contains", currentUser.uid),
      orderBy("lastMessageTimestamp", "desc")
    );

    const unsubscribe = onSnapshot(convosQuery, (snapshot) => {
      const convos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setConversations(convos);
    });

    return () => unsubscribe();
  }, [currentUser]);

  // Fetch messages for selected conversation
  useEffect(() => {
    if (!selectedChat) return;

    const messagesRef = collection(
      db,
      "conversations",
      selectedChat,
      "messages"
    );
    const messagesQuery = query(messagesRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [selectedChat]);

  // Fetch other user's info when a chat is selected
  useEffect(() => {
    if (!selectedChat || !currentUser) return;

    const selectedConversation = conversations.find(
      (c) => c.id === selectedChat
    );
    if (selectedConversation) {
      const otherUserId = selectedConversation.participants.find(
        (id) => id !== currentUser.uid
      );
      const userRef = doc(db, "users", otherUserId);
      getDoc(userRef).then((docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setOtherUserName(userData.displayName || "Unknown User");
          setOtherUserLocation(userData.location || "No location set");
        }
      });
    }
  }, [selectedChat, currentUser, conversations]);

  // Update read receipt with a delay when a chat is selected
  useEffect(() => {
    if (selectedChat && currentUser) {
      const timer = setTimeout(() => {
        const conversationRef = doc(db, "conversations", selectedChat);
        updateDoc(conversationRef, {
          [`readBy.${currentUser.uid}`]: serverTimestamp(),
        }).catch((error) => {
          console.error("Error updating read receipt:", error);
        });
      }, 2000); // 2 second delay
      return () => clearTimeout(timer);
    }
  }, [selectedChat, currentUser]);

  const formatMessageTime = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate();
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat) return;

    try {
      const messagesRef = collection(
        db,
        "conversations",
        selectedChat,
        "messages"
      );
      await addDoc(messagesRef, {
        text: newMessage,
        senderId: currentUser.uid,
        timestamp: serverTimestamp(),
      });

      // Update conversation's last message and sender
      const conversationRef = doc(db, "conversations", selectedChat);
      await updateDoc(conversationRef, {
        lastMessage: newMessage,
        lastMessageTimestamp: serverTimestamp(),
        lastMessageSender: currentUser.uid,
      });

      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Get current conversation data for read receipt checking
  const currentConversation = conversations.find((c) => c.id === selectedChat);
  const lastReadTimestamp = currentConversation?.readBy?.[currentUser?.uid];

  return (
    <ProFeatureNotice>
      <div className="flex h-[calc(100vh-2rem)] min-w-[calc(100vw-12rem)] bg-white mr-6">
        {/* Conversations Sidebar */}
        <div className="w-1/4 border-r">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">Chats</h2>
          </div>
          <div className="overflow-y-auto h-[calc(100vh-5rem)]">
            {conversations.map((chat) => {
              // Calculate unread status for conversation list
              const lastRead =
                chat.readBy && chat.readBy[currentUser.uid]
                  ? chat.readBy[currentUser.uid]
                  : null;
              const unread =
                chat.lastMessageSender !== currentUser.uid &&
                chat.lastMessageTimestamp &&
                (!lastRead ||
                  chat.lastMessageTimestamp.toMillis() > lastRead.toMillis());

              return (
                <div
                  key={chat.id}
                  onClick={() => setSelectedChat(chat.id)}
                  className={`p-4 cursor-pointer hover:bg-gray-100 ${
                    selectedChat === chat.id ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={chat.photoURL} />
                      <AvatarFallback>{chat.name?.[0] || "C"}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {chat.name || "Chat"}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {chat.lastMessage || "No messages yet"}
                      </p>
                      {unread && (
                        <span className="inline-block bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full mt-1">
                          New
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage
                      src={
                        conversations.find((c) => c.id === selectedChat)
                          ?.photoURL
                      }
                    />
                    <AvatarFallback>{otherUserName?.[0] || "?"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">{otherUserName}</h3>
                    <p className="text-sm text-gray-600">{otherUserLocation}</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 flex flex-col space-y-6">
                {messages.map((message) => {
                  let isUnread = false;
                  if (
                    message.senderId !== currentUser.uid &&
                    lastReadTimestamp &&
                    message.timestamp &&
                    message.timestamp.toMillis() > lastReadTimestamp.toMillis()
                  ) {
                    isUnread = true;
                  }
                  return (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.senderId === currentUser.uid
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`group relative max-w-[70%] p-3 rounded-2xl transition-colors ${
                          message.senderId === currentUser.uid
                            ? "bg-blue-500 text-white rounded-br-none hover:bg-blue-600"
                            : isUnread
                            ? "bg-blue-100 text-gray-900 rounded-bl-none hover:bg-blue-200"
                            : "bg-gray-100 text-gray-900 rounded-bl-none hover:bg-gray-200"
                        }`}
                        onMouseEnter={() =>
                          setShowTimestamp({
                            ...showTimestamp,
                            [message.id]: true,
                          })
                        }
                        onMouseLeave={() =>
                          setShowTimestamp({
                            ...showTimestamp,
                            [message.id]: false,
                          })
                        }
                      >
                        <div className="relative">
                          {message.text}
                          <div
                            className={`absolute -bottom-8 ${
                              message.senderId === currentUser.uid
                                ? "right-0"
                                : "left-0"
                            } text-xs text-gray-500 transition-opacity ${
                              showTimestamp[message.id]
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                          >
                            {formatMessageTime(message.timestamp)}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {/* Dummy div to allow scrolling */}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <form
                onSubmit={handleSendMessage}
                className="p-4 border-t bg-white/80 backdrop-blur-sm"
              >
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 p-3 border rounded-full focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!newMessage.trim()}
                  >
                    Send
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a chat to start messaging
            </div>
          )}
        </div>
      </div>
    </ProFeatureNotice>
  );
}

function formatMessageTime(timestamp) {
  if (!timestamp) return "";
  const date = timestamp.toDate();
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
