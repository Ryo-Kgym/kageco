import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-indigo-100 px-4 py-6 md:py-8 lg:py-10 safe-area-inset">
      <div className="mb-6 md:mb-10 text-center">
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-indigo-600">
          Home Helper
        </h1>
        <p className="mt-2 md:mt-4 text-base sm:text-lg md:text-xl text-gray-600 px-2 sm:px-0 max-w-2xl mx-auto">
          家計簿・タスク管理・スケジュール管理を一つのアプリで
        </p>
      </div>

      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg">
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
              card: "rounded-xl shadow-lg p-6 sm:p-8 md:p-10 bg-white",
              headerTitle: "text-xl sm:text-2xl md:text-3xl font-bold text-gray-800",
              headerSubtitle: "text-sm sm:text-base md:text-lg text-gray-600",
              socialButtonsBlockButton: "py-3 md:py-4 text-base md:text-lg",
            },
            layout: {
              socialButtonsVariant: "iconButton",
              socialButtonsPlacement: "top",
              showOptionalFields: false,
              shimmer: true,
            },
          }}
        />
      </div>
    </div>
  );
}
