"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import Cookies from "js-cookie";

interface Notification {
  event: string;
  message: string;
}

export default function NotificationsPage() {
  const token = Cookies.get("adminAccessToken");
  const [status, setStatus] = useState<string>("Not Connected");
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const socket = useRef<WebSocket | null>(null);

  const connectWebSocket = () => {
    if (!token) {
      alert("Please paste a valid JWT access token first.");
      return;
    }

    if (socket.current) {
      socket.current.close();
    }

    const WEBSOCKET_URL = `wss://lms-backend-1-9kcc.onrender.com/ws/notifications/?token=${token}`;

    setStatus("Connecting...");
    console.log("Connecting to WebSocket:", WEBSOCKET_URL);

    socket.current = new WebSocket(WEBSOCKET_URL);

    socket.current.onopen = () => {
      setStatus("Connected");
      console.log("WebSocket connection established.");
      socket.current?.send(JSON.stringify({ type: "ping" }));
    };

    socket.current.onmessage = (event) => {
      console.log("Received message:", event.data);
      const data = JSON.parse(event.data);

      if (data.type === "notification") {
        setNotifications((prev) => [...prev, data.data]);
      }
    };

    socket.current.onclose = (event) => {
      setStatus("Disconnected");
      console.log("WebSocket closed:", event);
      socket.current = null;
    };

    socket.current.onerror = (error) => {
      setStatus("Connection Error!");
      console.error("WebSocket error:", error);
    };
  };

  useEffect(() => {
    return () => {
      socket.current?.close();
    };
  }, []);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card className="p-6 shadow-md">
        <h1 className="text-2xl font-bold mb-4">WebSocket Notifications</h1>

        <Button onClick={connectWebSocket} className="w-full">
          Connect
        </Button>

        <div
          className={`mt-4 text-sm ${
            status === "Connected" ? "text-green-600" : "text-red-600"
          }`}
        >
          Status: {status}
        </div>
      </Card>

      <div>
        <h2 className="text-xl font-semibold mb-2">Notifications</h2>
        <div className="space-y-4">
          {notifications.map((notification, index) => (
            <Card key={index} className="p-4 shadow-sm">
              <p className="font-bold">{notification.event}</p>
              <p>{notification.message}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
