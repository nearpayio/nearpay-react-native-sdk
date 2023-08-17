package io.nearpay.reactnative.plugin.common.operations;

import androidx.annotation.NonNull;

import java.util.Map;

import io.nearpay.reactnative.plugin.common.status.ErrorStatus;
import io.nearpay.reactnative.plugin.common.NearpayLib;
import io.nearpay.reactnative.plugin.common.PluginProvider;
import io.nearpay.reactnative.plugin.common.sender.NearpaySender;
import io.nearpay.reactnative.plugin.common.filter.ArgsFilter;
import io.nearpay.sdk.utils.enums.ReversalFailure;
import io.nearpay.sdk.utils.enums.TransactionData;
import io.nearpay.sdk.utils.listeners.ReversalListener;

public class ReverseOperation extends BaseOperation {

    public ReverseOperation(PluginProvider provider) {
        super(provider);
    }

    @Override
    public void run(ArgsFilter filter, NearpaySender sender) {
        String transactionUuid = filter.getOriginalTransactionUuid();
        Boolean enableReceiptUi = filter.isEnableReceiptUi();
        Boolean enableUiDismiss = filter.isEnableUiDismiss();
        Long finishTimeout = filter.getTimeout();

        provider.getNearpayLib().nearpay.reverse(transactionUuid, enableReceiptUi, finishTimeout, enableUiDismiss,
                new ReversalListener() {
                    @Override
                    public void onReversalFinished(@NonNull TransactionData transactionData) {
                        Map<String, Object> responseDict = NearpayLib.ApiResponse(ErrorStatus.success_code, null,
                                transactionData);
                        sender.send(responseDict);
                    }

                    @Override
                    public void onReversalFailed(@NonNull ReversalFailure reversalFailure) {
                        int status = ErrorStatus.general_failure_code;
                        String message = null;
                        TransactionData receipts = null;

                        if (reversalFailure instanceof ReversalFailure.AuthenticationFailed) {
                            // when the Authentication is failed
                            status = ErrorStatus.auth_failed_code;
                            message = ((ReversalFailure.AuthenticationFailed) reversalFailure).getMessage();
                        } else if (reversalFailure instanceof ReversalFailure.FailureMessage) {
                            status = ErrorStatus.failure_code;
                            message = ((ReversalFailure.FailureMessage) reversalFailure).getMessage();
                        } else if (reversalFailure instanceof ReversalFailure.InvalidStatus) {
                            status = ErrorStatus.invalid_code;
                        }
                        Map response = NearpayLib.ApiResponse(status, message, receipts);
                        sender.send(response);

                    }

                });

    }
}
