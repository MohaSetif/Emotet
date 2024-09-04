## Persistence

Malicious software often employs various techniques to maintain persistence on a compromised system, ensuring that it continues to run or is automatically restarted after system reboots. These techniques can make it challenging for security professionals to detect and remove the malware. Here are a common techniques used by **emotet** and other malwares:
#### 1. Run and RunOnce Keys (Windows)

- **Description:** Malware can add entries to the Windows Registry's "Run" and "RunOnce" keys, specifying programs to run automatically at system startup or user logon.
- **Registry Paths to Inspect:**
    - `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Run`
    - `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\RunOnce`
    - `HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Run`
    - `HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\RunOnce`


#### 2. Services Keys (Windows)
- **Description:** Malware can register itself as a Windows service, allowing it to run automatically in the background. These services can be configured to start automatically with the system.
- **Program to Inspect Services:**
    - Use the Windows Services Management Console or run `services.msc` to view and manage installed services.

#### 3. Task Scheduler (Windows)
- **Description:** Malware can create scheduled tasks using the Windows Task Scheduler, setting them to run at specific times or events for persistence.
- **Program to Inspect Scheduled Tasks:**
    - Use the Windows Task Scheduler by running `taskschd.msc` to view and manage scheduled tasks.

#### 4. Systemd Unit Files (Linux)
- **Description:** On Linux systems using systemd, malware can create or modify unit files to launch malicious services, resulting in automatic execution at system startup.
- **Paths to Inspect Unit Files:**
    - `/etc/systemd/system/` and subdirectories



## 1-Evasion obfuscation

**Obfuscation** is a technique used in computer science and cybersecurity to make code, data, or configurations more difficult to understand, reverse engineer, or analyze. It's often employed by software developers to protect intellectual property or by malicious actors to hide their intentions in malware. Obfuscation can take various forms, and its goal is to make the code or data less readable or recognizable while preserving its functionality. Here are a Common techniques of code and data obfuscation include:

1. **Code minification and bundling:** These techniques get used in web development to bundle and minify the project to a **javascript** single file. They remove unnecessary spaces and comments.

2. **Renaming Variables and Functions:** Obfuscators change variable and function names to arbitrary or meaningless identifiers. This makes the code more challenging to understand because it lacks descriptive variable names.

3. **Control Flow Obfuscation:** Code logic is rearranged to make it less linear and more convoluted. This can involve adding redundant conditional statements, jumps, or loops, making it challenging for human readers to follow the code's flow.


4. **String Encryption:** Strings within the code, which may contain sensitive information or configuration details, are encrypted. The decryption key is typically hidden in the code. This makes it difficult for someone inspecting the code to extract meaningful strings.

5. **Code splitting:** Code is loaded dynamically at runtime, making it harder to analyze statically. This is commonly used in malware to fetch and execute additional malicious code from external sources.

6. **Anti-Debugging Techniques:** Obfuscators may introduce anti-debugging measures, such as checks for debugging environments or attempts to crash debuggers. These techniques thwart reverse engineering attempts.

7. **Encoding and Decoding:** Data or code can be encoded into different representations (e.g., Base64) and decoded when needed. This adds an extra layer of complexity for anyone trying to understand the data or code.

8. **Dead Code Insertion:** Obfuscators may insert unused or "dead" code into the program. This code doesn't affect functionality but can confuse analysts and make reverse engineering more challenging.

9. **Polymorphic code**: Some obfuscation techniques involve generating code dynamically at runtime. This code generation can make it harder to analyze and predict program behavior .


![Code_flow_flattening](/codeFlattening.png)


![bundling](/bundling.png)



## 2-Evasion antiSandbox

**Anti-sandbox evasion techniques** are methods used by malware to detect and evade analysis within sandbox environments. Sandboxes are controlled environments where suspicious or potentially malicious software is executed and monitored to determine its behavior.

1. **Checking for Virtualization Features:** Malware may use CPUID instructions to detect virtualization features like VMware, VirtualBox, or Hyper-V. If these features are detected, the malware may assume it's running in a VM.
2. **Monitoring Mouse and Keyboard Activity:** Some malware monitors mouse and keyboard activity. If no user input is detected, it may conclude that it's running in a sandbox and behave differently or not execute malicious code
3. **Monitoring for Known VM Artifacts:** Malware may look for the presence of specific files, directories, or registry entries that are typically associated with VMs. like:
      - `C:\Windows\system32\drivers\vmmouse.sys` (VMware mouse driver)
      - `C:\Windows\system32\drivers\vmhgfs.sys` (VMware shared folders driver)
      - `HKEY_LOCAL_MACHINE\SOFTWARE\VMware, Inc.\VMware Tools`
      - `HKEY_LOCAL_MACHINE\SOFTWARE\Oracle\VirtualBox Guest Additions`


