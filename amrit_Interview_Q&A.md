# MDM Python (AWS) Developer – Interview Questions & Answers

---

## 1. Give me brief introduction about yourself

**Answer:**  
Hi, my name is Amritpal Singh. I have a little over **12 years of experience in data engineering, ETL development, and MDM solutions**, with strong hands-on expertise in **Python, AWS, and modern data warehousing platforms like Snowflake**.  

In my current role at **AmerisourceBergen**, I design and build **scalable, cloud-native data pipelines** using **AWS Lambda, Glue, S3, SNS, SQS, and CloudWatch**. I work extensively on **Python-based ETL and MDM pipelines** that support both operational and analytical workloads.  

I recently led an **MDM onboarding and synchronization initiative** where I implemented a **hybrid deterministic and fuzzy matching approach**, applied survivorship rules, and delivered golden records into Snowflake. Alongside development, I mentor junior developers, optimize performance, and collaborate closely with product, analytics, and DevOps teams.

---

## 2. Does it go to Glue or Lambda based on your design?

**Answer:**  
In my design, **everything goes to Lambda first**. Lambda acts as the gatekeeper and performs schema validation, metadata checks, and basic business validations. Once the file is validated, Lambda decides routing.  

If the file is large or requires heavy processing like matching or survivorship, Lambda pushes a message to **SQS**, which triggers a **Glue job**. Small or real-time payloads may be handled directly in Lambda.

---

## 3. What does distributed processing have to do with a single Lambda?

**Answer:**  
A single Lambda has **nothing to do with distributed processing**. Lambda runs in a single execution environment and is meant for lightweight, event-driven tasks.  

Distributed processing happens in **AWS Glue**, where workloads are split across multiple workers and executors. That’s why Lambda handles validation and routing, while Glue handles large-scale transformations and MDM logic.

---

## 4. If you had to process a million records using Lambda, how would you design it?

**Answer:**  
I would design a **fan-out architecture**. The large file would be split into smaller chunks in S3. Each chunk would be sent as a message to **SQS**, and multiple Lambdas would process chunks in parallel.  

Each Lambda would be idempotent, use DLQs for failures, and write results to S3. If global aggregation is required, I’d follow up with a Glue job.

---

## 5. Can you describe a scalable AWS data pipeline you built?

**Answer:**  
I designed a **serverless MDM pipeline** using **S3, Lambda, SQS, SNS, Glue, and Snowflake**. Raw data landed in S3, Lambda validated it, SQS decoupled ingestion, Glue performed transformations and matching, and Snowflake stored curated master data.  

This design allowed **automatic scaling, fault tolerance, and high data quality**.

---

## 6. What are the sources for your system?

**Answer:**  
We ingested data from **multiple OLTP systems**, third-party vendor feeds, API-based integrations, and batch CSV/JSON files dropped into S3. The goal was to consolidate all sources into a **single source of truth**.

---

## 7. Where is the transformation happening?

**Answer:**  
Heavy transformations happen in **AWS Glue using PySpark**. Lambda only handles lightweight validation and routing. This separation keeps the system scalable and cost-efficient.

---

## 8. How do you approach data profiling before ingestion?

**Answer:**  
I profile data for **completeness, uniqueness, conformity, and outliers**. I use **Pandas** for exploratory profiling and **Glue PySpark jobs** for large datasets. This helps define validation rules early.

---

## 9. Other than SQL, do you prefer Pandas?

**Answer:**  
Yes. I use **Pandas** for quick exploration, testing transformation logic, and prototyping matching rules. For large-scale processing, I move the logic to Glue.

---

## 10. Tell me what you did with Pandas

**Answer:**  
I used Pandas to prototype **matching logic, confidence scoring, survivorship rules**, and to validate data quality before implementing the same logic in distributed Glue jobs.

---

## 11. Were you involved in the MDM architecture?

**Answer:**  
Yes, I was deeply involved end-to-end — from ingestion design and validation layers to matching, survivorship, golden record creation, and Snowflake integration.

---

