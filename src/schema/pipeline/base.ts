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

export type PipelineConfig = z.infer<typeof CreatePipelineConfigSchema>;

export type CreatePipelineDTO = z.infer<typeof CreatePipelineSchema>;
export type UpdatePipelineDTO = z.infer<typeof UpdatePipelineSchema>;

export type CreatePipelineStageDTO = z.infer<typeof CreatePipelineStageSchema>;
export type UpdatePipelineStageDTO = z.infer<typeof UpdatePipelineStageSchema>;

// GET / DELETE options
export const FetchPipelinesOptionsSchema = z.object({
  page: z.number().int().min(1).optional(),
  perPage: z.number().int().min(1).max(500).optional(),
  filter: z.string().optional(),
  sort: z.string().optional(),
});

export const DeletePipelineIdSchema = z.string().min(1, 'Pipeline ID is required');

export type FetchPipelinesOptionsDTO = z.infer<typeof FetchPipelinesOptionsSchema>;

export const FetchPipelineStagesOptionsSchema = z.object({
  pipeline_id: z.string().min(1, 'Pipeline ID is required'),
  page: z.number().int().min(1).optional(),
  perPage: z.number().int().min(1).max(500).optional(),
  sort: z.string().optional(),
});

export const DeletePipelineStageIdSchema = z.string().min(1, 'Pipeline Stage ID is required');

export type FetchPipelineStagesOptionsDTO = z.infer<typeof FetchPipelineStagesOptionsSchema>;