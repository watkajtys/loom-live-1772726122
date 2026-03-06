import { z } from 'zod';

export const CreatePipelineConfigSchema = z.object({
  color: z.string().optional(),
  icon: z.string().optional(),
  is_active: z.boolean().default(true),
});

export const UpdatePipelineConfigSchema = CreatePipelineConfigSchema.partial();

export const CreatePipelineSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  description: z.string().max(500).optional(),
  config: CreatePipelineConfigSchema.optional(),
});

export const UpdatePipelineSchema = CreatePipelineSchema.partial();

export const CreatePipelineStageSchema = z.object({
  pipeline_id: z.string().min(1, 'Pipeline ID is required'),
  title: z.string().min(1, 'Title is required').max(100),
  position: z.number().int().min(0),
});

export const UpdatePipelineStageSchema = CreatePipelineStageSchema.partial();

export const CreatePipelineCardSchema = z.object({
  stage_id: z.string().min(1, 'Stage ID is required'),
  title: z.string().min(1, 'Title is required').max(100),
  content: z.string(),
  position: z.number().int().min(0),
});

export const UpdatePipelineCardSchema = CreatePipelineCardSchema.partial();

export const CreatePipelineStepSchema = z.object({
  card_id: z.string().min(1, 'Card ID is required'),
  title: z.string().min(1, 'Title is required').max(100),
  description: z.string().max(500).optional(),
  status: z.enum(['pending', 'in_progress', 'completed', 'failed']),
  position: z.number().int().min(0),
});

export const UpdatePipelineStepSchema = CreatePipelineStepSchema.partial();

const CreatePipelineRunBaseSchema = z.object({
  pipeline_id: z.string().min(1, 'Pipeline ID is required'),
  started_at: z.string().datetime(),
});

export const CreatePipelineRunSchema = z.discriminatedUnion('status', [
  CreatePipelineRunBaseSchema.extend({
    status: z.literal('running'),
  }),
  CreatePipelineRunBaseSchema.extend({
    status: z.literal('completed'),
    completed_at: z.string().datetime(),
    log: z.string().optional(),
  }),
  CreatePipelineRunBaseSchema.extend({
    status: z.literal('failed'),
    completed_at: z.string().datetime(),
    log: z.string().min(1, 'Log is required for failed runs'),
  }),
]);

export const UpdatePipelineRunSchema = z.object({
  pipeline_id: z.string().optional(),
  status: z.enum(['running', 'completed', 'failed']).optional(),
  started_at: z.string().datetime().optional(),
  completed_at: z.string().datetime().optional(),
  log: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.status === 'completed') {
    if (!data.completed_at) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'completed_at is required when status is completed',
        path: ['completed_at'],
      });
    }
  } else if (data.status === 'failed') {
    if (!data.completed_at) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'completed_at is required when status is failed',
        path: ['completed_at'],
      });
    }
    if (!data.log || data.log.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'log is required when status is failed',
        path: ['log'],
      });
    }
  } else if (data.status === 'running') {
    if (data.completed_at !== undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'completed_at should not be present when status is running',
        path: ['completed_at'],
      });
    }
    if (data.log !== undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'log should not be present when status is running',
        path: ['log'],
      });
    }
  }
});

export type CreatePipelineDTO = z.infer<typeof CreatePipelineSchema>;
export type UpdatePipelineDTO = z.infer<typeof UpdatePipelineSchema>;

export type CreatePipelineStageDTO = z.infer<typeof CreatePipelineStageSchema>;
export type UpdatePipelineStageDTO = z.infer<typeof UpdatePipelineStageSchema>;

export type CreatePipelineCardDTO = z.infer<typeof CreatePipelineCardSchema>;
export type UpdatePipelineCardDTO = z.infer<typeof UpdatePipelineCardSchema>;

export type CreatePipelineStepDTO = z.infer<typeof CreatePipelineStepSchema>;
export type UpdatePipelineStepDTO = z.infer<typeof UpdatePipelineStepSchema>;

export type CreatePipelineRunDTO = z.infer<typeof CreatePipelineRunSchema>;
export type UpdatePipelineRunDTO = z.infer<typeof UpdatePipelineRunSchema>;

export type PipelineConfig = z.infer<typeof CreatePipelineConfigSchema>;

// Pipeline Execution Payloads

export const PipelineExecutionArgumentsSchema = z.record(z.string(), z.any()).optional();

export const TriggerPipelineRunPayloadSchema = z.object({
  pipeline_id: z.string().min(1, 'Pipeline ID is required'),
  arguments: PipelineExecutionArgumentsSchema,
  trigger_source: z.string().optional(),
});

export const UpdatePipelineRunStatusPayloadSchema = z.discriminatedUnion('status', [
  z.object({
    status: z.literal('running'),
  }),
  z.object({
    status: z.literal('completed'),
    completed_at: z.string().datetime(),
    metrics: z.record(z.string(), z.any()).optional(),
  }),
  z.object({
    status: z.literal('failed'),
    completed_at: z.string().datetime(),
    error_message: z.string().min(1, 'Error message is required for failed runs'),
  }),
]);

export type PipelineExecutionArguments = z.infer<typeof PipelineExecutionArgumentsSchema>;
export type TriggerPipelineRunPayload = z.infer<typeof TriggerPipelineRunPayloadSchema>;
export type UpdatePipelineRunStatusPayload = z.infer<typeof UpdatePipelineRunStatusPayloadSchema>;

// Pipeline Requests

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
