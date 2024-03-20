import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const API = import.meta.env.VITE_BASE_URL

export const SongForm = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const[song, setSong] = useState({
        name:"",
        artist:"",
        album:"",
        time:"",
        is_favorite: false
    })
    const {name, artist, album, time, is_favorite} = song

    useEffect(() => {
        
        if(id) {
            fetch(`${API}/songs/${id}`).then(res => res.json()).then(data => setSong(data)).catch(e => console.log(e))
        } else {
            setSong({
                name:"",
                artist:"",
                album:"",
                time:"",
                is_favorite: false
            })
        }
    },[id])

    const handleTextChange = (e) => {
        setSong({...song, [e.target.id] : e.target.value })
    }

    const handleCheckBoxChange = (e) => {
        setSong({ ...song, is_favorite: !song.is_favorite })
    }

    const handleSubmit = (e) => {
        e.preventDefault()


        if(id) {
            const options = {
                method:"PUT",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(song)
            }
            
            fetch(`${API}/songs/${id}`, options).then(res => res.json()).then(data => {
                setSong(data)
                navigate('/songs')
            }).catch(e => console.log(e))
        } else {
            const options = {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(song)
            }

            fetch(`${API}/songs`, options).then(() => navigate('/songs')).catch(e => console.log(e))
        }
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input 
            id='name'
            value={name}
            onChange={handleTextChange}
            placeholder='Name of Song'
            type="text" 
            required
            />
            <label htmlFor="artist">Artist:</label>
            <input 
            id='artist'
            value={artist}
            onChange={handleTextChange}
            placeholder='Artist'
            type="text" 
            required
            />
            <label htmlFor="album">Album:</label>
            <input 
            id='album'
            value={album}
            onChange={handleTextChange}
            placeholder='Album'
            type="text" 
            required
            />
            <label htmlFor="time">Time:</label>
            <input 
            id='time'
            value={time}
            onChange={handleTextChange}
            placeholder='Time'
            type="text" 
            />
            <label htmlFor="is_favorite">Favorite:</label>
            <input 
            id='is_favorite'
            value={is_favorite}
            onChange={handleCheckBoxChange}
            checked={is_favorite}
            type="checkbox"
            />
            <br />

            <button>Submit</button>
            
        </form>
    </div>
  )
}
