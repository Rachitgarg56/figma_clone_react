import React, { createContext, useEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import LeftSidebar from './components/LeftSidebar/LeftSidebar';
import RightSidebar from './components/RightSidebar/RightSidebar';
import { useBroadcastEvent, useEventListener, useMyPresence, useOthers } from './liveblocks.config';
import Cursor from './components/Cursor';
import useInterval from './utils/hooks/useInterval'
import { useCallback } from 'react';

export const FigmaContext = createContext()

const COLORS = [
  "#E57373",
  "#9575CD",
  "#4FC3F7",
  "#81C784",
  "#FFF176",
  "#FF8A65",
  "#F06292",
  "#7986CB",
]

const CursorMode = {
  Hidden: 0,
  Chat: 1,
  ReactionSelector: 2,
  Reaction: 3,
};


function Room() {

  const others = useOthers();
  const [{ cursor }, updateMyPresence] = useMyPresence();
  const broadcast = useBroadcastEvent();
  const [state, setState] = useState({ mode: CursorMode.Hidden });
  const [reactions, setReactions] = useState([]);

  const [selectedTextObj, setSelectedTextObj] = useState(null);
  const [selectedFont, setSelectedFont] = useState('sans-serif');

  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  const [layersArr, setLayersArr] = useState([]);

  const canvasRef = useRef(null);


  const setReaction = useCallback((reaction) => {
    setState({ mode: CursorMode.Reaction, reaction, isPressed: false });
  }, []);

  // Remove reactions that are not visible anymore (every 1 sec)
  useInterval(() => {
    setReactions((reactions) =>
      reactions.filter((reaction) => reaction.timestamp > Date.now() - 4000)
    );
  }, 1000);

  useInterval(() => {
    if (state.mode === CursorMode.Reaction && state.isPressed && cursor) {
      setReactions((reactions) =>
        reactions.concat([
          {
            point: { x: cursor.x, y: cursor.y },
            value: state.reaction,
            timestamp: Date.now(),
          },
        ])
      );
      broadcast({
        x: cursor.x,
        y: cursor.y,
        value: state.reaction,
      });
    }
  }, 100);

  useEffect(() => {
    function onKeyUp(e) {
      if (e.key === "/") {
        setState({ mode: CursorMode.Chat, previousMessage: null, message: "" });
      } else if (e.key === "Escape") {
        updateMyPresence({ message: "" });
        setState({ mode: CursorMode.Hidden });
      } else if (e.key === "e") {
        setState({ mode: CursorMode.ReactionSelector });
      }
    }

    window.addEventListener("keyup", onKeyUp);

    function onKeyDown(e) {
      if (e.key === "/") {
        e.preventDefault();
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [updateMyPresence]);

  useEventListener((eventData) => {
    const event = eventData.event;
    setReactions((reactions) =>
      reactions.concat([
        {
          point: { x: event.x, y: event.y },
          value: event.value,
          timestamp: Date.now(),
        },
      ])
    );
  });



  return (
    <FigmaContext.Provider value={{layersArr,setLayersArr,selectedTextObj,setSelectedTextObj,selectedFont,setSelectedFont,width,setWidth,height,setHeight}}>
      <main className="h-screen overflow-hidden w-full"
        onPointerMove={(event) => {
          // Update the user cursor position on every pointer move
          updateMyPresence({
            cursor: {
              x: Math.round(event.clientX),
              y: Math.round(event.clientY),
            },
          });
        }}
        onPointerLeave={() =>
          // When the pointer goes out, set cursor to null
          updateMyPresence({
            cursor: null,
          })
        }
      >
        {/* ************************************************************************** */}

        {/* <div>
        {cursor
          ? `${cursor.x} × ${cursor.y}`
          : "Move your cursor to broadcast its position to other people in the room."}
      </div> */}

      {
        /**
         * Iterate over other users and display a cursor based on their presence
         */
        others.map(({ connectionId, presence }) => {
          if (presence.cursor === null) {
            return null;
          }

          return (
            <Cursor
              key={`cursor-${connectionId}`}
              // connectionId is an integer that is incremented at every new connections
              // Assigning a color with a modulo makes sure that a specific user has the same colors on every clients
              color={COLORS[connectionId % COLORS.length]}
              x={presence.cursor.x}
              y={presence.cursor.y}
            />
          );
        })
      }

      {/* ******************************************************************* */}


        <Navbar canvasRef={canvasRef}/>
        <section className="lower-container flex flex-row w-full" style={{ height: '94%' }}>
          <LeftSidebar />
          <canvas ref={canvasRef} />
          <RightSidebar />
        </section>
      </main>
    </FigmaContext.Provider>
  );
}

export default Room;



