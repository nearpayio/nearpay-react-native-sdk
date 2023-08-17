package io.nearpay.reactnative.plugin.common.operations;



import io.nearpay.reactnative.plugin.common.PluginProvider;
import io.nearpay.reactnative.plugin.common.sender.NearpaySender;
import io.nearpay.reactnative.plugin.common.filter.ArgsFilter;

public class BaseOperation {
    protected PluginProvider provider;

    public BaseOperation(PluginProvider provider) {
        this.provider = provider;
    }

    public void run(ArgsFilter filter, NearpaySender sender) {

    }
}
