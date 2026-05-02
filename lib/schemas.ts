import { z } from "zod";
import { budgetOptions, leadWorkOptions } from "@/lib/content";

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Enter your name"),
  phone: z
    .string()
    .trim()
    .min(8, "Enter a valid phone number")
    .max(20, "Phone number is too long"),
  email: z.email("Enter a valid email"),
  workRequired: z.enum(leadWorkOptions as [string, ...string[]]),
  budget: z.enum(budgetOptions as [string, ...string[]]),
  timelineDays: z
    .number("Timeline must be a number")
    .int("Timeline must be a whole number")
    .min(1, "Enter at least 1 day")
    .max(365, "Use a timeline under one year"),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more about the requirement")
    .max(2000, "Message is too long"),
});

export type LeadFormValues = z.infer<typeof leadSchema>;

export const adminLoginSchema = z.object({
  email: z.email("Enter admin email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type AdminLoginValues = z.infer<typeof adminLoginSchema>;
