package com.gas_app

import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

    override fun getMainComponentName(): String = "gas_engineer"

    // 🔥 This is the magic to switch the splash theme to the main theme
    override fun onCreate(savedInstanceState: Bundle?) {
        // Set normal theme AFTER splash is shown

        super.onCreate(savedInstanceState)
    }


    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}