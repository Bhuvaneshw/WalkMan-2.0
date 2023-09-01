import { useContext, useEffect } from "react";
import { searchContext } from "../searchContext";
import { useOutletContext } from "react-router-dom";
import Content from "./Content";
import HStack from "./HStack";
import MusicCard from "./MusicCard";
import { useNavigate } from "react-router-dom";
import { getMusic, getSocket } from "./util";
export default function GroupRoomSearch() {
  const socket = getSocket();
  const { roomId, setCurrentSong } = useOutletContext();
  const { searchRes } = useContext(searchContext);
  const navigate = useNavigate();

  function handleOnClick(music) {
    socket.notifySongSelection(music, setCurrentSong, navigate);
  }

  return (
    <Content>
      <HStack wrap="wrap" alignItems="stretch">
        {searchRes.map((music) => {
          return (
            <MusicCard
              key={music._id}
              title={music.title}
              artist={music.artist}
              icon={music.icon}
              onClick={() => {
                handleOnClick(music);
              }}
            ></MusicCard>
          );
        })}
      </HStack>
    </Content>
  );
}
