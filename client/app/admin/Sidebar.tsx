"use client";
import { useState } from "react";
import {
  Navbar,
  Tooltip,
  UnstyledButton,
  createStyles,
  Stack,
  rem,
} from "@mantine/core";
import {
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconPackage,
  IconPlus,
  IconLogout,
} from "@tabler/icons-react";
import Link from "next/link";
import useUserStore from "@/zustand/userSlice";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const useStyles = createStyles((theme) => ({
  link: {
    width: rem(50),
    height: rem(50),
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  active: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

interface NavbarLinkProps {
  icon: React.FC<any>;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon size="1.2rem" stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconGauge, label: "Dashboard", path: "/admin" },
  {
    icon: IconDeviceDesktopAnalytics,
    label: "Order",
    path: "/admin/order",
  },
  { icon: IconPackage, label: "Product", path: "/admin/product" },
  { icon: IconPlus, label: "Create", path: "/admin/create" },
  //   { icon: IconLogout, label: "Logout" },
];

export default function NavbarMinimal() {
  const [active, setActive] = useState(0);
  const { handleLogout } = useUserStore();
  const router = useRouter();
  const handleLogoutUser = () => {
    handleLogout();
    // Cookies.remove("token", { path: "/", domain: "localhost" });
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/");
  };

  const links = mockdata.map((link, index) => (
    <Link href={link.path} key={link.label}>
      <NavbarLink
        {...link}
        active={index === active}
        onClick={() => setActive(index)}
      />
    </Link>
  ));

  return (
    <Navbar height={750} width={{ base: 80 }} p="md">
      <Navbar.Section grow mt={50}>
        <Stack justify="center" spacing={0}>
          {links}
        </Stack>
      </Navbar.Section>
      <Navbar.Section grow>
        <Stack>
          <NavbarLink
            icon={IconLogout}
            label="Logout"
            onClick={handleLogoutUser}
          />
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}
