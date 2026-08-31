export const PEER_SUPPORT = "peer_support";

const SPECIALIZATION_KEYS = new Set([
  "psychologist",
  "psychotherapist",
  "psychiatrist",
  "peer_support",
  "coach",
]);

export const normalizeSpecializationKeys = (specializations) => {
  if (!specializations?.length) return [];

  return specializations.map((specialization) => String(specialization).trim());
};

export const parseSpecializationKeys = (value) => {
  if (!value) return [];

  if (Array.isArray(value)) {
    return normalizeSpecializationKeys(value);
  }

  if (typeof value === "string") {
    const trimmed = value.trim().replace(/^\{|\}$/g, "");
    return normalizeSpecializationKeys(trimmed.split(","));
  }

  return normalizeSpecializationKeys([value]);
};

export const looksLikeSpecializationKeys = (specializations) =>
  normalizeSpecializationKeys(specializations).some((key) =>
    SPECIALIZATION_KEYS.has(key),
  );

export const resolveSpecializationKeys = (
  specializationKeys,
  specializations,
) => {
  if (specializationKeys?.length) {
    return specializationKeys;
  }

  if (looksLikeSpecializationKeys(specializations)) {
    return specializations;
  }

  return null;
};

export const isPeerSupportProvider = (specializations) =>
  parseSpecializationKeys(specializations).includes(PEER_SUPPORT);

export const getDisplaySpecializations = (specializations, t) => {
  return parseSpecializationKeys(specializations)
    .filter((key) => key !== PEER_SUPPORT)
    .map((key) => {
      if (!t) return key;
      if (key === PEER_SUPPORT) {
        return t(PEER_SUPPORT, { defaultValue: "U-FRIEND" });
      }
      return t(key);
    });
};
