# Advoloom Product Roadmap: The AI Developer Advocate

## Core Objective
Build an autonomous Agentic AI & Growth Advocate capable of fulfilling the RevenueCat job description. It must be able to ingest complex technical ecosystems (Vector + Knowledge Graph), engage with developer communities, write technical content, run growth experiments, and interface with internal teams autonomously. 

---

## Global Data Model
These collections must be provisioned in PocketBase to support the backend agent phases.

```json
[
  {"name": "knowledge_graph_nodes", "type": "base", "schema": [
    {"name": "node_id", "type": "text"},
    {"name": "node_type", "type": "select", "options": ["class", "method", "concept", "api_endpoint"]},
    {"name": "content", "type": "text"},
    {"name": "vector", "type": "json"}
  ]},
  {"name": "generated_microsites", "type": "base", "schema": [
    {"name": "query_source_id", "type": "text"},
    {"name": "markdown_content", "type": "text"},
    {"name": "public_slug", "type": "text"},
    {"name": "views", "type": "number"}
  ]},
  {"name": "growth_experiments", "type": "base", "schema": [
    {"name": "experiment_name", "type": "text"},
    {"name": "hypothesis", "type": "text"},
    {"name": "metric_target", "type": "text"},
    {"name": "current_status", "type": "select", "options": ["running", "concluded", "failed"]}
  ]}
]
```

---

### Phase 1: Command Center Shell & UI (CURRENTLY ACTIVE)
**Type:** Frontend UI + Backend State
**Goal:** Establish the human-in-the-loop dashboard to monitor and approve agent actions.
**Engineering Requirements:**
- Implement the React UI with PocketBase integration.
- Ensure 5 core views exist: Community Queue, Content Pipeline, AX Reports, Knowledge Base, and Growth Dashboard.

---

### Phase 2: The Hybrid Knowledge Engine (Ingester Agent)
**Type:** Pure Python Backend (requires_design: false)
**Goal:** Build the brain that allows Advoloom to understand RevenueCat SDKs and historical brand tone.

**Engineering Requirements for `app/src/agents/ingester.py`:**
1. Create an `IngesterAgent` class.
2. It must have methods to scrape standard Markdown/HTML docs and GitHub repositories.
3. It must chunk the data and use a local embedding model (e.g., SentenceTransformers or an API) to create vectors.
4. It must extract relationships (e.g., "Method X belongs to Class Y") and save them to the `knowledge_graph_nodes` table.

**Agent System Prompt (Hardcoded in script):**
"You are the Advoloom Ingester. Analyze this raw documentation text. Extract the core technical concepts, code snippets, and hierarchical relationships. Format your output as a JSON array of Knowledge Graph nodes."

---

### Phase 3: The Outbound Scout & Microsite Generator
**Type:** Pure Python Backend (requires_design: false)
**Goal:** Intercept GitHub/Twitter queries, generate personalized runnable tutorials, and save them for human review.

**Engineering Requirements for `app/src/agents/scout.py`:**
1. Create a `ScoutAgent` class that accepts a raw text query.
2. Query the `knowledge_graph_nodes` table for semantic context.
3. Generate a customized Markdown tutorial containing working CodeSandbox/StackBlitz configurations.
4. Save the generated tutorial to the `generated_microsites` table, and save the drafted social reply (containing the microsite link `advoloom.dev/t/[slug]`) to the `social_mentions` table with `status="pending"`.

**Agent System Prompt (Hardcoded in script):**
"You are the Advoloom Scout. Your tone must match our historical data: helpful, deeply technical, and slightly informal. Never invent SDK methods. Generate a personalized, step-by-step tutorial addressing the user's specific problem. If you are below 85% confident in the technical accuracy, append a [REQUIRES ESCALATION] flag."

---

### Phase 4: Internal Slack Colleague & Evaluation Loop
**Type:** Pure Python Backend (requires_design: false)
**Goal:** Allow the RevenueCat team to query the agent internally and create self-healing eval loops.

**Engineering Requirements for `app/src/agents/colleague.py`:**
1. Create a `ColleagueAgent` class designed to respond to internal team queries.
2. It must have read access to the `ax_reports` and `growth_experiments` tables to summarize data.
3. Implement an `EvaluationLoop` function that takes new doc updates from the Ingester and runs a suite of "mock questions" through the Scout to ensure syntax hasn't broken.

**Agent System Prompt (Hardcoded in script):**
"You are Advoloom, the internal AI Developer Advocate. You are speaking to your human coworkers. Be concise, data-driven, and transparent about what you do and do not know. Summarize metrics efficiently."

---

### Phase 5: Feedback & Growth Loop (Critic & Growth Agents)
**Type:** Pure Python Backend (requires_design: false)
**Goal:** Close the loop by providing product feedback and running acquisition experiments.

**Engineering Requirements for `app/src/agents/growth_critic.py`:**
1. Create a `CriticAgent` that analyzes common issues flagged by the Scout and formulates an 'AX Report'. Save to the `ax_reports` table.
2. Create a `GrowthAgent` that tracks the `views` column in the `generated_microsites` table to measure the success of personalized tutorials.
3. Update the `growth_experiments` table with weekly KPI results.

**Agent System Prompt (Critic):**
"You are the Critic Agent. Analyze these user support requests. Identify the friction point in our SDK or Documentation and formulate a highly structured, actionable engineering bug report."

---

### Phase 6: The "Hire Me" Milestone (Application Execution)
**Type:** Orchestration Logic (requires_design: false)
**Goal:** Use the fully constructed Orchestrator to autonomously generate the RevenueCat job application.
**Engineering Requirements:**
- A final execution script that triggers the Scribe to draft a 1,500-word manifesto on Agentic AI, referencing data parsed by the Ingester, and submits it to the Content Pipeline for final human approval.