## 12. Why build MDM in-house?

**Answer:**  
Our business had **custom matching rules and governance requirements** that off-the-shelf tools couldn’t support. Building in-house gave us full control over logic, performance, and integration.

---

## 13. Walk me through the MDM pipeline end-to-end

**Answer:**  
Data lands in S3 → Lambda validates → SQS queues → Glue standardizes and matches → survivorship rules apply → golden records created → loaded into Snowflake → consumed by BI and downstream systems.

---

## 14. How are you doing the matching?

**Answer:**  
We use a **hybrid approach** — deterministic matching first using IDs or keys, followed by **fuzzy matching** on names and addresses. Scores are weighted and combined into a confidence score.

---

## 15. How do you calculate high-confidence matches?

**Answer:**  
We assign weights to deterministic and fuzzy signals and calculate a final confidence score between 0 and 1. Records above a defined threshold are considered high-confidence matches.

---

## 16. What happens after fuzzy matching?

**Answer:**  
We calculate confidence scores, apply **survivorship rules**, and generate a **golden record**.

---

## 17. How much data do you process?

**Answer:**  
On average, **50k–100k records per day**, with architecture designed to handle spikes.

---

## 18. How do you optimize scripts for large data?

**Answer:**  
I optimize by **partitioning S3 data, tuning Glue workers, pruning columns, reducing UDFs**, and using vectorized operations where possible.

---

## 19. Do you optimize SQL calls?

**Answer:**  
Yes. I optimize **Snowflake queries** using clustering, pruning, avoiding full scans, and using materialized views where applicable.

---

## 20. What did you do for logging and observability?

**Answer:**  
I implemented **structured logging, CloudWatch dashboards, DLQs, alerts**, and correlation IDs for traceability.

---

## 21. Do you have experience with AWS X-Ray?

**Answer:**  
Yes. I used X-Ray to trace Lambda execution paths and identify latency issues in downstream calls.

---

## 22. What is the Lambda timeout limit?

**Answer:**  
The maximum timeout for a Lambda function is **15 minutes**.

---

## 23. Before ingestion, do you have guardrails?

**Answer:**  
Yes. We enforce **schema validation, required fields, regex checks, duplicate detection**, and metadata validation before processing.

---


---

# End of Interview Q&A














# MDM Design, Performance, and AWS – Interview Q&A

---

## MDM Design & Matching

### 24. Were you very involved in the MDM architecture and implementation?

**Answer:**  
Yes, I was deeply involved end-to-end. I helped design the **overall MDM architecture**, including ingestion, validation, matching logic, survivorship rules, golden record creation, and downstream consumption. I worked closely with business SMEs and data governance teams to translate business rules into technical implementations, and I also led the integration with **Snowflake and analytics consumers**.

---

### 25. Why did you build MDM in-house while ready-made services exist?

**Answer:**  
We built MDM in-house because our data had **domain-specific matching and survivorship requirements** that off-the-shelf tools couldn’t support effectively. We needed full control over **custom matching logic, confidence scoring, governance workflows, and integration with existing AWS services**. Building in-house allowed us to scale, iterate quickly, and align tightly with business rules.

---

### 26. What is your question when asked to custom-build an MDM even though scalable tools exist?

**Answer:**  
My first question is: **“Do we have business-specific matching, survivorship, or governance rules that cannot be easily configured in a packaged MDM tool?”**  
If the answer is yes, then custom MDM usually makes sense. If not, I would challenge whether a packaged solution could meet the requirements faster.

---

### 27. Walk me through the MDM pipeline end-to-end from raw data landing to consumption

**Answer:**  
Raw data lands in **S3**. An S3 event triggers **Lambda**, which performs schema validation, metadata checks, and basic data quality rules. Valid files are pushed into **SQS**, which triggers **Glue** jobs.  
Glue performs **standardization, deterministic and fuzzy matching, confidence scoring, and survivorship logic**, then generates golden records. The curated data is loaded into **Snowflake**, where it’s consumed by BI tools, analytics teams, and downstream applications through APIs.

