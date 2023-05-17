import { ErrorHandler, assyncError } from "@/middleware/Error";
import { cookieSetter } from "@/utils/Features";

const handler = assyncError(async (req, res) => {
  if (req.method !== "GET")
    return ErrorHandler(res, 400, "Only GET requests are allowed");

  cookieSetter(res, null, false);
  res.status(200).json({
    success: true,
    message: "Logout succesfully",
  });
}); 

export default handler;
