package io.nearpay.reactnative.plugin;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import android.content.Context;

import java.util.List;
import java.util.Locale;
import android.util.Log;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.CompletableFuture;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.bridge.ReadableMap;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import io.nearpay.reactnative.plugin.operations.BaseOperation;
import io.nearpay.reactnative.plugin.operations.InitializeOperation;
import io.nearpay.reactnative.plugin.operations.OperatorFactory;
import io.nearpay.sdk.Environments;
import io.nearpay.sdk.NearPay;
import io.nearpay.sdk.utils.enums.AuthenticationData;
import io.nearpay.sdk.data.models.TransactionReceipt;
import io.nearpay.sdk.utils.enums.PurchaseFailure;
import io.nearpay.sdk.utils.enums.RefundFailure;
import io.nearpay.sdk.utils.enums.StatusCheckError;
import io.nearpay.sdk.utils.listeners.PurchaseListener;
import io.nearpay.sdk.utils.listeners.RefundListener;
import io.nearpay.sdk.utils.enums.ReconcileFailure;
import io.nearpay.sdk.data.models.Merchant;
import io.nearpay.sdk.data.models.LocalizationField;
import io.nearpay.sdk.data.models.NameField;
import io.nearpay.sdk.data.models.LabelField;
import io.nearpay.sdk.data.models.ReconciliationReceipt;
import io.nearpay.sdk.data.models.ReconciliationDetails;
import io.nearpay.sdk.data.models.ReconciliationLabelField;
import io.nearpay.sdk.data.models.ReconciliationSchemes;
import io.nearpay.sdk.utils.listeners.ReconcileListener;
import io.nearpay.sdk.utils.enums.ReversalFailure;
import io.nearpay.sdk.utils.enums.LogoutFailure;
import io.nearpay.sdk.utils.listeners.LogoutListener;
import io.nearpay.sdk.utils.listeners.ReversalListener;
import com.google.gson.Gson;
import java.util.ArrayList;
import io.nearpay.sdk.utils.listeners.SetupListener;
import io.nearpay.sdk.utils.enums.SetupFailure;
import io.nearpay.sdk.data.models.Session;
import io.nearpay.sdk.utils.enums.SessionFailure;
import io.nearpay.sdk.utils.listeners.SessionListener;

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
    Map args = NearPayUtil.toMap(params);
    CompletableFuture<Map> promise = new CompletableFuture<>();
    provider.getArgsFilter().filter(args);

    promise.thenAccept(res -> {
      // importtant: we must return a string, because react native doesnt support maps
      // to be sent like flutter
      reactPromise.resolve(this.toJson(res));
    });

    BaseOperation operation = operatorFactory.getOperation(operationName)
        .orElseThrow(() -> new IllegalArgumentException("Invalid Operator"));

    operation.run(args, promise);
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

    // JSONObject options = NearPayUtil.readableMapToJson(params);
    // if (options != null) {
    // String sessionID = options.optString("sessionID", "");
    // String finishTimeout = options.optString("finishTimeout", timeOutDefault);
    // Long timeout = Long.valueOf(finishTimeout);
    // Boolean isEnableUI = options.optBoolean("isEnableUI", true);
    // Boolean isEnableReverse = options.optBoolean("isEnableReversal", true);

    // if (sessionID == "") {
    // Map<String, Object> paramMap =
    // commonResponse(ErrorStatus.invalid_argument_code, "SessionID parameter
    // missing");
    // promise.resolve(toJson(paramMap));
    // } else {
    // setSession(sessionID, isEnableUI, isEnableReverse, timeout, promise);
    // }
    // } else {
    // Map<String, Object> paramMap =
    // commonResponse(ErrorStatus.invalid_argument_code, "SessionID parameter
    // missing");
    // promise.resolve(toJson(paramMap));
    // }
  }

  @ReactMethod
  public void receiptToImage(ReadableMap params, Promise promise) {
    // JSONObject options = NearPayUtil.readableMapToJson(params);
  }

}
