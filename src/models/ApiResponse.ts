import {
  ReconciliationRecipt,
  TransactionRecipt,
} from '@nearpaydev/nearpay-ts-sdk';
import { SessionType } from './Session';

export type ApiResponse = {
  status: number;
  message?: string;
  receipts?: TransactionRecipt[] | ReconciliationRecipt[];
  session?: SessionType;
};
