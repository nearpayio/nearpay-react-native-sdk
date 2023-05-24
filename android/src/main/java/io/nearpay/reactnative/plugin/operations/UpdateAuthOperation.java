package io.nearpay.reactnative.plugin.operations;

import androidx.annotation.NonNull;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

import io.nearpay.reactnative.plugin.ErrorStatus;
import io.nearpay.reactnative.plugin.NearpayLib;
import io.nearpay.reactnative.plugin.PluginProvider;
import io.nearpay.sdk.utils.enums.AuthenticationData;
import io.nearpay.sdk.utils.enums.SetupFailure;
import io.nearpay.sdk.utils.listeners.SetupListener;

public class UpdateAuthOperation extends BaseOperation {
    public UpdateAuthOperation(PluginProvider provider) {
        super(provider);
    }

    @Override
    public void run(Map args, CompletableFuture<Map> promise) {
      String authvalue = args.get("authvalue") == null ? "" : args.get("authvalue").toString();
      String authType = args.get("authtype") == null ? "" : args.get("authtype").toString();
      AuthenticationData authData = NearpayLib.getAuthType(authType, authvalue);
      provider.getNearpayLib().nearpay.updateAuthentication(authData);
      promise.complete(new HashMap<>());
    }
}
