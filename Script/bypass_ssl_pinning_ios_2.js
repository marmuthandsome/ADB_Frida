// Frida script to bypass SSL pinning in iOS applications  
  
try {  
    Module.ensureInitialized("libboringssl.dylib");  
} catch (err) {  
    console.log("libboringssl.dylib module not loaded. Trying to manually load it.");  
    Module.load("libboringssl.dylib");  
}  
  
var SSL_VERIFY_NONE = 0;  
var ssl_set_custom_verify;  
var ssl_get_psk_identity;  
  
// Define NativeFunction for SSL_set_custom_verify  
ssl_set_custom_verify = new NativeFunction(  
    Module.findExportByName("libboringssl.dylib", "SSL_set_custom_verify"),  
    'void', ['pointer', 'int', 'pointer']  
);  
  
// Define NativeFunction for SSL_get_psk_identity  
ssl_get_psk_identity = new NativeFunction(  
    Module.findExportByName("libboringssl.dylib", "SSL_get_psk_identity"),  
    'pointer', ['pointer']  
);  
  
// Custom callback that does not validate certificates  
function custom_verify_callback_that_does_not_validate(ssl, out_alert) {  
    return SSL_VERIFY_NONE;  
}  
  
// Wrap callback in NativeCallback for Frida  
var ssl_verify_result_t = new NativeCallback(function (ssl, out_alert) {  
    return custom_verify_callback_that_does_not_validate(ssl, out_alert);  
}, 'int', ['pointer', 'pointer']);  
  
// Intercept SSL_set_custom_verify to replace the verification callback  
Interceptor.replace(ssl_set_custom_verify, new NativeCallback(function (ssl, mode, callback) {  
    // Replace the callback with our custom callback  
    ssl_set_custom_verify(ssl, mode, ssl_verify_result_t);  
}, 'void', ['pointer', 'int', 'pointer']));  
  
// Intercept SSL_get_psk_identity to return a fake PSK identity  
Interceptor.replace(ssl_get_psk_identity, new NativeCallback(function (ssl) {  
    return Memory.allocUtf8String("notarealPSKidentity");  
}, 'pointer', ['pointer']));  
  
// Hooking NSURLSession for SSL pinning bypass  
var NSURLSession = ObjC.classes.NSURLSession;  
var NSURLSessionConfiguration = ObjC.classes.NSURLSessionConfiguration;  
  
Interceptor.attach(NSURLSessionConfiguration['+']("defaultSessionConfiguration").implementation, {  
    onLeave: function (retval) {  
        console.log("[*] NSURLSessionConfiguration: defaultSessionConfiguration called");  
        // Modify the configuration if necessary  
    }  
});  
  
// Hooking NSURLSession's dataTaskWithRequest method  
Interceptor.attach(NSURLSession['-']("dataTaskWithRequest:completionHandler:").implementation, {  
    onEnter: function (args) {  
        console.log("[*] NSURLSession: dataTaskWithRequest called");  
        // You can inspect the request here if needed  
    },  
    onLeave: function (retval) {  
        // You can inspect the response here if needed  
    }  
});  
  
// Hooking other common libraries  
// Example: Hooking AFNetworking  
var AFHTTPSessionManager = ObjC.classes.AFHTTPSessionManager;  
  
Interceptor.attach(AFHTTPSessionManager['-']("GET:parameters:success:failure:").implementation, {  
    onEnter: function (args) {  
        console.log("[*] AFHTTPSessionManager: GET called");  
        // You can inspect the request here if needed  
    },  
    onLeave: function (retval) {  
        // You can inspect the response here if needed  
    }  
});  
  
// Add more hooks for other libraries/frameworks as necessary  
// Example: Hooking Alamofire  
var Alamofire = ObjC.classes.Alamofire;  
  
Interceptor.attach(Alamofire['-']("request:method:parameters:headers:").implementation, {  
    onEnter: function (args) {  
        console.log("[*] Alamofire: request called");  
        // You can inspect the request here if needed  
    },  
    onLeave: function (retval) {  
        // You can inspect the response here if needed  
    }  
});  
  
console.log("[+] SSL Pinning Bypass Script Loaded Successfully");  

