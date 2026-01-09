package io.nearpay.reactnative.plugin.common.operations;


import java.util.HashMap;


import io.nearpay.reactnative.plugin.common.NearpayLib;
import io.nearpay.reactnative.plugin.common.PluginProvider;
import io.nearpay.reactnative.plugin.common.sender.NearpaySender;
import io.nearpay.reactnative.plugin.common.filter.ArgsFilter;
import io.nearpay.sdk.utils.enums.AuthenticationData;

public class UpdateAuthOperation extends BaseOperation {
  public UpdateAuthOperation(PluginProvider provider) {
    super(provider);
  }

  @Override
  public void run(ArgsFilter filter, NearpaySender sender) {
    String authValue = filter.getAuthValue();
    String authType = filter.getAuthType();
    String authTid = filter.getAuthTid();
    AuthenticationData authData = NearpayLib.getAuthType(authType, authValue, authTid);
    provider.getNearpayLib().nearpay.updateAuthentication(authData);
    sender.send(new HashMap<>());
  }
}
