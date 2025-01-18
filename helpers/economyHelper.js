const User = require('../models/Economy');

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

const earnMoney = async (username, amount, description) => {
  const user = await createUserIfNotExists(username);
  user.balance += amount;
  user.transactionHistory.push({ amount, description });
  await user.save();
  return user.balance;
};

const spendMoney = async (username, amount, description) => {
  const user = await createUserIfNotExists(username);
  if (user.balance >= amount) {
    user.balance -= amount;
    user.transactionHistory.push({ amount: -amount, description });
    await user.save();
    return user.balance;
  } else {
    throw new Error('Insufficient balance');
  }
};

const transferMoney = async (fromUsername, toUsername, amount, description) => {
  const fromUser = await createUserIfNotExists(fromUsername);
  const toUser = await createUserIfNotExists(toUsername);

  if (fromUser.balance >= amount) {
    fromUser.balance -= amount;
    toUser.balance += amount;

    fromUser.transactionHistory.push({ amount: -amount, description });
    toUser.transactionHistory.push({ amount, description });

    await fromUser.save();
    await toUser.save();

    return { fromBalance: fromUser.balance, toBalance: toUser.balance };
  } else {
    throw new Error('Insufficient balance');
  }
};

module.exports = { getBalance, earnMoney, spendMoney, transferMoney };
