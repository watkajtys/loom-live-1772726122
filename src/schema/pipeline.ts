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
