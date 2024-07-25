export const isLatinAlphabet = (str: string) => /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s0-9:,.'&]+$/.test(str)
