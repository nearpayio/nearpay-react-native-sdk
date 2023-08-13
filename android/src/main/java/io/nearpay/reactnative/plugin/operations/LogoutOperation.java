package io.nearpay.reactnative.plugin.operations;

import androidx.annotation.NonNull;

import java.util.Map;
import java.util.concurrent.CompletableFuture;

import io.nearpay.reactnative.plugin.ErrorStatus;
import io.nearpay.reactnative.plugin.NearpayLib;
import io.nearpay.reactnative.plugin.PluginProvider;
import io.nearpay.reactnative.plugin.sender.NearpaySender;
import io.nearpay.sdk.utils.enums.LogoutFailure;
import io.nearpay.sdk.utils.listeners.LogoutListener;

public class LogoutOperation extends BaseOperation {

    public LogoutOperation(PluginProvider provider) {
        super(provider);
    }

    private void doLogoutAction(NearpaySender sender) {
        provider.getNearpayLib().nearpay.logout(new LogoutListener() {
            @Override
            public void onLogoutCompleted() {
                // write your message here
                Map<String, Object> paramMap = NearpayLib.commonResponse(ErrorStatus.success_code,
                        "Logout Successfully");
                sender.send(paramMap);
            }

            @Override
            public void onLogoutFailed(@NonNull LogoutFailure logoutFailure) {
                if (logoutFailure instanceof LogoutFailure.AlreadyLoggedOut) {
                    // when the user is already logged out
                    Map<String, Object> paramMap = NearpayLib.commonResponse(ErrorStatus.logout_already_code,
                            "User already logout");
                    sender.send(paramMap);
                } else if (logoutFailure instanceof LogoutFailure.GeneralFailure) {
                    // when the error is general error
                    Map<String, Object> paramMap = NearpayLib.commonResponse(ErrorStatus.general_failure_code,
                            ErrorStatus.general_messsage);
                    sender.send(paramMap);
                }
            }
        });
    }

    @Override
    public void run(Map args, NearpaySender sender) {
        doLogoutAction(sender);
    }
}
