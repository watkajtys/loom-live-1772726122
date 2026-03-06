import { RecordModel } from 'pocketbase';

export type SocialMention = RecordModel & {
  platform: string;
  query: string;
  draft_reply: string;
  status: 'drafting' | 'pending_approval' | 'queued' | 'approved' | 'rejected';
  user: string;
  priority: number;
};

type ContentPipelineBase = RecordModel & {
  title: string;
  markdown_body: string;
  agentId?: string;
  platformIcon?: string;
};

export type ContentPipeline = ContentPipelineBase & (
  | { status: 'drafting' }
  | { status: 'review' }
  | { status: 'published' }
);

export interface CreateContentPipelineDTO {
  title: string;
  markdown_body: string;
  status: 'drafting' | 'review' | 'published';
  agentId?: string;
  platformIcon?: string;
}

export interface UpdateContentPipelineDTO extends Partial<CreateContentPipelineDTO> {}

export type AXReport = RecordModel & {
  error_log: string;
  suggested_fix: string;
  status: 'pending' | 'submitted';
};

export type KnowledgeSource = RecordModel & {
  source_type: 'sdk_repo' | 'docs_url' | 'github_issues' | 'forum';
  url: string;
  vectorization_status: 'pending' | 'processing' | 'vectorized' | 'failed';
  last_synced: string;
};

export type Pipeline = RecordModel & {
  title: string;
  description?: string;
};

export interface CreatePipelineDTO {
  title: string;
  description?: string;
}

export interface UpdatePipelineDTO extends Partial<CreatePipelineDTO> {}

export type PipelineStage = RecordModel & {
  pipeline_id: string; // relation
  title: string;
  position: number;
};

export interface CreatePipelineStageDTO {
  pipeline_id: string;
  title: string;
  position: number;
}

export interface UpdatePipelineStageDTO extends Partial<CreatePipelineStageDTO> {}

export type PipelineCard = RecordModel & {
  stage_id: string; // relation
  title: string;
  content: string;
  position: number;
};

export interface CreatePipelineCardDTO {
  stage_id: string;
  title: string;
  content: string;
  position: number;
}

export interface UpdatePipelineCardDTO extends Partial<CreatePipelineCardDTO> {}
