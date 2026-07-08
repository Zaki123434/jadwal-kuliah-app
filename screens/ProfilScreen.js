import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { COLORS, RADIUS, SHADOW, ICON_TINTS } from '../constants/theme';

// Menu profil statis (dirender pakai .map())
const menuItems = [
  { id: 'M1', label: 'Data Diri', icon: 'person-outline', tint: 'blue' },
  { id: 'M2', label: 'Keamanan Akun', icon: 'lock-closed-outline', tint: 'purple' },
  { id: 'M3', label: 'Notifikasi', icon: 'notifications-outline', tint: 'orange' },
  { id: 'M4', label: 'Bantuan', icon: 'help-circle-outline', tint: 'green' },
];

// Halaman profil sederhana, melengkapi tab navigasi.
// (Tidak termasuk 3 ketentuan wajib tugas, hanya pelengkap tampilan.)
export default function ProfilScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>Profil</Text>

        <View style={styles.profileCard}>
          <View style={styles.bigAvatar}>
            <Text style={styles.bigAvatarText}>A</Text>
          </View>
          <Text style={styles.name}>Nama Mahasiswa</Text>
          <Text style={styles.nim}>NIM 21120xxxxxxxxx</Text>
        </View>

        <View style={styles.menuList}>
          {menuItems.map((item) => {
            const tint = ICON_TINTS[item.tint];
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.menuRow}
                activeOpacity={0.7}
                onPress={() => Alert.alert(item.label, 'Fitur ini akan segera hadir.')}
              >
                <View style={[styles.menuIconWrap, { backgroundColor: tint.bg }]}>
                  <Ionicons name={item.icon} size={18} color={tint.fg} />
                </View>
                <Text style={styles.menuLabel}>{item.label}</Text>
                <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          activeOpacity={0.8}
          onPress={() =>
            Alert.alert('Keluar', 'Yakin ingin keluar dari akun ini?', [
              { text: 'Batal', style: 'cancel' },
              { text: 'Keluar', style: 'destructive', onPress: () => Alert.alert('Berhasil', 'Kamu telah keluar.') },
            ])
          }
        >
          <Ionicons name="log-out-outline" size={18} color={COLORS.danger} />
          <Text style={styles.logoutText}>Keluar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: { padding: 20, paddingBottom: 32 },
  pageTitle: { fontSize: 22, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 20 },

  profileCard: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    paddingVertical: 28,
    marginBottom: 24,
    ...SHADOW.card,
  },
  bigAvatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  bigAvatarText: { fontSize: 26, fontWeight: '800', color: COLORS.primary },
  name: { fontSize: 17, fontWeight: '700', color: COLORS.textPrimary },
  nim: { fontSize: 13, color: COLORS.textMuted, marginTop: 4 },

  menuList: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    paddingHorizontal: 8,
    marginBottom: 20,
    ...SHADOW.card,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 8,
  },
  menuIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuLabel: { flex: 1, fontSize: 14, fontWeight: '600', color: COLORS.textPrimary },

  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FDEDED',
    paddingVertical: 14,
    borderRadius: RADIUS.md,
  },
  logoutText: { color: COLORS.danger, fontWeight: '700', fontSize: 14, marginLeft: 8 },
});
