// import { Merchant } from './TransactionReceipt';
// import { LabelField, LocalizationField } from './util';

// export type ReconciliationRecipt = {
//   id: string;
//   date: string;
//   time: string;
//   is_balanced: LabelField<Boolean>;
//   details: ReconciliationDetailsType;
//   schemes: ReconciliationSchemesType[];
//   currency: LocalizationField;
//   qr_code: string;
//   merchant: Merchant;
//   tid: string;
//   system_trace_audit_number: string;
//   pos_software_version_number: string;
// };

// export type ReconciliationDetailsType = {
//   purchase: ReconciliationLabelField;
//   refund: ReconciliationLabelField;
//   purchase_reversal: ReconciliationLabelField;
//   refund_reversal: ReconciliationLabelField;
//   total: ReconciliationLabelField;
// };

// export type ReconciliationSchemesType = {
//   name: LabelField<string>;
//   pos: ReconciliationSchemesDetailsType;
//   host: ReconciliationSchemesDetailsType;
// };

// export type ReconciliationSchemesDetailsType = {
//   debit: ReconciliationLabelField;
//   credit: ReconciliationLabelField;
//   total: ReconciliationLabelField;
// };

// export type ReconciliationLabelField = {
//   label: LocalizationField;
//   total: String;
//   count: number;
// };
