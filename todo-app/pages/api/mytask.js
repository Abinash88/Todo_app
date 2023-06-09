import { checkAuth, connectDB } from "@/utils/Features";
import { Task } from "@/models/Task";
import { ErrorHandler, assyncError } from "@/middleware/Error";

const handler = assyncError(async (req, res) => {
  if (req.method !== "GET")
    return ErrorHandler(res, 400, "Only GET requests are allowed");

  await connectDB();

  const user = await checkAuth(req);

  if (!user) return ErrorHandler(res, 401, "Login First");

    const todos = await Task.find({$and: [{ user: user._id }, { isCompleted: false }]});


  res.json({ success: true, message: "Task Completed", todos });
});

export default handler;
