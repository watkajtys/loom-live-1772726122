import { z } from 'zod';

export const CreateKnowledgeArticleSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  content: z.string().min(1, 'Content is required'),
  category: z.string().min(1, 'Category is required').max(100),
  author_id: z.string().min(1, 'Author ID is required'),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  tags: z.array(z.string()).optional().default([]),
});

export const UpdateKnowledgeArticleSchema = CreateKnowledgeArticleSchema.partial();

export type CreateKnowledgeArticleDTO = z.infer<typeof CreateKnowledgeArticleSchema>;
export type UpdateKnowledgeArticleDTO = z.infer<typeof UpdateKnowledgeArticleSchema>;

export const FetchKnowledgeArticlesOptionsSchema = z.object({
  page: z.number().int().min(1).optional(),
  perPage: z.number().int().min(1).max(500).optional(),
  filter: z.string().optional(),
  sort: z.string().optional(),
  category: z.string().optional(),
  status: z.enum(['draft', 'published', 'archived']).optional(),
});

export type FetchKnowledgeArticlesOptionsDTO = z.infer<typeof FetchKnowledgeArticlesOptionsSchema>;
