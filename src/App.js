import React , {useState , useRef} from 'react';
//Inmport styles
import './styles/app.scss';
//Importing Components
import Player from './Components/Player';
import Song from './Components/Song';
import Library from './Components/Library';
//import util
import { playAudio } from "./Components/util";
import data from "./data";
import Nav from './Components/Nav';

function App() {
  //Ref

  const audioRef = useRef(null);

  //States

  const [songs , setSongs] = useState(data());
  const [currentSong , setCurrentSong] = useState((songs[0]));
  const [isPlaying , setIsPlaying] = useState(false);
  const [libraryStatus , setLibraryStatus] = useState(false);
  const timeUpdateHandler = (e) =>{
    const current = e.target.currentTime;
    const duration = e.target.duration;
    //console.log(duration);
    setSongInfo({...songInfo , currentTime : current , duration});
  };
  const [songInfo , setSongInfo] = useState({
    currentTime : 0,
    duration : 0,
  });
  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    playAudio(isPlaying , audioRef);
  }
  return (
    
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus = {libraryStatus} setLibraryStatus = {setLibraryStatus}/>
      <Song currentSong = {currentSong}/>
      <Player currentSong = {currentSong} isPlaying = {isPlaying} setIsPlaying = {setIsPlaying} audioRef = {audioRef} setSongInfo = {setSongInfo} songInfo = {songInfo} songs = {songs} setCurrentSong = {setCurrentSong} setSongs = {setSongs}/>
      <Library setCurrentSong = {setCurrentSong} songs = {songs} isPlaying = {isPlaying} audioRef = {audioRef} setSongs = {setSongs} libraryStatus = {libraryStatus} />
      <audio onEnded = {songEndHandler} onLoadedMetadata={timeUpdateHandler}   onTimeUpdate={timeUpdateHandler}   ref = {audioRef} src={currentSong.audio} ></audio>
    </div>
    
  );
}
// install font awesome packages
//Search react font awesome

export default App;
