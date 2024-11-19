export function parseAmount(amount: number | string): string {
    const num = typeof amount === "string" ? parseFloat(amount) : amount;
  
    if (num >= 1_000_000) {
      return `${(num / 1_000_000).toFixed(num % 1_000_000 === 0 ? 0 : 1)}m`;
    } else if (num >= 1_000) {
      return `${(num / 1_000).toFixed(num % 1_000 === 0 ? 0 : 1)}k`;
    } else {
      return `${num}`;
    }
}

type CmsInterval = 'hr' | 'min' | '30 min' | 'single fee';
export type CmsPrice = { amount: number | string, interval: CmsInterval }

export function parseCmsPrice(price: CmsPrice) {
    if (!price) return '';

    const interval = price.interval !== 'single fee'
    ? ` / ${price.interval}`
    : '';

    return `${parseAmount(price.amount)}${interval}`;
}