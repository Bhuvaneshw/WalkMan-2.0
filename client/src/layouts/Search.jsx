import { useContext, useEffect, useState } from "react";
import Content from "../components/Content.jsx";
import searchContext from "../searchContext";
import MusicCard from "../components/MusicCard";
import HStack from "../components/HStack.jsx";

export default function Search() {
  const { searchRes } = useContext(searchContext);
  useEffect(() => {}, []);

  return (
    <Content>
      <HStack wrap="wrap" alignItems="stretch">
        {searchRes.map((music) => {
          return (
            <MusicCard
              key={music._id}
              title={music.title}
              artist={music.artist}
            ></MusicCard>
          );
        })}
      </HStack>
    </Content>
  );
}
