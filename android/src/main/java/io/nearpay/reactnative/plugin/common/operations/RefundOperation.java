package io.nearpay.reactnative.plugin.common.operations;

import androidx.annotation.NonNull;

import java.util.Map;
import java.util.UUID;

import io.nearpay.reactnative.plugin.common.status.ErrorStatus;
import io.nearpay.reactnative.plugin.common.NearpayLib;
import io.nearpay.reactnative.plugin.common.PluginProvider;
import io.nearpay.reactnative.plugin.common.sender.NearpaySender;
import io.nearpay.reactnative.plugin.common.filter.ArgsFilter;
import io.nearpay.sdk.utils.enums.RefundFailure;
import io.nearpay.sdk.utils.enums.TransactionData;
import io.nearpay.sdk.utils.listeners.RefundListener;

public class RefundOperation extends BaseOperation {

        public RefundOperation(PluginProvider provider) {
                super(provider);
        }

        @Override
        public void run(ArgsFilter filter, NearpaySender sender) {
                Long amount = filter.getAmount();
                String original_transaction_uuid = filter.getOriginalTransactionUuid();
                String customer_reference_number = filter.getCustomerReferenceNumber();
                UUID jobId = filter.getJobId();
                Boolean enableReceiptUi = filter.isEnableReceiptUi();
                Boolean enableReversal = filter.isEnableReversal();
                Boolean enableEditableRefundAmountUi = filter.isEnableEditableRefundAmountUi();
                Long finishTimeout = filter.getTimeout();
                String adminPin = filter.getAdminPin();
                Boolean enableUiDismiss = filter.isEnableUiDismiss();

                provider.getNearpayLib().nearpay.refund(amount, original_transaction_uuid,
                                customer_reference_number, enableReceiptUi,
                                enableReversal, enableEditableRefundAmountUi, finishTimeout, jobId, adminPin,
                                enableUiDismiss,
                                new RefundListener() {
                                        @Override
                                        public void onRefundApproved(@NonNull TransactionData transactionData) {
                                                Map<String, Object> responseDict = NearpayLib.ApiResponse(
                                                                ErrorStatus.success_code,
                                                                "Refund Success", transactionData);
                                                sender.send(responseDict);
                                        }

                                        @Override
                                        public void onRefundFailed(@NonNull RefundFailure refundFailure) {
                                                int status = ErrorStatus.general_failure_code;
                                                String message = null;
                                                TransactionData receipts = null;

                                                if (refundFailure instanceof RefundFailure.RefundDeclined) {
                                                        // when the payment declined.
                                                        status = ErrorStatus.refund_declined_code;
                                                        receipts = ((RefundFailure.RefundDeclined) refundFailure)
                                                                        .getTransactionData();

                                                } else if (refundFailure instanceof RefundFailure.RefundRejected) {
                                                        status = ErrorStatus.refund_rejected_code;
                                                        message = ((RefundFailure.RefundRejected) refundFailure)
                                                                        .getMessage();
                                                } else if (refundFailure instanceof RefundFailure.AuthenticationFailed) {
                                                        status = ErrorStatus.auth_failed_code;
                                                        message = ((RefundFailure.AuthenticationFailed) refundFailure)
                                                                        .getMessage();
                                                } else if (refundFailure instanceof RefundFailure.InvalidStatus) {
                                                        status = ErrorStatus.invalid_code;
                                                }
                                                Map response = NearpayLib.ApiResponse(status, message, receipts);
                                                sender.send(response);

                                        }
                                });

        }
}
