package io.nearpay.reactnative.plugin.operations;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

import io.nearpay.reactnative.plugin.ErrorStatus;
import io.nearpay.reactnative.plugin.NearpayLib;
import io.nearpay.reactnative.plugin.PluginProvider;
import io.nearpay.reactnative.plugin.util.ArgsFilter;
import io.nearpay.sdk.data.models.TransactionBannerList;
import io.nearpay.sdk.data.models.TransactionReceipt;
import io.nearpay.sdk.utils.enums.GetDataFailure;
import io.nearpay.sdk.utils.enums.GetDataFailure;
import io.nearpay.sdk.utils.listeners.GetTransactionListener;
import io.nearpay.sdk.utils.listeners.GetTransactionPageListener;

public class GetTransactionPageOperation extends BaseOperation{

  public GetTransactionPageOperation(PluginProvider provider) {
    super(provider);
  }

  @Override
  public void run(Map args, CompletableFuture<Map> promise) {
    ArgsFilter filter = new ArgsFilter(args);
    String adminPin = filter.getAdminPin();
    int page = filter.getPage();
    int limit = filter.getLimit();

    provider.getNearpayLib().nearpay.getTransactionListPage(adminPin, page, limit, new GetTransactionPageListener() {
      @Override
      public void onSuccess(@Nullable TransactionBannerList transactionBannerList) {
        Map toSend = NearpayLib.QueryResponse(ErrorStatus.success_code, null, transactionBannerList);
        promise.complete(toSend);

      }

      @Override
      public void onFailure(@NonNull GetDataFailure getDataFailure) {
        int status = ErrorStatus.general_failure_code;
        String message = null;


        if (getDataFailure instanceof GetDataFailure.InvalidAdminPin) {
          status = ErrorStatus.invalid_admin_pin;
        } else if (getDataFailure instanceof GetDataFailure.FailureMessage) {
          status = ErrorStatus.failure_code;
          message = ((GetDataFailure.FailureMessage) getDataFailure).getMessage();
        } else if (getDataFailure instanceof GetDataFailure.AuthenticationFailed) {
          status = ErrorStatus.auth_failed_code;
          message = ((GetDataFailure.AuthenticationFailed) getDataFailure).getMessage();
        } else if (getDataFailure instanceof GetDataFailure.InvalidStatus) {
          status = ErrorStatus.invalid_code;
        }
        Map response = NearpayLib.QueryResponse(status, message, new ArrayList());
        promise.complete(response);

      }
    });


  }
}