### Actions Taken After VM Detection:

Once malware detects that it's running in a virtual machine, it may take various actions to evade analysis or remain dormant:

1. **Delaying Malicious Actions:**
    
    - Malware may introduce time delays before executing malicious code, making it appear benign during the initial analysis period.
2. **Changing Behavior:**
    
    - Malware can alter its behavior, refrain from making network connections, or communicate with different IP addresses and domains.
3. **Sleep or Idle Loops:**
    
    - Malware may include sleep or idle loops to stall execution, waiting for the sandbox analysis to time out before activating malicious behavior.


```python

import cpuinfo

def detect_virtualization():
    info = cpuinfo.get_cpu_info()
    virtualization = info.get("virtualization", "").lower()
    supported_virtualizations = [
        "vmware",  # VMware
        "kvm",     # KVM/QEMU
        "xen",     # Xen
        "virtualbox",  # VirtualBox
        "vbox",        # VirtualBox (short name)
        "parallels",   # Parallels
        "bhyve",       # FreeBSD's Bhyve
    ]

    for v in supported_virtualizations:
        if v in virtualization:
            return True
    return False

if __name__ == "__main__":
    if detect_virtualization():
        print("Virtualization detected.")
    else:
        print("No virtualization detected or detection failed.")
```



## 3-Evasion polymorphic code

Polymorphic code is a technique used by malware authors to evade detection by antivirus and security software. It involves generating a new version of code that have different instructions but do the same thing. A polymorphic code generation engine follow these steps:

- **Compile your code to assembly**: compile your code to assembly , this will be the input for the engine.
- **Read the assembly line per line or block per block**: separate the assembly stdin to blocks or lines.
- **Create abstract representation of line or block** : this step take a block or a line of assembly code and generate a clean abstraction for comparison.
- **Mapping the abstractions to their equivalences**: we use a `map<string,string[]>` where the key is the abstraction and the value is list of random equivalent assembly code snippets.
- **Combining the abstraction mapping results** : we combine the results to generate an polymorphic assembly copy.

### Remark

These steps work only with compiled languages interpreted ones need to be changed manually.


![polymorphic](/polymorphic.png)



## 4- Evasion process hollowing

Process hollowing is a technique used by malware authors to inject malicious code into the address space of a legitimate process running on a target system. This technique allows malware to hide its presence and evade detection by executing within the context of a trusted process. Here's a more in-depth look at process hollowing:

**How Process Hollowing is Performed:**

1. **CreateProcess:** The malware typically starts by creating a new process using the `CreateProcess` function in Windows. This creates a new instance of a legitimate executable, such as `explorer.exe` or `svchost.exe`.

2. **Allocate Memory:** The malware allocates memory within the address space of the newly created process using functions like `VirtualAllocEx` or `NtAllocateVirtualMemory`.

3. **Write Code:** It then writes its malicious code into the allocated memory space within the target process using functions like `WriteProcessMemory`.

4. **Thread Creation:** A new thread is created within the target process to execute the malicious code. This is often done using `CreateRemoteThread`.


```cpp
#include <windows.h>

int main() {
    // Step 1: Create a new process (e.g., notepad.exe)
    STARTUPINFO si = { sizeof(STARTUPINFO) };
    PROCESS_INFORMATION pi;

    if (!CreateProcess(NULL, "C:/Program Files/notepad/notepad.exe", NULL, NULL, FALSE, CREATE_SUSPENDED, NULL, NULL, &si, &pi)) {
        return 1;
    }

    // Step 2: Allocate memory within the target process
    LPVOID pRemoteCode = VirtualAllocEx(pi.hProcess, NULL, 0x1000, MEM_COMMIT | MEM_RESERVE, PAGE_EXECUTE_READWRITE);

    // Step 3: Write the malicious code to the allocated memory
    BYTE shellcode[] = { /* Your malicious code here */ };

    WriteProcessMemory(pi.hProcess, pRemoteCode, shellcode, sizeof(shellcode), NULL);

    // Step 4: Create a new thread in the target process to execute the injected code
    HANDLE hThread = CreateRemoteThread(pi.hProcess, NULL, 0, (LPTHREAD_START_ROUTINE)pRemoteCode, NULL, 0, NULL);

    // Step 5: Resume the main thread of the target process
    ResumeThread(pi.hThread);

    // Cleanup
    CloseHandle(hThread);
    CloseHandle(pi.hProcess);
    CloseHandle(pi.hThread);

    return 0;
}
```
