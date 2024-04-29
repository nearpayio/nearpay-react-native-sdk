
package io.nearpay.reactnative.plugin.common.operations;

import androidx.annotation.NonNull;

import java.util.Map;
import java.util.UUID;

import io.nearpay.reactnative.plugin.common.NearpayLib;
import io.nearpay.reactnative.plugin.common.PluginProvider;
import io.nearpay.reactnative.plugin.common.filter.ArgsFilter;
import io.nearpay.reactnative.plugin.common.sender.NearpaySender;
import io.nearpay.reactnative.plugin.common.status.ErrorStatus;
import io.nearpay.sdk.utils.enums.CancelFailure;
import io.nearpay.sdk.utils.enums.SessionFailure;
import io.nearpay.sdk.utils.enums.TransactionData;
import io.nearpay.sdk.utils.listeners.CancelListener;

public class RequestCancelOperation extends BaseOperation {

  public RequestCancelOperation(PluginProvider provider) { super(provider); }

  @Override
  public void run(ArgsFilter filter, NearpaySender sender) {
    Boolean cancelWithReverse = filter.getCancelWithReverse();
    String transactionId = filter.getTransactionId();

    provider.getNearpayLib().nearpay.requestCancel(cancelWithReverse, transactionId, new CancelListener() {
      @Override
      public void onCancel(boolean b) {
        Map<String, Object> responseDict = NearpayLib.ApiResponse(
          ErrorStatus.success_code,
          "Cancel Success", b);
        sender.send(responseDict);
      }

      @Override
      public void onCancelWithReverse(boolean b) {
        Map<String, Object> responseDict = NearpayLib.ApiResponse(
          ErrorStatus.success_code,
          "Cancel With Reverse Success", b);
        sender.send(responseDict);
      }

      @Override
      public void onCancelFailure(@NonNull CancelFailure cancelFailure) {
        int status = ErrorStatus.general_failure_code;
        String message = null;

        if (cancelFailure instanceof CancelFailure.GeneralFailure) {
          status = ErrorStatus.general_failure_code;

        }
        Map response = NearpayLib.ApiResponse(status, message);
        sender.send(response);
      }
    });
  }
}
