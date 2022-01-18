import React,{useEffect, useRef, useState} from 'react'
import { StyleSheet, Text, View , Image, Dimensions, TouchableOpacity, FlatList, StatusBar, Animated} from 'react-native';
import TrackPlayer, {
    Capability,
    State,
    usePlaybackState,
    useProgress,
  } from 'react-native-track-player';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Slider from "@react-native-community/slider";


import songs from '../model/data';

const {width, height} = Dimensions.get('screen')


const SetupPlayer = async() => {
  await TrackPlayer.setupPlayer();
  await TrackPlayer.updateOptions({
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.Stop,
    ]
  })


  await TrackPlayer.add(songs);
}

const togglePlayback = async (playbackState) => {
  const currentTrack = await TrackPlayer.getCurrentTrack();

  if (currentTrack !== null) {
    if(playbackState == State.Paused) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  }
}


export default function Search({navigation}) {
    const playbackState = usePlaybackState();
    const progress = useProgress();

    const scrollX = useRef(new Animated.Value(0)).current;
    const [songIndex, setSongIndex] = useState(0)

    const songSlider = useRef(null);

    const skipTo = async (trackId) => {
      await TrackPlayer.skip(trackId)
    }

    useEffect(() => {
      SetupPlayer();
      scrollX.addListener(({ value }) => {
         const index = Math.round( value / width );
         skipTo(index)
         setSongIndex(index)
 
      })

      return () => {
          scrollX.removeAllListeners();
      }
    }, [])

   const skipToNext = () => {
       songSlider.current.scrollToOffset({
           offset : (songIndex + 1 ) * width,
       })
   }
   const skipToPrev = () => {
       songSlider.current.scrollToOffset({
           offset : (songIndex - 1 ) * width,
       })
   }
      
    const renderSongs = ({index, item}) => {
        return(
          <Animated.View style={{ 
            width: width,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.imageWrapper}>
          <Image source={item.artwork} style={styles.image} />
        </View>
          </Animated.View>
        )
      }
      return (
        <LinearGradient
        colors={['#c31432', '#240b36']}
        style={styles.container}
        >
        <StatusBar  hidden={true} style ={{ height: 5}}/>
          <View style={styles.mainContainer}>
    
           <View style={{width: width}}>
            <Animated.FlatList
            ref={songSlider}
             data={songs} 
             renderItem={renderSongs}
             keyExtractor={(item) => item.id}
             horizontal
             pagingEnabled
             showsHorizontalScrollIndicator={false}
             scrollEventThrottle={16}
             onScroll={Animated.event(
                 [{nativeEvent: {   
                  contentOffset: {x: scrollX}                
                 }}],
                {useNativeDriver: true}
             )}
            />
           </View>
    
    
            <View>
            <Text style={styles.titleSong}>{songs[songIndex].title}</Text>
            <Text style={styles.artistSong}>{songs[songIndex].artist}</Text>
            </View>
    
    
            <View>
              <Slider
               style={styles.progressContainer}
               value={progress.position}
               minimumValue={0}
               maximumValue={progress.duration}
               thumbTintColor={'orange'}
               minimumTrackTintColor={'orange'}
               maximumTrackTintColor={'#ccc'}
               onSlidingComplete={ async (value) => { await TrackPlayer.seekTo(value)}}
              />
              <View style={styles.progressLabelContainer}>
              <Text style={styles.progressLabelText}>{new Date(progress.position * 1000).toISOString().substr(14, 5)}</Text>
              <Text style={styles.progressLabelText}>{new Date((progress.duration - progress.position) * 1000).toISOString().substr(14, 5)}</Text>
              </View>
    
    
            </View>
    
    
            <View style={styles.musicControls}>
              <TouchableOpacity onPress={skipToPrev} style={{top:25}}>
                <Ionicons name="play-skip-back-outline" size={35} color="orange"/>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => togglePlayback(playbackState)}>
                <Ionicons name={playbackState === State.Playing ? "ios-pause-circle" : "ios-play-circle"} size={75} color="orange"/>
              </TouchableOpacity>
              <TouchableOpacity onPress={skipToNext} style={{top:25}}>
                <Ionicons name="play-skip-forward-outline" size={35} color="orange"/>
              </TouchableOpacity>
            </View>
            
          </View>
        </LinearGradient>
    )
}


const styles = StyleSheet.create({
    container: {
      flex:1,
    },
    mainContainer: {
    flex:1, 
    justifyContent: 'center',
    alignItems: 'center',
    },

     imageWrapper :{
       width: 300,
       height: 340,
       marginBottom: 25,
       shadowColor: '#ccc',
       shadowOpacity: 0.5,
       shadowOffset: { width: 5, height: 5},
       shadowRadius: 3.84,
     // its for android 
     elevation: 5,
     position:'relative',
     },
     image:{
       width: '100%',
       height: '100%',
       resizeMode: 'stretch'
       
     },
     titleSong: {
       fontSize: 18,
       fontWeight: '600',
       textAlign: 'center',
       color: '#fff',
     },
     artistSong: {
      fontSize:16,
      fontWeight: '200',
      textAlign: 'center',
      color:'white'
     },
     progressContainer :{
       width: 350,
       height: 40,
       marginTop:25,
       flexDirection: 'row',
     },
     progressLabelContainer: {
        width: 340,
        flexDirection: 'row',
        justifyContent: 'space-between',
     },
     progressLabelText: {
      color: 'white',
     },
     musicControls :{
       flexDirection: 'row',
       width:'60%',
       justifyContent: 'space-between',
       marginTop: 15,
       marginBottom: 100,
     },
 
 })