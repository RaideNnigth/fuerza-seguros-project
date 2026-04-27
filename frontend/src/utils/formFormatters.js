export function onlyDigits(value) {
  return String(value || "").replace(/\D/g, "");
}

export function formatPhoneInput(value) {
  const digits = onlyDigits(value).slice(0, 11);

  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function formatEmailInput(value) {
  return String(value || "").replace(/\s/g, "").toLowerCase();
}

export function parseCurrencyValue(value) {
  const raw = String(value || "").trim();
  if (!raw) return NaN;

  const normalized = raw.replace(/[^\d.,]/g, "");
  const separatorMatch = normalized.match(/[.,](\d{1,2})$/);

  if (separatorMatch) {
    const separatorIndex = Math.max(
      normalized.lastIndexOf(","),
      normalized.lastIndexOf(".")
    );
    const reais = onlyDigits(normalized.slice(0, separatorIndex)) || "0";
    const cents = onlyDigits(normalized.slice(separatorIndex + 1)).padEnd(2, "0");
    return Number(`${reais}.${cents}`);
  }

  const reais = onlyDigits(normalized);
  return reais ? Number(reais) : NaN;
}

export function formatCurrencyInput(value) {
  const parsed = parseCurrencyValue(value);
  if (!Number.isFinite(parsed)) return "";

  return parsed.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatCurrencyForMessage(value) {
  const parsed = parseCurrencyValue(value);
  if (!Number.isFinite(parsed)) return "";

  return parsed.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function isPhoneValid(phone) {
  const length = onlyDigits(phone).length;
  return length === 10 || length === 11;
}

export function isEmailValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || ""));
}
