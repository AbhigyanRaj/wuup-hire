# Wuup Hire Backend — API Reference

**Base URL:** `http://localhost:5000/api`  
**All responses follow this shape:**
```json
{
  "success": true | false,
  "message": "Human readable message",
  "data": { ... } | null,
  "errors": [ ... ]   // only on validation failures
}
```

**Auth:** Protected routes require `Authorization: Bearer <token>` header.

---

## Table of Contents
1. [Auth](#1-auth)
2. [Jobs](#2-jobs)
3. [Candidates](#3-candidates)
4. [Interviews](#4-interviews)
5. [Webhooks](#5-webhooks)
6. [Health](#6-health)

---

## 1. Auth

### POST `/api/auth/register`
Register a new recruiter account.

**Auth required:** No

**Request Body:**
```json
{
  "name": "string",        // min 2 chars, required
  "email": "string",       // valid email, required
  "password": "string"     // min 8 chars, required
}
```

**Success Response — 201:**
```json
{
  "success": true,
  "message": "Registration successful.",
  "data": {
    "user": {
      "id": "cmpi50djd0000s900ft75tf02",
      "name": "Abhigyan",
      "email": "abhigyan@bolna.dev",
      "createdAt": "2026-05-23T09:19:35.305Z",
      "updatedAt": "2026-05-23T09:19:35.305Z"
    },
    "token": "eyJhbGci..."
  }
}
```

**Error Responses:**
| Status | When |
|--------|------|
| 400 | Validation failure (missing/invalid fields) |
| 409 | Email already registered |

**Validation Error Example — 400:**
```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": [
    { "field": "body.email", "message": "Invalid email address." },
    { "field": "body.password", "message": "Password must be at least 8 characters." }
  ]
}
```

---

### POST `/api/auth/login`
Login with email and password.

**Auth required:** No

**Request Body:**
```json
{
  "email": "string",       // required
  "password": "string"     // required
}
```

**Success Response — 200:**
```json
{
  "success": true,
  "message": "Login successful.",
  "data": {
    "user": {
      "id": "cmpi50djd0000s900ft75tf02",
      "name": "Abhigyan",
      "email": "abhigyan@bolna.dev",
      "createdAt": "2026-05-23T09:19:35.305Z",
      "updatedAt": "2026-05-23T09:19:35.305Z"
    },
    "token": "eyJhbGci..."
  }
}
```

**Error Responses:**
| Status | When |
|--------|------|
| 400 | Missing fields |
| 401 | Wrong email or password |

---

### GET `/api/auth/me`
Get the currently logged-in user's profile.

**Auth required:** Yes

**Request Body:** None

**Success Response — 200:**
```json
{
  "success": true,
  "message": "User fetched successfully.",
  "data": {
    "user": {
      "id": "cmpi50djd0000s900ft75tf02",
      "name": "Abhigyan",
      "email": "abhigyan@bolna.dev",
      "createdAt": "2026-05-23T09:19:35.305Z",
      "updatedAt": "2026-05-23T09:19:35.305Z",
      "_count": {
        "jobs": 3
      }
    }
  }
}
```

**Error Responses:**
| Status | When |
|--------|------|
| 401 | No token / invalid token / expired token |

---

## 2. Jobs

> All job routes require authentication (`Authorization: Bearer <token>`).

### POST `/api/jobs`
Create a new job posting.

**Auth required:** Yes

**Request Body:**
```json
{
  "title": "string",                  // required, min 2 chars
  "description": "string",            // optional, defaults to ""
  "screeningQuestions": [             // required, min 1 item
    {
      "question": "string",           // min 5 chars
      "type": "open" | "yesno"        // default: "open"
    }
  ]
}
```

**Success Response — 201:**
```json
{
  "success": true,
  "message": "Job created successfully.",
  "data": {
    "job": {
      "id": "cmpi71xbu0000rf003dzai7xv",
      "publicId": "job_I95vrm5h",
      "title": "Senior Backend Engineer",
      "description": "Node.js expert needed.",
      "screeningQuestions": [
        { "question": "Describe your Node.js experience.", "type": "open" }
      ],
      "bolnaAgentId": null,
      "createdById": "cmpi50djd0000s900ft75tf02",
      "createdAt": "2026-05-23T10:16:46.842Z",
      "updatedAt": "2026-05-23T10:16:46.842Z"
    }
  }
}
```

> **Note:** `publicId` (e.g. `job_I95vrm5h`) is the safe public-facing ID. Use this in URLs and UI. The `id` field is the internal DB id.

**Error Responses:**
| Status | When |
|--------|------|
| 400 | Validation failure |
| 401 | Unauthorized |

---

### GET `/api/jobs`
Get all jobs created by the logged-in user. Paginated.

**Auth required:** Yes

**Query Params:**
| Param | Type | Default | Max |
|-------|------|---------|-----|
| `page` | number | 1 | — |
| `limit` | number | 10 | 100 |

**Success Response — 200:**
```json
{
  "success": true,
  "message": "Jobs fetched successfully.",
  "data": {
    "jobs": [
      {
        "id": "cmpi71xbu0000rf003dzai7xv",
        "publicId": "job_I95vrm5h",
        "title": "Senior Backend Engineer",
        "description": "Node.js expert needed.",
        "screeningQuestions": [...],
        "bolnaAgentId": null,
        "createdById": "cmpi50djd0000s900ft75tf02",
        "createdAt": "2026-05-23T10:16:46.842Z",
        "updatedAt": "2026-05-23T10:16:46.842Z",
        "_count": { "interviews": 3 }
      }
    ],
    "total": 12,
    "page": 1,
    "limit": 10,
    "totalPages": 2
  }
}
```

---

### GET `/api/jobs/:jobId`
Get a single job by its internal DB ID.

**Auth required:** Yes

**URL Params:** `jobId` — internal job ID (the `id` field, not `publicId`)

**Success Response — 200:**
```json
{
  "success": true,
  "message": "Job fetched successfully.",
  "data": {
    "job": {
      "id": "cmpi71xbu0000rf003dzai7xv",
      "publicId": "job_I95vrm5h",
      "title": "Senior Backend Engineer",
      "description": "Node.js expert needed.",
      "screeningQuestions": [...],
      "bolnaAgentId": null,
      "createdById": "cmpi50djd0000s900ft75tf02",
      "createdAt": "2026-05-23T10:16:46.842Z",
      "updatedAt": "2026-05-23T10:16:46.842Z",
      "_count": { "interviews": 3 }
    }
  }
}
```

**Error Responses:**
| Status | When |
|--------|------|
| 403 | Job belongs to another user |
| 404 | Job not found |

---

### PATCH `/api/jobs/:jobId`
Update a job. All fields optional — only send what you want to change.

**Auth required:** Yes

**URL Params:** `jobId` — internal job ID

**Request Body** (all optional):
```json
{
  "title": "string",
  "description": "string",
  "screeningQuestions": [...],
  "bolnaAgentId": "string"
}
```

**Success Response — 200:**
```json
{
  "success": true,
  "message": "Job updated successfully.",
  "data": {
    "job": { ...updatedJobObject }
  }
}
```

**Error Responses:**
| Status | When |
|--------|------|
| 403 | Job belongs to another user |
| 404 | Job not found |

---

### DELETE `/api/jobs/:jobId`
Delete a job.

**Auth required:** Yes

**URL Params:** `jobId` — internal job ID

**Success Response — 200:**
```json
{
  "success": true,
  "message": "Job deleted successfully.",
  "data": null
}
```

**Error Responses:**
| Status | When |
|--------|------|
| 403 | Job belongs to another user |
| 404 | Job not found |

---

## 3. Candidates

> All candidate routes require authentication.

### POST `/api/candidates`
Create a new candidate.

**Auth required:** Yes

**Request Body:**
```json
{
  "name": "string",         // required
  "email": "string",        // required, unique
  "phone": "string",        // optional
  "resumeUrl": "string",    // optional
  "linkedinUrl": "string"   // optional
}
```

**Success Response — 201:**
```json
{
  "success": true,
  "message": "Candidate created successfully.",
  "data": {
    "candidate": {
      "id": "cmpi70xyz0002s900ab34cd04",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+91-9999999999",
      "resumeUrl": null,
      "linkedinUrl": null,
      "createdAt": "2026-05-23T10:05:00.000Z",
      "updatedAt": "2026-05-23T10:05:00.000Z"
    }
  }
}
```

**Error Responses:**
| Status | When |
|--------|------|
| 409 | Candidate with this email already exists |

---

### GET `/api/candidates`
Get all candidates.

**Auth required:** Yes

**Success Response — 200:**
```json
{
  "success": true,
  "message": "Candidates fetched successfully.",
  "data": {
    "candidates": [
      {
        "id": "...",
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "+91-9999999999",
        "resumeUrl": null,
        "linkedinUrl": null,
        "createdAt": "...",
        "updatedAt": "...",
        "_count": { "interviews": 2 }
      }
    ],
    "total": 1
  }
}
```

---

### GET `/api/candidates/:id`
Get a single candidate by ID.

**Auth required:** Yes

**URL Params:** `id` — candidate ID

**Success Response — 200:**
```json
{
  "success": true,
  "message": "Candidate fetched successfully.",
  "data": {
    "candidate": {
      "id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+91-9999999999",
      "resumeUrl": null,
      "linkedinUrl": null,
      "createdAt": "...",
      "updatedAt": "...",
      "interviews": [
        {
          "id": "...",
          "status": "COMPLETED",
          "job": { "id": "...", "title": "Senior Backend Engineer" },
          "createdAt": "..."
        }
      ]
    }
  }
}
```

---

## 4. Interviews

> All interview routes require authentication.

### POST `/api/interviews`
Schedule an interview — links a candidate to a job and generates an interview link.

**Auth required:** Yes

**Request Body:**
```json
{
  "jobId": "string",          // required
  "candidateId": "string"     // required
}
```

**Success Response — 201:**
```json
{
  "success": true,
  "message": "Interview scheduled successfully.",
  "data": {
    "interview": {
      "id": "cmpi80pqr0003s900ef56gh05",
      "candidateId": "cmpi70xyz0002s900ab34cd04",
      "jobId": "cmpi60abc0001s900xy12ab03",
      "status": "PENDING",
      "interviewLink": "https://bolna.dev/interview/cmpi80pqr0003s900ef56gh05",
      "bolnaCallId": null,
      "recordingUrl": null,
      "startedAt": null,
      "completedAt": null,
      "durationSeconds": null,
      "createdAt": "2026-05-23T10:10:00.000Z",
      "updatedAt": "2026-05-23T10:10:00.000Z"
    }
  }
}
```

---

### GET `/api/interviews`
Get all interviews (optionally filtered by job or status).

**Auth required:** Yes

**Query Params (optional):**
| Param | Type | Example |
|-------|------|---------|
| `jobId` | string | `?jobId=cmpi60abc...` |
| `status` | string | `?status=COMPLETED` |
| `candidateId` | string | `?candidateId=cmpi70xyz...` |

**Possible `status` values:**
`PENDING` | `LINK_SENT` | `IN_PROGRESS` | `COMPLETED` | `EVALUATED` | `SHORTLISTED` | `REJECTED` | `FAILED`

**Success Response — 200:**
```json
{
  "success": true,
  "message": "Interviews fetched successfully.",
  "data": {
    "interviews": [
      {
        "id": "...",
        "status": "COMPLETED",
        "interviewLink": "https://bolna.dev/interview/...",
        "bolnaCallId": "bolna_call_xyz",
        "recordingUrl": null,
        "startedAt": "2026-05-23T11:00:00.000Z",
        "completedAt": "2026-05-23T11:30:00.000Z",
        "durationSeconds": 1800,
        "candidate": {
          "id": "...",
          "name": "John Doe",
          "email": "john@example.com"
        },
        "job": {
          "id": "...",
          "title": "Senior Backend Engineer"
        },
        "createdAt": "...",
        "updatedAt": "..."
      }
    ],
    "total": 1
  }
}
```

---

### GET `/api/interviews/:id`
Get a single interview with full details including transcript and evaluation.

**Auth required:** Yes

**URL Params:** `id` — interview ID

**Success Response — 200:**
```json
{
  "success": true,
  "message": "Interview fetched successfully.",
  "data": {
    "interview": {
      "id": "...",
      "status": "EVALUATED",
      "interviewLink": "https://bolna.dev/interview/...",
      "bolnaCallId": "bolna_call_xyz",
      "recordingUrl": "https://...",
      "startedAt": "2026-05-23T11:00:00.000Z",
      "completedAt": "2026-05-23T11:30:00.000Z",
      "durationSeconds": 1800,
      "candidate": {
        "id": "...",
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "+91-9999999999"
      },
      "job": {
        "id": "...",
        "title": "Senior Backend Engineer",
        "screeningQuestions": [...]
      },
      "transcriptMessages": [
        {
          "id": "...",
          "speaker": "AI",
          "message": "Hello! Can you tell me about yourself?",
          "timestamp": "2026-05-23T11:01:00.000Z"
        },
        {
          "id": "...",
          "speaker": "CANDIDATE",
          "message": "Sure! I have 5 years of experience...",
          "timestamp": "2026-05-23T11:01:15.000Z"
        }
      ],
      "evaluation": {
        "id": "...",
        "communicationScore": 8.5,
        "technicalScore": 7.0,
        "confidenceScore": 9.0,
        "engagementScore": 8.0,
        "overallScore": 8.1,
        "cheatingProbability": 0.05,
        "responseConsistency": 0.92,
        "fillerWordFrequency": 0.03,
        "sentimentScore": 0.75,
        "recommendation": "HIRE",
        "summary": "Strong candidate with solid technical background...",
        "strengths": ["Problem solving", "Communication"],
        "weaknesses": ["System design depth"],
        "redFlags": [],
        "evaluatedAt": "2026-05-23T11:45:00.000Z"
      },
      "createdAt": "...",
      "updatedAt": "..."
    }
  }
}
```

---

### PATCH `/api/interviews/:id/status`
Manually update an interview's status.

**Auth required:** Yes

**URL Params:** `id` — interview ID

**Request Body:**
```json
{
  "status": "SHORTLISTED" | "REJECTED"
}
```

**Success Response — 200:**
```json
{
  "success": true,
  "message": "Interview status updated.",
  "data": {
    "interview": {
      "id": "...",
      "status": "SHORTLISTED",
      "updatedAt": "..."
    }
  }
}
```

---

## 5. Webhooks

### POST `/api/webhooks/bolna`
Receives real-time events from Bolna during/after a call.

**Auth required:** No (verified by Bolna signature header)

**Headers:**
```
x-bolna-signature: <hmac-signature>
```

**Request Body (sent by Bolna):**
```json
{
  "event": "call.started" | "call.ended" | "transcript.ready" | "recording.ready",
  "callId": "bolna_call_xyz",
  "interviewId": "cmpi80pqr0003s900ef56gh05",
  "data": {
    "duration": 1800,
    "recordingUrl": "https://...",
    "transcript": [
      {
        "speaker": "agent" | "user",
        "text": "Hello! Can you tell me about yourself?",
        "timestamp": "2026-05-23T11:01:00.000Z"
      }
    ]
  }
}
```

**Success Response — 200:**
```json
{
  "success": true,
  "message": "Webhook received.",
  "data": null
}
```

---

## 6. Health

### GET `/api/health`
Check if the server and database are running.

**Auth required:** No

**Success Response — 200:**
```json
{
  "success": true,
  "message": "Server running",
  "data": {
    "uptime": 342.5
  }
}
```

---

## Common Error Codes

| HTTP Status | Meaning |
|-------------|---------|
| 400 | Bad Request — validation failed (check `errors` array) |
| 401 | Unauthorized — missing, invalid, or expired JWT |
| 403 | Forbidden — authenticated but not allowed |
| 404 | Not Found — resource doesn't exist |
| 409 | Conflict — duplicate (email, etc.) |
| 500 | Internal Server Error |

---

## Enum Reference

### `InterviewStatus`
| Value | Meaning |
|-------|---------|
| `PENDING` | Scheduled, link not sent yet |
| `LINK_SENT` | Interview link sent to candidate |
| `IN_PROGRESS` | Call is live |
| `COMPLETED` | Call finished, evaluation pending |
| `EVALUATED` | AI evaluation done |
| `SHORTLISTED` | Recruiter shortlisted candidate |
| `REJECTED` | Recruiter rejected candidate |
| `FAILED` | Technical failure during call |

### `SpeakerType` (in transcript)
| Value | Meaning |
|-------|---------|
| `AI` | Bolna AI agent |
| `CANDIDATE` | The interviewee |
| `SYSTEM` | System message |

### `RecommendationType` (in evaluation)
| Value | Meaning |
|-------|---------|
| `STRONG_HIRE` | Highly recommended |
| `HIRE` | Recommended |
| `MAYBE` | Borderline |
| `REJECT` | Not recommended |

---

## Frontend Quick Reference

```js
// Base setup (Axios example)
const api = axios.create({ baseURL: "http://localhost:5000/api" });

// Set token after login
api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

// Store token key in localStorage
localStorage.setItem("token", data.token);
localStorage.getItem("token");
localStorage.removeItem("token"); // on logout
```

> **Note:** The `password` field is **never** returned in any response.  
> All timestamps are in **ISO 8601 UTC** format.  
> All IDs are **cuid2** strings.
