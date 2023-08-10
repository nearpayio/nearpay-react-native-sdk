package io.nearpay.reactnative.plugin.operations;

import androidx.annotation.NonNull;

import java.util.Map;
import java.util.concurrent.CompletableFuture;

import io.nearpay.reactnative.plugin.PluginProvider;
import io.nearpay.reactnative.plugin.sender.NearpaySender;

public class BaseOperation {
    protected PluginProvider provider;

    public BaseOperation(PluginProvider provider) {
        this.provider = provider;
    }

    public void run(Map args, NearpaySender sender) {

    }
}
