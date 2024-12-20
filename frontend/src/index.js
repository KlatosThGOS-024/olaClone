const getCurrentRide = async (rideId, token) => {
  try {
    const url = `http://localhost:3000/api/v1/ride/user-ride/current?rideId=${rideId}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data);
    if (data.data && data.data.length > 0) {
      setRideDetails(data.data);
    } else {
      console.warn("No pending ride found.");
    }
  } catch (error) {
    console.error("Error fetching ride details:", error);
  }
};
getCurrentRide(
  "676534b793e4b2eca27ad56d",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzYzZmY4MzMyNDE4ZTBkYjNhMGY2YjUiLCJ1c2VybmFtZSI6IlNhcmUzNUBnamgiLCJpYXQiOjE3MzQ2ODUwNDV9.vtX0jIuqVnXz0oioxmY8Ig41oskm4orvlTiLxndHDN4"
);
