// =========================================================
// DESIGN TOKENS
// Palet warna & konstanta styling terpusat, dipakai di semua screen
// agar konsisten dengan desain (Google Stitch mockup).
// =========================================================

export const COLORS = {
  // Base
  background: '#F5F5F9',
  card: '#FFFFFF',

  // Brand / accent (ungu-indigo)
  primary: '#6C5CE7',
  primaryDark: '#5B4BDB',
  primaryLight: '#EFECFE',

  // Teks
  textPrimary: '#161622',
  textSecondary: '#6E7191',
  textMuted: '#9698A9',

  // Status
  success: '#2ECC71',
  warning: '#F5A623',
  danger: '#EB5757',

  // Badge "Nanti" / netral
  neutralBg: '#EEEEF2',
  neutralText: '#8B8D97',

  // Border tipis
  border: '#ECECF2',
};

export const ICON_TINTS = {
  blue: { bg: '#E7ECFF', fg: '#4C6FFF' },
  orange: { bg: '#FFEFE0', fg: '#F5A623' },
  green: { bg: '#E4F8EE', fg: '#2ECC71' },
  purple: { bg: '#F1EAFE', fg: '#9B59F6' },
  gray: { bg: '#EFEFF3', fg: '#6E7191' },
};

export const RADIUS = {
  sm: 10,
  md: 14,
  lg: 20,
  full: 999,
};

export const SHADOW = {
  card: {
    shadowColor: '#1A1A3F',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
};
