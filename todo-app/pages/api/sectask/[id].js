import { ErrorHandler, assyncError } from "@/middleware/Error";
import { Task } from "@/models/Task";
import { checkAuth, connectDB } from "@/utils/Features";

const handler = assyncError(async (req, res) => {
  if (req.method !== "GET")
    return ErrorHandler(res, 400, "Only GET requests are allowed");

  await connectDB();
  const user = await checkAuth(req);
  if (!user) return ErrorHandler(res, 401, "Login First");

  const mainId = req.query.id;

  const todos = await Task.find({ user:user._id});
  console.log(todos)
  res.json({ success: true, message: "Task created successfully", todos });
});

export default handler;
