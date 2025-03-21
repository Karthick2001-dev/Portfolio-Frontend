export const getLLMResponse = async (question) => {
    try {
        const response = await fetch("https://portfolio-abcw.onrender.com/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ question }),
        });

        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error("Error fetching LLM response:", error);
        return "Sorry, there was an error!";
    }
};
