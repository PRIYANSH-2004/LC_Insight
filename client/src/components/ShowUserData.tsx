import React from 'react'


interface UserDataProps {
    userData: {
        data: {
            matchedUser: {
                profile: {
                    userAvatar: string;
                    realName: string;
                    countryName: string;
                    school: string;
                    ranking: number;
                };
                username: string;
                submitStats: {
                    acSubmissionNum: Array<{
                        difficulty: string;
                        count: number;
                        submissions: number;
                    }>;
                };
            };
            userContestRanking: {
                rating: number;
                globalRanking: number;
                topPercentage: number;
                attendedContestsCount: number;
            };
        };
    };
}

const ShowUserData: React.FC<UserDataProps> = (props) => {
    const userData = props.userData;
  return (
    <div className="container mx-auto px-4">
      <div className="space-y-6">
          {/* Profile Section */}
          <div className="bg-white shadow rounded-lg p-6 ">
          <div className="flex items-center gap-6 mb-8">
            <img
              src={userData.data.matchedUser.profile.userAvatar}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-blue-200 shadow"
            />
            <div className="min-w-0 flex-1">
              <h2
                className="text-2xl font-bold text-gray-900 truncate"
                title={userData.data.matchedUser.profile.realName || "null"}
              >
                {userData.data.matchedUser.profile.realName || "null"}
              </h2>
              <p
                className="text-blue-700 font-mono truncate"
                title={userData.data.matchedUser.username}
              >
                @{userData.data.matchedUser.username}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {userData.data.matchedUser.profile.countryName && (
                  <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                    {userData.data.matchedUser.profile.countryName}
                  </span>
                )}
                {userData.data.matchedUser.profile.school && (
                  <span className="inline-block bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">
                    {userData.data.matchedUser.profile.school}
                  </span>
                )}
                <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                  Global Rank: #{userData.data.matchedUser.profile.ranking ?? "null"}
                </span>
              </div>
            </div>
          </div>
        </div>
          

          {/* Contest Stats */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Contest Performance</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded">
                <p className="text-gray-600">Rating</p>
                <p className="text-xl font-bold text-black">{userData?.data?.userContestRanking?.rating?.toFixed(2) ?? "null"}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded">
                <p className="text-gray-600">Global Rank</p>
                <p className="text-xl font-bold text-black">#{userData?.data?.userContestRanking?.globalRanking ?? "null"}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded">
                <p className="text-gray-600">Top Percentage</p>
                <p className="text-xl font-bold text-black">{userData?.data?.userContestRanking?.topPercentage?.toFixed(1) ?? "null"}%</p>
              </div>
              <div className="p-4 bg-gray-50 rounded">
                <p className="text-gray-600">Contests Attended</p>
                <p className="text-xl font-bold text-black">{userData?.data?.userContestRanking?.attendedContestsCount ?? "null"}</p>
              </div>
            </div>
          </div>
          

          {/* Submission Stats */}
          {userData?.data?.matchedUser?.submitStats?.acSubmissionNum ? (
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Problem Solving Stats</h3>
            <div className="space-y-2 flex flex-col w-full">
              {userData.data.matchedUser.submitStats.acSubmissionNum.map(
                (item) => (
                  <div
                    key={item.difficulty}
                    className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 p-3 bg-gray-50 rounded"
                  >
                    <span
                      className={`font-medium ${
                        item.difficulty === "Hard"
                          ? "text-red-600"
                          : item.difficulty === "Medium"
                          ? "text-yellow-600"
                          : item.difficulty === "Easy"
                          ? "text-green-600"
                          : "text-gray-600"
                      } 
                      
                      `}
                    >
                      {item.difficulty ?? "null"}
                    </span>
                    <div className="grid items-start sm:items-center gap-2 sm:gap-4">
                      <span className="text-black font-medium">
                        {item.count ?? "null"} solved
                      </span>
                      {/* <span className="text-gray-500 hidden sm:inline">•</span> */}
                      <span className="text-gray-600">
                        Success Rate:
                        {item.submissions
                          ? ((item.count / item.submissions) * 100).toFixed(1)
                          : "null"}
                        %
                      </span>
                      {/* <span className="text-gray-500 hidden sm:inline">•</span> */}
                      <span className="text-black">
                        ({item.submissions ?? "null"} submissions)
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        ) : (
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Problem Solving Stats</h3>
              <p className="text-gray-600">No submission stats available.</p>
            </div>
          )}
        </div>
    </div>
  )
}

export default ShowUserData
