import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import BerandaScreen from './screens/BerandaScreen';
import PertemuanScreen from './screens/PertemuanScreen';
import JadwalScreen from './screens/JadwalScreen';
import ProfilScreen from './screens/ProfilScreen';
import { COLORS } from './constants/theme';

const Tab = createBottomTabNavigator();

// Ikon tab + titik indikator kecil di bawah ikon saat aktif (sesuai desain)
function TabIcon({ name, color, focused }) {
  return (
    <View style={styles.tabIconWrap}>
      <Ionicons name={name} size={22} color={color} />
      {focused && <View style={styles.tabDot} />}
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarShowLabel: true,
            tabBarActiveTintColor: COLORS.primary,
            tabBarInactiveTintColor: COLORS.textMuted,
            tabBarStyle: styles.tabBar,
            tabBarLabelStyle: styles.tabLabel,
            tabBarIcon: ({ color, focused }) => {
              let iconName;
              if (route.name === 'Beranda') iconName = focused ? 'grid' : 'grid-outline';
              else if (route.name === 'Pertemuan') iconName = focused ? 'bar-chart' : 'bar-chart-outline';
              else if (route.name === 'Jadwal') iconName = focused ? 'calendar' : 'calendar-outline';
              else if (route.name === 'Profil') iconName = focused ? 'person' : 'person-outline';
              return <TabIcon name={iconName} color={color} focused={focused} />;
            },
          })}
        >
          <Tab.Screen name="Beranda" component={BerandaScreen} />
          <Tab.Screen name="Pertemuan" component={PertemuanScreen} />
          <Tab.Screen name="Jadwal" component={JadwalScreen} />
          <Tab.Screen name="Profil" component={ProfilScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 64,
    paddingTop: 8,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: '#FFFFFF',
  },
  tabLabel: { fontSize: 11, fontWeight: '600', marginTop: 2 },
  tabIconWrap: { alignItems: 'center', justifyContent: 'center' },
  tabDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.primary,
    marginTop: 4,
    position: 'absolute',
    bottom: -8,
  },
});
