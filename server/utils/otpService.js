const sessions = new Map();

const generateOtp = (phone) => {
  const sessionId = `sess-${Date.now()}`;
  const otp = "123456";
  sessions.set(sessionId, { phone, otp });

  return { sessionId, message: "OTP sent" };
};

const verifyOtpCode = ({ phone, otp, sessionId }) => {
  const session = sessions.get(sessionId);
  return Boolean(session && session.phone === phone && session.otp === otp);
};

module.exports = { generateOtp, verifyOtpCode };
