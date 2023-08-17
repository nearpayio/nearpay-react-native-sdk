package io.nearpay.reactnative.plugin.common.operations;

import java.util.Locale;
import java.util.Map;

import io.nearpay.reactnative.plugin.common.status.ErrorStatus;
import io.nearpay.reactnative.plugin.common.NearpayLib;
import io.nearpay.reactnative.plugin.common.PluginProvider;
import io.nearpay.reactnative.plugin.common.sender.NearpaySender;
import io.nearpay.reactnative.plugin.common.filter.ArgsFilter;
import io.nearpay.sdk.Environments;
import io.nearpay.sdk.NearPay;

public class InitializeOperation extends BaseOperation {

    public InitializeOperation(PluginProvider provider) {
        super(provider);
    }

    // public Map doInitialization(ArgsFilter filter) {
    // String authvalue = args.get("authvalue") == null ? "" :
    // args.get("authvalue").toString();
    // String authType = args.get("authtype") == null ? "" :
    // args.get("authtype").toString();
    // this.provider.getNearpayLib().authTypeShared = authType;
    // this.provider.getNearpayLib().authValueShared = authvalue;
    // boolean isAuthValidated =
    // this.provider.getNearpayLib().isAuthInputValidation(authType, authvalue);
    // String localeStr = args.get("locale") != null ? args.get("locale").toString()
    // : "default";
    // Locale locale = localeStr.equals("default") ? Locale.getDefault() :
    // Locale.getDefault();
    // String environmentStr = args.get("environment") == null ? "sandbox"
    // : args.get("environment").toString();
    // Environments env = environmentStr.equals("sandbox") ? Environments.SANDBOX
    // : environmentStr.equals("production") ? Environments.PRODUCTION :
    // Environments.TESTING;

    // Map<String, Object> response;

    // if (!isAuthValidated) {
    // response = NearpayLib.commonResponse(ErrorStatus.invalid_argument_code,
    // "Authentication parameter missing");
    // } else {
    // this.provider.getNearpayLib().nearpay = new NearPay(
    // this.provider.getNearpayLib().context,
    // this.provider.getNearpayLib().getAuthType(authType, authvalue),
    // locale,
    // env);

    // response = NearpayLib.commonResponse(ErrorStatus.success_code,
    // "NearPay initialized");
    // }

    // return response;

    // }

    @Override
    public void run(ArgsFilter filter, NearpaySender sender) {
        String authValue = filter.getAuthValue();
        String authType = filter.getAuthType();
        Locale locale = filter.getLocale();
        Environments env = filter.getEnviroment();

        this.provider.getNearpayLib().authTypeShared = authType;
        this.provider.getNearpayLib().authValueShared = authValue;
        boolean isAuthValidated = this.provider.getNearpayLib().isAuthInputValidation(authType, authValue);

        Map<String, Object> response;

        if (!isAuthValidated) {
            response = NearpayLib.commonResponse(ErrorStatus.invalid_argument_code,
                    "Authentication parameter missing");
        } else {
            this.provider.getNearpayLib().nearpay = new NearPay(
                    this.provider.getNearpayLib().context,
                    this.provider.getNearpayLib().getAuthType(authType, authValue),
                    locale,
                    env);

            response = NearpayLib.commonResponse(ErrorStatus.success_code,
                    "NearPay initialized");
        }

        sender.send(response);
    }
}
