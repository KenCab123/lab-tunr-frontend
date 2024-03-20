import { useState, useEffect} from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'

const API = import.meta.env.VITE_BASE_URL

export const PlaylistForm = ({setAllPlaylists, allPlaylists}) => {
    const navigate = useNavigate()

    const { id } = useParams()

    const [newOrUpdatedPlaylist, setNewOrUpdatedPlaylist] = useState({
        title: ''
    })

    const handleTextChange = (event) => {
        setNewOrUpdatedPlaylist({
          ...newOrUpdatedPlaylist,
          [event.target.id]: event.target.value,
        })
    }

    const handleAdd = (newPlaylist) => {
        fetch(`${API}/playlists/`, {
          method: 'POST',
          body: JSON.stringify(newPlaylist),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if(allPlaylists) {
                setAllPlaylists([data, ...allPlaylists])
            }
            })
          .catch((error) => console.error('catch', error))
      }

      const handleEdit = async (id) => {
        await fetch(`${API}/playlists/${id}`, {
          method: 'PUT',
          body: JSON.stringify(newOrUpdatedPlaylist),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => response.json())
          .then((responseJSON) => {
            if(allPlaylists) {

                const copyPlaylistArray = [...allPlaylists]
                const indexUpdatedPlaylist = copyPlaylistArray.findIndex((s) => {
                    return s.id === id
                })
                copyPlaylistArray[indexUpdatedPlaylist] = responseJSON
                setAllPlaylists(copyPlaylistArray)
            }
          })
          .catch((error) => console.error(error))
      }

      
    const handleSubmit = async (e) =>{
        e.preventDefault()

        if(!id) {
            handleAdd(newOrUpdatedPlaylist);
        } else {
            await handleEdit(id)
          }
          navigate('/playlists')
    }

    const handleCancel = () =>{
       navigate('/playlists')
    }

    useEffect(() => {
        if(id) {
            fetch(`${API}/playlists/${id}`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setNewOrUpdatedPlaylist(data);
            })
            .catch((error) => console.error(error));
        }
      }, [id]);
    


  return (
    <form onSubmit={handleSubmit}>
        <label htmlFor="title">
            Enter a title
            <input 
                onChange={handleTextChange}
                type="text"
                id='title'
                value={newOrUpdatedPlaylist.title}
            />
        </label>
        <button>Submit</button>
        <button onClick={handleCancel}>Cancel</button>
        <Link to={`/playlists`}>Back</Link>
    </form>
  )
}
