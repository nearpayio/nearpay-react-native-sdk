package io.nearpay.reactnative.plugin.common;

import io.nearpay.reactnative.plugin.common.filter.ArgsFilter;
import io.nearpay.reactnative.plugin.common.NearpayLib;

public class PluginProvider {
    private NearpayLib nearpayLib;
    private ArgsFilter argsFilter;

    public PluginProvider() {
        nearpayLib = new NearpayLib(this);
        argsFilter = new ArgsFilter(this);
    }

    public NearpayLib getNearpayLib() {
        return nearpayLib;
    }

    public ArgsFilter getArgsFilter() {
        return argsFilter;
    }
}
