import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

const API = import.meta.env.VITE_BASE_URL;

export const SongIndex = () => {
    const { id } = useParams();
    const [song, setSong] = useState([]);
    const navigate = useNavigate()
    
    useEffect(() => {
        fetch(`${API}/songs/${id}`).then(res => res.json()).then(data => setSong(data)).catch(e => console.log(e))
    }, [id])
    
    const { name, artist, album, time, is_favorite } = song

    const deleteSong = () => {
        fetch(`${API}/songs/${id}`, {method: `DELETE`}).then(res => res.json()).then(() => navigate('/songs')).catch(e => console.log(e))
    }
    const handleDelete = () => {
        deleteSong()
    }

  return (
    <div>
        <h1>Title: {name}</h1>
        <h2>By: {artist}</h2>
        <h2>From: {album}</h2>
        <h2>Time: {time}</h2>
        <h2>Favorite: {is_favorite ? '🟢' : '🔴'}</h2>
        <Link to='/songs'>
            <button>back</button>
        </Link>
        <Link to={`/songs/${id}/edit`}>
            <button>edit</button>
        </Link>
            <button onClick={handleDelete}>delete</button>
    </div>
  )
}
