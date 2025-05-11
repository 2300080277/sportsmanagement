const bcrypt = import("bcryptjs");

const password = "admin123";
bcrypt.hash(password, 10).then((hash) => {
  console.log("Use this hash:", hash);
});
