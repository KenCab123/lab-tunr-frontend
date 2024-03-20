import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import Playlist from "./Playlist";
import { PlaylistForm } from "./PlaylistForm";

const API = import.meta.env.VITE_BASE_URL

const Playlists = () => {
    const [allPlaylists, setAllPlaylists] = useState([]);
    const { id } = useParams();

    const location = useLocation();
    
    useEffect(() => {
        fetch(`${API}/playlists`)
            .then((response) => response.json())
            .then((data) => setAllPlaylists(data));
    }, [id]);

    const handleDelete = (id) => {
        fetch(`${API}/playlists/${id}`, {
          method: 'DELETE',
        })
          .then(
            (response) => {
              const copyPlaylistsArray = [...allPlaylists]
              const indexDeletedPlaylist = copyPlaylistsArray.findIndex((p) => {
                return p.id === id
              })
              copyPlaylistsArray.splice(indexDeletedPlaylist, 1)
              setAllPlaylists(copyPlaylistsArray)
            },
            (error) => console.error(error)
          )
          .catch((error) => console.warn('catch', error))
      }


  return (
      <div>
        <Link to={`/playlists/new`}>Create a playlist</Link>
        <Playlist id={id}/>
        {allPlaylists.length > 0 ? (
            allPlaylists.map(({id, title}) => (
                <div key={id}>
                <Link to={`/playlists/${id}/songs`}>
                    <h2>{title}</h2>
                </Link>
                <Link to={`/playlists/${id}/edit`}>
                    <button>Edit</button>
                </Link>
                <button onClick={() => handleDelete(id)}>Delete</button>
                </div>
            ))
        ) : null}
        {location.pathname.includes("/playlists/") && (
        <PlaylistForm allPlaylists={allPlaylists} setAllPlaylists={setAllPlaylists}/>
      )}
    </div>
  )
}

export default Playlists