import React, {useRef, useState, useEffect} from 'react';
import {View, TouchableOpacity, Platform, NativeModules} from 'react-native';
import FastImage from 'react-native-fast-image';
import Video from 'react-native-video';
import {createImageProgress} from 'react-native-image-progress';
import CircleSnail from 'react-native-progress/CircleSnail';

const {VideoPlayerManager} = NativeModules;
const Image = createImageProgress(FastImage);
const circleSnailProps = {thickness: 1, color: '#D0D0D0', size: 50};

export default function FeedMedia({
  media,
  index,
  item,
  onImagePress,
  dynamicStyles,
  postMediaIndex,
  inViewPort,
  willBlur,
}) {
  const [videoLoading, setVideoLoading] = useState(true);
  const [videoPaused, setVideoPaused] = useState(true);
  const videoRef = useRef();

  useEffect(() => {
    if (postMediaIndex === index) {
      if (videoRef.current) {
        videoRef.current.seek(0);
      }
      setVideoPaused(false);
    } else {
      setVideoPaused(true);
    }
  }, [postMediaIndex]);

  useEffect(() => {
    if (
      item.postMedia[postMediaIndex] &&
      item.postMedia[postMediaIndex].mime &&
      item.postMedia[postMediaIndex].mime.startsWith('video')
    ) {
      if (inViewPort) {
        if (videoRef.current) {
          videoRef.current.seek(0);
        }
      }

      setVideoPaused(!inViewPort);
    }
  }, [inViewPort]);

  useEffect(() => {
    if (!videoPaused) {
      setVideoPaused(true);
    }
  }, [willBlur]);

  const onVideoLoadStart = () => {
    setVideoLoading(true);
  };

  const onVideoLoad = () => {
    setVideoLoading(false);
  };

  const onVideoMediaPress = url => {
    if (Platform.OS === 'android') {
      VideoPlayerManager.showVideoPlayer(url);
    } else {
      if (videoRef.current) {
        videoRef.current.presentFullscreenPlayer();
      }
    }
  };

  const onImageMediaPress = () => {
    const filteredImages = [];
    item.postMedia.forEach(singleMedia => {
      if (singleMedia.mime && singleMedia.mime.startsWith('image')) {
        filteredImages.push(singleMedia.url);
      }

      if (singleMedia && !singleMedia.mime) {
        filteredImages.push(singleMedia);
      }
    });

    onImagePress(filteredImages, index);
  };

  if (media.mime && media.mime.startsWith('image')) {
    return (
      <TouchableOpacity activeOpacity={0.9} onPress={onImageMediaPress}>
        <Image
          source={{uri: media.url}}
          style={dynamicStyles.bodyImage}
          indicator={CircleSnail}
          indicatorProps={circleSnailProps}
        />
      </TouchableOpacity>
    );
  } else if (media.mime && media.mime.startsWith('video')) {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => onVideoMediaPress(media.url)}
        style={[{flex: 1}, dynamicStyles.centerItem]}>
        {videoLoading && (
          <View
            style={[dynamicStyles.mediaVideoLoader, dynamicStyles.centerItem]}>
            <CircleSnail {...circleSnailProps} />
          </View>
        )}
        <Video
          ref={videoRef}
          source={{uri: media.url}}
          paused={videoPaused}
          onLoad={onVideoLoad}
          resizeMode={'cover'}
          onLoadStart={onVideoLoadStart}
          style={[
            dynamicStyles.bodyImage,
            {display: videoLoading ? 'none' : 'flex'},
          ]}
        />
      </TouchableOpacity>
    );
  } else {
    // To handle old format of an array of url stings. Before video feature
    return (
      <TouchableOpacity activeOpacity={0.9} onPress={onImageMediaPress}>
        <Image
          source={{uri: media}}
          style={dynamicStyles.bodyImage}
          indicator={CircleSnail}
          indicatorProps={circleSnailProps}
        />
      </TouchableOpacity>
    );
  }
}
