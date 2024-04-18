import React, { createContext, useEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import LeftSidebar from './components/LeftSidebar/LeftSidebar';
import RightSidebar from './components/RightSidebar/RightSidebar';
import { useBroadcastEvent, useEventListener, useMyPresence, useOthers } from './liveblocks.config';
import Cursor from './components/Cursor';
import useInterval from './utils/hooks/useInterval'
import { useCallback } from 'react';
import FlyingReaction from './components/FlyingReaction'
import ReactionSelector from './components/ReactionSelector'

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
          event.preventDefault();
          if (cursor == null || state.mode !== CursorMode.ReactionSelector) {
            updateMyPresence({
              cursor: {
                x: Math.round(event.clientX),
                y: Math.round(event.clientY),
              },
            });
          }
        }}
        onPointerLeave={() => {
          setState({
            mode: CursorMode.Hidden,
          });
          updateMyPresence({
            cursor: null,
          });
        }}
        onPointerDown={(event) => {
          updateMyPresence({
            cursor: {
              x: Math.round(event.clientX),
              y: Math.round(event.clientY),
            },
          });
          setState((state) =>
            state.mode === CursorMode.Reaction
              ? { ...state, isPressed: true }
              : state
          );
        }}
        onPointerUp={() => {
          setState((state) =>
            state.mode === CursorMode.Reaction
              ? { ...state, isPressed: false }
              : state
          );
        }}
      >

        {reactions.map((reaction) => {
                  return (
                    <FlyingReaction
                      key={reaction.timestamp.toString()}
                      x={reaction.point.x}
                      y={reaction.point.y}
                      timestamp={reaction.timestamp}
                      value={reaction.value}
            />
          );
        })}
        {cursor && (
          <div
            className="absolute top-0 left-0"
            style={{
              transform: `translateX(${cursor.x}px) translateY(${cursor.y}px)`,
            }}
          >
            {state.mode === CursorMode.Chat && (
              <>
                <img alt='' src="cursor.svg" />

                <div
                  className="absolute top-5 left-2 bg-blue-500 px-4 py-2 text-sm leading-relaxed text-white"
                  onKeyUp={(e) => e.stopPropagation()}
                  style={{
                    borderRadius: 20,
                  }}
                >
                  {state.previousMessage && <div>{state.previousMessage}</div>}
                  <input
                    className="w-60 border-none	bg-transparent text-white placeholder-blue-300 outline-none"
                    autoFocus={true}
                    onChange={(e) => {
                      updateMyPresence({ message: e.target.value });
                      setState({
                        mode: CursorMode.Chat,
                        previousMessage: null,
                        message: e.target.value,
                      });
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setState({
                          mode: CursorMode.Chat,
                          previousMessage: state.message,
                          message: "",
                        });
                      } else if (e.key === "Escape") {
                        setState({
                          mode: CursorMode.Hidden,
                        });
                      }
                    }}
                    placeholder={state.previousMessage ? "" : "Say something…"}
                    value={state.message}
                    maxLength={50}
                  />
                </div>
              </>
            )}
            {state.mode === CursorMode.ReactionSelector && (
              <ReactionSelector
                setReaction={(reaction) => {
                  setReaction(reaction);
                }}
              />
            )}
            {state.mode === CursorMode.Reaction && (
              <div className="pointer-events-none absolute top-3.5 left-1 select-none">
                {state.reaction}
              </div>
            )}
          </div>
        )}


        {/* ************************************************************************** */}

        {/* <div>
        {cursor
          ? `${cursor.x} × ${cursor.y}`
          : "Move your cursor to broadcast its position to other people in the room."}
      </div> */}

          {others.map(({ connectionId, presence }) => {
              if (presence == null || !presence.cursor) {
                return null;
              }

              return (
                <Cursor
                  key={connectionId}
                  color={COLORS[connectionId % COLORS.length]}
                  x={presence.cursor.x}
                  y={presence.cursor.y}
                  message={presence.message}
                />
              );
         })}   

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



