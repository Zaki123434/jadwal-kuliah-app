// =========================================================
// DATA STATIS: JADWAL KULIAH PER HARI
// Dipakai di: screens/JadwalScreen.js (rendering pakai SectionList)
// =========================================================

export const jadwalPerHari = [
  {
    title: 'Senin',
    tanggal: '18 November',
    data: [
      {
        id: 'S1',
        matkul: 'Pembelajaran Mesin',
        ruangan: 'Ruang E1',
        jam: '08:00 - 10:30',
        status: 'Aktif',
        icon: 'bulb-outline',
        tint: 'purple',
      },
      {
        id: 'S2',
        matkul: 'Switching Routing dan Jaringan Nirkabel',
        ruangan: 'Lab Jaringan',
        jam: '10:30 - 13:00',
        status: 'Nanti',
        icon: 'wifi-outline',
        tint: 'blue',
      },
    ],
  },
  {
    title: 'Selasa',
    tanggal: '19 November',
    data: [
      {
        id: 'T1',
        matkul: 'Implementasi dan Pengujian Perangkat Lunak',
        ruangan: 'Lab RPL 2',
        jam: '08:00 - 10:30',
        status: 'Nanti',
        icon: 'checkmark-done-outline',
        tint: 'green',
      },
      {
        id: 'T2',
        matkul: 'Big Data',
        ruangan: 'Ruang E3',
        jam: '10:30 - 13:00',
        status: 'Nanti',
        icon: 'server-outline',
        tint: 'orange',
      },
    ],
  },
  {
    title: 'Rabu',
    tanggal: '20 November',
    data: [
      {
        id: 'W1',
        matkul: 'Pemrosesan Bahasa Alami',
        ruangan: 'Ruang C2',
        jam: '08:00 - 10:30',
        status: 'Nanti',
        icon: 'chatbubbles-outline',
        tint: 'purple',
      },
    ],
  },
  {
    title: 'Kamis',
    tanggal: '21 November',
    data: [
      {
        id: 'H1',
        matkul: 'Kerja Praktek',
        ruangan: 'Ruang Bimbingan A',
        jam: '08:00 - 09:40',
        status: 'Nanti',
        icon: 'briefcase-outline',
        tint: 'gray',
      },
    ],
  },
  {
    title: 'Jumat',
    tanggal: '22 November',
    data: [
      {
        id: 'F1',
        matkul: 'Pemrograman Mobile',
        ruangan: 'Lab RPL 3',
        jam: '08:00 - 10:30',
        status: 'Nanti',
        icon: 'phone-portrait-outline',
        tint: 'blue',
      },
    ],
  },
];