import { ErrorHandler, assyncError } from "@/middleware/Error";
import { Task } from "@/models/Task";
import { connectDB } from "@/utils/Features";
import { checkAuth } from "@/utils/Features";

const handler = assyncError(async (req, res) => {
  await connectDB();
  const user = await checkAuth(req);
  if (!user) return ErrorHandler(res, 401, "Login First");

  const taskId = req.query.id;

  const task = await Task.findById(taskId);
  if (!task) return ErrorHandler(res, 404, "Task Not Found");

  if (req.method === "PUT") {

    task.isCompleted = !task.isCompleted;

    await task.save();

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
    });
  } else if (req.method === "DELETE") {
    await task.deleteOne();
    res.status(200).json({
      success: true,
      message: "Task Deleted successfully",
    });
  } else {
    ErrorHandler(res, 400, "This method is unavailable");
  }

  const todos = await Task.find({ user: user._id });
  res.json({ message: "Task updated successfully", todos });
});

export default handler;
