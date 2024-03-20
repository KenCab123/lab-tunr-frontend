import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"

const API = import.meta.env.VITE_BASE_URL


export const Songs = () => {
    const [allSongs, setAllSongs] = useState([])

    useEffect(() => {
        fetch(`${API}/songs`).then(res => res.json()).then(data => setAllSongs(data)).catch(e => console.log(e))
    },[])

  return (
    <div>
        <Link to='/songs/new'>New Song</Link>
        <Link to='/playlists'>Playlists</Link>
        {allSongs.map(({name, artist, time, is_favorite, id}) => {
            return (
            <Link to={`/songs/${id}`} key={id}>
            <div>
                <h1>{name}</h1>
                <h2>{artist}</h2>
                <h2>{time}</h2>
                {/* <h2>{is_favorite.toString()[0].toUpperCase() + is_favorite.toString().slice(1)}</h2> */}
                <h2>{is_favorite ? `🟢` : `🔴`}</h2>
            </div>
            </Link>
            )
        })}
    </div>
  )
}
