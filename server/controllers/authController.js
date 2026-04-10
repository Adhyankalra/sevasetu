const { generateOtp, verifyOtpCode } = require("../utils/otpService");

const requestOtp = async (req, res) => {
  const { phone } = req.body;
  const response = generateOtp(phone);
  res.json(response);
};

const verifyOtp = async (req, res) => {
  const { phone, otp, sessionId } = req.body;
  const valid = verifyOtpCode({ phone, otp, sessionId });

  if (!valid) {
    return res.status(401).json({ message: "Invalid OTP" });
  }

  return res.json({ message: "OTP verified", token: "demo-jwt-token" });
};

module.exports = { requestOtp, verifyOtp };
