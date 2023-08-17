import Content from "../components/Content.jsx";
import ResponsiveHStack from "../components/ResponsiveHStack";
import Artist from "../components/Artist.jsx";
import Genre from "../components/Genre";
import AudioPlayerSmall from "../components/AudioPlayerSmall.jsx";
import TopSongs from "../components/TopSongs.jsx";
import { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState({ songs: [], artist: [], genere: [] });
  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:3000/song/home");
      setData(await res.json());
    })();
    console.log("hi");
  }, []);
  console.log(data);
  return (
    <Content>
      <ResponsiveHStack width="100%">
        <TopSongs data={data.songs} />
        <Artist data={data.artist} />
      </ResponsiveHStack>

      <ResponsiveHStack width="100%">
        <Genre data={data.genere} />
        <AudioPlayerSmall />
      </ResponsiveHStack>
    </Content>
  );
}
