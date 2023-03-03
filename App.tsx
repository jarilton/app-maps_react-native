import { View } from 'react-native';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject } from 'expo-location'

import { stylesGlobal } from './styles/global';
import { useEffect, useState } from 'react';

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

    </View>
  );
}

