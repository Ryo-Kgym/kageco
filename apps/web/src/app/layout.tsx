import "styles/globals.css";
import "@mantine/core/styles.css";
import "@mantine/core/styles.layer.css";
import "@mantine/dates/styles.css";
import "mantine-datatable/styles.layer.css";

import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";

import { ClientsProviders } from "./_provider/ClientsProviders";

export const metadata: Metadata = {
  title: "我が家の家計簿",
  appleWebApp: true,
};

const Layout = ({ children }: { children: React.ReactNode }) => (
  <html lang={"ja"}>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
      <script
        type="text/javascript"
        src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js"
      />
    </head>
    <body>
      <ClerkProvider
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
        signUpUrl=""
        appearance={{
          elements: {
            formButtonPrimary: "bg-indigo-600 hover:bg-indigo-700",
            footerActionLink: "text-indigo-600 hover:text-indigo-700",
            emailAddressInput: "hidden",
            formFieldInput: "hidden",
            formFieldLabel: "hidden",
            formFieldAction: "hidden",
            formButtonReset: "hidden",
            dividerLine: "hidden",
            dividerText: "hidden",
            formFieldRow: "hidden",
            identityPreview: "hidden",
            footerAction: "hidden",
            card: "rounded-xl shadow-lg p-6 sm:p-8 md:p-10 bg-white",
            headerTitle: "text-xl sm:text-2xl md:text-3xl font-bold text-gray-800",
            headerSubtitle: "text-sm sm:text-base md:text-lg text-gray-600",
            socialButtonsBlockButton: "py-3 md:py-4 text-base md:text-lg",
            main: "mx-auto w-full max-w-sm sm:max-w-md md:max-w-lg",
          },
          layout: {
            socialButtonsVariant: "iconButton",
            socialButtonsPlacement: "top",
          },
        }}
      >
        <ClientsProviders>{children}</ClientsProviders>
      </ClerkProvider>
    </body>
  </html>
);

export default Layout;
