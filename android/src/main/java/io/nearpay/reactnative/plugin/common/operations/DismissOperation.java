package io.nearpay.reactnative.plugin.common.operations;

import androidx.annotation.NonNull;

import java.util.Map;

import io.nearpay.reactnative.plugin.common.NearpayLib;
import io.nearpay.reactnative.plugin.common.PluginProvider;
import io.nearpay.reactnative.plugin.common.filter.ArgsFilter;
import io.nearpay.reactnative.plugin.common.sender.NearpaySender;
import io.nearpay.reactnative.plugin.common.status.ErrorStatus;
import io.nearpay.sdk.utils.enums.DismissFailure;
import io.nearpay.sdk.utils.listeners.DismissListener;

public class DismissOperation extends BaseOperation {
  public DismissOperation(PluginProvider provider) {
    super(provider);
  }

  @Override
  public void run(ArgsFilter filter, NearpaySender sender) {
    provider.getNearpayLib().nearpay.dismiss(new DismissListener() {
      @Override
      public void onDismiss(boolean b) {
        Map toSend = NearpayLib.ApiResponse(ErrorStatus.success_code, null, true);
        sender.send(toSend);
      }

      @Override
      public void onDismissFailure(@NonNull DismissFailure dismissFailure) {
        if (dismissFailure instanceof DismissFailure.GeneralFailure) {
          int status = ErrorStatus.auth_failed_code;
          String message = ((DismissFailure.GeneralFailure) dismissFailure).getMessage();
          Map response = NearpayLib.ApiResponse(status, message, null);
          sender.send(response);
        }
      }
    });
  }
}
