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

import {
  CreatePipelineDTO as SchemaCreatePipelineDTO,
  UpdatePipelineDTO as SchemaUpdatePipelineDTO,
  CreatePipelineStageDTO as SchemaCreatePipelineStageDTO,
  UpdatePipelineStageDTO as SchemaUpdatePipelineStageDTO,
  CreatePipelineCardDTO as SchemaCreatePipelineCardDTO,
  UpdatePipelineCardDTO as SchemaUpdatePipelineCardDTO,
  CreatePipelineStepDTO as SchemaCreatePipelineStepDTO,
  UpdatePipelineStepDTO as SchemaUpdatePipelineStepDTO,
  CreatePipelineRunDTO as SchemaCreatePipelineRunDTO,
  UpdatePipelineRunDTO as SchemaUpdatePipelineRunDTO,
  PipelineConfig,
  PipelineExecutionArguments as SchemaPipelineExecutionArguments,
  TriggerPipelineRunPayload as SchemaTriggerPipelineRunPayload,
  UpdatePipelineRunStatusPayload as SchemaUpdatePipelineRunStatusPayload,
  CreatePipelineRequestDTO as SchemaCreatePipelineRequestDTO,
  UpdatePipelineRequestDTO as SchemaUpdatePipelineRequestDTO
} from '../schema/pipeline';

export type Pipeline = RecordModel & {
  title: string;
  description?: string;
  config?: PipelineConfig;
};

export type CreatePipelineDTO = SchemaCreatePipelineDTO;
export type UpdatePipelineDTO = SchemaUpdatePipelineDTO;

export type PipelineStage = RecordModel & {
  pipeline_id: string; // relation
  title: string;
  position: number;
};

export type CreatePipelineStageDTO = SchemaCreatePipelineStageDTO;
export type UpdatePipelineStageDTO = SchemaUpdatePipelineStageDTO;

export type PipelineCard = RecordModel & {
  stage_id: string; // relation
  title: string;
  content: string;
  position: number;
};

export type CreatePipelineCardDTO = SchemaCreatePipelineCardDTO;
export type UpdatePipelineCardDTO = SchemaUpdatePipelineCardDTO;

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

export type CreatePipelineStepDTO = SchemaCreatePipelineStepDTO;
export type UpdatePipelineStepDTO = SchemaUpdatePipelineStepDTO;

type PipelineRunBase = RecordModel & {
  pipeline_id: string; // relation
  started_at: string;
};

export type PipelineRun = PipelineRunBase & (
  | { status: 'running'; completed_at?: undefined; log?: undefined }
  | { status: 'completed'; completed_at: string; log?: string }
  | { status: 'failed'; completed_at: string; log: string }
);

export type CreatePipelineRunDTO = SchemaCreatePipelineRunDTO;
export type UpdatePipelineRunDTO = SchemaUpdatePipelineRunDTO;

export type PipelineExecutionArguments = SchemaPipelineExecutionArguments;
export type TriggerPipelineRunPayload = SchemaTriggerPipelineRunPayload;
export type UpdatePipelineRunStatusPayload = SchemaUpdatePipelineRunStatusPayload;

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

export type CreatePipelineRequestDTO = SchemaCreatePipelineRequestDTO;
export type UpdatePipelineRequestDTO = SchemaUpdatePipelineRequestDTO;
