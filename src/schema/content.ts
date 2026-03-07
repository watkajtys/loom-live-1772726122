import { z } from 'zod';

export const CreateContentPipelineSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  markdown_body: z.string().min(1, 'Markdown body is required'),
  status: z.enum(['drafting', 'review', 'published']),
  agentId: z.string().optional(),
  platformIcon: z.string().optional(),
});

export const UpdateContentPipelineSchema = CreateContentPipelineSchema.partial();

export type CreateContentPipelineDTO = z.infer<typeof CreateContentPipelineSchema>;
export type UpdateContentPipelineDTO = z.infer<typeof UpdateContentPipelineSchema>;
