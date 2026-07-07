import StartPage from './Pages/StartPage/StartPage';
import { Routes, Route, HashRouter } from 'react-router-dom';
import MoviesPage from './Pages/MoviesPage/MoviesPage';
import MediaDetails from './Components/MediaDetails/MediaDetails';
import FavoritesPage from './Pages/FavoritesPage/FavoritesPage';
import SeriesPage from './Pages/SeriesPage/SeriesPage';
import AllMediaPage from './Pages/AllMediaPage/AllMediaPage';
import AccountPage from './Pages/AccountPage/AccountPage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<StartPage />}/>
        <Route path='/movies' element={<MoviesPage />}/>
        <Route path='/movies/:id' 
        element={<MediaDetails mediaType='movie'/>} />
        <Route path='/favorites' element={<FavoritesPage />} />
        <Route path='/account' element={<AccountPage />} />
        <Route path='/movies/all-movies' element={<AllMediaPage mediaType='movie'/>} />
        <Route path='/tv-series' element={<SeriesPage />}/>
        <Route path='/tv-series/:id' 
        element={<MediaDetails mediaType='tv' />} />
        <Route path='/tv-series/all-series' element={<AllMediaPage mediaType='tv'/>} />
      </Routes>
      
    </HashRouter>
  );
}

export default App;
