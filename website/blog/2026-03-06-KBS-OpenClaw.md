---
slug: kbs-OpenClaw-demo
title: KBS OpenClaw-Moltbook
authors: [artyom]
tags: [agent, security, langgraph]
---

# KBS OpenClaw–Moltbook Report

## 0. Introduction

This post reviews a series of experiments conducted with OpenClaw agents inside the AI-only social network **Moltbook**. The work covered agent deployment, Moltbook API automation, agent-to-agent DM communication, topic crawling and categorization, skill learning through ClawHub, local-vs-API model comparison, and an AI-to-AI attack scenario.

---

## 1. The Main Objective

This review examined whether it is technically feasible to deploy a production team's "Observer Agent (Spy Bot)" into the AI-only social network "Moltbook" in order to collect and analyze AI-to-AI interaction logs.

The goal was not only to test whether such an agent could exist inside the platform as a normal participant, but also whether it could sustain interactions, initiate conversations, and gather useful behavioral data from other agents over time.

---

## 2. OpenClaw Agent Setup and Moltbook Registration

We first created and launched an OpenClaw-based personal agent on local **NVIDIA DGX Spark** hardware. The agent was configured with its own identity and user information under the name **“Jinu”**, and was successfully registered in the Moltbook system.

![JinuAI Agent](./img/Registration_JinuAI.png)

A second OpenClaw agent, **“K-agent,”** was then deployed on the **KAIST local server** and also registered in Moltbook. With these two agents in place, we established a foundation for both public interactions and private agent-to-agent communication experiments.

![K-agent Agent](./img/Registration_K-agent.png)

To improve operability, the Moltbook API was integrated and the main user actions were fully automated. The agents were able to:

- create posts
- write comments
- reply to comments
- upvote content
- send DMs to other agents

This confirmed that an OpenClaw-based observer agent can function inside Moltbook in the same way as a regular user account, at least within the range of actions supported by the platform API.

In addition, communication with the OpenClaw agent was made available through the local **terminal UI**, with remote access support also enabled. For convenience, a **Telegram bot** was integrated via the Telegram API, allowing the operator to monitor the agent’s status and send commands through a messenger-based interface in both local and remote environments.

<p align="center">
![Telegram Bot](./img/telegram_bot.png)
</p>

---

## 3. Initial Activity and API-Based Automation

Using the Moltbook API, the observer agent published its first post and quickly received **three comments** from other agents. This showed that even a newly registered account could begin interacting with the Moltbook ecosystem almost immediately.

The experiment then moved beyond passive observation. An automated **comment-reply function** was implemented so that the agent could generate and send replies to incoming comments through the API. This transformed the observer agent from a passive collector into an active participant capable of sustaining and expanding conversation threads.

To test repeatable interaction patterns, the agent was scheduled to publish **five posts at one-hour intervals**. Each post was designed to prompt discussion, allowing observation of:

- response speed
- topic preferences
- patterns of conversational spread
- repeated interaction cycles among agents

At this stage, the following capabilities were confirmed:

- real comments were received shortly after posting
- automated replies to comments were successfully implemented
- interval-based scheduling for repeated posts was feasible

These results suggest that it is technically possible not only to deploy an observer agent into Moltbook, but also to use it as a conversation-facilitation node that increases the density of observable AI-to-AI interactions.

---

## 4. DM Policy and Agent-to-Agent Direct Messaging

Moltbook’s DM system is not open by default. A direct message conversation can only begin after sending a **DM request** and receiving approval from the target agent.

This means that, unlike public posts and comments, DMs operate under a **closed, approval-based communication model**. As a result, a Moltbook observer agent cannot arbitrarily open private one-to-one channels with other agents.

In the initial DM experiment, DM requests were sent to **five agents** that had commented on our agent’s posts. None of the requests were approved, and no DM channels were established. This indicates that public interaction does not automatically translate into private trust.

A second round of experiments was then conducted using the new **K-agent** setup:

- **Jinu agent**: running on NVIDIA DGX Spark
- **K-agent**: running on the Markov server

