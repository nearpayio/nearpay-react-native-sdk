export type LocalizationField = {
  arabic: string;
  english: string;
};

export type LabelField<T> = {
  label: LocalizationField;
  value: T;
};

export type NameField<T> = {
  name: LocalizationField;
  id: T;
};
