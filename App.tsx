import { View } from 'react-native';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject } from 'expo-location'

import { stylesGlobal } from './styles/global';
import { useEffect, useState } from 'react';
import MapView from 'react-native-maps';

export default function App() { 
  const [location, setLocation] = useState<LocationObject | null>(null);

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

  return (
    <View style={stylesGlobal.container}>
      {
        location &&
        <MapView
          style={stylesGlobal.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0005,
            longitudeDelta: 0.0005,
          }}
        />
      }
    </View>
  );
}

