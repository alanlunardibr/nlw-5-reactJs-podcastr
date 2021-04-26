import { createContext, ReactNode, useContext, useState } from 'react'

type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration:number;
    url:string;
}

type PlayerContextData= {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    isLooping: boolean;
    isShuffling: boolean;
    play: (episode: Episode) => void;
    playList: (list: Episode[], index:number) => void;
    togglePlay: () => void;
    toggleLoop: () => void;
    toggleShuffle: () => void;
    playNext: () => void;
    playPrevious: () => void;
    setPlayngState: ( state:boolean) => void;
    clearPlayerState: () => void;
    hasNext: boolean;
    hasPrevious: boolean;
}

type PLayerContextProps = {
    children: ReactNode;
}
export const PlayerContext = createContext({} as PlayerContextData);

export function PlayerContextProvider( {children} : PLayerContextProps ){
  const [ episodeList, setEpisodeList ] = useState ([])
  const [ currentEpisodeIndex, setCurrentEpisodeIndex ] = useState(0);
  const [ isPlaying, setIsPlayng ] = useState(false);
  const [ isLooping, setIsLooping ] = useState(false);
  const [ isShuffling, setIsShuffling ] = useState(false);

  function play(episode : Episode){
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlayng(true);
  }

  function playList(list: Episode[], index: number) {
    setEpisodeList(list)
    setCurrentEpisodeIndex(index)
    setIsPlayng(true)
  }

  function togglePlay(){
    setIsPlayng(!isPlaying);
  }

  function toggleLoop(){
    setIsLooping(!isLooping);
  }

  function toggleShuffle(){
    setIsShuffling(!isShuffling);
  }

  function setPlayngState(state: boolean){
    setIsPlayng(state)
  }

  function clearPlayerState(){
      setEpisodeList([]);
      setCurrentEpisodeIndex(0);
  }
  const hasPrevious = currentEpisodeIndex > 0;
  const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length

  function playNext() {
    if (isShuffling){
        const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
        setCurrentEpisodeIndex(nextRandomEpisodeIndex)
    }
    else if (hasNext) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);
    }
  }

  function playPrevious(){
      if( hasPrevious){
          setCurrentEpisodeIndex(currentEpisodeIndex -1);
      }
  }

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        play,
        playList,
        isPlaying,
        isLooping,
        isShuffling,
        playNext,
        playPrevious,
        togglePlay,
        setPlayngState,
        hasPrevious,
        hasNext,
        toggleLoop,
        toggleShuffle,
        clearPlayerState
      }}
    >
        {children}

    </PlayerContext.Provider>
  );
}

export const usePlayer = () => {
    return useContext(PlayerContext)
}