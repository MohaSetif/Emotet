## Spam Emails with Malicious Attachments

Emotet commonly spreads through spam emails containing malicious attachments. These attachments often take the form of documents (e.g., Word or PDF files) that contain hidden malicious macros or scripts. Emotet-infected emails target a specific set of users by impersonating a legitimate service. Once opened, the malware can execute and infect the victim's system. Sometimes these files tell the user to enable macros in order to run.


### Excel example

![Excel__malware](/excel.png)



## Drive-By Downloads

Emotet may leverage drive-by download attacks as a method of spreading malware. Drive-by downloads occur when users visit compromised or malicious websites, and the websites automatically initiate downloads of malware without user interaction or consent. Main attack use javascript and relay on the **blob** object and **CreateObjectUrl** method to create malware files on the fly and download them in background using an invisible anchor.


### A code explaining the attack

```js
function file_upload(bytes, file_name) {
  const blob = new Blob([bytes], {
    type: 'text/plain'
  });
  const fileUrl = window.URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.style = 'display:none;';
  document.body.append(anchor);
  anchor.download = file_name;
  anchor.href = fileUrl;
  anchor.click();
  window.URL.revokeObjectURL(fileUrl);
}

// eslint-disable-next-line no-undef
let message = ethereumjs.Buffer.Buffer.from('you re screwed man get help');
file_upload(message, 'mal.txt');
```



## Network propagation

1. **Network Scanning:** Emotet actively scans the local network to identify other devices and services that are reachable. It uses  technologies like **nmap**.
  
2. **Vulnerability Assessment:** Once Emotet identifies active services, it may attempt to assess vulnerabilities associated with those services. This involves checking known vulnerabilities, service versions, and configurations. Emotet may also communicate with its C2 server to get or report information about potential targets.
    
3. **Exploitation:** If Emotet identifies a vulnerable service or device, it may attempt to exploit the vulnerability. This could involve using known exploits or vulnerabilities to gain unauthorized access to the target system. Successful exploitation allows Emotet to establish a foothold on the compromised device.


![nmap](/nmap.png)