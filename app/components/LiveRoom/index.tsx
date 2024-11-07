'use client';

import {
  ControlBar,
  LiveKitRoom,
  RoomAudioRenderer,
} from '@livekit/components-react';

import '@livekit/components-styles';

import { useEffect, useState } from 'react';
import { Track } from 'livekit-client';

export default function Page(room: string, name:string) {
  const [token, setToken] = useState('');

  if (token === '') {
    return (
        <>CONNECTIN...</>
    );
  }

  return (
    <LiveKitRoom
      screen={false}
      audio={true}
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      onDisconnected={() => setToken("")}
      // Use the default LiveKit theme for nice styles.
      data-lk-theme="default"
    >
      {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
      <RoomAudioRenderer/>
      {/* Controls for the user to start/stop audio, video, and screen
      share tracks and to leave the room. */}
      <div className="control-bar">
        <ControlBar variation="minimal" controls={{screenShare: false, camera: false, chat: false, settings: false}}/>
      </div>
    </LiveKitRoom>
  );
}