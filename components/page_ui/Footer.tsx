import { Anchor, Group, ActionIcon, rem } from "@mantine/core";
import {
  IconBrandYoutube,
  IconBrandInstagram,
  IconBrandTwitter,
} from "@tabler/icons-react";

import classes from "./styles/styles.module.css";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const links = [
  { link: "#", label: "Contact" },
  { link: "#", label: "Privacy" },
  { link: "#", label: "Blog" },
  { link: "#", label: "Store" },
  { link: "#", label: "Careers" },
];

export function FooterCentered() {
  const items = links.map((link) => (
    <Anchor
      c="dimmed"
      key={link.label}
      href={link.link}
      lh={1}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        <Button variant="ghost" className="hover">
          <Image src={"/logo.png"} width={90} height={90} alt="Logo" />
        </Button>
        {/* <Group className={classes.links}>{items}</Group> */}
        <div className="text-center">
          <span className="flex text-center items-center align-middle content-center font-medium text-md">
            © {new Date().getFullYear()} First Registrars Nigeria Limited and
            Investor Services{" "}
          </span>

          <span className="text-sm leading-6 align-middle text-center">
            For inquiries, please contact Fatimah on +234 803 391 5075,
            <br />
            Abiola +234 8023425166 and Olaiya +234 8027913873
          </span>
        </div>

        <Group gap="xs" justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" variant="default" radius="xl">
            {" "}
            <IconBrandYoutube
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            {" "}
            <IconBrandInstagram
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandTwitter
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
        </Group>
      </div>
    </div>
  );
}
