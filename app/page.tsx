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
    <div className="min-h-screen flex flex-col py-8 px-4">
      <div className="mb-8">
        <h1 className="text-center font-bold text-3xl">
          英単語を検索してみよう！！！！
        </h1>
      </div>
      
      <div className="w-full max-w-sm mx-auto mb-8">
        <form action={handleSearch}>
          <label
            htmlFor="search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
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
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="英単語を入力してください"
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-gray-400"
            >
              {isLoading ? "検索中..." : "検索"}
            </button>
          </div>
        </form>
      </div>

      <div className="flex flex-col items-center space-y-4">
        {error && (
          <div className="text-red-500 text-center p-4 w-full max-w-2xl">
            {error}
          </div>
        )}
        {result && (
          <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow">
            <p className="text-center text-lg">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}