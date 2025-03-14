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
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-indigo-100 py-2">
      <div className="mb-8 text-center">
        <h1 className="font-serif text-6xl font-bold text-indigo-600">
          One for All
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          家計簿・タスク管理・スケジュール管理を一つのアプリで
        </p>
      </div>

      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            アカウントにログイン
          </h2>
          <p className="mb-6 text-gray-600">
            サービスを利用するにはログインが必要です
          </p>

          <SignInButton mode="modal">
            <button
              type="button"
              className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-bold text-white transition duration-200 hover:bg-indigo-700"
            >
              ログイン
            </button>
          </SignInButton>

          <div className="mt-6 text-sm text-gray-500">
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
