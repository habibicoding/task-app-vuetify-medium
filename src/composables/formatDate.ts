/**
 * Formats a date string to a specified locale and format.
 *
 * @param {string} date - The date string to format.
 * @param {string} [locale='en-US'] - The locale to use for formatting.
 * @param {Intl.DateTimeFormatOptions} [options] - The options for date format.
 * @returns {string} Formatted date string.
 */
export const formatDate = (
  date: string,
  locale: string = 'en-US',
  options: Intl.DateTimeFormatOptions = {year: 'numeric', month: '2-digit', day: '2-digit'}
): string => {
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    // Handle invalid date
    console.warn('formattedDate: Invalid date provided');
    return '';
  }
  return parsedDate.toLocaleDateString(locale, options).replace(/\//g, '.');
};
