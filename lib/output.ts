const createFormData = (level: string, answer: string) => {
  const formData = new URLSearchParams();
  formData.append("level", level);
  formData.append("answer", answer);
  return formData;
};

export const uploadSolution = async (
  url: string,
  level: string,
  answer: string,
  sessionCookie: string,
) => {
  const formData = createFormData(level, answer);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": `session=${sessionCookie}`,
      },
      body: formData.toString(),
    });

    if (response.ok) {
      const text = await response.text();
      console.log("Response received:", text);
    } else {
      console.error(`Error: ${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }

  return Promise.resolve();
};
