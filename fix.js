import { z } from "zod";

const PipelineRequestBaseSchema = z.object({
  pipeline_id: z.string().min(1, 'Pipeline ID is required'),
  requester_id: z.string().min(1, 'Requester ID is required'),
  reason: z.string().min(1, 'Reason is required'),
});

const CreatePipelineRequestSchema = z.discriminatedUnion('status', [
  PipelineRequestBaseSchema.extend({
    status: z.literal('pending'),
  }).strict(),
  PipelineRequestBaseSchema.extend({
    status: z.literal('approved'),
    approved_by: z.string().min(1, 'approved_by is required when status is approved'),
    approved_at: z.string().datetime(),
  }).strict(),
  PipelineRequestBaseSchema.extend({
    status: z.literal('rejected'),
    rejected_by: z.string().min(1, 'rejected_by is required when status is rejected'),
    rejected_at: z.string().datetime(),
    rejection_reason: z.string().min(1, 'rejection_reason is required when status is rejected'),
  }).strict(),
]);

const validPending = {
  pipeline_id: 'pl_123',
  requester_id: 'user_123',
  reason: 'Need feature xyz',
  status: 'pending'
};
    
const invalidPendingWithApproval = {
  ...validPending,
  approved_by: 'admin_123'
};

try {
  CreatePipelineRequestSchema.parse(invalidPendingWithApproval);
  console.log("Parsed invalid pending successfully (THIS IS WRONG)");
} catch (e) {
  console.log("Failed to parse invalid pending (THIS IS CORRECT)");
}
