/*
 * Copyright (c) 2024 Ryo-Kgym.
 */

"use client";

import { SignInButton } from "@clerk/nextjs";
import { useEffect } from "react";

import { useAuth } from "../../../hooks/authentication/useAuth";

export const EnhancedLoginContainer = () => {
  const { loginCheckForLoginPage } = useAuth();

  useEffect(() => {
    loginCheckForLoginPage();
  }, [loginCheckForLoginPage]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-indigo-100 px-4 py-6 sm:py-2 md:py-8 lg:py-10">
      <div className="mb-6 sm:mb-8 md:mb-10 text-center">
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-indigo-600">
          One for All
        </h1>
        <p className="mt-2 text-base sm:text-lg md:text-xl text-gray-600 px-2 sm:px-0 max-w-2xl mx-auto">
          家計簿・タスク管理・スケジュール管理を一つのアプリで
        </p>
      </div>

      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg rounded-xl bg-white p-6 sm:p-8 md:p-10 shadow-lg">
        <div className="text-center">
          <h2 className="mb-3 sm:mb-4 md:mb-5 text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
            アカウントにログイン
          </h2>
          <p className="mb-5 sm:mb-6 md:mb-8 text-sm sm:text-base md:text-lg text-gray-600">
            サービスを利用するにはログインが必要です
          </p>

          <SignInButton mode="modal">
            <button
              type="button"
              className="w-full rounded-lg bg-indigo-600 px-4 py-3 md:py-4 font-bold text-white transition duration-200 hover:bg-indigo-700 text-base md:text-lg"
            >
              ログイン
            </button>
          </SignInButton>

          <div className="mt-5 sm:mt-6 md:mt-8 text-xs sm:text-sm md:text-base text-gray-500">
            <p>
              ログインすることで、
              <a
                href="https://clerk.com/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline"
              >
                利用規約
              </a>
              と
              <a
                href="https://clerk.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline"
              >
                プライバシーポリシー
              </a>
              に同意したことになります。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
