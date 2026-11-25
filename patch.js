// Run automatically by "npm run setup": lets sounds play without a tap, and gives the game a real
// full-screen mode (hides the status bar + navigation bar, forces landscape) through window.AndroidFS.
const fs=require("fs"),path=require("path");
const f=path.join("android","app","src","main","java","com","custom","chessman","MainActivity.java");
if(!fs.existsSync(f)){console.log("MainActivity.java not found - skipping patch");process.exit(0)}
fs.writeFileSync(f,`package com.custom.chessman;

import android.content.pm.ActivityInfo;
import android.os.Build;
import android.os.Bundle;
import android.view.WindowManager;
import android.webkit.JavascriptInterface;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getBridge().getWebView().getSettings().setMediaPlaybackRequiresUserGesture(false);
        getBridge().getWebView().addJavascriptInterface(new Object() {
            @JavascriptInterface
            public void set(final boolean on) {
                runOnUiThread(new Runnable() {
                    public void run() {
                        WindowInsetsControllerCompat c = WindowCompat.getInsetsController(getWindow(), getWindow().getDecorView());
                        if (on) {
                            if (Build.VERSION.SDK_INT >= 28) {
                                getWindow().getAttributes().layoutInDisplayCutoutMode = WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES;
                            }
                            c.setSystemBarsBehavior(WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE);
                            c.hide(WindowInsetsCompat.Type.systemBars());
                            setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_SENSOR_LANDSCAPE);
                        } else {
                            c.show(WindowInsetsCompat.Type.systemBars());
                            setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_UNSPECIFIED);
                        }
                    }
                });
            }
        }, "AndroidFS");
    }
}
`);
console.log("MainActivity patched");
