export function isEmptyString(val: any): val is string {
  return typeof val === 'string' && val.trim() === '';
}

export function isNonEmptyString(val: any): val is string {
  return typeof val === 'string' && val.trim() !== '';
}

export function isNonEmptyArray<T>(value: any): value is T[] {
  return Array.isArray(value) && value.length > 0;
}

export function isEmptyArray(value: any): value is [] {
  return Array.isArray(value) && value.length === 0;
}
