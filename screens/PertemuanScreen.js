import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import AppHeader from '../components/AppHeader';
import DetailModal from '../components/DetailModal';
import { pertemuan } from '../data/pertemuan';
import { statistikAkademik } from '../data/dashboard';
import { COLORS, RADIUS, ICON_TINTS } from '../constants/theme';

// Kartu statistik akademik + judul section "Pertemuan Minggu Ini".
// Dipakai sebagai ListHeaderComponent (salah satu prop wajib FlatList).
function Header({ onPressLihatSemua }) {
  return (
    <View>
      <AppHeader eyebrow="Daftar" title="Pertemuan" avatarLabel="A" />

      <View style={styles.statCard}>
        <View style={styles.statTopRow}>
          <View>
            <Text style={styles.statEyebrow}>STATISTIK AKADEMIK</Text>
            <Text style={styles.statBigNumber}>
              {statistikAkademik.totalJamKuliah.toLocaleString('id-ID')}
              <Text style={styles.statBigLabel}> Jam</Text>
            </Text>
            <Text style={styles.statSubtitle}>Total Jam Kuliah</Text>
          </View>
          <View style={styles.semesterPill}>
            <Text style={styles.semesterPillText}>{statistikAkademik.semester}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.statBottomRow}>
          <View style={styles.statColumn}>
            <Text style={styles.statColumnNumber}>{statistikAkademik.sksLulus}</Text>
            <Text style={styles.statColumnLabel}>SKS Lulus</Text>
          </View>
          <View style={styles.verticalDivider} />
          <View style={styles.statColumn}>
            <Text style={styles.statColumnNumber}>{statistikAkademik.sksBerjalan}</Text>
            <Text style={styles.statColumnLabel}>SKS Berjalan</Text>
          </View>
          <View style={styles.verticalDivider} />
          <View style={styles.statColumn}>
            <Text style={styles.statColumnNumber}>{statistikAkademik.sksSisa}</Text>
            <Text style={styles.statColumnLabel}>SKS Sisa</Text>
          </View>
        </View>
      </View>

      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Pertemuan Minggu Ini</Text>
        <TouchableOpacity onPress={onPressLihatSemua}>
          <Text style={styles.sectionLink}>Lihat Semua</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Satu kartu pertemuan
function ItemPertemuan({ item, onPress }) {
  const tint = ICON_TINTS[item.tint] || ICON_TINTS.gray;
  return (
    <TouchableOpacity style={styles.item} activeOpacity={0.7} onPress={() => onPress(item)}>
      <View style={[styles.itemIconWrap, { backgroundColor: tint.bg }]}>
        <Ionicons name={item.icon} size={20} color={tint.fg} />
      </View>
      <View style={styles.itemInfo}>
        <View style={styles.itemTitleRow}>
          <Text style={styles.itemMatkul}>{item.matkul}</Text>
          <View style={styles.pertemuanKeBadge}>
            <Text style={styles.pertemuanKeBadgeText}>Ke-{item.pertemuanKe}</Text>
          </View>
        </View>
        <Text style={styles.itemTopik}>{item.topik}</Text>
        <View style={styles.itemDateRow}>
          <Ionicons name="calendar-outline" size={13} color={COLORS.textMuted} />
          <Text style={styles.itemTanggal}> {item.tanggal}</Text>
        </View>
      </View>
      <View style={styles.itemRight}>
        <View style={styles.sksBadge}>
          <Text style={styles.sksBadgeNumber}>{item.sks}</Text>
          <Text style={styles.sksBadgeLabel}>SKS</Text>
        </View>
        <TouchableOpacity hitSlop={8} style={{ marginTop: 10 }} onPress={() => onPress(item)}>
          <Ionicons name="ellipsis-vertical" size={16} color={COLORS.textMuted} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

// Pemisah antar item (ItemSeparatorComponent)
function Separator() {
  return <View style={{ height: 12 }} />;
}

// Tampilan jika data kosong (ListEmptyComponent)
function EmptyState() {
  return (
    <View style={styles.emptyContainer}>
      <Ionicons name="calendar-clear-outline" size={32} color={COLORS.textMuted} />
      <Text style={styles.emptyText}>Belum ada data pertemuan.</Text>
    </View>
  );
}

// Dua kartu ringkasan di bawah daftar (ListFooterComponent)
function Footer({ onPressTugas, onPressKehadiran }) {
  return (
    <View style={styles.footerRow}>
      <TouchableOpacity
        style={[styles.footerCard, styles.footerCardPrimary]}
        activeOpacity={0.85}
        onPress={onPressTugas}
      >
        <Ionicons name="document-text-outline" size={18} color="#FFFFFF" style={styles.footerIcon} />
        <Text style={styles.footerNumberPrimary}>
          {String(statistikAkademik.tugasAktif).padStart(2, '0')}
        </Text>
        <Text style={styles.footerLabelPrimary}>Tugas Aktif</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.footerCard, styles.footerCardNeutral]}
        activeOpacity={0.85}
        onPress={onPressKehadiran}
      >
        <Ionicons name="time-outline" size={18} color={COLORS.textPrimary} style={styles.footerIcon} />
        <Text style={styles.footerNumberNeutral}>{statistikAkademik.kehadiranPercent}%</Text>
        <Text style={styles.footerLabelNeutral}>Kehadiran</Text>
      </TouchableOpacity>
    </View>
  );
}

// Halaman ini menampilkan daftar pertemuan menggunakan FlatList
// dengan keyExtractor, ItemSeparatorComponent, ListHeaderComponent,
// dan ListEmptyComponent (memenuhi ketentuan bagian B tugas).
export default function PertemuanScreen() {
  const [modalContent, setModalContent] = useState(null);

  const openPertemuanDetail = (item) => {
    setModalContent({
      title: item.matkul,
      subtitle: `Pertemuan ke-${item.pertemuanKe}`,
      icon: item.icon,
      tint: item.tint,
      rows: [
        { label: 'Topik', value: item.topik },
        { label: 'Tanggal', value: item.tanggal },
        { label: 'SKS', value: `${item.sks} SKS` },
      ],
    });
  };

  const handleLihatSemua = () => {
    Alert.alert('Pertemuan Minggu Ini', 'Semua pertemuan yang tercatat sudah ditampilkan di bawah.');
  };

  const handleTugasAktif = () => {
    Alert.alert('Tugas Aktif', `Kamu memiliki ${statistikAkademik.tugasAktif} tugas yang belum dikumpulkan.`);
  };

  const handleKehadiran = () => {
    Alert.alert('Kehadiran', `Persentase kehadiran kamu semester ini: ${statistikAkademik.kehadiranPercent}%.`);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <FlatList
        data={pertemuan}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ItemPertemuan item={item} onPress={openPertemuanDetail} />}
        ItemSeparatorComponent={Separator}
        ListHeaderComponent={<Header onPressLihatSemua={handleLihatSemua} />}
        ListFooterComponent={
          pertemuan.length > 0 ? (
            <Footer onPressTugas={handleTugasAktif} onPressKehadiran={handleKehadiran} />
          ) : null
        }
        ListEmptyComponent={EmptyState}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

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
  listContent: { paddingBottom: 24 },

  statCard: {
    backgroundColor: COLORS.primaryLight,
    marginHorizontal: 20,
    borderRadius: RADIUS.lg,
    padding: 20,
    marginBottom: 20,
  },
  statTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  statEyebrow: { fontSize: 11, fontWeight: '700', color: COLORS.textMuted, letterSpacing: 1, marginBottom: 8 },
  statBigNumber: { fontSize: 28, fontWeight: '800', color: COLORS.primaryDark },
  statBigLabel: { fontSize: 15, fontWeight: '600', color: COLORS.textSecondary },
  statSubtitle: { fontSize: 13, color: COLORS.textMuted, marginTop: 2 },
  semesterPill: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
  },
  semesterPillText: { fontSize: 12, fontWeight: '700', color: COLORS.primary },
  divider: { height: 1, backgroundColor: 'rgba(108,92,231,0.15)', marginVertical: 16 },
  statBottomRow: { flexDirection: 'row', justifyContent: 'space-between' },
  statColumn: { flex: 1, alignItems: 'center' },
  statColumnNumber: { fontSize: 18, fontWeight: '800', color: COLORS.textPrimary },
  statColumnLabel: { fontSize: 11, color: COLORS.textMuted, marginTop: 2, textAlign: 'center' },
  verticalDivider: { width: 1, backgroundColor: 'rgba(108,92,231,0.15)' },

  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary },
  sectionLink: { fontSize: 13, color: COLORS.primary, fontWeight: '600' },

  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.card,
    marginHorizontal: 20,
    padding: 14,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  itemIconWrap: {
    width: 42,
    height: 42,
    borderRadius: RADIUS.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemInfo: { flex: 1 },
  itemTitleRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' },
  itemMatkul: { fontSize: 15, fontWeight: '700', color: COLORS.textPrimary, flexShrink: 1, marginRight: 8 },
  pertemuanKeBadge: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: RADIUS.full,
  },
  pertemuanKeBadgeText: { fontSize: 10, fontWeight: '700', color: COLORS.primary },
  itemTopik: { fontSize: 13, color: COLORS.textSecondary, marginTop: 2 },
  itemDateRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  itemTanggal: { fontSize: 12, color: COLORS.textMuted },
  itemRight: { alignItems: 'center', marginLeft: 8 },
  sksBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.neutralBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sksBadgeNumber: { fontSize: 14, fontWeight: '800', color: COLORS.textPrimary, lineHeight: 16 },
  sksBadgeLabel: { fontSize: 9, color: COLORS.textMuted },

  emptyContainer: { paddingVertical: 48, alignItems: 'center' },
  emptyText: { fontSize: 14, color: COLORS.textMuted, marginTop: 10 },

  footerRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 20,
    gap: 12,
  },
  footerCard: { flex: 1, borderRadius: RADIUS.lg, padding: 18 },
  footerCardPrimary: { backgroundColor: COLORS.primary },
  footerCardNeutral: { backgroundColor: COLORS.neutralBg },
  footerIcon: { marginBottom: 22 },
  footerNumberPrimary: { fontSize: 26, fontWeight: '800', color: '#FFFFFF' },
  footerLabelPrimary: { fontSize: 12, color: '#E4E0FF', marginTop: 2 },
  footerNumberNeutral: { fontSize: 26, fontWeight: '800', color: COLORS.textPrimary },
  footerLabelNeutral: { fontSize: 12, color: COLORS.textMuted, marginTop: 2 },
});
