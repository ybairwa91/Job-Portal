export const updateUserController = async (req, res, next) => {
  const { name, email, lastName, password } = req.body;
  if (!name || !email || !lastName || !password) {
    next("");
  }
};
