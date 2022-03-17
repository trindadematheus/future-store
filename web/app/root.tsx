import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
import type { MetaFunction } from "remix";
import { ChakraProvider } from "@chakra-ui/react";
import { LinksFunction } from "@remix-run/react/routeModules";

import { DarkModeSwitch } from "./components/core/DarkModeSwitch";
import { WalletProvider } from "./hooks/use-wallet";

export const meta: MetaFunction = () => {
  return { title: "Future Store - Welcome to Future" };
};

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css",
  },
  {
    rel: "stylesheet",
    href: "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css",
  },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="description" content="Next-gen e-commerce" />
        <Meta />
        <Links />
      </head>
      <body>
        <ChakraProvider>
          <WalletProvider>
            <DarkModeSwitch />
            <Outlet />
          </WalletProvider>
        </ChakraProvider>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
