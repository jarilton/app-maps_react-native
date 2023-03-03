import { useEffect, useRef, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View } from 'react-native';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject, watchPositionAsync, LocationAccuracy } from 'expo-location'

import { stylesGlobal } from './styles/global';

export default function App() { 
  const [location, setLocation] = useState<LocationObject | null>(null);

  const mapRef = useRef<MapView>(null);

  async function requestLocationPermission() {
    const { granted } = await requestForegroundPermissionsAsync();
    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
    }
  }

  useEffect(() => {
    requestLocationPermission();
  }, []);

   useEffect(() => {
     watchPositionAsync({
       accuracy: LocationAccuracy.Highest,
       timeInterval: 1000,
       distanceInterval: 1,
     }, (location) => {
       setLocation(location);
       mapRef.current?.animateCamera({
         pitch: 70,
         center: location.coords
       });
    });
  }, []);

  return (
    <View style={stylesGlobal.container}>
      {
        location &&
        <MapView
          ref={mapRef}
          style={stylesGlobal.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0005,
            longitudeDelta: 0.0005,
          }}
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
            />
        </MapView>
      }
    </View>
  );
}

