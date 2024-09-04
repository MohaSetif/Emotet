import cpuinfo


def detect_virtualization():
    info = cpuinfo.get_cpu_info()
    virtualization = info.get("virtualization", "").lower()

    supported_virtualizations = [
        "vmware",  # VMware
        "kvm",  # KVM/QEMU
        "xen",  # Xen
        "virtualbox",  # VirtualBox
        "vbox",  # VirtualBox (short name)
        "parallels",  # Parallels
        "bhyve",  # FreeBSD's Bhyve
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
