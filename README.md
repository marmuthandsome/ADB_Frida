<img width="1600" height="900" alt="adb_frida_logo" src="https://raw.githubusercontent.com/marmuthandsome/ADB_Frida/75d9be425173c02c0bbdd95938cabfaa32cfc9e1/adb_frida_logo.svg" />


# ADB Frida Executor

A command-line tool to automate common Frida, ADB, and iOS reverse engineering tasks with built-in SSL pinning bypass and root/jailbreak detection bypass capabilities.

## Features

### Basic Commands
- ADB Shell access
- List connected Android devices
- List Frida processes

### SSL Pinning Bypass
- Android (2 methods)
- iOS (2 methods)
- Flutter support

### Android Tools
- APKLeaks - Scan APK files for URIs, endpoints & secrets
- Pidcat - Enhanced logcat viewer
- APK Signer - Sign APK files using uber-apk-signer

### iOS Tools
- Bagbak - Dump iOS app data
- IPA Dump - Extract IPA files from iOS devices

### Frida CodeShare Integration
#### Android
- 6 different Root Detection bypass methods
- 2 SSL Pinning bypass methods

#### iOS
- 6 different Jailbreak Detection bypass methods
- 4 SSL Pinning bypass methods

## Prerequisites

- Python 3.x
- Frida
- ADB (for Android features)
- Java (for APK signing)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/adb-frida-executor.git
cd adb-frida-executor
```

2. Install required Python packages:
```bash
pip install -r requirements.txt
```

3. Create Script directory and add your Frida scripts:
```bash
mkdir Script
# Add your .js files to the Script directory
```

## Usage

Run the tool:
```bash
python3 adb_frida_executor.py
```

Follow the interactive menu to select your desired operation.

## Directory Structure

```
ADB_Frida/
├── adb_frida_executor.py
├── requirements.txt
├── Script/
│   ├── bypass_ssl_pinning_android_1.js
│   ├── bypass_ssl_pinning_android_2.js
│   ├── bypass_ssl_pinning_ios_1.js
│   ├── bypass_ssl_pinning_ios_2.js
│   ├── bypass_ssl_pinning_flutter.js
│   └── frida-ios-dump/
└── README.md
```

## Supported CodeShare Scripts

### Android Root Detection Bypass
- KishorBal/multiple-root-detection-bypass
- Q0120S/root-detection-bypass
- dzonerzy/fridantiroot
- fdciabdul/frida-multiple-bypass
- KaiserBloo/ssl-and-root-bypass
- d3tonator/ssl-and-root-detection-bypass

### Android SSL Pinning Bypass
- pcipolloni/universal-android-ssl-pinning-bypass-with-frida
- sowdust/universal-android-ssl-pinning-bypass-2

### iOS Jailbreak Detection Bypass
- incogbyte/ios-jailbreak-bypass
- liangxiaoyi1024/ios-jailbreak-detection-bypass
- overnop/ios-jailbreak-bypass
- sridharas04/darkprince-jailbreak-detection-bypass
- fampaySiddharth/bypass-jailbreak-detection
- darklotuskdb/ios-wrapper-jailbreak-detection-bypass

### iOS SSL Pinning Bypass
- federicodotta/ios13-pinning-bypass
- snooze6/ios-pinning-disable
- machoreverser/ios12-ssl-bypass
- zionspike/bypass-flutter-pinning-ios

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This tool is for educational purposes only. Use it responsibly and only on applications you have permission to test.
