// import { LabelField, LocalizationField, NameField } from './util';

// export type TransactionRecipt = {
//   receipt_id: string;
//   merchant: Merchant;
//   start_date: string;
//   start_time: string;
//   card_scheme_sponsor: string;
//   tid: string;
//   system_trace_audit_number: string;
//   pos_software_version_number: string;
//   retrieval_reference_number: string;
//   card_scheme: NameField<string>;
//   transaction_type: NameField<string>;
//   pan: string;
//   card_expiration: string;
//   amount_authorized: LabelField<string>;
//   amount_other: LabelField<string>;
//   currency: LocalizationField;
//   status_message: LocalizationField;
//   is_approved: boolean;
//   is_refunded: boolean;
//   is_reversed: boolean;
//   approval_code?: LabelField<string>;
//   verification_method: LocalizationField;
//   end_date: string;
//   end_time: string;
//   receipt_line_one: LocalizationField;
//   receipt_line_two: LocalizationField;
//   thanks_message: LocalizationField;
//   save_receipt_message: LocalizationField;
//   entry_mode: string;
//   action_code: string;
//   application_identifier: string;
//   terminal_verification_result: string;
//   transaction_state_information: string;
//   cardholader_verfication_result: string;
//   cryptogram_information_data: string;
//   application_cryptogram: string;
//   kernel_id: string;
//   payment_account_reference?: string;
//   pan_suffix?: string;
//   created_at: string;
//   updated_at: string;
//   qr_code: string;
//   transaction_uuid: string;
// };

// export type Merchant = {
//   id: string;
//   name: LocalizationField;
//   address: LocalizationField;
//   category_code: string;
// };

// export enum TransactionType {
//   UNDEFINED = '-1',
//   PURCHASE = '00',
//   CASH = '01',
//   CASH_DISBURSEMENT = '17',
//   PURCHASE_WITH_CASHBACK = '09',
//   REFUND = '20',
// }

// export type TransactionBannerList = {
//   total: number;
//   transactionBanners: TransactionBanner[];
// };

// export type TransactionBanner = {
//   uuid: String;
//   scheme: String;
//   pan: String;
//   amount_authorized: String;
//   currency: LocalizationField;
//   transaction_type: TransactionType;
//   is_approved: Boolean;
//   is_reversed: Boolean;
//   start_date: String;
//   start_time: String;
// };
