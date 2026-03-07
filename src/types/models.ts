import { RecordModel } from 'pocketbase';
import { PipelineConfig } from '../schema/pipeline/base';

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
  config?: PipelineConfig;
};

export type PipelineStage = RecordModel & {
  pipeline_id: string; // relation
  title: string;
  position: number;
};

export type PipelineCard = RecordModel & {
  stage_id: string; // relation
  title: string;
  content: string;
  position: number;
};

type PipelineStepBase = RecordModel & {
  card_id: string; // relation
  title: string;
  description?: string;
  position: number;
};

export type PipelineStep = PipelineStepBase & (
  | { status: 'pending' }
  | { status: 'in_progress' }
  | { status: 'completed' }
  | { status: 'failed' }
);

type PipelineRunBase = RecordModel & {
  pipeline_id: string; // relation
  started_at: string;
};

export type PipelineRun = PipelineRunBase & (
  | { status: 'running'; completed_at?: undefined; log?: undefined }
  | { status: 'completed'; completed_at: string; log?: string }
  | { status: 'failed'; completed_at: string; log: string }
);

type PipelineRequestBase = RecordModel & {
  pipeline_id: string; // relation
  requester_id: string;
  reason: string;
};

export type PipelineRequest = PipelineRequestBase & (
  | { status: 'pending' }
  | { status: 'approved'; approved_by: string; approved_at: string }
  | { status: 'rejected'; rejected_by: string; rejected_at: string; rejection_reason: string }
);

export type KnowledgeArticle = RecordModel & {
  title: string;
  content: string;
  category: string;
  author_id: string; // relation
  status: 'draft' | 'published' | 'archived';
  tags: string[];
};
