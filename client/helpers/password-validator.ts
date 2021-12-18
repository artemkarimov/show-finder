const validatePasswords = (password: string, confirmPassword: string): undefined | never => {
  if (!password && !confirmPassword) return;
  if (password.length < 6) throw Error('Password should consist of at least 6 characters.');
  if (password !== confirmPassword) throw Error('Passwords do not match.');
};

export default validatePasswords;
