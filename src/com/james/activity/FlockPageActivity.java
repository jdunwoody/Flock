package com.james.activity;

import android.app.Activity;
import android.os.Bundle;
import android.view.MotionEvent;
import android.view.View;
import android.view.View.OnTouchListener;

import com.james.view.CustomDrawableView;

public class FlockPageActivity extends Activity implements OnTouchListener {
    private CustomDrawableView view;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        view = new CustomDrawableView(this);
        setContentView(view);

        view.setOnTouchListener(this);
    }

    public boolean onTouch(View baseView, MotionEvent event) {
        CustomDrawableView view = (CustomDrawableView) baseView;
        view.touched(event.getX(), event.getY());
        return true;
    }
}
