import React, { useState } from "react";
import fetchData from "../utils/fetchData";
import ShowUserData from "./ShowUserData";
import CompareUserCard from "./CompareUserCard";
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
      setUserNames(["PRIYANSH_2004", "ashwin190304", "PRIYANSH_2004"]);
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
    <div className="w-full flex flex-col items-center justify-center text-center border-4 border-red-700">
      
      <h2 className="fixed top-0 left-0 right-0 items-center text-2xl font-bold mb-6 text-black bg-gray-100 p-3">
        LC Insight
      </h2>
      <div className="p-4 w-full sm:px-6 lg:px-8 pt-16 pb-16 border m-16 ">
        <form onSubmit={handleSubmit} className="space-y-4 w-full rounded border flex flex-col justify-center mx-auto max-w-md">
          {userNames.map((username, index) => (
            <div key={index} className="flex gap-2">
              <input
                value={username}
                autoComplete="name11" // remove it later
                placeholder={`Enter LeetCode username ${index + 1}`}
                className="border p-2 rounded flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200"
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleRemoveUser(index)}
                  className="px-3 py-2 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              )}
            </div>
          ))}

          <div className="flex gap-4">
            {userNames.length < 3 && (
              <button
                type="button"
                onClick={handleAddUser}
                className="px-4 py-2 text-blue-500 border border-blue-500 rounded hover:bg-blue-50"
              >
                + Add Profile
              </button>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              {isLoading
                ? "Loading..."
                : userNames.length <= 1
                ? "Analyze"
                : "Compare"}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-4 text-red-500 font-bold p-4 bg-red-50 rounded">
            {error}
          </div>
        )}

      </div>
        {showData && userData.length > 0 && !error && (
          <div className="mt-8 gap-8 flex flex-nowrap ">
            {userData.length > 1 ? (
              <div className="flex flex-row gap-4 border mb-16">
                {userData.map((data, index) => (
                  <CompareUserCard key={index} userData={data} />
                ))}
              </div>
            ) : (
              userData.map((data, index) => (
                <ShowUserData key={index} userData={data} />
              ))
            )}
          </div>
        )}
        {/* <VisitorCounter/> */}
        <p className="fixed bottom-0 left-0 right-0 text-center text-black bg-gray-100 py-2 text-sm">
          Made with ❤️ by Priyansh
        </p>
    </div>
  );
};

export default HomePage;
