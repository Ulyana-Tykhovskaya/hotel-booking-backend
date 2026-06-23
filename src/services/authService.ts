import { User } from "../models";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (data: any) => {
  const { email, password, name, lastname } = data;

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw { status: 400, message: "User already exists" };
  }

  const hashedPassword = await bcryptjs.hash(password, 10);
  const user = await User.create({
    name,
    lastname,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET || "secret",
    { expiresIn: "7d" },
  );

  return {
    message: "User registered successfully",
    user: { id: user.id, name: user.name, email: user.email },
    token,
  };
};

export const loginUser = async (data: any) => {
  const { email, password } = data;

  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw { status: 404, message: "User not found" };
  }

  const isPasswordValid = await bcryptjs.compare(password, user.password);
  if (!isPasswordValid) {
    throw { status: 401, message: "Invalid password" };
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET || "secret",
    { expiresIn: "7d" },
  );

  return {
    message: "Login successful",
    user: { id: user.id, name: user.name, email: user.email },
    token,
  };
};

export const getUser = async (userId: number) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw { status: 404, message: "User not found" };
  }
  return user;
};
