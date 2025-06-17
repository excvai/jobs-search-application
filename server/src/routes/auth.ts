import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { authMiddleware } from "../middleware/auth";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET!;

// Create Profile
router.post("/create-profile", async (req: Request, res: Response) => {
  const { email, password, name, jobTitle, aboutMe } = req.body;
  try {
    if (await User.findOne({ email })) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    const user = await User.create({
      email,
      password,
      name,
      jobTitle,
      aboutMe,
    });
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "3h" });
    res.json({ token });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// Login
router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// Get information about the user based on jwt token
router.get("/me", authMiddleware, async (req: Request, res: Response) => {
  const user = await User.findById((req as any).userId).select("-password");
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  res.json(user);
});

export default router;
