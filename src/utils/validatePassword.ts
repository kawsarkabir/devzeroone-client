export function validatePassword(password) {
  const lengthCheck = password.length >= 6;
  const lowerCheck = /[a-z]/.test(password);
  const upperCheck = /[A-Z]/.test(password);
  const numberCheck = /\d/.test(password);

  switch (true) {
    case !lengthCheck:
      return "Password must be at least 6 characters long.";
    case !lowerCheck:
      return "Password must include at least one lowercase letter.";
    case !upperCheck:
      return "Password must include at least one uppercase letter.";
    case !numberCheck:
      return "Password must include at least one number.";
    default:
      return "valid";
  }
}
