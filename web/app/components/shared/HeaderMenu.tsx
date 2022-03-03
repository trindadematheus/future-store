import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Container,
  Tooltip,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { Link as RemixLink } from "remix";

import { useWallet } from "~/hooks/use-wallet";
import { MetaMaskLogo } from "../core/MetaMaskLogo";

interface HeaderMenuProps {
  backButton?: boolean;
}

export default function HeaderMenu({ backButton }: HeaderMenuProps) {
  const { isOpen, onToggle } = useDisclosure();

  const { connectWallet, account, disconnectWallet } = useWallet();

  function handleConnectOrDisconnect() {
    if (account) {
      disconnectWallet();
    } else {
      connectWallet();
    }
  }

  return (
    <Box
      zIndex="1"
      position="sticky"
      top="0"
      bg={useColorModeValue("white", "gray.800")}
      borderBottom={1}
      borderStyle={"solid"}
      borderColor={useColorModeValue("gray.200", "gray.900")}
    >
      <Container maxW="container.xl">
        <Box>
          <Flex
            color={useColorModeValue("gray.600", "white")}
            minH={"60px"}
            py={{ base: 2 }}
            px={{ base: 4 }}
            align={"center"}
          >
            <Flex
              flex={{ base: 1, md: "auto" }}
              ml={{ base: -2 }}
              display={{ base: "flex", md: "none" }}
            >
              <IconButton
                onClick={onToggle}
                icon={
                  isOpen ? (
                    <CloseIcon w={3} h={3} />
                  ) : (
                    <HamburgerIcon w={5} h={5} />
                  )
                }
                variant={"ghost"}
                aria-label={"Toggle Navigation"}
              />
            </Flex>
            <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
              {backButton && (
                <RemixLink to="/">
                  <Text
                    textAlign={useBreakpointValue({
                      base: "center",
                      md: "left",
                    })}
                    fontFamily={"heading"}
                    fontWeight="extrabold"
                    color="pink"
                    mr={6}
                  >
                    future store
                  </Text>
                </RemixLink>
              )}

              <Flex display={{ base: "none", md: "flex" }}>
                <DesktopNav />
              </Flex>
            </Flex>

            <Tooltip label={account ? "disconnect wallet" : ""}>
              <Button
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                colorScheme="cyan"
                leftIcon={<MetaMaskLogo width={20} height={20} />}
                onClick={handleConnectOrDisconnect}
              >
                {account
                  ? `${account.address.substring(0, 11)}...`
                  : "connect wallet"}
              </Button>
            </Tooltip>
          </Flex>

          <Collapse in={isOpen} animateOpacity>
            <MobileNav />
          </Collapse>
        </Box>
      </Container>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "upside",
    children: [
      {
        label: "t-shirt",
        subLabel: "See all t-shirt",
        href: "#",
      },
      {
        label: "jackets",
        subLabel: "See all jackets",
        href: "#",
      },
      {
        label: "dresses",
        subLabel: "See all dresses",
        href: "#",
      },
    ],
  },
  {
    label: "bottom",
    children: [
      {
        label: "pants",
        subLabel: "See all pants",
        href: "#",
      },
      {
        label: "shorts",
        subLabel: "See all shorts",
        href: "#",
      },
      {
        label: "shoes",
        subLabel: "See all shoes",
        href: "#",
      },
    ],
  },
  {
    label: "accessories",
    children: [
      {
        label: "glasses",
        subLabel: "See all glasses",
        href: "#",
      },
      {
        label: "chains",
        subLabel: "See all chains",
        href: "#",
      },
      {
        label: "bracelets",
        subLabel: "See all bracelets",
        href: "#",
      },
      {
        label: "bags",
        subLabel: "See all bags",
        href: "#",
      },
    ],
  },
  // {
  //   label: "Hire Designers",
  //   href: "#",
  // },
];
