import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Platform, StatusBar } from 'react-native';
import Animated from 'react-native-reanimated';

const images = [
  { id: 1, uri: require('./src/Images/manas.jpg') },
  { id: 2, uri: require('./src/Images/1.jpg') },
  { id: 3, uri: require('./src/Images/2.jpg') },
  { id: 4, uri: require('./src/Images/3.jpg') },
  { id: 5, uri: require('./src/Images/4.jpg') },
  { id: 6, uri: require('./src/Images/5.jpg') },
  { id: 7, uri: require('./src/Images/6.jpg') },
  { id: 8, uri: require('./src/Images/7.jpg') },
  { id: 9, uri: require('./src/Images/8.jpg') },
  { id: 10, uri: require('./src/Images/9.jpg') }
]
const scrollY = new Animated.Value(0);
const HEADER_HEIGHT = Platform.OS === 'ios' ? 90 : 70 + StatusBar.currentHeight;

export default class App extends React.Component {
  render() {
    const diffClampScrollY = Animated.diffClamp(scrollY, 0, HEADER_HEIGHT)
    const headerY = Animated.interpolate(diffClampScrollY, {
      inputRange: [0, HEADER_HEIGHT],
      outputRange: [0, -HEADER_HEIGHT]
    })
    return (
      <View style={{ flex: 1 }}>
        <Animated.View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: HEADER_HEIGHT, backgroundColor: '#c45654', zIndex: 1000, elevation: 1000, transform: [{ translateY: headerY }], justifyContent: 'center', alignItems: 'center', paddingTop: 45 }}>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 24 }}>Airbnd Header</Text>
        </Animated.View>
        <Animated.ScrollView
          bounces={false}
          scrollEventThrottle={16}
          style={{ paddingTop: HEADER_HEIGHT, marginBottom: 30 }}
          onScroll={Animated.event([
            {
              nativeEvent: { contentOffset: { y: scrollY } }
            }
          ])}
        >
          {images.map(item =>
            <View style={{ height: 400, margin: 16, }} key={item.id} >
              <Image source={item.uri} style={{ flex: 1, height: null, width: null, borderRadius: 10 }} />
            </View>
          )}
        </Animated.ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
