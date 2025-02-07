export type LocalTimezone = {
    time: string;
    timezone: string;
  };
  
  function getDaySuffix(day: number): string {
    if (day >= 11 && day <= 13) return 'th'; // Special cases for 11th, 12th, 13th
    const lastDigit = day % 10;
    switch (lastDigit) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }
  
  function formatLocalDateString(date: Date): string {
    const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'long' });
    //const year = date.getFullYear();
    //const hours = String(date.getHours()).padStart(2, '0');
    //const minutes = String(date.getMinutes()).padStart(2, '0');
  
    return `${dayOfWeek} ${day}${getDaySuffix(day)} of ${month}`;
  }
  
  function formatUTCDateString(date: Date): string {
    const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long', timeZone: 'UTC' });
    const day = date.getUTCDate();
    const month = date.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' });
    //const year = date.getUTCFullYear();
    //const hours = String(date.getUTCHours()).padStart(2, '0');
    //const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  
    return `${dayOfWeek} ${day}${getDaySuffix(day)} of ${month}`;
  }

  export function convertToLocalTimezone(time?: string): LocalTimezone {
    const date = new Date(time ?? '');
    return {
      time: formatLocalDateString(date),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
  }
  
  export function convertToServerTimezone(time?: string): string {
    const date = new Date(time ?? '');
    return formatUTCDateString(date);
  }
  
  function formatLocalTimeString(date: Date): string {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  
  function formatUTCTimeString(date: Date): string {
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  
  export function getLocalTimeOnly(time?: string): string {
    const date = new Date(time ?? '');
    return formatLocalTimeString(date);
  }
  
  export function getServerTimeOnly(time?: string): string {
    const date = new Date(time ?? '');
    return formatUTCTimeString(date);
  }
  
  export function getTimeSinceDate(dateString: string): string {
    const currentDate = new Date();
    const pastDate = new Date(dateString);
  
    let yearDiff = currentDate.getFullYear() - pastDate.getFullYear();
    let monthDiff = currentDate.getMonth() - pastDate.getMonth();
    let dayDiff = currentDate.getDate() - pastDate.getDate();
  
    if (dayDiff < 0) {
      monthDiff--;
      const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
      dayDiff += daysInMonth;
    }
  
    if (monthDiff < 0) {
      yearDiff--;
      monthDiff += 12;
    }
  
    // Pluralization helper
    const pluralize = (count: number, noun: string) => `${count} ${noun}${count !== 1 ? 's' : ''}`;
  
    let timeDiffParts = [];
    if (yearDiff > 0) timeDiffParts.push(pluralize(yearDiff, 'year'));
    if (monthDiff > 0) timeDiffParts.push(pluralize(monthDiff, 'month'));
    if (dayDiff > 0 && timeDiffParts.length < 2) timeDiffParts.push(pluralize(dayDiff, 'day'));
  
    return timeDiffParts.slice(0, 2).join(' ') || '0 days';
}

export function getCurrentYear() {
  return new Date().getFullYear();
}