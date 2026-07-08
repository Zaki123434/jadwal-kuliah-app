import React, { useState } from 'react';
import { View, Text, StyleSheet, SectionList, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import DetailModal from '../components/DetailModal';
import { jadwalPerHari } from '../data/jadwal';
import { COLORS, RADIUS, ICON_TINTS } from '../constants/theme';

// Ambil angka tanggal dari string "18 November" -> "18"
function ambilTanggalPendek(tanggal) {
  return tanggal.split(' ')[0];
}

// Header halaman: avatar, judul, dan dua ikon aksi (notifikasi & dompet)
function TopHeader() {
  return (
    <View style={styles.topHeader}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>A</Text>
      </View>
      <Text style={styles.topHeaderTitle}>Akademik</Text>
      <View style={styles.topHeaderIcons}>
        <TouchableOpacity
          style={{ marginRight: 16 }}
          onPress={() => Alert.alert('Notifikasi', 'Belum ada notifikasi baru.')}
        >
          <Ionicons name="notifications-outline" size={22} color={COLORS.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Alert.alert('Dompet Akademik', 'Fitur ini akan segera hadir.')}
        >
          <Ionicons name="wallet-outline" size={22} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Selector hari horizontal (chip). Hanya menyorot hari yang dipilih —
// seluruh jadwal seminggu tetap ditampilkan di bawahnya.
function DaySelector({ hari, selected, onSelect }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.daySelectorContent}
    >
      {hari.map((h) => {
        const isSelected = h.title === selected;
        return (
          <TouchableOpacity
            key={h.title}
            style={[styles.dayChip, isSelected && styles.dayChipActive]}
            onPress={() => onSelect(h.title)}
            activeOpacity={0.8}
          >
            <Text style={[styles.dayChipLabel, isSelected && styles.dayChipLabelActive]}>
              {h.title.slice(0, 3).toUpperCase()}
            </Text>
            <Text style={[styles.dayChipDate, isSelected && styles.dayChipLabelActive]}>
              {ambilTanggalPendek(h.tanggal)}
            </Text>
            {isSelected && <View style={styles.dayChipDot} />}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

// Header tiap seksi (nama hari + tanggal) -- gaya beda dari item biasa:
// judul hari tebal & besar, tanggal abu-abu di sebelahnya.
function SectionHeader({ section }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderTitle}>{section.title}</Text>
      <Text style={styles.sectionHeaderDate}>{section.tanggal}</Text>
    </View>
  );
}

const STATUS_STYLE = {
  Aktif: { bg: COLORS.primaryLight, text: COLORS.primary },
  Nanti: { bg: COLORS.neutralBg, text: COLORS.neutralText },
  Selesai: { bg: '#E4F8EE', text: COLORS.success },
};

// Satu kartu jadwal
function ItemJadwal({ item, onPress }) {
  const tint = ICON_TINTS[item.tint] || ICON_TINTS.gray;
  const statusStyle = STATUS_STYLE[item.status] || STATUS_STYLE.Nanti;
  return (
    <TouchableOpacity style={styles.item} activeOpacity={0.7} onPress={() => onPress(item)}>
      <View style={[styles.itemIconWrap, { backgroundColor: tint.bg }]}>
        <Ionicons name={item.icon} size={20} color={tint.fg} />
      </View>
      <View style={styles.itemInfo}>
        <Text style={styles.itemMatkul}>{item.matkul}</Text>
        <View style={styles.itemMetaRow}>
          <Ionicons name="time-outline" size={13} color={COLORS.textMuted} />
          <Text style={styles.itemMetaText}> {item.jam}</Text>
        </View>
        <View style={styles.itemMetaRow}>
          <Ionicons name="location-outline" size={13} color={COLORS.textMuted} />
          <Text style={styles.itemMetaText}> {item.ruangan}</Text>
        </View>
      </View>
      <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
        <Text style={[styles.statusBadgeText, { color: statusStyle.text }]}>{item.status}</Text>
      </View>
    </TouchableOpacity>
  );
}

// Ditampilkan setelah seksi tanpa jadwal (renderSectionFooter),
// menggantikan ListEmptyComponent per-hari sesuai desain.
function SectionEmpty() {
  return (
    <View style={styles.emptySection}>
      <Ionicons name="calendar-outline" size={26} color={COLORS.textMuted} />
      <Text style={styles.emptySectionText}>Tidak ada jadwal kuliah</Text>
    </View>
  );
}

// Halaman ini menampilkan jadwal kuliah dikelompokkan per hari
// menggunakan SectionList (memenuhi ketentuan bagian C tugas).
export default function JadwalScreen() {
  const [selectedDay, setSelectedDay] = useState(jadwalPerHari[0]?.title);
  const [modalContent, setModalContent] = useState(null);

  const openJadwalDetail = (item) => {
    setModalContent({
      title: item.matkul,
      subtitle: `Status: ${item.status}`,
      icon: item.icon,
      tint: item.tint,
      rows: [
        { label: 'Jam', value: item.jam },
        { label: 'Ruangan', value: item.ruangan },
        { label: 'Status', value: item.status },
      ],
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <TopHeader />

      <View style={styles.titleBlock}>
        <Text style={styles.eyebrow}>SEMESTER GANJIL 2024</Text>
        <View style={styles.titleRow}>
          <Text style={styles.pageTitle}>Jadwal Kuliah</Text>
          <View style={styles.weekPill}>
            <Text style={styles.weekPillText}>Minggu 12</Text>
          </View>
        </View>
      </View>

      <DaySelector hari={jadwalPerHari} selected={selectedDay} onSelect={setSelectedDay} />

      <SectionList
        sections={jadwalPerHari}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ItemJadwal item={item} onPress={openJadwalDetail} />}
        renderSectionHeader={({ section }) => <SectionHeader section={section} />}
        renderSectionFooter={({ section }) =>
          section.data.length === 0 ? <SectionEmpty /> : null
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
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

  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: { color: COLORS.primary, fontWeight: '700', fontSize: 14 },
  topHeaderTitle: { flex: 1, fontSize: 17, fontWeight: '700', color: COLORS.textPrimary },
  topHeaderIcons: { flexDirection: 'row', alignItems: 'center' },

  titleBlock: { paddingHorizontal: 20, marginBottom: 16 },
  eyebrow: { fontSize: 12, color: COLORS.textMuted, fontWeight: '600', letterSpacing: 1, marginBottom: 4 },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  pageTitle: { fontSize: 26, fontWeight: '800', color: COLORS.textPrimary },
  weekPill: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
  },
  weekPillText: { fontSize: 12, fontWeight: '700', color: COLORS.primary },

  daySelectorContent: { paddingHorizontal: 20, paddingBottom: 18 },
  dayChip: {
    width: 60,
    height: 68,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.card,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  dayChipActive: { borderColor: COLORS.primary, backgroundColor: COLORS.primaryLight },
  dayChipLabel: { fontSize: 11, fontWeight: '700', color: COLORS.textMuted },
  dayChipDate: { fontSize: 17, fontWeight: '800', color: COLORS.textPrimary, marginTop: 2 },
  dayChipLabelActive: { color: COLORS.primary },
  dayChipDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.primary,
    marginTop: 4,
  },

  listContent: { paddingHorizontal: 20, paddingBottom: 24 },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 18,
    marginBottom: 10,
  },
  sectionHeaderTitle: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary },
  sectionHeaderDate: { fontSize: 13, color: COLORS.textMuted, marginLeft: 8 },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    padding: 14,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
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
  itemMatkul: { fontSize: 15, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 6 },
  itemMetaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  itemMetaText: { fontSize: 12, color: COLORS.textMuted },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    marginLeft: 8,
  },
  statusBadgeText: { fontSize: 12, fontWeight: '700' },

  emptySection: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 32,
    alignItems: 'center',
    marginBottom: 12,
  },
  emptySectionText: { fontSize: 13, color: COLORS.textMuted, marginTop: 10 },
});
