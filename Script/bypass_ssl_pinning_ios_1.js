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
  
/** Custom callback that does not validate SSL certificates */  
function custom_verify_callback_that_does_not_validate(ssl, out_alert) {  
    return SSL_VERIFY_NONE;  
}  
  
/** Wrap callback in NativeCallback for Frida */  
var ssl_verify_result_t = new NativeCallback(function (ssl, out_alert) {  
    return custom_verify_callback_that_does_not_validate(ssl, out_alert);  
}, 'int', ['pointer', 'pointer']);  
  
// Intercept SSL_set_custom_verify to use our custom callback  
Interceptor.replace(ssl_set_custom_verify, new NativeCallback(function (ssl, mode, callback) {  
    // Replace the callback with our custom callback  
    ssl_set_custom_verify(ssl, mode, ssl_verify_result_t);  
}, 'void', ['pointer', 'int', 'pointer']));  
  
// Intercept SSL_get_psk_identity to return a dummy PSK identity  
Interceptor.replace(ssl_get_psk_identity, new NativeCallback(function (ssl) {  
    return Memory.allocUtf8String("notarealPSKidentity");  
}, 'pointer', ['pointer']));  
  
// Hooking NSURLSession for additional SSL pinning bypass  
var NSURLSession = ObjC.classes.NSURLSession;  
Interceptor.attach(NSURLSession['sharedSession'].implementation, {  
    onEnter: function (args) {  
        console.log("[*] NSURLSession.sharedSession called");  
    },  
    onLeave: function (retval) {  
        // Modify the return value if necessary  
    }  
});  
  
// Hooking NSURLSessionTask for SSL pinning bypass  
var NSURLSessionTask = ObjC.classes.NSURLSessionTask;  
Interceptor.attach(NSURLSessionTask['resume'].implementation, {  
    onEnter: function (args) {  
        console.log("[*] NSURLSessionTask.resume called");  
    },  
    onLeave: function (retval) {  
        // Modify the return value if necessary  
    }  
});  
  
// Hooking CFNetwork for additional SSL pinning bypass  
var CFNetwork = Module.findExportByName("CFNetwork", "CFNetworkCopySystemProxySettings");  
Interceptor.attach(CFNetwork, {  
    onEnter: function (args) {  
        console.log("[*] CFNetworkCopySystemProxySettings called");  
    },  
    onLeave: function (retval) {  
        // Modify the return value if necessary  
    }  
});  
  
// Additional hooks for other libraries can be added here  
// Example: Hooking AFNetworking  
var AFHTTPSessionManager = ObjC.classes.AFHTTPSessionManager;  
Interceptor.attach(AFHTTPSessionManager['initWithBaseURL'].implementation, {  
    onEnter: function (args) {  
        console.log("[*] AFHTTPSessionManager.initWithBaseURL called");  
    },  
    onLeave: function (retval) {  
        // Modify the return value if necessary  
    }  
});  
  
// Log successful loading of the bypass script  
console.log("[+] SSL Pinning Bypass Script Loaded Successfully");  

