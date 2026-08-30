import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().max(200).optional(),
  message: z.string().min(10).max(5000),
  service: z.string().optional(),
  budget: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
