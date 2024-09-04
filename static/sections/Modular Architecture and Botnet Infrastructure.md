## Modular Architecture

- **Modular Architecture:** Emotet employs a modular design, which is a key feature that sets it apart. This design allows Emotet to be flexible, adaptive, and versatile in its malicious activities.

- **Modules:** Within the Emotet malware, various modules serve specific functions. These modules can be thought of as specialized components, each with a unique role.


```plaintext
Emotet-Root/
|-- steal/
|   |-- steal.exe
|   |-- configuration.json
|-- Loader Module/
|   |-- main_loader.exe
|   |-- configuration.json
|-- Payload Modules/
|   |-- Payload_1/
|   |   |-- payload_1.exe
|   |   |-- configuration.json
|   |-- Payload_2/
|   |   |-- payload_2.exe
|   |   |-- configuration.json
|-- Updater Module/
|   |-- updater.exe
|   |-- configuration.json
|-- Persistence Module/
|   |-- persistence.exe
|   |-- configuration.json
|-- Evasion Module/
|   |-- antiSandbox.exe
|   |-- polymoriphic.exe
|   |-- processHollowing.exe
|   |-- obfuscation.exe
|-- Configuration Files/
|   |-- default_config.json
|   |-- campaign_1_config.json
|   |-- ...
|-- Logs/
|   |-- loader_logs.txt
|   |-- payload_1_logs.txt
|   |-- ...
|   main.exe

```



## Botnet Infrastructure

A botnet is a network of compromised computers, often referred to as "bots" or "zombies," that are under the control of a central entity, typically a malicious actor or cybercriminal. Botnets are used for a variety of malicious purposes, including distributed denial-of-service (DDoS) attacks, spam email campaigns, data theft, and more. Understanding the components of botnet infrastructure is essential for grasping how they operate.

1. **Botnet Clients (Bots):** These are the compromised computers that make up the botnet. These computers are typically infected with malware that allows the attacker to take control remotely. The owners of these computers are usually unaware that their machines have been compromised.

2. **Command and Control Servers (C2 Servers):** These are servers controlled by the attacker, and they serve as the central point of command and control for the botnet. The C2 servers send instructions to the botnet clients and receive information from them.


![c2_emotet](/c2_server.png)


## **Role of Command and Control (C2) Frameworks:**

Command and Control frameworks are software platforms or tools that enable attackers to manage and control the botnet efficiently. They play a critical role in the operation and coordination of a botnet. Here's an overview of their functions and characteristics:

1. **Data Exfiltration:** C2 frameworks allow attackers to retrieve data from compromised systems. This can include stolen credentials, sensitive documents, or any other valuable information.
2. **Distributed Tasks:** Attackers can use C2 frameworks to distribute tasks to botnet clients. For example, they can orchestrate DDoS attacks by instructing the bots to send a flood of requests to a target website or server.
3. **Communication:** C2 frameworks establish a anonymous communication channel between the C2 server and botnet clients. There is many types of channels http, https, dns tunneling, irc , icmp and it may use **proxychains** or **tor** on top of these channels.
4. **Flexibility:** Many C2 frameworks are modular, allowing attackers to add or remove functionality as needed. This flexibility makes them adaptable to various malicious activities.


<iframe width="1024" height="560" src="https://www.youtube.com/embed/lMihdys4jw8" frameborder="0" allowfullscreen ></iframe>