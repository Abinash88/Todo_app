import { checkAuth, connectDB } from "@/utils/Features";
import { Task } from "@/models/Task";
import { ErrorHandler, assyncError } from "@/middleware/Error";

const handler = assyncError(async (req, res) => {
  if (req.method !== "POST")
    return ErrorHandler(res, 400, "Only POST requests are allowed");
  await connectDB();
  const { title, description } = req.body;

  if (!title || !description)
    return ErrorHandler(res, 401, "Please fill up the fields");

  const user = await checkAuth(req);

  if (!user) return ErrorHandler(res, 401, "Login First");

  await Task.create({
    title,
    description,
    user: user._id,
  });
  res.json({ success: true,
     message: "Task created successfully" });
});

export default handler;
