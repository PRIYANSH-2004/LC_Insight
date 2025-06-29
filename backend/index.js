const express = require('express')
const axios = require("axios")
const cors = require("cors")
require('dotenv').config()
const app = express();
app.use(cors())
app.use(express.json()) // why this is used

const PORT = process.env.PROXY_PORT

app.post("/leetcode", async (req, res) => {
    try {
        console.log("Incoming request body:", req.body);

        const response = await axios.post(
            "https://leetcode.com/graphql",
            req.body,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Referer": "https://leetcode.com",
                    "Origin": "https://leetcode.com",
                    "User-Agent": "Mozilla/5.0", 
                }
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error("Error details:", {
            message: error.message,
            responseData: error.response?.data,
            status: error.response?.status,
            headers: error.response?.headers,
        }); // Log detailed error information
        res.status(500).json({ error: "Failed to fetch user data" });
    }
});

app.listen(PORT, ()=> console.log(`Server is running on ${PORT}`))