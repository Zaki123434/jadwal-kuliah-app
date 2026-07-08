import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS, ICON_TINTS } from '../constants/theme';

// Modal detail generik dipakai di semua screen supaya setiap kartu/tombol
// yang ditekan benar-benar menampilkan sesuatu, bukan diam saja.
//
// Props:
// - visible   : boolean
// - onClose   : fungsi untuk menutup modal
// - title     : judul utama (mis. nama mata kuliah)
// - subtitle  : teks kecil di bawah judul (opsional)
// - icon      : nama Ionicons (opsional)
// - tint      : salah satu key ICON_TINTS (opsional)
// - rows      : array { label, value } yang ditampilkan sebagai daftar detail
export default function DetailModal({ visible, onClose, title, subtitle, icon, tint = 'blue', rows = [] }) {
  const tintStyle = ICON_TINTS[tint] || ICON_TINTS.blue;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
          <View style={styles.handle} />

          <View style={styles.headerRow}>
            {icon ? (
              <View style={[styles.iconWrap, { backgroundColor: tintStyle.bg }]}>
                <Ionicons name={icon} size={22} color={tintStyle.fg} />
              </View>
            ) : null}
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{title}</Text>
              {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
            </View>
          </View>

          {rows.length > 0 && (
            <View style={styles.rowsWrap}>
              {rows.map((row, index) => (
                <View
                  key={row.label}
                  style={[styles.row, index === rows.length - 1 && { borderBottomWidth: 0 }]}
                >
                  <Text style={styles.rowLabel}>{row.label}</Text>
                  <Text style={styles.rowValue}>{row.value}</Text>
                </View>
              ))}
            </View>
          )}

          <TouchableOpacity style={styles.closeButton} onPress={onClose} activeOpacity={0.8}>
            <Text style={styles.closeButtonText}>Tutup</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(15,15,30,0.45)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: RADIUS.lg,
    borderTopRightRadius: RADIUS.lg,
    padding: 20,
    paddingBottom: 32,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.border,
    alignSelf: 'center',
    marginBottom: 16,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  title: { fontSize: 17, fontWeight: '700', color: COLORS.textPrimary },
  subtitle: { fontSize: 13, color: COLORS.textMuted, marginTop: 2 },
  rowsWrap: {
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.md,
    paddingHorizontal: 14,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  rowLabel: { fontSize: 13, color: COLORS.textMuted },
  rowValue: { fontSize: 13, color: COLORS.textPrimary, fontWeight: '600', maxWidth: '60%', textAlign: 'right' },
  closeButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: RADIUS.md,
    alignItems: 'center',
  },
  closeButtonText: { color: '#FFFFFF', fontWeight: '700', fontSize: 14 },
});
