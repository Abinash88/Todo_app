import { checkAuth, connectDB } from "@/utils/Features";
import { Task } from "@/models/Task";
import { ErrorHandler, assyncError } from "@/middleware/Error";

const handler = assyncError(async (req, res) => {
  if (req.method !== "GET")
    return ErrorHandler(res, 400, "Only GET requests are allowed");

  await connectDB();

  const user = await checkAuth(req);

  if(!user) return ErrorHandler(res, 401, "Login First")
  
  const todos = await Task.find({ user: user._id });
  res.json({success:true, message: "Task created successfully", todos });
});

export default handler;
