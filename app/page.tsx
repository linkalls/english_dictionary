"use client";

import { useState } from "react";
import { askAiAction } from "./server/ai_ask_server";

export default function SearchPage() {
  const [result, setResult] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await askAiAction(formData);
      setResult(result);
    } catch (err) {
      setError("検索中にエラーが発生しました。もう一度お試しください。");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col py-8 px-4 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
      <div className="mb-8">
        <h1 className="text-center font-extrabold text-4xl md:text-5xl">
          英単語を検索してみよう！！！！
        </h1>
      </div>

      <div className="w-full max-w-sm mx-auto mb-8 relative">
        {/* ローディング画面 */}
        {isLoading && (
          <div className="absolute inset-0 bg-gray-800/60 backdrop-blur-sm z-10 rounded-lg flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="text-indigo-200 font-medium animate-pulse text-xl">
              検索しています...
            </div>
          </div>
        )}

        <form onSubmit={(e) => { e.preventDefault(); handleSearch(new FormData(e.target)); }}>
          <label
            htmlFor="search"
            className="mb-2 text-sm font-medium text-gray-200 sr-only"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="search"
              name="search"
              disabled={isLoading}
              className="block w-full p-4 ps-10 text-sm text-gray-900 border-2 border-indigo-300 rounded-lg bg-white/20 backdrop-blur-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
              placeholder="英単語を入力してください"
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className="text-white absolute end-2.5 bottom-2.5 bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 disabled:bg-gray-400 flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Loading...</span>
                </>
              ) : (
                "検索"
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="flex flex-col items-center space-y-4">
        {error && (
          <div className="text-red-300 text-center p-4 w-full max-w-2xl">
            {error}
          </div>
        )}
        <div className="w-full max-w-2xl min-h-[200px] p-6 bg-white/20 backdrop-blur-md rounded-lg shadow-lg">
          {isLoading ? (
            <div className="h-full flex flex-col items-center justify-center gap-4">
              <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              <div className="text-indigo-400 font-medium animate-pulse">
                結果を取得しています...
              </div>
            </div>
          ) : result ? (
            <p className="text-center text-lg">{result}</p>
          ) : (
            <p className="text-center text-gray-300">
              検索結果がここに表示されます
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
