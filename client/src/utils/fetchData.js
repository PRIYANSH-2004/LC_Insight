import axios from "axios"

const fetchData = async (username) => {
    const query = {
        query: `
            query getUserData($username: String!) {
                matchedUser(username: $username) {
                    username
                    profile {
                        realName
                        userAvatar
                        countryName
                        school
                        ranking
                        reputation
                    }
                    submitStats {
                        acSubmissionNum {
                            difficulty
                            count
                            submissions
                        }
                        totalSubmissionNum {
                            difficulty
                            count
                            submissions
                        }
                    }
                    submissionCalendar
                }
                userContestRanking(username: $username) {
                    attendedContestsCount
                    rating
                    globalRanking
                    totalParticipants
                    topPercentage
                }
            }
        `,
        variables: { username: username || "PRIYANSH_2004" }
    };

    try {
        const response = await axios.post(
            "http://localhost:5000/leetcode", // proxy URL
            query,
            { headers: { "Content-Type": "application/json" } }
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};

export default fetchData
