const getUserProfile = async (userId) => {
  try {
    console.log(userId);
    const url = `http://localhost:3000/api/v1/user/user-profile`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });
    console.log(response);
    const data = await response.json();

    console.log("datadatadatadatadata", data);
  } catch (error) {
    console.error("Error");
  }
};
getUserProfile("676049ee76203cfbd2d928a1");
