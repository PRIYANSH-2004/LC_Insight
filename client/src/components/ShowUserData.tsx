import React from 'react'


const ShowUserData= (props) => {
    const userData = props.userData;
  return (
    <div>
      <div className="space-y-6">
          {/* Profile Section */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center gap-4">
              <img 
                src={userData.data.matchedUser.profile.userAvatar} 
                alt="Profile" 
                className="w-20 h-20 rounded-full"
              />
              <div>
                <h2 className="text-2xl font-bold text-black">{userData.data.matchedUser.profile.realName}</h2>
                <p className="text-black">@{userData.data.matchedUser.username}</p>
                <p className="text-black">{userData.data.matchedUser.profile.countryName} • {userData.data.matchedUser.profile.school}</p>
                <p className="text-black">Global Ranking: #{userData.data.matchedUser.profile.ranking}</p>
              </div>
            </div>
          </div>

          {/* Contest Stats */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Contest Performance</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded">
                <p className="text-gray-600">Rating</p>
                <p className="text-xl font-bold text-black">{userData.data.userContestRanking.rating.toFixed(2)}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded">
                <p className="text-gray-600">Global Rank</p>
                <p className="text-xl font-bold text-black">#{userData.data.userContestRanking.globalRanking}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded">
                <p className="text-gray-600">Top Percentage</p>
                <p className="text-xl font-bold text-black">{userData.data.userContestRanking.topPercentage.toFixed(1)}%</p>
              </div>
              <div className="p-4 bg-gray-50 rounded">
                <p className="text-gray-600">Contests Attended</p>
                <p className="text-xl font-bold text-black">{userData.data.userContestRanking.attendedContestsCount}</p>
              </div>
            </div>
          </div>

          {/* Submission Stats */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Problem Solving Stats</h3>
            <div className="space-y-2">
              {userData.data.matchedUser.submitStats.acSubmissionNum.map((item:any) => (
                <div 
                  key={item.difficulty} 
                  className="flex items-center justify-between p-3 bg-gray-50 rounded"
                >
                  <span className={`font-medium ${
                    item.difficulty === 'Hard' ? 'text-red-600' :
                    item.difficulty === 'Medium' ? 'text-yellow-600' :
                    item.difficulty === 'Easy' ? 'text-green-600' :
                    'text-gray-600'
                  }`}>
                    {item.difficulty}
                  </span>
                  <div className="flex items-center gap-4">
                    <span className="text-black font-medium">{item.count} solved</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-600">Success Rate: 
                      {((item.count / item.submissions) * 100).toFixed(1)}%
                    </span>
                    <span className="text-gray-500">•</span>
                    <span className="text-black">({item.submissions} submissions)</span>
                  </div>
        </div>
              ))}
            </div>
          </div>
        </div>
    </div>
  )
}

export default ShowUserData
