package com.movieseat.app;

import com.getcapacitor.BridgeActivity;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;

public class MainActivity extends BridgeActivity {
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    // ATTENTION: This was auto-generated to handle app links.
    Intent appLinkIntent = getIntent();
    String appLinkAction = appLinkIntent.getAction();
    Uri appLinkData = appLinkIntent.getData();

    android.webkit.CookieManager cookieManager = android.webkit.CookieManager.getInstance();

    cookieManager.setAcceptCookie(true);
    cookieManager.acceptCookie();
    cookieManager.setAcceptFileSchemeCookies(true);
    cookieManager.getInstance().setAcceptCookie(true);
    cookieManager.getCookie("https://moviese.at");
  }
}
