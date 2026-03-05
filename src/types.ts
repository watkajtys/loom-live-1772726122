export interface BaseModel {
  id: string;
  created: string;
  updated: string;
}

export interface SocialMention extends BaseModel {
  platform: string;
  query: string;
  draft_reply: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface ContentPipeline extends BaseModel {
  title: string;
  markdown_body: string;
  status: 'drafting' | 'review' | 'published';
}

export interface AxReport extends BaseModel {
  error_log: string;
  suggested_fix: string;
  status: 'pending' | 'submitted';
}

export interface KnowledgeSource extends BaseModel {
  source_type: 'sdk_repo' | 'docs_url' | 'github_issues' | 'forum';
  url: string;
  vectorization_status: 'pending' | 'processing' | 'vectorized' | 'failed';
  last_synced: string;
}
