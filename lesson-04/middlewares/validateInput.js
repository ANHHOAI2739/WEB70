export const validateInput = (req, res, next) => {
  const { username, password, fullname } = req.body;
  if (!username) {
    return res.status(400).send({ message: "username là bắt buộc" });
  }

  if (!/^[a-zA-Z0-9]+$/.test(username)) {
    return res.status(400).send({ message: "username sai định dạng" });
  }

  if (!password) {
    return res.status(400).send({ message: "password là bắt buộc" });
  }

  if (!/^[a-zA-Z0-9]{6,}$/.test(password)) {
    return res.status(400).send({ message: "password sai định dạng" });
  }

  if (!fullname) {
    return res.status(400).send({ message: "fullname là bắt buộc" });
  }

  next();
};
