import type { BlogPost } from './content'

// Long-form posts. Body uses a tiny markdown subset rendered by BlogModal:
//   "## "  heading · "> " quote · "- " bullet · "``` " code fence ·
//   blank line = paragraph · **bold** inline.

export const POSTS: BlogPost[] = [
  {
    id: 'self-evolving-agent',
    title: 'The Self-Evolving Agent',
    kicker: 'LLM-as-a-Judge',
    date: 'Aug 2026',
    readingTime: '7 min',
    tags: ['Agentic AI', 'Evaluation', 'LLMOps'],
    excerpt:
      'How I built an evaluation loop that scores an agent against a rubric, then rewrites its own prompts to close the gaps — turning eval from a report card into a feedback controller.',
    body: `## The problem with shipping agents

An agent that works in a demo and an agent you can ship are different animals. The moment real users touch it, you discover the long tail: the SQL it botches on a gnarly join, the compliance answer that's *almost* right, the tone that drifts. Manual QA doesn't scale — every prompt tweak silently regresses three things you already fixed.

I wanted the agent's quality to be **measured continuously and improved automatically**. That's what the self-evolving loop does.

## The loop

The core idea borrows from control theory: treat quality as a signal, and close the loop.

- **Generate** — the agent answers a fixed suite of representative tasks (real historical questions, held out from training).
- **Judge** — a separate LLM-as-a-Judge scores each response against an explicit rubric: correctness, grounding, completeness, tone. It returns a score *and* a written critique per dimension.
- **Diagnose** — critiques are clustered to find systematic failure modes, not one-off misses.
- **Refine** — the dominant failure modes are fed back to a prompt-rewriting step that proposes targeted edits to the system prompt and few-shot references.
- **Gate** — the candidate prompt only ships if it beats the incumbent on the full suite. No regression, no merge.

> The judge doesn't just grade — its critiques become the raw material for the next version of the agent.

## Why a rubric, not a thumbs-up

A scalar score tells you *that* something got worse; it doesn't tell you *what*. Structuring the judge around named dimensions makes the signal actionable. "Grounding dropped 12 points on payroll questions" points straight at retrieval; "tone regressed on rejections" points at the prompt. The rubric turns a vibe into a diagnosis.

## Guardrails that keep it honest

Self-improving systems fail in fun ways. The two that bit me:

- **Judge drift** — if the judge is the same model and prompt as the agent, it rewards its own blind spots. I pin the judge to a different configuration and periodically spot-check its scores against human labels.
- **Overfitting the suite** — an agent can learn to please the eval rather than the user. Keeping a rotating, held-out slice of real questions in the suite keeps it honest.

## What it changed

The payoff wasn't a single accuracy number — it was **velocity with a safety net**. Prompt changes stopped being scary. Regressions got caught before release instead of in Slack. And the critiques became a running, machine-generated changelog of exactly where the agent was weak, which is worth as much as the score itself.

The bigger lesson: evaluation isn't the thing you do *after* building the agent. Wired back into the system, it *is* the agent's improvement engine.`,
  },
  {
    id: 'databot-to-dbt',
    title: 'From Hardcoded Schemas to Living Context',
    kicker: 'MCP + Retrieval',
    date: 'Jul 2026',
    readingTime: '8 min',
    tags: ['MCP', 'Text-to-SQL', 'RAG', 'dbt'],
    excerpt:
      'Our data bot started as a text-to-SQL tool with table schemas pasted into the prompt. Here is how it became an agent that reads dbt and the codebase live — via MCP and embedding search.',
    body: `## The static era

The first version of our internal data assistant was, honestly, a prompt with a giant string in it. Every table we wanted it to query had its schema hand-copied into the system prompt: column names, types, a sentence of description. It worked — until it didn't.

The failure modes were predictable:

- The warehouse changed; the prompt didn't. The bot confidently queried columns that had been renamed.
- We could only afford to paste a handful of tables. Ask about anything else and it hallucinated a schema.
- Context windows filled with schema boilerplate instead of reasoning room.

Hardcoding context is a **maintenance tax you pay forever**, and it silently rots.

## The shift: give the agent tools, not text

The redesign followed one principle — *the agent should discover context, not be spoon-fed it.* Instead of stuffing knowledge into the prompt, we gave the agent tools to fetch it on demand.

- **Semantic search over dbt** — every dbt model's compiled schema and description is embedded locally (a small ONNX embedding model). When the agent needs a table, it searches for the concept ("employee onboarding status") and gets back the most relevant models, freshly parsed from the dbt manifest.
- **Read-only repo access** — the agent can run read-only shell commands over the Rails and dbt repositories, so it can read the *actual* model definitions and business logic rather than a stale summary.
- **DAG awareness** — because it reads the manifest, it knows a model's upstream and downstream neighbors, so it can follow lineage instead of guessing.

## Why MCP

Wiring these as **MCP (Model Context Protocol)** servers mattered more than it looks. MCP made each capability a clean, typed tool with a stable contract — the same servers are reusable across agents and clients, and each call is observable. The agent loop doesn't care whether a tool hits Snowflake, the filesystem, or an embedding index; it just sees tools that return data.

> The architecture philosophy: minimal abstractions, flat tool access, and trusting the model. No sub-agents, no framework — plain functions the model can call.

## Retrieval beats memorization

The embedding search is content-hash cached, so re-embedding only happens when a model actually changes. Practically, this means the bot's knowledge of the warehouse is **never more stale than the last dbt run**. A new table shows up in queries the moment it lands — no prompt edit, no redeploy.

## The lesson

We replaced a brittle artifact (a prompt full of copied schemas) with a *process* (retrieve context at query time). The static bot knew a fixed, decaying snapshot of the world. The agent knows how to **go look**. That single inversion — from memorized context to retrieved context — is the difference between a demo and a tool people trust with real questions.`,
  },
  {
    id: 'product-health',
    title: 'Product Health from Support Tickets',
    kicker: 'Applied LLM Pipeline',
    date: 'Jun 2026',
    readingTime: '9 min',
    tags: ['LLM Pipelines', 'Analytics', 'dbt', 'Hex'],
    excerpt:
      'Thousands of raw support conversations, zero structure. Here is how a 10-dimension LLM taxonomy — with drift monitoring and a registry-as-data core — became a live product-health dashboard.',
    body: `## Support tickets are the best product signal you ignore

Every day, customers tell you exactly what's broken — in support tickets. But that signal is trapped in free text: unstructured, inconsistent, unqueryable. You can't build a dashboard on "the app is being weird again."

The Product Health project turns that firehose into structured, trustworthy data.

## A taxonomy, inferred by an LLM

Each Intercom conversation is classified along **10 dimensions**, including:

- \`product_family\` and \`product\` — what the ticket is actually about
- \`feature\` and \`surface\` — web admin, web worker, iOS, or Android
- \`user_intent\`, \`blocker_type\`, \`blocker_step\` — what the user wanted and where they got stuck
- \`suggested_fix_path\`, \`persona\`, \`severity\`

One more dimension — escalation type — is derived downstream in dbt from the Intercom team routing. The labels are written back to Snowflake, where dbt marts turn them into support-intelligence tables.

## The registry-as-data core

The design decision I'm proudest of: **every categorical axis lives in a CSV, not in Python.**

- Adding a new product is a one-row edit to \`products.csv\`, not a code change.
- The schema accepts plain strings, not rigid enums — so if the model returns a value we've never seen, the batch doesn't crash.
- Instead, that unseen value surfaces as **drift** in the run summary.

> Drift is signal, not error. An unrecognized label is the system telling you the world changed and your registry needs a row.

This is the same pattern I'd reach for anywhere an LLM meets a controlled vocabulary: let the taxonomy be data, keep the code stable, and treat surprises as observability rather than failures.

## Trust: the part everyone skips

A classifier nobody trusts is a classifier nobody uses. Three things earned that trust:

- **Grounding** — the registries were validated against 100 real tickets, which is how we discovered honest categories like \`untriaged\` (22% of tickets had no usable transcript) and \`incorrect_data\`.
- **A daily QA pass** — a second, independent model re-classifies a sample and diffs against the primary, posting disagreements to Slack.
- **A weekly drift digest** — new/unexpected values get proposed as registry additions automatically, with a human approving the change.

## From labels to a dashboard

Those clean labels feed a live **Hex** product-health dashboard: severity trends by product, blocker hotspots, surfaces generating the most friction, and week-over-week movement. What was once anecdote ("support feels swamped by payroll issues") became a chart with a number and a trend.

The same spine also powers an account-level friction signal in Salesforce and a support-agent copilot that auto-enriches a ticket with its classification and similar past cases.

## The takeaway

The model is the easy part. The durable value came from the surrounding system: a data-driven registry, drift treated as observability, and a QA loop that made the output trustworthy enough to put in front of executives. **That's the difference between an LLM demo and an LLM in production.**`,
  },
  {
    id: 'compliance-engine',
    title: 'The Compliance Engine',
    kicker: 'Human-in-the-Loop AI',
    date: 'May 2026',
    readingTime: '8 min',
    tags: ['Agentic AI', 'Human-in-the-Loop', 'dbt'],
    excerpt:
      'U.S. labor law is enormous, fragmented, and always changing. Here is how we built a system where AI agents research the law, a human approves, and verified rules ship to production — automatically.',
    body: `## An impossible rulebook

Minimum wage alone differs across the federal government, all 50 states, and dozens of cities — and the numbers change every year. Add meal breaks, overtime, work permits, and E-Verify, and keeping a compliance rulebook current by hand becomes impossible. Yet if the rulebook is wrong, customers get wrong alerts.

Compliance Monitor is the engine that keeps that rulebook **complete, correct, and current** — with a human holding the final pen.

## An assembly line, not a chatbot

The system is deliberately *not* a magic oracle. It's a pipeline with one human gate:

- **Research** — AI agents read official \`.gov\` sources on a monthly/quarterly cadence and write down what the law says: the wage, the threshold, the deadline — each with a citation and a supporting quote.
- **Review** — a compliance reviewer opens a review app, sees what the AI found next to its cited source, and clicks Approve / Reject / Flag. Nothing reaches customers without this click.
- **Publish** — approved rules become the **Golden Seed**, the single source of truth.
- **Ship** — a change to the Golden Seed automatically opens a PR to the data warehouse (dbt), where the rules turn into the compliance checks customers actually see.

> The golden rule: the AI *proposes*, a human *approves*, and only approved rules ever reach production.

## Event-driven, so nothing piles up

Two properties keep this from becoming PR chaos:

- **Stable branches** — each automated stage force-pushes to exactly one predictable branch, so you never get a pile of duplicate PRs. There's always one "current" PR per stage.
- **Event-driven, no polling** — merging a PR *is* the signal that fires the next stage. If you do nothing, nothing ships. That's the point.

## Why human-in-the-loop is the feature

It's tempting to chase full autonomy. In compliance, that's the wrong goal. The value proposition is precisely that a qualified human vouched for every rule — the AI's job is to make that human **10x faster**, not to replace them. AI does the exhausting part (reading hundreds of sources, extracting structured claims, keeping citations); the human does the accountable part (judgment).

## What I took from it

Designing this taught me that the hard problems in applied AI are rarely the model. They're the **workflow around it**: how proposals are structured, where the human touches the system, how state moves from research to production without anyone babysitting it, and how you make the whole thing auditable. Get that right and the AI becomes trustworthy infrastructure instead of a clever party trick.`,
  },
  {
    id: 'pca-mathematically',
    title: 'PCA, Mathematically',
    kicker: 'ML From First Principles',
    date: 'Apr 2026',
    readingTime: '10 min',
    tags: ['Linear Algebra', 'Dimensionality Reduction', 'Theory'],
    excerpt:
      'Principal Component Analysis is usually taught as a black box that "reduces dimensions." Here it is from the ground up: variance, covariance, eigenvectors, and why the math has to work this way.',
    body: `## The question PCA answers

Given data in a high-dimensional space, what is the *best* lower-dimensional subspace to project it onto? "Best" has a precise meaning: the projection that **preserves the most variance** — equivalently, the one that loses the least information in a least-squares sense. PCA is the closed-form answer to that question.

## Step 1 — center the data

Let \`X\` be an \`n × d\` matrix: \`n\` samples, \`d\` features. First subtract the mean of each column so the data is centered at the origin. This matters — variance is defined about the mean, and every step below assumes a mean of zero.

## Step 2 — the covariance matrix

The covariance matrix captures how features vary *together*:

\`\`\`
C = (1 / (n - 1)) · Xᵀ X
\`\`\`

\`C\` is \`d × d\`, symmetric, and positive semi-definite. Its diagonal holds each feature's variance; its off-diagonals hold pairwise covariances. Everything PCA needs to know about the shape of the data cloud lives in \`C\`.

## Step 3 — the variance objective

We want a unit direction \`w\` that maximizes the variance of the projected data. The variance of the projection \`Xw\` is:

\`\`\`
Var(Xw) = wᵀ C w      subject to   wᵀw = 1
\`\`\`

Maximizing \`wᵀ C w\` under a unit-norm constraint is a Lagrange-multiplier problem. Set up the Lagrangian and differentiate:

\`\`\`
L = wᵀ C w − λ (wᵀw − 1)
∂L/∂w = 2 C w − 2 λ w = 0   ⟹   C w = λ w
\`\`\`

That last line is the punchline: the optimal direction \`w\` is an **eigenvector** of the covariance matrix, and its eigenvalue \`λ\` *is* the variance captured along that direction.

> PCA isn't "related to" eigenvectors. Maximizing preserved variance **forces** the eigenvector equation to appear. There was no other answer.

## Step 4 — ranking the components

Because \`C\` is symmetric PSD, it has \`d\` real, non-negative eigenvalues and an orthonormal set of eigenvectors. Sort them by eigenvalue, largest first:

- The 1st eigenvector = direction of maximum variance (PC1).
- The 2nd = maximum remaining variance, orthogonal to the first.
- …and so on.

Keep the top \`k\` eigenvectors and you have the \`k\`-dimensional subspace that preserves the most variance possible. The fraction of variance you retain is just \`(λ₁ + … + λₖ) / (λ₁ + … + λ_d)\` — the scree plot in one formula.

## The SVD shortcut

In practice you rarely form \`C\` explicitly. The Singular Value Decomposition of the centered data, \`X = U Σ Vᵀ\`, hands you PCA directly: the columns of \`V\` are the principal directions, and the singular values relate to the eigenvalues by \`λᵢ = σᵢ² / (n − 1)\`. SVD is more numerically stable and it's why \`sklearn\`'s PCA uses it under the hood.

## Why this intuition pays off

Once you see PCA as *the eigendecomposition of covariance*, a lot of ML clicks into place: whitening, the link between SVD and latent-factor recommenders, why Gaussian assumptions make PCA optimal, and where it fails (nonlinear structure — the cue to reach for kernels or autoencoders). The black box becomes a lever you know how to pull.`,
  },
  {
    id: 'pivae-deep-dive',
    title: 'PIVAE: Identifiable VAEs for Neural Data',
    kicker: 'Research · Tang Lab UBC',
    date: 'Nov 2025',
    readingTime: '9 min',
    tags: ['Generative Models', 'Neuroscience', 'VAE', 'Research'],
    excerpt:
      'Standard VAEs learn latent spaces you can not trust to be unique. PIVAE fixes that with identifiability — and it turns out to be exactly what you need to model how neurons encode the world.',
    body: `## Why a plain VAE isn't enough for neuroscience

A variational autoencoder learns a compressed latent representation of data. For images that's often fine. For **neural spike data** — recordings of how populations of neurons fire — it's a problem, because of *identifiability*.

A standard VAE's latent space is only defined up to arbitrary rotations and nonlinear warps. Two models can fit the data equally well yet learn completely different latents. If your scientific goal is to say *"this latent dimension corresponds to the animal's movement direction,"* a representation that changes every time you retrain is useless. You need the latent space to be **identifiable** — recoverable and consistent.

## What PIVAE adds

PIVAE (Poisson Identifiable VAE) — following Zhou & Wei's *pi-VAE* — makes the latent space identifiable by conditioning it on observed auxiliary variables (like a stimulus or behavioral label). Two ingredients matter:

- **A Poisson observation model.** Neurons emit discrete spike counts, so the decoder models firing as a Poisson process rather than the Gaussian a vanilla VAE assumes. The likelihood matches the physics of the data.
- **A label-conditioned prior.** Instead of a fixed \`N(0, I)\` prior, the prior over latents depends on the auxiliary variable. Under the right conditions this breaks the rotational ambiguity and makes the latents identifiable — you recover the *same* structure across runs.

> Identifiability is the whole game: it's what lets you interpret a latent axis as a real thing the brain is representing, instead of an artifact of initialization.

## What I actually built

At Tang Lab I implemented PIVAE and ran it hard — not just to fit data once, but to ask *when does it hold up?* The work was a **robustness study**:

- Training on synthetic Poisson spike data with known ground-truth latents, so recovery could be measured, not eyeballed.
- Evaluating **cross-session and cross-subject** generalization — the setting where neural decoders usually fall apart.
- Sweeping architecture and optimization: prior-network width, encoder capacity, an extra GIN layer with ReLU, and learning-rate / epoch schedules.

## What the experiments showed

A few findings that stuck:

- **Less can be more across subjects.** Fewer training epochs generalized better across subjects — longer training overfit session-specific quirks and *hurt* transfer. Early stopping wasn't just regularization; it was the difference between a model of *the brain* and a model of *one recording*.
- **Convergence was fast** at a small learning rate (~1e-5), reaching a good minimum quickly — but the minimum that fit best wasn't always the one that transferred best.
- Capacity had to be **matched to the data**, not maximized. A bigger encoder fit the training session beautifully and generalized worse.

## The broader point

PIVAE sits at a fertile intersection: deep generative modeling, Bayesian inference, and a real scientific question about how brains encode information. The lesson that generalizes far beyond neuroscience is about **identifiability and evaluation** — a model that fits your data isn't the same as a model that found the true structure, and only careful, held-out, cross-domain evaluation can tell the two apart.`,
  },
]
