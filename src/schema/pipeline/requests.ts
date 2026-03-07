import { z } from 'zod';

const PipelineRequestBaseSchema = z.object({
  pipeline_id: z.string().min(1, 'Pipeline ID is required'),
  requester_id: z.string().min(1, 'Requester ID is required'),
  reason: z.string().min(1, 'Reason is required'),
});

export const CreatePipelineRequestSchema = z.discriminatedUnion('status', [
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

export const UpdatePipelineRequestSchema = z.object({
  pipeline_id: z.string().optional(),
  requester_id: z.string().optional(),
  reason: z.string().optional(),
  status: z.enum(['pending', 'approved', 'rejected']).optional(),
  approved_by: z.string().optional(),
  approved_at: z.string().datetime().optional(),
  rejected_by: z.string().optional(),
  rejected_at: z.string().datetime().optional(),
  rejection_reason: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.status === 'approved') {
    if (!data.approved_by) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'approved_by is required when status is approved', path: ['approved_by'] });
    }
    if (!data.approved_at) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'approved_at is required when status is approved', path: ['approved_at'] });
    }
  } else if (data.status === 'rejected') {
    if (!data.rejected_by) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'rejected_by is required when status is rejected', path: ['rejected_by'] });
    }
    if (!data.rejected_at) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'rejected_at is required when status is rejected', path: ['rejected_at'] });
    }
    if (!data.rejection_reason || data.rejection_reason.trim() === '') {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'rejection_reason is required when status is rejected', path: ['rejection_reason'] });
    }
  } else if (data.status === 'pending') {
    if (data.approved_by !== undefined || data.approved_at !== undefined) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'approval fields should not be present when status is pending', path: ['approved_by'] });
    }
    if (data.rejected_by !== undefined || data.rejected_at !== undefined || data.rejection_reason !== undefined) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'rejection fields should not be present when status is pending', path: ['rejected_by'] });
    }
  }
});

export type CreatePipelineRequestDTO = z.infer<typeof CreatePipelineRequestSchema>;
export type UpdatePipelineRequestDTO = z.infer<typeof UpdatePipelineRequestSchema>;

export const FetchPipelineRequestsOptionsSchema = z.object({
  pipeline_id: z.string().optional(),
  requester_id: z.string().optional(),
  status: z.string().optional(),
});

export const DeletePipelineRequestIdSchema = z.string().min(1, 'Pipeline Request ID is required');

export type FetchPipelineRequestsOptionsDTO = z.infer<typeof FetchPipelineRequestsOptionsSchema>;
