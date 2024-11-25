import { parse, isValid, format } from 'date-fns';

export function safeParseMultiFormat(
  dateString: string | Date | undefined | null,
  parseFormats = [
    'yyyyMMdd',
    'yyyy.MM.dd',
    'yyyy-MM-dd',
    'yyyy-MM-dd HH:mm:ss',
    "yyyy-MM-dd'T'HH:mm:ss'Z'",
    "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
  ],
): Date {
  if (!dateString) {
    return new Date();
  }

  if (typeof dateString !== 'string') {
    return dateString;
  }

  const parsed = parseFormats.reduce(
    (acc, cur, _, arr) => {
      if (acc) {
        arr.splice(1);
        return acc;
      }
      const parsed = parse(dateString, cur, new Date());
      return isValid(parsed) ? parsed : null;
    },
    null as Date | null,
  );

  if (!parsed) {
    return new Date();
  }

  return parsed;
}

export function safeParseMultiFormatAndFormat(
  dateString: string | Date | undefined | null,
  targetFormat = 'yyyy.MM.dd',
  parseFormats = [
    'yyyyMMdd',
    'yyyy.MM.dd',
    'yyyy-MM-dd',
    'yyyy-MM-dd HH:mm:ss',
    "yyyy-MM-dd'T'HH:mm:ss'Z'",
    "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
  ],
): string | 'N/A' {
  if (!dateString) {
    return 'N/A';
  }

  if (typeof dateString !== 'string') {
    return format(dateString, targetFormat);
  }

  const parsed = safeParseMultiFormat(dateString, parseFormats);

  if (!parsed) {
    return 'N/A';
  }

  return format(parsed, targetFormat);
}
