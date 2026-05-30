package com.vietnews.app;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;

public class LauncherActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        Intent intent = new Intent(this, 
            com.google.androidbrowserhelper.trusted.LauncherActivity.class);
        intent.setData(Uri.parse("https://giangnam0201.github.io/VietNews/"));
        startActivity(intent);
        finish();
    }
}
