import z from "zod";

export const registerUserSchema = z.object({
    name:z.string().min(3,"Name must be at least 3 characters").max(50,"Name must not exceed 30 characters").trim(),
    email:z.email("Please enter a valid email address "),
    password:z.string().min(6,"Password must be atleat 6 chatcters").max(50,"Password must not exceed 50 characters")
})


