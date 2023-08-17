package io.nearpay.reactnative.plugin.common.operations;

import androidx.annotation.NonNull;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import io.nearpay.reactnative.plugin.common.status.ErrorStatus;
import io.nearpay.reactnative.plugin.common.NearpayLib;
import io.nearpay.reactnative.plugin.common.PluginProvider;
import io.nearpay.reactnative.plugin.common.sender.NearpaySender;
import io.nearpay.reactnative.plugin.common.filter.ArgsFilter;
import io.nearpay.sdk.data.models.TransactionReceipt;
import io.nearpay.sdk.utils.enums.GetDataFailure;
import io.nearpay.sdk.utils.enums.TransactionData;
import io.nearpay.sdk.utils.listeners.GetTransactionListener;

public class GetTransactionOperation extends BaseOperation {

  public GetTransactionOperation(PluginProvider provider) {
    super(provider);

  }

  @Override
  public void run(ArgsFilter filter, NearpaySender sender) {
    String trUuid = filter.getTransactionUuid();

    provider.getNearpayLib().nearpay.getTransactionByUuid(trUuid, new GetTransactionListener() {
      @Override
      public void onSuccess(@NonNull TransactionData transactionData) {
        Map toSend = NearpayLib.QueryResponse(ErrorStatus.success_code, null, transactionData);
        sender.send(toSend);

      }

      @Override
      public void onFailure(@NonNull GetDataFailure getDataFailure) {
        int status = ErrorStatus.general_failure_code;
        String message = null;
        List<TransactionReceipt> receipts = null;

        if (getDataFailure instanceof GetDataFailure.FailureMessage) {
          status = ErrorStatus.failure_code;
          message = ((GetDataFailure.FailureMessage) getDataFailure).getMessage();
        } else if (getDataFailure instanceof GetDataFailure.AuthenticationFailed) {
          status = ErrorStatus.auth_failed_code;
          message = ((GetDataFailure.AuthenticationFailed) getDataFailure).getMessage();
        } else if (getDataFailure instanceof GetDataFailure.InvalidStatus) {
          status = ErrorStatus.invalid_code;
        }
        Map response = NearpayLib.QueryResponse(status, message, new ArrayList());
        sender.send(response);

      }

    });
  }
}
