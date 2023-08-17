package io.nearpay.reactnative.plugin;

import androidx.annotation.NonNull;

import android.content.Context;

import android.util.Log;

import java.util.Map;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.bridge.ReadableMap;

import io.nearpay.reactnative.plugin.common.PluginProvider;
import io.nearpay.reactnative.plugin.common.operations.BaseOperation;
import io.nearpay.reactnative.plugin.common.operations.OperatorFactory;
import io.nearpay.reactnative.plugin.common.sender.NearpaySender;
import io.nearpay.reactnative.plugin.common.filter.ArgsFilter;
import io.nearpay.sdk.NearPay;
import io.nearpay.sdk.utils.enums.AuthenticationData;

import com.google.gson.Gson;

@ReactModule(name = NearpaySdkModule.NAME)
public class NearpaySdkModule extends ReactContextBaseJavaModule {
  public static final String NAME = "NearpaySdk";
  private NearPay nearPay;
  private Context context;
  private String jwtKey = "jwt";
  private String timeOutDefault = "10";
  private String authTypeShared = "";
  private String authValueShared = "";
  PluginProvider provider = new PluginProvider();
  public OperatorFactory operatorFactory = new OperatorFactory(provider);

  public NearpaySdkModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.provider.getNearpayLib().context = reactContext.getApplicationContext();

  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  public AuthenticationData getAuthType(String authType, String inputValue) {
    AuthenticationData authentication = authType.equals("userenter") ? AuthenticationData.UserEnter.INSTANCE
        : authType.equals("email") ? new AuthenticationData.Email(inputValue)
            : authType.equals("mobile") ? new AuthenticationData.Mobile(inputValue)
                : authType.equals(jwtKey) ? new AuthenticationData.Jwt(inputValue)
                    : AuthenticationData.UserEnter.INSTANCE;
    return authentication;
  }

  public boolean isAuthInputValidation(String authType, String inputValue) {
    boolean isAuthValidate = authType.equals("userenter") ? true : inputValue == "" ? false : true;
    return isAuthValidate;
  }

  private void runOperation(String operationName, ReadableMap params, Promise reactPromise) {
    Log.i("ReactNative", "=-=-=-=-=-=-= -=-=-=-=-=-= -=-=-=-=-= " + operationName);
    // Map args = NearPayUtil.toMap(params);
    // NearpaySender sender = new CompletableFuture<>();
    // provider.getArgsFilter().filter(args);
    //
    // promise.thenAccept(res -> {
    // // importtant: we must return a string, because react native doesnt support
    // maps
    // // to be sent like flutter
    // reactPromise.resolve(this.toJson(res));
    // });
    //
    // BaseOperation operation = operatorFactory.getOperation(operationName)
    // .orElseThrow(() -> new IllegalArgumentException("Invalid Operator"));
    //
    // operation.run(args, promise);

    Map args = NearPayUtil.toMap(params);
//    provider.getArgsFilter().filter(args);

    ArgsFilter filter = new ArgsFilter(args);

    NearpaySender sender = (message) -> {
      // TODO: revise types
      reactPromise.resolve(this.toJson((Map) message));
    };

    BaseOperation operation = operatorFactory.getOperation(operationName)
        .orElseThrow(() -> new IllegalArgumentException("Invalid Operation"));

    operation.run(filter, sender);

  }

  @ReactMethod
  public void initialize(ReadableMap params, Promise reactPromise) {
    runOperation("initialize", params, reactPromise);

  }

  @ReactMethod
  public void purchase(ReadableMap params, Promise reactPromise) {
    runOperation("purchase", params, reactPromise);

  }

  private static String toJson(Map<String, Object> paramMap) {
    Gson gson = new Gson();
    return gson.toJson(paramMap);
  }

  @ReactMethod
  private void refund(ReadableMap params, Promise reactPromise) {
    runOperation("refund", params, reactPromise);

  }

  @ReactMethod
  private void reconcile(ReadableMap params, Promise reactPromise) {
    runOperation("reconcile", params, reactPromise);

  }

  @ReactMethod
  private void reverse(ReadableMap params, Promise reactPromise) {
    runOperation("reverse", params, reactPromise);

  }

  @ReactMethod
  private void logout(ReadableMap params, Promise reactPromise) {

    runOperation("logout", params, reactPromise);

  }

  @ReactMethod
  private void setup(ReadableMap params, Promise reactPromise) {
    runOperation("setup", params, reactPromise);

  }

  @ReactMethod
  public void session(ReadableMap params, Promise reactPromise) {
    runOperation("session", params, reactPromise);
  }

  @ReactMethod
  public void updateAuthentication(ReadableMap params, Promise reactPromise) {
    runOperation("updateAuthentication", params, reactPromise);
  }

  @ReactMethod
  public void receiptToImage(ReadableMap params, Promise reactPromise) {
    runOperation("receiptToImage", params, reactPromise);

    // JSONObject options = NearPayUtil.readableMapToJson(params);
  }

  // =-=-=- Queries -=-=-=
  @ReactMethod
  public void getTransaction(ReadableMap params, Promise reactPromise) {
    runOperation("getTransaction", params, reactPromise);
  }

  @ReactMethod
  public void getTransactions(ReadableMap params, Promise reactPromise) {
    runOperation("getTransactions", params, reactPromise);
  }

  @ReactMethod
  public void getReconciliation(ReadableMap params, Promise reactPromise) {
    runOperation("getReconciliation", params, reactPromise);
  }

  @ReactMethod
  public void getReconciliations(ReadableMap params, Promise reactPromise) {
    runOperation("getReconciliations", params, reactPromise);
  }



}
