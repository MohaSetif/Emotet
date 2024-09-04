## Differentiating Trojans, Viruses, and Worms

#### Trojans

 Trojans are a stealth type of malware that create **backdoors** and collect information. Either they act like a harmless programs or run on the background without getting detected.
#### Viruses

 Viruses are malware that attach themselves to legitimate programs or files and replicate by infecting other files. They can cause direct damage to infected systems.
#### Worms

 Worms are self-replicating malware that spread independently without attaching to other files. They are designed for rapid propagation.



## Malware detection

### Signature-Based Detection 

This method relies on hashing a collection of information of specific version of a malware and compare it with a database here is the different signature types :

- **Full file**: we hash the whole file.
- **Partial file**: we hash parts of the file.
- **fuzzy signature**:we have a collection of general information about the malware using neural networks.
- **String singature**: we check the existence of specific strings.


### Checksumming

 Checksumming uses these techniques to detect malware:

- **Statistical analysis**: analyzes the frequency of processor commands to determine if a file is infected.
- **Cryptanalysis** : known-plaintext cryptanalysis decodes encrypted viruses using an equation system (like the classic cryptographic technique of decoding text without a decryption key). The cryptanalysis system reconstructs the decryption program’s algorithm and keys, applying the algorithm to encoded fragments to decode the overall body of the encrypted virus.
- **Heuristics**:a malware detection team scans and analyses behavioral data to identify anomalous activity. The team must search for malicious code associated with suspicious behavior, such as a code served to thousands of users within a few minutes. The security team can then prioritize and further investigate suspicious incidents.
- **Reduced masks**: the malware detection team can use elements within the encrypted virus body to circumvent the need for an encryption key when obtaining static code. The static code produced can reveal the malware’s signature or mask.


### Machine Learning Behavioral Analysis

AI/ML malware detection is known as behavioral detection because it is based on an analysis of the behavior of suspect processes. These algorithms have a threshold for malicious behavior, and if a file or process exhibits unusual behavior that crosses the threshold, they determine it to be malicious.