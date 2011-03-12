package com.james;

import android.app.Activity;
import android.os.Bundle;

public class FlockPageActivity extends Activity {
    CustomDrawableView mCustomDrawableView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mCustomDrawableView = new CustomDrawableView(this);

        setContentView(mCustomDrawableView);
    }
}