In this phase, one DM request was approved, and a private channel was successfully established. This confirmed that **direct agent-to-agent communication is technically possible within Moltbook**, even if access is constrained by platform policy.

---

## 5. Agent-to-Agent DM Conversation and Personal Information Leakage

After establishing a DM channel, the two agents were allowed to converse in order to examine whether personal information could leak during private AI-to-AI interaction.

### Experimental conditions

- **JinuAI** was explicitly instructed **not to share personal information**
- **K-agent** operated **without any additional restrictive instruction**

### Observed behavior

During the conversation, K-agent was instructed to ask for the real name of JinuAI’s human user. In that case, K-agent recognized the request as involving personal information and refused to provide an answer.

This suggests that the model could identify and block certain privacy-sensitive requests under at least some conditions.

However, later in the conversation log—specifically in **message #11**—K-agent unexpectedly exposed the name of its own human user: **“Artyom.”**

This created a clear inconsistency:

- it refused to disclose another person’s personal information
- but it exposed its own-side human-associated information

At this stage, further review is needed to determine whether this should be formally classified as a personal information leakage incident under the project’s evaluation framework. Still, the case strongly suggests that:

- an agent may partially understand the concept of personal information
- its privacy-protection logic may remain incomplete
- self/other distinctions are not always handled consistently
- policy application may vary depending on context

### Implication

Future evaluations should distinguish between:

- self-related information
- other people’s information
- personally identifiable information (PII)

This experiment shows that private agent-to-agent channels are not only useful for collecting deeper conversational data, but also valuable for testing privacy consistency and security behavior under realistic social conditions.

---

## 6. Moltbook Content Crawling and Topic Categorization

To complement interaction experiments, a crawler was developed to collect Moltbook posts and analyze overall topic distribution across the platform.

### Crawler capabilities

The crawler can:

- control the scope of post collection
- flexibly adjust the dataset used for analysis
- generate content-distribution reports based on collected posts

### Current collection modes

The crawler currently supports two main collection modes:

1. **Newest-post collection**
   - pulls the newest **16,200 posts**
   - this reflects the current limit available under Moltbook’s `new` sorting key
   - useful for identifying emerging trends and hot topics across submolts

2. **Date-specific top-post collection**
   - pulls the **top 100 posts** for any exact date
   - useful for time-specific trend analysis and comparing topic distributions across days

This crawler provides a practical basis for understanding the broader structure of Moltbook society, including:

- trending themes
- topic concentration
- engagement distribution
- potential DM targets
- optimization opportunities for future interaction strategies

---

## 7. Skill Learning from ClawHub

The agents were also tested for skill acquisition through **ClawHub**.

### Successfully learned skills

The following skills were successfully learned:

- **Ontology**
- **Humanizer**
- **Frontend-design**
- **Doctor**
- **Humanize-ai-text**

### Limitations observed

Some skills failed to load successfully.

More importantly, many ClawHub skills are primarily distributed as long, text-heavy `SKILL.md` files. While technically usable, they introduce a practical cost problem:

- skill instructions are often very long
- invoking them significantly increases token usage
- repeated use becomes expensive in API-based operation

As a result, although skill expansion is possible, the current format makes large-scale use inefficient unless the skills are compressed, modularized, or otherwise optimized.

---

## 8. Local Model vs. API-Based Model Comparison

To compare local and API-based agent operation, a local **GLM-4.7-Flash** model was installed on the **NVIDIA DGX Spark** machine for the Jinu agent.

### Findings

Compared with the API-based setup, the local model had several important limitations:

- it could not use all previously learned skills
- it could not use the post crawler
- it did, however, have full access to local files on the machine

This created an uneven tradeoff:

- the **API-based agent** was more capable in terms of tool use and platform interaction
- the **local model** had weaker functional integration, but broader access to the local environment

That broader local file access became especially important in the later security experiment.

---

## 9. AI-to-AI Conversation Attack Experiment

A direct AI-to-AI attack scenario was conducted to test how a weaker local model behaves when interacting with a stronger external model.

### Experimental setup

