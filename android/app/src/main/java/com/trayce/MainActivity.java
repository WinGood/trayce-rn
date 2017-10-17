package com.trayce;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.reactnativecomponent.splashscreen.RCTSplashScreen;

public class MainActivity extends ReactActivity {
  public static ReactActivity activity;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    RCTSplashScreen.openSplashScreen(this);
    super.onCreate(savedInstanceState);
  }

  /**
   * Returns the name of the main component registered from JavaScript.
   * This is used to schedule rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    activity = this;

    return "trayce";
  }
}
