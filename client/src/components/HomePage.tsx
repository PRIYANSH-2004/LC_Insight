import React, { useState } from "react";
import fetchData from "../utils/fetchData";
import ShowUserData from "./ShowUserData";
import CompareUserCard from "./CompareUserCard";
import { FaArrowTrendUp, FaUsers, FaAward} from "react-icons/fa6";
// import VisitorCounter from './VisitorCounter'

const HomePage = () => {
  const [userNames, setUserNames] = useState<string[]>([""]);
  const [showData, setShowData] = useState(false);
  const [userData, setUserData] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddUser = () => {
    if (userNames.length < 3) {
      setUserNames([...userNames, ""]);
    }
  };

  const handleRemoveUser = (index: number) => {
    const newUserNames = userNames.filter((_, idx) => idx !== index);
    setUserNames(newUserNames);
  };

  const handleInputChange = (index: number, value: string) => {
    const newUserNames = [...userNames];
    newUserNames[index] = value;
    setUserNames(newUserNames);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userNames[0].trim()) {
      setError("Please enter at least one username");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // setUserNames(["PRIYANSH_2004", "ashwin190304", "PRIYANSH_2004"]);
      const promises = userNames
        .filter((name) => name.trim())
        .map((name) => fetchData(name));
      const results = await Promise.all(promises);

      if (results.some((data) => !data?.data?.matchedUser)) {
        setError(`One or more users not found`);
        return;
      }
      // console.log('****************************')
      // console.log(results)
      setUserData(results);
      setShowData(true);
    } catch (err) {
      setError("Failed to fetch user data");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center mt-16 mb-16 px-4 ">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-xl p-8 sm:px-10">
        <h3 className="text-3xl font-extrabold mb-2 bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent">
          LeetCode Profile Analyzer
        </h3>
        <p className="mb-8 text-gray-600">
          Compare your LeetCode stats with friends or analyze your own profile!
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-6 mb-6">
            <div className="flex items-center space-x-2 bg-white rounded-full px-3 py-1.5 shadow-md border border-gray-100">
              
              <FaArrowTrendUp className="text-blue-500"/>
              <span className="text-sm font-medium text-gray-700">Real-time Stats</span>
            </div>
            <div className="flex items-center space-x-2 bg-white rounded-full px-3 py-1.5 shadow-md border border-gray-100">
              
              <FaUsers className="text-green-600"/>
              <span className="text-sm font-medium text-gray-700">Multi-User Compare</span>
            </div>
            <div className="flex items-center space-x-2 bg-white rounded-full px-3 py-1.5 shadow-md border border-gray-100">
              
              <FaAward className="text-purple-500"/>
              <span className="text-sm font-medium text-gray-700">Detailed Analysis</span>
            </div>
          </div>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 w-full flex flex-col justify-center"
        >
          {userNames.map((username, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                value={username}
                autoComplete="off"
                placeholder={`LeetCode username ${index + 1}`}
                className="border border-gray-300 p-2 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 transition"
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleRemoveUser(index)}
                  className="px-3 py-2 text-red-500 hover:text-red-700 rounded-full transition"
                  aria-label="Remove user"
                >
                  ×
                </button>
              )}
            </div>
          ))}

          <div className="flex gap-4 mt-2">
            {userNames.length < 3 && (
              <button
                type="button"
                onClick={handleAddUser}
                className="px-4 py-2 text-blue-600 border border-blue-400 rounded-lg hover:bg-blue-50 transition font-medium"
              >
                + Add Profile
              </button>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed`}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  Loading...
                </span>
              ) : userNames.length <= 1
                ? "Analyze"
                : "Compare"}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-6 text-red-700 font-bold p-4 bg-red-100 rounded-lg border border-red-300 transition">
            {error}
          </div>
        )}
      </div>

      {showData && userData.length > 0 && !error && (
        
        
        <div className="mt-12 w-full flex flex-col items-center">
          <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {userData.length > 1 ? "🏆 Comparison Results" : "📊 Profile Analysis"}
              </h2>
              <p className="text-gray-600">
                {userData.length > 1 
                  ? "Compare the coding champions side by side"
                  : "Detailed breakdown of your LeetCode journey"
                }
              </p>
            </div>

          {userData.length > 1 ? (
            <div className="flex flex-col md:flex-row gap-6 w-full justify-center">
              {userData.map((data, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md min-w-[320px] transition hover:shadow-2xl"
                >
                  <CompareUserCard userData={data} />
                </div>
              ))}
            </div>
          ) : (
            userData.map((data, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg min-w-[320px] transition hover:shadow-2xl"
              >
                <ShowUserData userData={data} />
              </div>
            ))
          )}
        </div>
      )}
      {/* <VisitorCounter/> */}
    </div>
  );
};

export default HomePage;