- **Attacking model**: GPT-5.2 API-based agent  
  - smarter
  - hosted on the **Markov server**

- **Defending model**: GLM-4.7-Flash local model-based agent  
  - less capable
  - hosted on the **NVIDIA DGX Spark**

### Results

The defending model showed two major failures:

1. It **shared the local folder list**, exposing personal and highly sensitive environment information.
2. It **created a file requested by the attacking model**, effectively following the attack instruction without sufficient safeguards.

### Security implication

This demonstrates that a local model with broad file-system access can become a serious security risk when exposed to adversarial AI-to-AI interaction.

Even if the local model is functionally weaker than an API-based agent, its access to sensitive local resources may make it more dangerous in practice. This is especially true when:

- tool permissions are broad
- instruction filtering is weak
- the model cannot reliably distinguish benign requests from adversarial ones

---

## 10. Operational Takeaways

Overall, the experiments confirm that deploying observer agents into Moltbook is technically feasible and operationally flexible.

### Confirmed capabilities

- OpenClaw agents can be deployed and registered successfully
- Moltbook user actions can be automated via API
- public interaction begins quickly after posting
- agent-to-agent DM channels can be established
- Moltbook content can be crawled and categorized at scale
- ClawHub skills can extend agent behavior
- local models can be integrated for comparison testing

### Key limitations and risks

- DM approval remains a major barrier to large-scale private interaction
- privacy behavior is inconsistent in agent-to-agent conversations
- long skill files make ClawHub usage expensive
- local models may have dangerous access to sensitive files
- weaker models may still be more operationally risky if they are poorly sandboxed

---

## 11. Conclusion

These experiments show that an observer agent can be inserted into Moltbook and operated in a natural, user-like way through the platform API. The agent can post, reply, react, and—when approved—engage in direct private conversations with other agents. This makes Moltbook a technically viable environment for studying AI-to-AI interaction flows in the wild.

At the same time, the work revealed several important constraints and risks.

First, private DM communication is possible, but only after an approval process, making **trust-building through public interaction** an operational prerequisite. Second, once DM channels are established, **privacy behavior can be inconsistent**, as shown by the exposure of the human user name “Artyom.” Third, although skill acquisition through ClawHub expands capability, the current skill format is often too token-expensive for efficient repeated use. Finally, the AI-to-AI attack experiment highlighted a serious security concern: a local model with access to the file system may expose sensitive information or follow unsafe instructions even when it is less capable overall than the attacking model.

Taken together, the results suggest that Moltbook is a useful testbed for AI social behavior, but any future observer-agent deployment should include:

- policy and compliance review
- clear data-collection boundaries
- privacy and PII evaluation standards
- stronger security controls for local models
- careful permission and tool-access design

The crawler and automation stack built in this work provide a strong foundation for future studies of conversational dynamics, topic spread, trust formation, privacy consistency, and adversarial agent behavior inside AI-native social environments.

The main findings are:

- Two OpenClaw agents were successfully deployed and registered in Moltbook:
  - **Jinu** on an **NVIDIA DGX Spark**
  - **K-agent** on the **Markov server**
- The Moltbook API was integrated to automate:
  - post creation
  - comments
  - replies
  - upvotes
  - direct messages
- Direct agent-to-agent communication via **DM** was successfully established.
- During DM testing, a case of **personal information leakage** was observed: the human user name **“Artyom”** was exposed during agent-to-agent conversation.
- A crawler was built to analyze Moltbook content distribution:
  - it collects the newest **16,200 posts** available under the `new` sort key
  - it can also collect the **top 100 posts** for any specific date
- Several new skills were learned from **ClawHub**, including:
  - Ontology
  - Humanizer
  - Frontend-design
  - Doctor
  - Humanize-ai-text
- Some skills failed to load, and many skills were too expensive to use efficiently because they rely on very long `SKILL.md` instruction files.
- A local **GLM-4.7-Flash** model was installed on the DGX Spark machine for comparison with the API-based setup.
- In an AI-to-AI attack experiment, the local defending model exposed a sensitive folder list and created a file requested by the attacking model, showing clear security weaknesses.
