package io.nearpay.reactnative.plugin.operations;

import android.graphics.Bitmap;
import android.util.Log;

import androidx.annotation.Nullable;

import com.google.gson.Gson;

import java.util.Map;

import io.nearpay.reactnative.plugin.PluginProvider;
import io.nearpay.reactnative.plugin.sender.NearpaySender;
import io.nearpay.reactnative.plugin.util.ArgsFilter;
import io.nearpay.sdk.data.models.TransactionReceipt;
import io.nearpay.sdk.utils.ReceiptUtilsKt;
import io.nearpay.sdk.utils.listeners.BitmapListener;

public class ReceiptToImageOperation extends BaseOperation {

    public ReceiptToImageOperation(PluginProvider provider) {
        super(provider);
    }

    @Override
    public void run(Map args, NearpaySender sender) {
        ArgsFilter filtered = new ArgsFilter(args);

        String stringfiedReceipt = filtered.getReceipt();

        TransactionReceipt receipt = new Gson().fromJson(stringfiedReceipt, TransactionReceipt.class);
      Log.i("ReactNative","=-=-=-=-=-=-=-=receipt: ");
      Log.i("ReactNative", receipt.toString());

        try {
            ReceiptUtilsKt.toImage(receipt, provider.getNearpayLib().context, 100, 10, bitmap -> {
              Log.i("ReactNative","=-=-=-=-=-=-=-=bitmap: ");
              Log.i("ReactNative",bitmap.toString());
            });
        } catch (Exception e) {

            // we still ge the error:
            // - android.util.AndroidRuntimeException: Calling startActivity() from outside
            // of an Activity
            // context requires the FLAG_ACTIVITY_NEW_TASK flag. Is this really what you
            // want?
          Log.i("ReactNative", "=-=-=-==-error in bitmap : ");
          Log.i("ReactNative", e.toString());

        }
    }
}
