// =========================================================
// DATA STATIS: RINGKASAN STATUS AKADEMIK & AKSI CEPAT
// Dipakai di: screens/BerandaScreen.js
//
// >>> GANTI angka & label berikut sesuai data akademik kamu <<<
// =========================================================

export const statusAkademik = {
  totalSKS: 144,
  matkulTerdaftar: 22,
  ipk: 3.72,
  targetLulus: '2027',
};

// Grid "aksi cepat" di halaman Beranda (dirender pakai .map())
// "detailRows" dipakai untuk isi modal saat kartu ini ditekan.
export const quickActions = [
  {
    id: 'QA1',
    title: 'Transkrip Nilai',
    status: 'Terupdate',
    statusColor: 'success',
    icon: 'document-text-outline',
    tint: 'blue',
    description: 'Rekap seluruh nilai mata kuliah yang sudah kamu tempuh.',
    detailRows: [
      { label: 'Terakhir diperbarui', value: '2 hari lalu' },
      { label: 'Total SKS Lulus', value: '112 SKS' },
      { label: 'IPK Saat Ini', value: '3.72' },
    ],
  },
  {
    id: 'QA2',
    title: 'KRS Online',
    status: 'Dibuka',
    statusColor: 'warning',
    icon: 'create-outline',
    tint: 'orange',
    description: 'Pengisian Kartu Rencana Studi untuk semester berikutnya.',
    detailRows: [
      { label: 'Status Pengisian', value: 'Dibuka' },
      { label: 'Batas Waktu', value: '20 November 2026' },
      { label: 'SKS Maksimal', value: '24 SKS' },
    ],
  },
  {
    id: 'QA3',
    title: 'Tagihan Kuliah',
    status: 'Lunas',
    statusColor: 'neutral',
    icon: 'card-outline',
    tint: 'green',
    description: 'Status pembayaran UKT/SPP semester berjalan.',
    detailRows: [
      { label: 'Status', value: 'Lunas' },
      { label: 'Semester', value: 'Ganjil 2026' },
      { label: 'Tanggal Bayar', value: '5 September 2026' },
    ],
  },
  {
    id: 'QA4',
    title: 'Riwayat Studi',
    status: 'Lengkap',
    statusColor: 'success',
    icon: 'trending-up-outline',
    tint: 'purple',
    description: 'Rekam jejak akademik dari semester 1 hingga sekarang.',
    detailRows: [
      { label: 'Semester Ditempuh', value: '5 semester' },
      { label: 'Total SKS Lulus', value: '112 SKS' },
      { label: 'Status', value: 'Lengkap' },
    ],
  },
];

// Statistik akademik untuk halaman Pertemuan
export const statistikAkademik = {
  totalJamKuliah: 1240,
  semester: 'Semester 5',
  sksLulus: 112,
  sksBerjalan: 24,
  sksSisa: 8,
  tugasAktif: 4,
  kehadiranPercent: 98,
};
