import { useState, useContext, useEffect } from "react";
import ResponsiveHStack from "../components/ResponsiveHStack";
import Content from "../components/Root.jsx";
import searchContext from "../searchContext";
import MusicCard from "../components/MusicCard";
export default function Search() {
  const [searchRes, setSearchRes] = useState([]);
  const { searchQuery, setSearchQuery } = useContext(searchContext);
  useEffect(() => {
    fetch("http://localhost:3000/song/" + searchQuery)
      .then((res) => res.json())
      .then((res) => setSearchRes(res));
  }, [searchQuery]);

  return (
    <Content>
      <ResponsiveHStack>
        {searchRes.map((music) => {
          return (
            <MusicCard
              key={music._id}
              title={music.title}
              artist={music.artist}
            ></MusicCard>
          );
        })}
      </ResponsiveHStack>
    </Content>
  );
}