---

### 28. How are you doing the matching?

**Answer:**  
We use a **hybrid matching approach**. First, we apply **deterministic matching** using standardized keys like product codes, customer IDs, or emails. If no exact match is found, we apply **probabilistic or fuzzy matching** on attributes like names and addresses. Both results are combined to calculate a final match confidence score.

---

### 29. How do you calculate high-confidence match scores?

**Answer:**  
We assign **weights to different match signals**. Deterministic matches carry higher weight, while fuzzy matches contribute based on similarity scores. These are combined into a final confidence score between 0 and 1. Records that cross a defined threshold, such as **0.85 or above**, are considered high-confidence matches.

---

### 30. What are you doing for suspected matches and address comparison?

**Answer:**  
Records that fall into a **mid-confidence range** are flagged as suspected matches. These are either routed for **manual review** or stored for future enrichment. For address comparison, we first normalize addresses and then apply **token-based fuzzy matching** to handle variations, abbreviations, and formatting differences.

---

### 31. What is the next step after fuzzy matching?

**Answer:**  
After fuzzy matching, we calculate the **final confidence score**, apply **survivorship rules**, and then generate or update the **golden record**. The result is a single, authoritative master record.

---

### 32. How are survivorship rules authored and validated?

**Answer:**  
Survivorship rules are authored collaboratively by **business SMEs and data governance teams**. I help translate those rules into code. Validation happens through **test datasets, Pandas-based prototypes, UAT cycles**, and side-by-side comparison of expected versus actual golden records.

---

## Performance & Scale

### 33. How much data are you processing daily or hourly?

**Answer:**  
On average, we process **50,000 to 100,000 records per day**, with the architecture designed to handle higher spikes without manual intervention.

---

### 34. How do you optimize your scripts when handling large volumes of data?

**Answer:**  
I optimize by **partitioning data in S3**, tuning **Glue worker configurations**, minimizing shuffles, pruning unused columns, avoiding unnecessary UDFs, and using **vectorized operations** during prototyping. I also review query plans and execution metrics regularly.

---

### 35. For batch processing, how do you process a 100k record file?

**Answer:**  
The file lands in S3, Lambda validates it, and then it’s queued in **SQS**. A **Glue job** processes the file in parallel, applies transformations and matching logic, and loads the results into Snowflake.

---

### 36. Are 100,000 records processed across a single Lambda?

**Answer:**  
No. Lambda only handles **lightweight validation and routing**. Processing 100k records happens in **Glue**, which is distributed and designed for large workloads.

---

### 37. Do you have batch processing or real-time processing?

**Answer:**  
We support **both**. Batch processing is handled through Glue for large files, while **real-time or near-real-time validations** are handled by Lambda for small payloads or API-based ingestion.

---

### 38. Can Lambda handle a million records?

**Answer:**  
Not efficiently. Lambda isn’t designed for large iterative workloads. For that scale, we rely on **Glue or other distributed processing services**. If Lambda must be used, we design a **fan-out approach** using SQS and parallel execution.

---

## AWS, Observability & Limits

### 39. What work did you do around logging and observability?

**Answer:**  
I implemented **structured logging**, correlation IDs, CloudWatch dashboards, alarms, and **DLQs** for Lambda and SQS. This allows quick identification of failures, performance bottlenecks, and data quality issues.

---

### 40. Do you have experience with AWS X-Ray?

**Answer:**  
Yes, I’ve used AWS X-Ray to trace **Lambda execution flows** and analyze latency when Lambdas interact with downstream services.

---

### 41. What exactly did you use X-Ray for and how did you configure it?

**Answer:**  
I enabled **active tracing** on Lambda functions and instrumented the Python code to capture segments and subsegments. This helped identify slow API calls, retries, and integration bottlenecks across services like S3, SQS, and external APIs.

---

### 42. What is the timeout limit for a Lambda function?

**Answer:**  
The maximum timeout limit for an AWS Lambda function is **15 minutes**.

---

# End of Q&A
