export const ICON_PATHS = {
  calculator: 'M4 2h16v20H4z M6 6h12 M8 10h8 M8 14h8 M8 18h8 M12 10v8',
  history: 'M3 3v7h6 M12 2a10 10 0 1 0 10 10A10.01 10.01 0 0 0 12 2 M12 7v6l4 2',
  cog: 'M12 2v3 M12 19v3 M2 12h3 M19 12h3 M5 5l2 2 M17 17l2 2 M17 5l-2 2 M5 17l2 2 M12 8a4 4 0 1 0 0 8a4 4 0 1 0 0 -8',
  backspace: 'M3 6h12l6 6l-6 6H3V6z M9 9l6 6 M15 9l-6 6',
  plus: 'M12 2v20 M2 12h20',
  minus: 'M2 12h20',
  multiply: 'M4 4l16 16 M20 4L4 20',
  divide: 'M2 12h20 M11 6a1 1 0 1 0 2 0a1 1 0 1 0 -2 0 M11 18a1 1 0 1 0 2 0a1 1 0 1 0 -2 0',
  equals: 'M2 10h20 M2 14h20',
  decimal: 'M12 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0',
  'plus-minus': 'M12 2v20 M2 12h20 M12 16h8',
  clear: 'M17 4c-5 0 -8 3 -8 8s3 8 8 8 M17 4v16',
  parentheses: 'M8 4c-6 0 -6 16 0 16 M16 4c6 0 6 16 0 16',
  percent: 'M5 6a3 3 0 1 0 6 0a3 3 0 1 0 -6 0 M14 18a3 3 0 1 0 6 0a3 3 0 1 0 -6 0 M15 8l-4 10',
  'square-root': 'M3 21h18 M11 21V7l6 6h-6',
} as const;

export type IconName = keyof typeof ICON_PATHS;