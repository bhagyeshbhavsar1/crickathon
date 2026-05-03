import { GoogleGenerativeAI } from '@google/generative-ai';

async function testGemini() {
    const key = "AIzaSyAJLyylwf4kj_92_p2dMSdsK9ovZfu3f8c";
    console.log("Testing key:", key);
    try {
        const genAI = new GoogleGenerativeAI(key);
        const model = genAI.getGenerativeModel({ model: "gemini-3-flash" });
        const result = await model.generateContent("Say hello");
        console.log("Success! Response:", result.response.text());
    } catch (e) {
        console.error("Error:", e.message);
    }
}

testGemini();
