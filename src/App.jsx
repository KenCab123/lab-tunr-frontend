import { Routes, Route} from 'react-router-dom'
import { NavBar } from './Components/NavBar';
import { Home } from './Components/Home';
import { Songs } from './Components/Songs';
import { SongIndex } from './Components/SongIndex';
import { SongForm } from './Components/SongForm';
import Playlists from './Components/Playlists';
import Playlist from './Components/Playlist';
import { PlaylistForm } from './Components/PlaylistForm';


const App = () => {
  return <div>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/songs' element={<Songs />}/>
        <Route path='/songs/new' element={<SongForm />}/>
        <Route path='/songs/:id/edit' element={<SongForm />}/>
        <Route path='/songs/:id' element={<SongIndex />}/>
        <Route path='/playlists' element={<Playlists />}/>
        <Route path='/playlists/:id/songs' element={<Playlist />}/>
        <Route path='/playlists/new' element={<PlaylistForm />}/>
        <Route path='/playlists/:id/edit' element={<PlaylistForm />}/>
      </Routes>
  </div>;
};

export default App;
