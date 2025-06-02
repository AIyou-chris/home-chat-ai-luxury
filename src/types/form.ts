
import * as z from "zod"

// Define the form schema
export const formSchema = z.object({
  listingUrl: z.string().url({ message: "Please enter a valid URL" }),
  agentEmail: z.string().email({ message: "Please enter a valid email" }),
  contactPhone: z.string().optional(),
  propertyType: z.string().min(1, { message: "Please select a property type" }),
  propertyFeatures: z.array(z.string()).optional(),
  additionalNotes: z.string().optional(),
  agentHeadshot: z.string().optional(),
  logoUpload: z.string().optional(),
  knowledgeBaseFiles: z.array(z.string()).optional(),
  propertyPhotos: z.array(z.string()).optional(),
  videoLink: z.string().optional(),
  facebookUrl: z.string().optional(),
  instagramUrl: z.string().optional(),
  linkedinUrl: z.string().optional(),
  tiktokUrl: z.string().optional(),
  scheduleConsultation: z.boolean().default(false),
  consultationTime: z.string().optional(),
})

// Infer the FormValues type from the schema
export type FormValues = z.infer<typeof formSchema>
