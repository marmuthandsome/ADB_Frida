Java.perform(function () {  
    // Hooking TrustManagerImpl for SSL pinning bypass  
    var TrustManagerImpl = Java.use('com.android.org.conscrypt.TrustManagerImpl');  
    TrustManagerImpl.checkTrustedRecursive.implementation = function (a1, a2, a3, a4, a5, a6) {  
        console.log('[*] Bypassing SSL Pinning: TrustManagerImpl.checkTrustedRecursive() called');  
        // Return an empty ArrayList to bypass the check  
        var arrayList = Java.use("java.util.ArrayList");  
        var k = arrayList.$new();  
        return k;  
    };  
  
    // Hooking SSLContext to bypass SSL pinning  
    var SSLContext = Java.use('javax.net.ssl.SSLContext');  
    SSLContext.init.overload('javax.net.ssl.KeyManager[]', 'javax.net.ssl.TrustManager[]', 'java.security.SecureRandom').implementation = function (keyManager, trustManager, secureRandom) {  
        console.log('[*] Bypassing SSL Pinning: SSLContext.init() called');  
        // Create a TrustManager that does not validate certificate chains  
        var TrustManager = Java.use('javax.net.ssl.X509TrustManager');  
        var trustManager = Java.registerClass({  
            name: 'com.example.TrustManager',  
            implements: [TrustManager],  
            methods: {  
                checkClientTrusted: function (chain, authType) {},  
                checkServerTrusted: function (chain, authType) {},  
                getAcceptedIssuers: function () {  
                    return [];  
                }  
            }  
        });  
        this.init(keyManager, [trustManager.$new()], secureRandom);  
    };  
  
    // Hooking HttpsURLConnection  
    var HttpsURLConnection = Java.use('javax.net.ssl.HttpsURLConnection');  
    HttpsURLConnection.setSSLSocketFactory.implementation = function (socketFactory) {  
        console.log('[*] Bypassing SSL Pinning: HttpsURLConnection.setSSLSocketFactory() called');  
        return this.setSSLSocketFactory(socketFactory);  
    };  
  
    // Hooking OkHttp  
    var OkHttpClientBuilder = Java.use('okhttp3.OkHttpClient$Builder');  
    OkHttpClientBuilder.build.implementation = function () {  
        console.log('[*] Bypassing SSL Pinning: OkHttpClientBuilder.build() called');  
        var client = this.build();  
        var hostnameVerifier = Java.use('javax.net.ssl.HostnameVerifier');  
        var allHostsValid = Java.registerClass({  
            name: 'com.example.AllHostsValid',  
            implements: [hostnameVerifier],  
            methods: {  
                verify: function (hostname, session) {  
                    return true; // Accept all hostnames  
                }  
            }  
        });  
        client.setHostnameVerifier(allHostsValid.$new());  
        return client;  
    };  
  
    // Hooking Retrofit  
    var Retrofit = Java.use('retrofit2.Retrofit');  
    Retrofit.create.implementation = function (service) {  
        console.log('[*] Bypassing SSL Pinning: Retrofit.create() called');  
        return this.create(service);  
    };  
  
    // Hooking Volley  
    var HurlStack = Java.use('com.android.volley.toolbox.HurlStack');  
    HurlStack.performRequest.implementation = function (request) {  
        console.log('[*] Bypassing SSL Pinning: HurlStack.performRequest() called');  
        return this.performRequest(request);  
    };  
  
    // Hooking Apache HttpClient  
    var HttpClient = Java.use('org.apache.http.impl.client.DefaultHttpClient');  
    HttpClient.execute.implementation = function (request) {  
        console.log('[*] Bypassing SSL Pinning: DefaultHttpClient.execute() called');  
        return this.execute(request);  
    };  
  
    // Hooking AndroidHttpClient  
    var AndroidHttpClient = Java.use('android.net.http.AndroidHttpClient');  
    AndroidHttpClient.execute.implementation = function (request) {  
        console.log('[*] Bypassing SSL Pinning: AndroidHttpClient.execute() called');  
        return this.execute(request);  
    };  
  
    // Hooking other libraries as necessary  
    // Add additional hooks for libraries like 'HttpURLConnection', etc.  
  
    console.log('[*] SSL Pinning Bypass Script Loaded Successfully');  
});  

