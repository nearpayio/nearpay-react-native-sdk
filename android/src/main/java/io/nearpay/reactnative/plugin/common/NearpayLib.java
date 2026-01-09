package io.nearpay.reactnative.plugin.common;

import android.content.Context;

import com.google.gson.Gson;

import java.util.HashMap;
import java.util.Map;

import io.nearpay.reactnative.plugin.common.PluginProvider;
import io.nearpay.sdk.NearPay;
import io.nearpay.sdk.utils.enums.AuthenticationData;

public class NearpayLib {
    private PluginProvider provider;
    public NearPay nearpay;
    public Context context;

    public String authTypeShared = "";
    public String authValueShared = "";
    public String authTidShared = "";

    public NearpayLib(PluginProvider provider) {
        this.provider = provider;
    }

    public static AuthenticationData getAuthType(String authType, String inputValue) {
        return getAuthType(authType, inputValue, null);
    }

    public static AuthenticationData getAuthType(String authType, String inputValue, String tid) {
        boolean hasTid = tid != null && !tid.isEmpty();
        if ("userenter".equals(authType)) {
            return AuthenticationData.UserEnter.INSTANCE;
        }
        if ("email".equals(authType)) {
            return hasTid ? new AuthenticationData.Email(inputValue, tid) : new AuthenticationData.Email(inputValue);
        }
        if ("mobile".equals(authType)) {
            return hasTid ? new AuthenticationData.Mobile(inputValue, tid) : new AuthenticationData.Mobile(inputValue);
        }
        if ("jwt".equals(authType)) {
            return new AuthenticationData.Jwt(inputValue);
        }
        return AuthenticationData.UserEnter.INSTANCE;
    }

    public boolean isAuthInputValidation(String authType, String inputValue) {
        boolean isAuthValidate = authType.equals("userenter") ? true : inputValue == "" ? false : true;
        return isAuthValidate;
    }


    public static Map<String, Object> ApiResponse(int responseCode, String message, Object data) {
        Map<String, Object> paramMap = new HashMap<>();

        Object dataFiltered = data == null ? new HashMap<>() : data;

        paramMap.put("status", responseCode);
        paramMap.put("message", message);
        paramMap.put("result", classToMap(dataFiltered));
        return paramMap;
    }

    public static Map<String, Object> ApiResponse(int responseCode, String message) {
        return  ApiResponse(responseCode, message, new HashMap<>());
    }

    public static Object classToMap(Object obj) {
        // return default hashmap for empty given obj
        if (obj == null) {
            return  new HashMap<>();
        }

        Map tempConvertor = new HashMap<>();
        tempConvertor.put("__", obj);

        Gson gson = new Gson();
        String inString = gson.toJson(tempConvertor);
        Map asMap = gson.fromJson(inString, HashMap.class);
        return asMap.get("__");
    }


}
