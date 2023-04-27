import jwt_decode from "jwt-decode";

export const isFirebaseTokenExpired = (token) => {
  if (token === "") {
    return true;
  }
  try {
    let decodedToken = jwt_decode(token);
    console.log(decodedToken);
    const expirationTime = decodedToken.exp * 1000;
    console.log(expirationTime);

    const currentTime = Date.now();

    return expirationTime < currentTime;
  } catch (error) {
    console.error("Error decoding Firebase token:", error);
    return true; // Assume token is expired if decoding fails
  }
};

export const userLoggedCheck = () => {
  const token = localStorage.getItem("TOKEN");
  const isExpired = isFirebaseTokenExpired(token);
  return !isExpired;
};
