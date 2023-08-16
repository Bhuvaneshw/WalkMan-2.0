import Content from "../components/Content.jsx";
import ResponsiveHStack from "../components/ResponsiveHStack";
import Artist from "../components/TopSongs.jsx";
import Genre from "../components/Genre";
import AudioPlayerSmall from "../components/AudioPlayerSmall.jsx";
import TopSongs from "../components/Artist.jsx";

export default function Home() {
  return (
    <Content>
      <ResponsiveHStack width="100%">
        <TopSongs />
        <Artist />
      </ResponsiveHStack>

      <ResponsiveHStack width="100%">
        <Genre />
        <AudioPlayerSmall />
      </ResponsiveHStack>
    </Content>
  );
}
