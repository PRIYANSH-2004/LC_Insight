const express = require('express')
const axios = require("axios")
const cors = require("cors")

const app = express();
app.use(cors())
app.use(express.json()) // why this is used

const PORT = 5000

app.post("/leetcode", async (req, res) => {
    try {
        // console.log("Incoming request body:", req.body); 

        const response = await axios.post(
            "https://leetcode.com/graphql",
            req.body,
            { headers: { "Content-Type": "application/json" } }
        );

        res.json(response.data);
    } catch (error) {
        console.error("Error details:", error.response?.data || error.message); 
        res.status(500).json({ error: "Failed to fetch user data" });
    }
});

app.listen(PORT, ()=> console.log(`Server is running on ${PORT}`))