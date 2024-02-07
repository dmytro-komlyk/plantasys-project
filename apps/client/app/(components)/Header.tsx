"use client";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import LocaleSwitcher from "./LocaleSwitcher";

export default function Header() {
  // unstable_setRequestLocale(locale);
  const t = useTranslations("Header");

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const menuItems = [
    {
      title: t("baseFertilizer"),
      href: "#",
      submenuLine: [
        {
          title: t("navigation.growerLine"),
          href: "#",
          submenuProduct: [
            { title: "Hydro", href: "#" },
            { title: "Terra", href: "#" },
            { title: "Coco", href: "#" },
          ],
        },
        {
          title: t("navigation.homeLine"),
          href: "#",
          submenuProduct: [
            { title: "Thrive", href: "#" },
            { title: "Orchids", href: "#" },
          ],
        },
        { title: t("navigation.cityFarmerLine"), href: "#" },
        { title: t("navigation.proLine"), href: "#" },
      ],
    },
    { title: t("stimulants"), href: "#" },
    { title: t("additives"), href: "#" },
    { title: t("regulators"), href: "#" },
    { title: t("blog"), href: "#" },
    { title: t("support"), href: "#" },
    { title: t("shop"), href: "#" },
  ];
  // console.log(menuItems);
  return (
    <Navbar
      className="bg-header-gray"
      maxWidth={"xl"}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="flex gap-8">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="lg:hidden text-white"
        />
        <NavbarBrand>
          <Link
            href="/"
            className="font-kanit font-medium text-2xl text-center text-white"
          >
            Plantasys
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        data-justify
        className="hidden lg:flex gap-8"
        justify="center"
      >
        {/* General dropdown - Базові добрива */}
        <Dropdown
          closeOnSelect={false}
          backdrop="blur"
          classNames={{
            base: "bg-header-gray w-full",
          }}
        >
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="text-white text-base p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={<IoMdArrowDropdown />}
                radius="sm"
                variant="light"
              >
                {t("baseFertilizer")}
              </Button>
            </DropdownTrigger>
          </NavbarItem>

          <DropdownMenu
            aria-label="Plantasys"
            itemClasses={{
              base: "gap-8 w-full",
            }}
          >
            {/* Dropdown Grower line */}

            <DropdownItem>
              <Dropdown
                // closeOnSelect={false}
                placement="right-start"
                classNames={{
                  base: "bg-header-gray w-full left-[15px]",
                }}
              >
                <DropdownTrigger>
                  <Button
                    disableRipple
                    className="text-white text-base text-start justify-between p-0 bg-transparent data-[hover=true]:bg-transparent"
                    endContent={<IoMdArrowDropright />}
                    fullWidth={true}
                    variant="light"
                  >
                    Grower line
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem>
                    <Link href="#" className="text-base text-white">
                      Hydro
                    </Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link href="#" className="text-base text-white">
                      Terra
                    </Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link href="#" className="text-base text-white">
                      Coco
                    </Link>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </DropdownItem>

            {/* Dropdown Home line  */}

            <DropdownItem>
              <Dropdown
                closeOnSelect={false}
                placement="right-start"
                classNames={{
                  base: "bg-header-gray w-full left-[15px]",
                }}
              >
                <DropdownTrigger>
                  <Button
                    disableRipple
                    className="text-white text-start justify-between w-full text-base p-0 bg-transparent"
                    endContent={<IoMdArrowDropright />}
                    fullWidth={true}
                    variant="light"
                  >
                    Home line
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem>
                    <Link href="#" className="text-base text-white">
                      Орхідеї
                    </Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link href="#" className="text-base text-white">
                      Домашні квіти та дерева
                    </Link>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </DropdownItem>

            <DropdownItem
              description={t("navigation.cityFarmerLine")}
              key="home_line"
              // startContent={icons.flash}
            >
              <p className="text-base text-white">Farmer line</p>
            </DropdownItem>
            <DropdownItem
              description={t("navigation.proLine")}
              key="pro_line"
              // startContent={icons.server}
            >
              <p className="text-base text-white">Pro line</p>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        {/* Dropdown - Стімулятори */}

        <Dropdown
          backdrop="blur"
          classNames={{
            base: "bg-header-gray w-full",
          }}
        >
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="text-white text-base p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={<IoMdArrowDropdown />}
                radius="sm"
                variant="light"
              >
                {t("stimulants")}
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu>
            <DropdownItem>
              <Link href="#" className="text-base text-white">
                PK
              </Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        {/* Dropdown - Добавки */}

        <Dropdown
          backdrop="blur"
          classNames={{
            base: "bg-header-gray w-full",
          }}
        >
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="text-white text-base p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={<IoMdArrowDropdown />}
                radius="sm"
                variant="light"
              >
                {t("additives")}
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu>
            <DropdownItem>
              <Link href="#" className="text-base text-white">
                Silicon
              </Link>
            </DropdownItem>
            <DropdownItem>
              <Link href="#" className="text-base text-white">
                CalMg
              </Link>
            </DropdownItem>
            <DropdownItem>
              <Link href="#" className="text-base text-white">
                Bio enhancer
              </Link>
            </DropdownItem>
            <DropdownItem>
              <Link href="#" className="text-base text-white">
                PK
              </Link>
            </DropdownItem>
            <DropdownItem>
              <Link href="#" className="text-base text-white">
                Finish
              </Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        {/* Dropdown - Ркгулятори */}

        <Dropdown
          backdrop="blur"
          classNames={{
            base: "bg-header-gray w-full",
          }}
        >
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="text-white text-base p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={<IoMdArrowDropdown />}
                radius="sm"
                variant="light"
              >
                {t("regulators")}
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu>
            <DropdownItem>
              <Link href="#" className="text-base text-white">
                pH Down/Up
              </Link>
            </DropdownItem>
            <DropdownItem>
              <Link href="#" className="text-base text-white">
                pH 4.01, 6.86 buffer
              </Link>
            </DropdownItem>
            <DropdownItem>
              <Link href="#" className="text-base text-white">
                pH Down/Up dry
              </Link>
            </DropdownItem>
            <DropdownItem>
              <Link href="#" className="text-base text-white">
                pH Test drop
              </Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <NavbarItem>
          <Link className="text-white" href="#">
            {t("blog")}
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link className="text-white" href="#">
            {t("support")}
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link className="text-white" href="#">
            {t("shop")}
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <LocaleSwitcher />
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={index}>
            <Link className="w-full" href={item.href} size="lg">
              {item.title}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
      {/* <NavbarMenu></NavbarMenu> */}
    </Navbar>
  );
}
