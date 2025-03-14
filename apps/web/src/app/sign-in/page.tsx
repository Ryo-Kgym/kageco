import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignIn
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
        },
      }}
    />
  );
}
