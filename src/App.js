"use client";

import { RoomProvider } from "./liveblocks.config";
import Room from "./Room";
import { ClientSideSuspense } from "@liveblocks/react";

export default function App() {
  return (
    <RoomProvider id="my-room" initialPresence={{ cursor: null, message: "" }}>
      <ClientSideSuspense fallback={<div>Loading…</div>}>
        {() => <Room />}
      </ClientSideSuspense>
    </RoomProvider>
  );
}