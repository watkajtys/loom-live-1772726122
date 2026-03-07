import { z } from 'zod';

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

export type CreatePipelineCardDTO = z.infer<typeof CreatePipelineCardSchema>;
export type UpdatePipelineCardDTO = z.infer<typeof UpdatePipelineCardSchema>;

export type CreatePipelineStepDTO = z.infer<typeof CreatePipelineStepSchema>;
export type UpdatePipelineStepDTO = z.infer<typeof UpdatePipelineStepSchema>;

export const FetchPipelineCardsOptionsSchema = z.object({
  stage_id: z.string().min(1, 'Stage ID is required'),
  page: z.number().int().min(1).optional(),
  perPage: z.number().int().min(1).max(500).optional(),
  sort: z.string().optional(),
});

export const DeletePipelineCardIdSchema = z.string().min(1, 'Pipeline Card ID is required');

export type FetchPipelineCardsOptionsDTO = z.infer<typeof FetchPipelineCardsOptionsSchema>;

export const FetchPipelineStepsOptionsSchema = z.object({
  card_id: z.string().min(1, 'Card ID is required'),
  page: z.number().int().min(1).optional(),
  perPage: z.number().int().min(1).max(500).optional(),
  sort: z.string().optional(),
});

export const DeletePipelineStepIdSchema = z.string().min(1, 'Pipeline Step ID is required');

export type FetchPipelineStepsOptionsDTO = z.infer<typeof FetchPipelineStepsOptionsSchema>;