import { ErrorHandler, assyncError } from "@/middleware/Error";
import { User } from "@/models/user";
import { connectDB, cookieSetter, generateToken } from "@/utils/Features";
import bcrypt from "bcrypt";

const handler = assyncError(async (req, res) => {
  if (req.method !== "POST")
    return ErrorHandler(res, 400, "Only POST requests are allowed");

  const { email, password } = req.body;
  if (!email || !password)
    return ErrorHandler(res, 400, "Please Enter all feild");
  await connectDB();

  const user = await User.findOne({ email }).select("+password");

  if (!user) return ErrorHandler(res, 400, "Invalid email or password");

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return ErrorHandler(res, 400, "Invalid email or password");

  const token = generateToken(user._id);
  cookieSetter(res, token, true);
  res.status(200).json({
    success: true,
    message: "Login succesfully",
    user
  });
});

export default handler;
