package io.nearpay.reactnative.plugin.common.operations;

import android.graphics.Bitmap;

import com.google.gson.Gson;

import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.List;

import io.nearpay.reactnative.plugin.common.NearpayLib;
import io.nearpay.reactnative.plugin.common.PluginProvider;
import io.nearpay.reactnative.plugin.common.filter.ArgsFilter;
import io.nearpay.reactnative.plugin.common.sender.NearpaySender;
import io.nearpay.sdk.data.models.ReconciliationReceipt;
import io.nearpay.sdk.data.models.TransactionReceipt;
import io.nearpay.sdk.utils.ReceiptUtilsKt;

public class ReconciliationReceiptToImageOperation extends BaseOperation {
    public ReconciliationReceiptToImageOperation(PluginProvider provider) {
        super(provider);
    }

    @Override
    public void run(ArgsFilter filter, NearpaySender sender) {
//        get args
        String stringfiedReceipt = filter.getReceipt();
        int receiptWidth = filter.getReceiptWidth();
        int receiptFontSize= filter. getReceiptFontSize();

//        create receipt object
      ReconciliationReceipt[] receipts = new Gson().fromJson(stringfiedReceipt, ReconciliationReceipt[].class);
      if (receipts.length == 0) {
        sender.send(NearpayLib.ApiResponse(400, "Receipt array is empty", null));
        return;
      }
      // Use the first receipt from the array
      ReconciliationReceipt receipt = receipts[0];
//        convert receipt to image
        ReceiptUtilsKt.toImage(receipt, provider.getNearpayLib().context, receiptWidth, receiptFontSize, bitmap -> {

//            convert (Bitmap) type to fit what flutter understand (byte)
            ByteArrayOutputStream stream = new ByteArrayOutputStream();
            bitmap.compress(Bitmap.CompressFormat.PNG, 100, stream);
            byte[] byteArray = stream.toByteArray();
            bitmap.recycle();
          List<Integer> byteList = new ArrayList<>();
          for (byte b : byteArray) {
            byteList.add(b & 0xFF); // convert signed byte to unsigned int
          }

          sender.send(NearpayLib.ApiResponse(200, "", byteList));
        });
    }
}