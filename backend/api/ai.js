export default async function handler(req, res) {
    if (req.method === "POST") {
        const { code } = req.body;

        return res.status(200).json(`### ✅ Code Received\n\n\`\`\`js\n${code}\n\`\`\``);
    }

    return res.status(200).json({ message: "API working 🚀" });
}