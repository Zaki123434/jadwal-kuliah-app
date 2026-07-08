import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import AppHeader from '../components/AppHeader';
import DetailModal from '../components/DetailModal';
import { mataKuliah } from '../data/mataKuliah';
import { statusAkademik, quickActions } from '../data/dashboard';
import { COLORS, RADIUS, SHADOW, ICON_TINTS } from '../constants/theme';

const STATUS_DOT_COLOR = {
  success: COLORS.success,
  warning: COLORS.warning,
  neutral: COLORS.neutralText,
};

// Halaman ini menampilkan ringkasan seluruh mata kuliah semester ini.
// Bagian "Mata Kuliah Aktif" dirender menggunakan teknik .map()
// pada array statis "mataKuliah" (memenuhi ketentuan bagian A tugas).
export default function BerandaScreen() {
  // Modal detail dipakai bergantian untuk: kartu status, aksi cepat, dan mata kuliah.
  const [modalContent, setModalContent] = useState(null);

  const openStatusDetail = () => {
    setModalContent({
      title: 'Status Akademik',
      subtitle: 'Ringkasan progres studi kamu semester ini',
      icon: 'school-outline',
      tint: 'purple',
      rows: [
        { label: 'Total SKS Ditempuh', value: `${statusAkademik.totalSKS} SKS` },
        { label: 'Matakuliah Terdaftar', value: `${statusAkademik.matkulTerdaftar} matkul` },
        { label: 'IPK Saat Ini', value: `${statusAkademik.ipk}` },
        { label: 'Target Lulus', value: statusAkademik.targetLulus },
      ],
    });
  };

  const openQuickActionDetail = (action) => {
    setModalContent({
      title: action.title,
      subtitle: action.description,
      icon: action.icon,
      tint: action.tint,
      rows: action.detailRows,
    });
  };

  const openMatkulDetail = (mk) => {
    setModalContent({
      title: mk.nama,
      subtitle: `Kode ${mk.kode}`,
      icon: mk.icon,
      tint: 'blue',
      rows: [
        { label: 'Jadwal', value: mk.jadwalText },
        { label: 'SKS', value: `${mk.sks} SKS` },
        { label: 'Dosen Pengampu', value: mk.dosen },
      ],
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <AppHeader eyebrow="Halo, Selamat Pagi" title="Akademik" avatarLabel="A" />

        {/* Search bar dekoratif */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color={COLORS.textMuted} />
          <Text style={styles.searchPlaceholder}>Cari Matakuliah atau Dosen</Text>
        </View>

        {/* Status Akademik */}
        <LinearGradient
          colors={[COLORS.primary, COLORS.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.statusCard}
        >
          <View style={styles.statusEyebrowRow}>
            <Ionicons name="school-outline" size={16} color="#E4E0FF" />
            <Text style={styles.statusEyebrow}>STATUS AKADEMIK</Text>
          </View>
          <Text style={styles.statusBigNumber}>
            {statusAkademik.totalSKS}
            <Text style={styles.statusBigLabel}>  Total SKS</Text>
          </Text>
          <Text style={styles.statusSubtitle}>
            {statusAkademik.matkulTerdaftar} Matakuliah Terdaftar
          </Text>
          <TouchableOpacity style={styles.detailButton} activeOpacity={0.8} onPress={openStatusDetail}>
            <Text style={styles.detailButtonText}>Detail</Text>
            <Ionicons name="arrow-forward" size={14} color="#FFFFFF" />
          </TouchableOpacity>
        </LinearGradient>

        {/* Grid Aksi Cepat -- dirender pakai .map() */}
        <View style={styles.quickGrid}>
          {quickActions.map((action) => {
            const tint = ICON_TINTS[action.tint] || ICON_TINTS.gray;
            return (
              <TouchableOpacity
                key={action.id}
                style={styles.quickCard}
                activeOpacity={0.75}
                onPress={() => openQuickActionDetail(action)}
              >
                <View style={[styles.quickIconWrap, { backgroundColor: tint.bg }]}>
                  <Ionicons name={action.icon} size={22} color={tint.fg} />
                </View>
                <Text style={styles.quickTitle}>{action.title}</Text>
                <View style={styles.quickStatusRow}>
                  <View
                    style={[
                      styles.statusDot,
                      { backgroundColor: STATUS_DOT_COLOR[action.statusColor] || COLORS.neutralText },
                    ]}
                  />
                  <Text style={styles.quickStatusText}>{action.status}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Mata Kuliah Aktif -- dirender pakai .map() */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Mata Kuliah Aktif</Text>
          <TouchableOpacity
            onPress={() => Alert.alert('Mata Kuliah Aktif', 'Semua mata kuliah semester ini sudah ditampilkan di bawah.')}
          >
            <Text style={styles.sectionLink}>Lihat Semua</Text>
          </TouchableOpacity>
        </View>

        {mataKuliah.map((mk) => {
          // key wajib unik -> pakai mk.id
          const tint = ICON_TINTS.gray;
          return (
            <TouchableOpacity
              key={mk.id}
              style={styles.matkulRow}
              activeOpacity={0.7}
              onPress={() => openMatkulDetail(mk)}
            >
              <View style={[styles.matkulIconWrap, { backgroundColor: tint.bg }]}>
                <Ionicons name={mk.icon} size={20} color={COLORS.textPrimary} />
              </View>
              <View style={styles.matkulInfo}>
                <Text style={styles.matkulNama}>{mk.nama}</Text>
                <Text style={styles.matkulMeta}>
                  {mk.kode} · {mk.sks} SKS · {mk.jadwalText}
                </Text>
                <Text style={styles.matkulDosen}>👤 {mk.dosen}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <DetailModal
        visible={!!modalContent}
        onClose={() => setModalContent(null)}
        title={modalContent?.title}
        subtitle={modalContent?.subtitle}
        icon={modalContent?.icon}
        tint={modalContent?.tint}
        rows={modalContent?.rows || []}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: { paddingBottom: 24 },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    marginHorizontal: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
  },
  searchPlaceholder: { marginLeft: 8, color: COLORS.textMuted, fontSize: 14 },

  statusCard: {
    marginHorizontal: 20,
    borderRadius: RADIUS.lg,
    padding: 20,
    marginBottom: 20,
  },
  statusEyebrowRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  statusEyebrow: {
    color: '#E4E0FF',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    marginLeft: 6,
  },
  statusBigNumber: { color: '#FFFFFF', fontSize: 36, fontWeight: '800' },
  statusBigLabel: { fontSize: 15, fontWeight: '500', color: '#E4E0FF' },
  statusSubtitle: { color: '#D9D4FF', fontSize: 13, marginTop: 4, marginBottom: 18 },
  detailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(255,255,255,0.18)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: RADIUS.full,
  },
  detailButtonText: { color: '#FFFFFF', fontWeight: '600', fontSize: 13, marginRight: 6 },

  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  quickCard: {
    width: '48%',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: 16,
    marginBottom: 14,
    ...SHADOW.card,
  },
  quickIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  quickTitle: { fontSize: 15, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 8 },
  quickStatusRow: { flexDirection: 'row', alignItems: 'center' },
  statusDot: { width: 6, height: 6, borderRadius: 3, marginRight: 6 },
  quickStatusText: { fontSize: 12, color: COLORS.textMuted },

  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 4,
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary },
  sectionLink: { fontSize: 13, color: COLORS.primary, fontWeight: '600' },

  matkulRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    marginHorizontal: 20,
    padding: 14,
    borderRadius: RADIUS.md,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  matkulIconWrap: {
    width: 42,
    height: 42,
    borderRadius: RADIUS.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  matkulInfo: { flex: 1 },
  matkulNama: { fontSize: 15, fontWeight: '700', color: COLORS.textPrimary },
  matkulMeta: { fontSize: 12, color: COLORS.textMuted, marginTop: 3 },
  matkulDosen: { fontSize: 12, color: COLORS.textMuted, marginTop: 2 },
});
