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

export const CreatePipelineRunSchema = z.object({
  pipeline_id: z.string().min(1, 'Pipeline ID is required'),
  status: z.enum(['running', 'completed', 'failed']),
  started_at: z.string().datetime(),
  completed_at: z.string().datetime().optional(),
  log: z.string().optional(),
});

export const UpdatePipelineRunSchema = CreatePipelineRunSchema.partial();

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
