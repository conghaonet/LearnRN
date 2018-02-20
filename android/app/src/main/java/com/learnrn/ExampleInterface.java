package com.learnrn;

import android.app.Activity;
import android.content.ContentUris;
import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.provider.ContactsContract;
import android.text.TextUtils;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by haoco on 2018/2/20.
 */

public class ExampleInterface extends ReactContextBaseJavaModule implements LifecycleEventListener {
    private static final String TAG = ExampleInterface.class.getSimpleName();
    private static final int CONTACT_REQUEST_CODE = 1;
    private ReactApplicationContext reactContext;
    Promise interfacePromise;

    public ExampleInterface(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        this.reactContext.addLifecycleEventListener(this);
        this.reactContext.addActivityEventListener(new BaseActivityEventListener() {
            @Override
            public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
                if(requestCode != CONTACT_REQUEST_CODE || resultCode != Activity.RESULT_OK) {
                    return;
                } else {
                    Uri contactData = data.getData();
                    Cursor cursor = activity.managedQuery(contactData, null,null,null,null);
                    cursor.moveToFirst();
                    String toRNMessage = getContactInfo(cursor);
//                    sendMessage(toRNMessage);
                    if(!TextUtils.isEmpty(toRNMessage)) {
                        interfacePromise.resolve(toRNMessage);
                    }
                }
            }
        });
    }
    @Override
    public String getName() {
        return ExampleInterface.class.getSimpleName();
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("MY_NAME", "CONG-HAO");
        return constants;
    }
    @ReactMethod
    public void HandleMessage(String msg, Promise aPromise) {
        String str = "Received message from RN: " + msg;
        Log.i(TAG, str);
        Toast.makeText(this.getReactApplicationContext().getApplicationContext(), str, Toast.LENGTH_LONG).show();

        interfacePromise = aPromise;
        if(msg.toLowerCase().contains("error")) {
            Exception exception = new Exception("Android Exception");
            interfacePromise.reject("error message", exception);
            return;
        }
/*
        String result = "{\"msgType\":\"pickContactResult\", \"displayName\":\"conghao\", \"phoneNumber\":\"13511111111\"}";
        callback.invoke(result);
*/
/*
        Intent intent = new Intent(reactContext, Main2Activity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        reactContext.startActivity(intent);
*/
        Intent intent = new Intent(Intent.ACTION_PICK);
        intent.setType(ContactsContract.Contacts.CONTENT_TYPE);
        Bundle bundle = new Bundle();
        this.reactContext.startActivityForResult(intent, CONTACT_REQUEST_CODE, bundle);
    }

    public void sendMessage(String msg) {
        Log.i(TAG, msg);
        Toast.makeText(this.reactContext, msg, Toast.LENGTH_LONG).show();
        this.reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("AndroidToRNMessage", msg);
    }
    private String getContactInfo(Cursor cursor) {
        try {
//            int maekException = 2/0; //如果打开注释，会制造一个异常，出发reject操作
            String name = "";
            String phoneNumber = "";
            int idColumn = cursor.getColumnIndex(ContactsContract.Contacts._ID);
            String contactId = cursor.getString(idColumn);
            String queryString = ContactsContract.CommonDataKinds.Phone.CONTACT_ID  + "=" + contactId;
            Uri aUri = ContactsContract.CommonDataKinds.Phone.CONTENT_URI;
            Cursor phone = reactContext.getContentResolver().query(aUri, null,queryString, null, null);
            String dn = ContactsContract.Contacts.DISPLAY_NAME;
            String pn = ContactsContract.CommonDataKinds.Phone.NUMBER;
            if(phone.moveToFirst()) {
                for (; !phone.isAfterLast(); phone.moveToNext()) {
                    name = phone.getString(phone.getColumnIndex(dn));
                    phoneNumber = phone.getString(phone.getColumnIndex(pn));
                }
                phone.close();
            }
            String result = "{\"msgType\":\"pickContactResult\", \"displayName\":\""+name+"\", \"phoneNumber\":\""+phoneNumber+"\"}";
            return result;
        } catch (Exception e) {
            interfacePromise.reject("error while get contact.", e);
            return null;
        }
    }

    @Override
    public void onHostResume() {
        Log.d(TAG, "======onHostResume======");
    }

    @Override
    public void onHostPause() {
        Log.d(TAG, "======onHostPause======");
    }

    @Override
    public void onHostDestroy() {
        Log.d(TAG, "======onHostDestroy======");
    }
}
