const register = async (req, res) => {
  res.send('Register User');
};
const login = async (req, res) => {
  res.send('user is login already');
};
const updateUser = async (req, res) => {
  res.send('User is updated');
};

export { register, login, updateUser };
