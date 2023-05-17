import { ErrorHandler, assyncError } from "@/middleware/Error";
import { User } from "@/models/user";
import { connectDB, cookieSetter, generateToken } from "@/utils/Features";
import bcrypt from "bcrypt";

const handler = assyncError(async (req, res) => {
  if (req.method !== "POST")
    return ErrorHandler(res, 400, "Only POST requests are allowed");

  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return ErrorHandler(res, 400, "Please Enter all feild");
  await connectDB();

  let user = await User.findOne({ email });

  if (user) return ErrorHandler(res, 400, "User already exists");

  const hashPassword = await bcrypt.hash(password, 10);

  user = await User.create({
    name,
    email,
    password: hashPassword,
  });
  const token = generateToken(user._id);
  cookieSetter(res, token, true);
  res.status(201).json({
    success: true,
    message: "Registered Successfully",
    user,
  });
});

export default handler;
