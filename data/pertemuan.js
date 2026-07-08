// =========================================================
// DATA STATIS: DAFTAR PERTEMUAN (min. 10 item, gabungan semua matkul)
// Dipakai di: screens/PertemuanScreen.js (rendering pakai FlatList)
// =========================================================

export const pertemuan = [
  { id: 'P001', matkul: 'Pembelajaran Mesin', pertemuanKe: 1, topik: 'Pengenalan Supervised & Unsupervised Learning', tanggal: 'Senin, 14 Okt', sks: 3, icon: 'bulb-outline', tint: 'purple' },
  { id: 'P002', matkul: 'Pembelajaran Mesin', pertemuanKe: 2, topik: 'Regresi Linear & Logistik', tanggal: 'Senin, 21 Okt', sks: 3, icon: 'bulb-outline', tint: 'purple' },
  { id: 'P003', matkul: 'Switching Routing dan Jaringan Nirkabel', pertemuanKe: 1, topik: 'Konsep Dasar Switching & VLAN', tanggal: 'Senin, 14 Okt', sks: 3, icon: 'wifi-outline', tint: 'blue' },
  { id: 'P004', matkul: 'Switching Routing dan Jaringan Nirkabel', pertemuanKe: 2, topik: 'Routing Protocol (OSPF & BGP)', tanggal: 'Senin, 21 Okt', sks: 3, icon: 'wifi-outline', tint: 'blue' },
  { id: 'P005', matkul: 'Implementasi dan Pengujian Perangkat Lunak', pertemuanKe: 1, topik: 'Strategi Pengujian Unit & Integrasi', tanggal: 'Selasa, 15 Okt', sks: 3, icon: 'checkmark-done-outline', tint: 'green' },
  { id: 'P006', matkul: 'Implementasi dan Pengujian Perangkat Lunak', pertemuanKe: 2, topik: 'Automated Testing & CI/CD', tanggal: 'Selasa, 22 Okt', sks: 3, icon: 'checkmark-done-outline', tint: 'green' },
  { id: 'P007', matkul: 'Big Data', pertemuanKe: 1, topik: 'Pengenalan Ekosistem Hadoop & Spark', tanggal: 'Selasa, 15 Okt', sks: 3, icon: 'server-outline', tint: 'orange' },
  { id: 'P008', matkul: 'Big Data', pertemuanKe: 2, topik: 'Pemrosesan Data Terdistribusi', tanggal: 'Selasa, 22 Okt', sks: 3, icon: 'server-outline', tint: 'orange' },
  { id: 'P009', matkul: 'Pemrosesan Bahasa Alami', pertemuanKe: 1, topik: 'Text Preprocessing & Tokenisasi', tanggal: 'Rabu, 16 Okt', sks: 3, icon: 'chatbubbles-outline', tint: 'purple' },
  { id: 'P010', matkul: 'Pemrosesan Bahasa Alami', pertemuanKe: 2, topik: 'Word Embedding & Named Entity Recognition', tanggal: 'Rabu, 23 Okt', sks: 3, icon: 'chatbubbles-outline', tint: 'purple' },
  { id: 'P011', matkul: 'Kerja Praktek', pertemuanKe: 1, topik: 'Bimbingan Awal & Penentuan Topik KP', tanggal: 'Kamis, 17 Okt', sks: 2, icon: 'briefcase-outline', tint: 'gray' },
  { id: 'P012', matkul: 'Kerja Praktek', pertemuanKe: 2, topik: 'Progress Report Minggu ke-2', tanggal: 'Kamis, 24 Okt', sks: 2, icon: 'briefcase-outline', tint: 'gray' },
  { id: 'P013', matkul: 'Pemrograman Mobile', pertemuanKe: 1, topik: 'Pengenalan React Native & Expo', tanggal: 'Jumat, 18 Okt', sks: 3, icon: 'phone-portrait-outline', tint: 'blue' },
  { id: 'P014', matkul: 'Pemrograman Mobile', pertemuanKe: 2, topik: 'Handling Lists: map, FlatList, SectionList', tanggal: 'Jumat, 25 Okt', sks: 3, icon: 'phone-portrait-outline', tint: 'blue' },
];

// Untuk menguji ListEmptyComponent, kamu bisa sementara ubah
// export di atas menjadi array kosong: export const pertemuan = [];