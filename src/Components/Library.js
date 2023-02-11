import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({songs , setCurrentSong  , isPlaying , audioRef , setSongs , libraryStatus}) =>{
    return(
        <div className={`library ${libraryStatus ? "active-library" : "" }`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map(song => <LibrarySong setCurrentSong = {setCurrentSong} song = {song} songs = {songs} id = {song.id} key = {song.id} isPlaying = {isPlaying} audioRef = {audioRef} setSongs = {setSongs}/>)};
            </div>
        </div>
    );
};

export default Library;