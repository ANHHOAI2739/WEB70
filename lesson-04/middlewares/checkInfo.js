export const checkInfo = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .send({ message: "Vui lòng cung cấp đầy đủ username và password" });
  }
  next();
};
