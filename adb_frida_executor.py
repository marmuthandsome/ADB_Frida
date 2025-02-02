import subprocess
from colorama import init, Fore, Style
import sys
import os

# Initialize colorama
init()

class FridaExecutor:
    def __init__(self):
        self.scripts_path = {
            'android1': 'Script/bypass_ssl_pinning_android_1.js',
            'android2': 'Script/bypass_ssl_pinning_android_2.js',
            'ios1': 'Script/bypass_ssl_pinning_ios_1.js',
            'ios2': 'Script/bypass_ssl_pinning_ios_2.js',
            'flutter': 'Script/bypass_ssl_pinning_flutter.js'
        }
        self.codeshare_scripts = {
            'root1': 'KishorBal/multiple-root-detection-bypass',
            'root2': 'Q0120S/root-detection-bypass',
            'root3': 'dzonerzy/fridantiroot',
            'root4': 'fdciabdul/frida-multiple-bypass',
            'root5': 'KaiserBloo/ssl-and-root-bypass',
            'root6': 'd3tonator/ssl-and-root-detection-bypass',
            'ssl1': 'pcipolloni/universal-android-ssl-pinning-bypass-with-frida',
            'ssl2': 'sowdust/universal-android-ssl-pinning-bypass-2',
            'ios_jb1': 'incogbyte/ios-jailbreak-bypass',
            'ios_jb2': 'liangxiaoyi1024/ios-jailbreak-detection-bypass',
            'ios_jb3': 'overnop/ios-jailbreak-bypass',
            'ios_jb4': 'sridharas04/darkprince-jailbreak-detection-bypass',
            'ios_jb5': 'fampaySiddharth/bypass-jailbreak-detection',
            'ios_jb6': 'darklotuskdb/ios-wrapper-jailbreak-detection-bypass',
            'ios_ssl1': 'federicodotta/ios13-pinning-bypass',
            'ios_ssl2': 'snooze6/ios-pinning-disable',
            'ios_ssl3': 'machoreverser/ios12-ssl-bypass',
            'ios_ssl4': 'zionspike/bypass-flutter-pinning-ios'
        }

    def execute_command(self, command, description):
        print(f"{Fore.CYAN}[*] {description}{Style.RESET_ALL}")
        try:
            result = subprocess.run(command, check=True)
            if result.returncode == 0:
                print(f"{Fore.GREEN}[+] Command executed successfully{Style.RESET_ALL}")
            return result
        except subprocess.CalledProcessError as e:
            print(f"{Fore.RED}[-] Error executing command: {e}{Style.RESET_ALL}")
        except FileNotFoundError:
            print(f"{Fore.RED}[-] Command not found. Please ensure required tools are installed.{Style.RESET_ALL}")

    def adb_shell(self):
        self.execute_command(["adb", "shell"], "Opening ADB shell... Don't forget to su! and /data/local/tmp/frida-server &")

    def adb_devices(self):
        self.execute_command(["adb", "devices"], "Listing connected devices...")

    def frida_ps(self):
        self.execute_command(["frida-ps", "-Uai"], "Listing Frida processes...")

    def frida_bypass_ssl_pinning(self, package, script_type):
        script_path = self.scripts_path.get(script_type)
        if not script_path:
            print(f"{Fore.RED}[-] Invalid script type. Available types: {', '.join(self.scripts_path.keys())}{Style.RESET_ALL}")
            return
        
        if not os.path.exists(script_path):
            print(f"{Fore.RED}[-] Script file not found: {script_path}{Style.RESET_ALL}")
            return
        
        command = ["frida", "-U", "-l", script_path, "-f", package]
        self.execute_command(command, f"Executing Frida SSL pinning bypass on package: {package}")

    def frida_codeshare(self, package, script_name):
        script_path = self.codeshare_scripts.get(script_name)
        if not script_path:
            print(f"{Fore.RED}[-] Invalid script. Available scripts: {', '.join(self.codeshare_scripts.keys())}{Style.RESET_ALL}")
            return
        
        command = ["frida", "--codeshare", script_path, "-f", package, "-U"]
        self.execute_command(command, f"Executing Frida CodeShare script: {script_path} on package: {package}")

    def apk_leaks(self):
        package = self.get_package_name()
        command = ["apkleaks", "-f", package]
        self.execute_command(command, f"Executing APKLEAKS on package: {package}")

    def pidcat(self):
        package = self.get_package_name()
        command = ["pidcat", package]
        self.execute_command(command, f"Executing Pidcat on package: {package}")

    def signer(self):
        package = self.get_package_name()
        command = ["java", "-jar", "Script/uber-apk-signer-1.3.0.jar", "--apks", package]
        self.execute_command(command, f"Executing APK Signer on package: {package}")

    def bagbak(self):
        package = self.get_package_name()
        command = ["bagbak", package]
        self.execute_command(command, f"Executing Bagbak on package: {package}")

    def ipa_dump(self):
        package = self.get_package_name()
        ip = self.get_ip()
        command = ["python3", "Script/frida-ios-dump/dump.py", "-u", "mobile", "-P", "alpine", "-p", "22", "-H", ip, package]
        self.execute_command(command, f"Executing IPA Dump on package: {package}, with IP: {ip}")

    def get_ip(self):
        return input(f"{Fore.YELLOW}Please enter the target device IP: {Style.RESET_ALL}")

    def print_menu(self):
        menu = f"""
{Fore.CYAN}╔════════════════════════════════════════════╗
║        ADB and Frida Command Executor      ║
╚════════════════════════════════════════════╝{Style.RESET_ALL}

{Fore.YELLOW}Basic Commands:{Style.RESET_ALL}
1. Open ADB Shell
2. List ADB Devices
3. List Frida Processes

{Fore.GREEN}SSL Pinning Bypass:{Style.RESET_ALL}
11. Bypass SSL Pinning (Android Method 1)
12. Bypass SSL Pinning (Android Method 2)
13. Bypass SSL Pinning (iOS Method 1)
14. Bypass SSL Pinning (iOS Method 2)
15. Bypass SSL Pinning (Flutter)

{Fore.GREEN}Android:{Style.RESET_ALL}
21. APKLeaks (Scanning APK file for URIs, endpoints & secrets.)
22. Pidcat (Log)
23. Apk Signer

{Fore.GREEN}IOS:{Style.RESET_ALL}
31. Bagbak (Dump iOS app data)
32. IPA Dump

{Fore.GREEN}Android Frida CodeShare:{Style.RESET_ALL}
41. Root Detection Bypass (Method 1 - KishorBal)
42. Root Detection Bypass (Method 2 - Q0120S)
43. Root Detection Bypass (Method 3 - dzonerzy)
44. Root Detection Bypass (Method 4 - fdciabdul)
45. Root Detection Bypass (Method 5 - KaiserBloo)
46. Root Detection Bypass (Method 6 - d3tonator)
47. SSL Pinning Bypass (Method 1 - pcipolloni)
48. SSL Pinning Bypass (Method 2 - sowdust)

{Fore.GREEN}iOS Frida CodeShare:{Style.RESET_ALL}
51. Jailbreak Detection Bypass (Method 1 - incogbyte)
52. Jailbreak Detection Bypass (Method 2 - liangxiaoyi1024)
53. Jailbreak Detection Bypass (Method 3 - overnop)
54. Jailbreak Detection Bypass (Method 4 - sridharas04)
55. Jailbreak Detection Bypass (Method 5 - fampaySiddharth)
56. Jailbreak Detection Bypass (Method 6 - darklotuskdb)
57. SSL Pinning Bypass (Method 1 - federicodotta)
58. SSL Pinning Bypass (Method 2 - snooze6)
59. SSL Pinning Bypass (Method 3 - machoreverser)
60. SSL Pinning Bypass (Method 4 - zionspike)

{Fore.RED}0. Exit{Style.RESET_ALL}
"""
        print(menu)

    def get_package_name(self):
        return input(f"{Fore.YELLOW}Please enter the target app package: {Style.RESET_ALL}")

    def main(self):
        while True:
            self.print_menu()
            choice = input(f"{Fore.CYAN}Enter your choice: {Style.RESET_ALL}")

            if choice == '0':
                print(f"{Fore.YELLOW}[*] Exiting the program. Goodbye!{Style.RESET_ALL}")
                break

            actions = {
                '1': self.adb_shell,
                '2': self.adb_devices,
                '3': self.frida_ps,
                '11': lambda: self.frida_bypass_ssl_pinning(self.get_package_name(), 'android1'),
                '12': lambda: self.frida_bypass_ssl_pinning(self.get_package_name(), 'android2'),
                '13': lambda: self.frida_bypass_ssl_pinning(self.get_package_name(), 'ios1'),
                '14': lambda: self.frida_bypass_ssl_pinning(self.get_package_name(), 'ios2'),
                '15': lambda: self.frida_bypass_ssl_pinning(self.get_package_name(), 'flutter'),
                '21': self.apk_leaks,
                '22': self.pidcat,
                '23': self.signer,
                '31': self.bagbak,
                '32': self.ipa_dump,
                '41': lambda: self.frida_codeshare(self.get_package_name(), 'root1'),
                '42': lambda: self.frida_codeshare(self.get_package_name(), 'root2'),
                '43': lambda: self.frida_codeshare(self.get_package_name(), 'root3'),
                '44': lambda: self.frida_codeshare(self.get_package_name(), 'root4'),
                '45': lambda: self.frida_codeshare(self.get_package_name(), 'root5'),
                '46': lambda: self.frida_codeshare(self.get_package_name(), 'root6'),
                '47': lambda: self.frida_codeshare(self.get_package_name(), 'ssl1'),
                '48': lambda: self.frida_codeshare(self.get_package_name(), 'ssl2'),
                '51': lambda: self.frida_codeshare(self.get_package_name(), 'ios_jb1'),
                '52': lambda: self.frida_codeshare(self.get_package_name(), 'ios_jb2'),
                '53': lambda: self.frida_codeshare(self.get_package_name(), 'ios_jb3'),
                '54': lambda: self.frida_codeshare(self.get_package_name(), 'ios_jb4'),
                '55': lambda: self.frida_codeshare(self.get_package_name(), 'ios_jb5'),
                '56': lambda: self.frida_codeshare(self.get_package_name(), 'ios_jb6'),
                '57': lambda: self.frida_codeshare(self.get_package_name(), 'ios_ssl1'),
                '58': lambda: self.frida_codeshare(self.get_package_name(), 'ios_ssl2'),
                '59': lambda: self.frida_codeshare(self.get_package_name(), 'ios_ssl3'),
                '60': lambda: self.frida_codeshare(self.get_package_name(), 'ios_ssl4'),
            }

            action = actions.get(choice)
            if action:
                action()
            else:
                print(f"{Fore.RED}[-] Invalid choice. Please select a valid option.{Style.RESET_ALL}")

if __name__ == "__main__":
    try:
        executor = FridaExecutor()
        executor.main()
    except KeyboardInterrupt:
        print(f"\n{Fore.YELLOW}[*] Program interrupted by user. Exiting...{Style.RESET_ALL}")
        sys.exit(0)

