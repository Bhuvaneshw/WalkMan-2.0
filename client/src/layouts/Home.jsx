import Content from "../components/Root.jsx";
import ResponsiveHStack from "../components/ResponsiveHStack";
import Artist from "../components/TopSongs.jsx";
import Genre from "../components/Genre";
import Player from "../components/Player";
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
        <Player />
      </ResponsiveHStack>
    </Content>
  );
}
