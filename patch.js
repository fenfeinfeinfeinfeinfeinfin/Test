// Lets the game's music/sounds play without a tap first (run automatically by "npm run setup").
const fs=require("fs"),path=require("path");
const f=path.join("android","app","src","main","java","com","custom","chessman","MainActivity.java");
if(!fs.existsSync(f)){console.log("MainActivity.java not found - skipping patch");process.exit(0)}
fs.writeFileSync(f,`package com.custom.chessman;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getBridge().getWebView().getSettings().setMediaPlaybackRequiresUserGesture(false);
    }
}
`);
console.log("MainActivity patched");
