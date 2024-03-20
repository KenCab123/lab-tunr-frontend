import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API = import.meta.env.VITE_BASE_URL


const Playlist = () => {
  const {id} = useParams()

  const [playlistSongs, setPlaylistSongs] = useState([])

  useEffect(() => {
    fetch(`${API}/playlists/${id}/songs`)
        .then((response) => response.json())
        .then((data) => setPlaylistSongs(data));
  }, [id]);


  return (
    <div>
    {playlistSongs.map(({ album, artist, id, is_favorite, name, time }) => {
      return (
        <div key={id}>
          <h1>{name}</h1>
          <h2>Artist: {artist}</h2>
          <h2>Album Name: {album}</h2>
          <h2>Time: {time}</h2>
          <h2>Like: {is_favorite ? "🟢" : "🔴"}</h2>
        </div>
      );
    })}
      {location.pathname.includes("/playlists/") && (
        <Link to={"/playlists"}>Back</Link>
      )}
  </div>
  )
}

export default Playlist