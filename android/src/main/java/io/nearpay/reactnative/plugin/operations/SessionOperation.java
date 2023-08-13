package io.nearpay.reactnative.plugin.operations;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import android.util.Log;

import com.google.gson.Gson;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

import io.nearpay.reactnative.plugin.ErrorStatus;
import io.nearpay.reactnative.plugin.NearpayLib;
import io.nearpay.reactnative.plugin.PluginProvider;
import io.nearpay.reactnative.plugin.sender.NearpaySender;
import io.nearpay.sdk.data.models.Session;
import io.nearpay.sdk.data.models.TransactionReceipt;
import io.nearpay.sdk.utils.ReceiptUtilsKt;
import io.nearpay.sdk.utils.enums.SessionFailure;
import io.nearpay.sdk.utils.listeners.SessionListener;

public class SessionOperation extends BaseOperation {

    public SessionOperation(PluginProvider provider) {
        super(provider);
    }

    private Map sessionToJson(Session session) {
        Gson gson = new Gson(); // Or use new GsonBuilder().create();
        String json = gson.toJson(session); // serializes target to Json return
        Map sessionMap = NearpayLib.JSONStringToMap(json);
        Map response = NearpayLib.commonResponse(ErrorStatus.success_code, "Session Closed");
        response.put("session", sessionMap);
        return response;
    }

    private void doSession(Map args, NearpaySender sender) {
        String sessionID = (String) args.get("sessionID");
        Long finishTimeout = (Long) args.get("finishTimeout");
        Boolean enableReceiptUi = (Boolean) args.get("enableReceiptUi");
        Boolean enableReversal = (Boolean) args.get("enableReversal");
        Boolean enableUiDismiss = (Boolean) args.get("enableUiDismiss");

        provider.getNearpayLib().nearpay.session(sessionID, enableReceiptUi, enableReversal,
                finishTimeout, enableUiDismiss,
                new SessionListener() {
                    @Override
                    public void onSessionClosed(@Nullable Session session) {
                        Map<String, Object> responseDict = sessionToJson(session);
                        sender.send(responseDict);
                    }

                    @Override
                    public void onSessionOpen(@Nullable List<TransactionReceipt> list) {
                        Map response = NearpayLib.ApiResponse(200, "", list);

                        sender.send(response);
                    }

                    @Override
                    public void onSessionFailed(@NonNull SessionFailure sessionFailure) {
                        // Log.i("ReactNative", "=-=-=-=-=-=-=-= session failure =-=-=-=-=-==");

                        if (sessionFailure instanceof SessionFailure.AuthenticationFailed) {
                            // when the authentication is failed
                            String messageResp = ((SessionFailure.AuthenticationFailed) sessionFailure).toString();
                            String message = messageResp != "" && messageResp.length() > 0 ? messageResp
                                    : ErrorStatus.authentication_failed_message;
                            Map<String, Object> paramMap = NearpayLib.commonResponse(ErrorStatus.auth_failed_code,
                                    message);
                            sender.send(paramMap);
                            // if (authTypeShared.equalsIgnoreCase(jwtKey)) {
                            // provider.getNearpayLib().nearpay
                            // .updateAuthentication(getAuthType(authTypeShared, authTypeShared));
                            // }

                        } else if (sessionFailure instanceof SessionFailure.GeneralFailure) {
                            // when there is general error .
                            Map<String, Object> paramMap = NearpayLib.commonResponse(ErrorStatus.general_failure_code,
                                    ErrorStatus.general_messsage);
                            sender.send(paramMap);
                        } else if (sessionFailure instanceof SessionFailure.FailureMessage) {
                            // when there is FailureMessage
                            Map<String, Object> paramMap = NearpayLib.commonResponse(ErrorStatus.failure_code,
                                    ErrorStatus.failure_messsage);
                            sender.send(paramMap);
                        } else if (sessionFailure instanceof SessionFailure.InvalidStatus) {
                            // you can get the status using the following code
                            String messageResp = ((SessionFailure.InvalidStatus) sessionFailure).toString();
                            String message = messageResp != "" && messageResp.length() > 0 ? messageResp
                                    : ErrorStatus.invalid_status_messsage;
                            Map<String, Object> paramMap = NearpayLib.commonResponse(ErrorStatus.invalid_code, message);
                            sender.send(paramMap);
                        }
                    }
                });
    }

    @Override
    public void run(Map args, NearpaySender sender) {
        doSession(args, sender);
    }
}
