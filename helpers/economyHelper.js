const User = require("../models/Economy");

const getUserByUsername = async (username) => {
  return await User.findOne({ username });
};

const createUserIfNotExists = async (username) => {
  const existingUser = await getUserByUsername(username);
  if (!existingUser) {
    const newUser = new User({ username });
    await newUser.save();
    return newUser;
  }
  return existingUser;
};

const getBalance = async (username) => {
  const user = await getUserByUsername(username);
  return user ? user.balance : null;
};

const earnMoney = async (username, amount) => {
  const user = await createUserIfNotExists(username);
  user.balance += amount;
  await user.save();
  return user.balance;
};

const spendMoney = async (username, amount) => {
  const user = await createUserIfNotExists(username);
  if (user.balance >= amount) {
    user.balance -= amount;
    await user.save();
    return user.balance;
  } else {
    throw new Error("Insufficient balance");
  }
};

const transferMoney = async (fromUsername, toUsername, amount) => {
  const fromUser = await createUserIfNotExists(fromUsername);
  const toUser = await createUserIfNotExists(toUsername);

  if (fromUser.balance >= amount) {
    fromUser.balance -= amount;
    toUser.balance += amount;

    await fromUser.save();
    await toUser.save();

    return { fromBalance: fromUser.balance, toBalance: toUser.balance };
  } else {
    throw new Error("Insufficient balance");
  }
};

const updateUser = async (username, updates) => {
  const { newUsername, balance } = updates;

  const user = await User.findOne({ username });
  if (!user) {
    throw new Error("User not found");
  }

  if (newUsername) {
    user.username = newUsername;
  }

  if (balance !== undefined) {
    user.balance = balance;
  }

  user.updatedAt = new Date();

  await user.save();

  return user;
};

module.exports = {
  getBalance,
  earnMoney,
  spendMoney,
  transferMoney,
  updateUser,
};
