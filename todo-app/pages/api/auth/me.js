import { ErrorHandler, assyncError } from "@/middleware/Error";
import { checkAuth } from "@/utils/Features";

const handler = assyncError(async (req, res) => {
  if (req.method !== "GET")
    return ErrorHandler(res, 400, "Only GET requests are allowed");

    const user = await checkAuth(req);
    if(!user) return ErrorHandler(res, 401, 'Login First')

  res.status(200).json({
    success: true,
    user
  });
});

export default handler;
