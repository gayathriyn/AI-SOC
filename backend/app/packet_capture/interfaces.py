from scapy.all import get_if_list


def list_interfaces():
    """
    Returns all available network interfaces.
    """
    return get_if_list()


if __name__ == "__main__":
    interfaces = list_interfaces()

    print("\nAvailable Network Interfaces:\n")

    for i, interface in enumerate(interfaces, start=1):
        print(f"{i}. {interface}")