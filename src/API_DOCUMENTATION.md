# 🔌 EchoMind API Documentation

## Overview

EchoMind implements a client-side processing engine that simulates a backend API. This document describes the API contract and implementation details.

## Simulated Endpoint: `/api/predict`

### Description
Processes input text using NLP techniques to extract semantic patterns, keywords, and sentiment analysis.

### Request Format

**Method**: `POST` (simulated)  
**Content-Type**: `application/json`

**Request Body**:
```json
{
  "text": "Your input text here..."
}
```

### Response Format

**Status**: `200 OK`  
**Content-Type**: `application/json`

**Response Body**:
```json
{
  "neurons": 45,
  "connections": 152,
  "sentiment": "positive",
  "keywords": [
    "keyword1",
    "keyword2",
    "keyword3",
    "keyword4",
    "keyword5",
    "keyword6",
    "keyword7",
    "keyword8"
  ]
}
```

### Response Fields

| Field | Type | Range/Values | Description |
|-------|------|--------------|-------------|
| `neurons` | number | 20-70 | Number of neural nodes detected in the semantic pattern |
| `connections` | number | 70-200 | Number of synaptic connections between neurons |
| `sentiment` | string | "positive", "negative", "neutral" | Overall emotional tone of the text |
| `keywords` | string[] | 0-8 items | Most relevant keywords extracted from the text |

## Implementation Details

### Location
The API logic is implemented in `/App.tsx` in the `processText()` function.

### Processing Pipeline

```typescript
async function processText(text: string): Promise<AnalysisResult> {
  // 1. Extract keywords
  const keywords = extractKeywords(text);
  
  // 2. Determine sentiment
  const sentiment = analyzeSentiment(text);
  
  // 3. Generate neural metrics
  const neurons = Math.floor(Math.random() * 51) + 20;
  const connections = Math.floor(Math.random() * 131) + 70;
  
  return { neurons, connections, sentiment, keywords, text };
}
```

### 1. Keyword Extraction

**Function**: `extractKeywords(text: string): string[]`

**Algorithm**:
1. Convert text to lowercase
2. Remove punctuation and special characters
3. Split into words (tokens)
4. Filter out:
   - Words less than 4 characters
   - Common stop words (the, a, an, and, or, etc.)
5. Count word frequency
6. Return top 8 most frequent words

**Stop Words List**:
```typescript
const stopWords = [
  'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
  'of', 'with', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should',
  'could', 'may', 'might', 'can', 'this', 'that', 'these', 'those',
  'i', 'you', 'he', 'she', 'it', 'we', 'they', 'what', 'which', 'who',
  'when', 'where', 'why', 'how', 'from', 'by', 'as', 'into', 'through'
];
```

**Example**:
```typescript
Input: "The beautiful sunrise brought great joy and happiness to everyone"
Output: ["beautiful", "sunrise", "brought", "great", "happiness", "everyone"]
```

### 2. Sentiment Analysis

**Function**: `analyzeSentiment(text: string): string`

**Algorithm**:
1. Convert text to lowercase
2. Scan for positive words
3. Scan for negative words
4. Calculate scores for each
5. Return sentiment based on highest score

**Positive Words** (20 words):
```typescript
['good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic',
 'happy', 'joy', 'love', 'beautiful', 'best', 'brilliant', 'awesome',
 'positive', 'perfect', 'success', 'win', 'victory', 'benefit', 'advantage']
```

**Negative Words** (20 words):
```typescript
['bad', 'terrible', 'awful', 'horrible', 'worst', 'hate', 'sad',
 'angry', 'negative', 'poor', 'fail', 'failure', 'loss', 'problem',
 'issue', 'wrong', 'difficult', 'hard', 'pain', 'suffer']
```

**Scoring Logic**:
```typescript
if (positiveScore > negativeScore) return 'positive';
if (negativeScore > positiveScore) return 'negative';
return 'neutral';
```

**Examples**:

| Input | Positive Score | Negative Score | Result |
|-------|---------------|----------------|---------|
| "I love this great product!" | 2 | 0 | positive |
| "This is terrible and awful" | 0 | 2 | negative |
| "The weather is nice today" | 0 | 0 | neutral |

### 3. Neural Metrics Generation

**Neurons**: Random integer between 20 and 70
```typescript
const neurons = Math.floor(Math.random() * 51) + 20;
```

**Connections**: Random integer between 70 and 200
```typescript
const connections = Math.floor(Math.random() * 131) + 70;
```

These values simulate the complexity of semantic patterns in the input text.

## Usage Examples

### Example 1: Positive Sentiment

**Request**:
```json
{
  "text": "I absolutely love this amazing new technology! It's fantastic and brings me so much joy."
}
```

**Response**:
```json
{
  "neurons": 42,
  "connections": 128,
  "sentiment": "positive",
  "keywords": [
    "absolutely",
    "love",
    "amazing",
    "technology",
    "fantastic",
    "brings",
    "much"
  ]
}
```

### Example 2: Negative Sentiment

**Request**:
```json
{
  "text": "This terrible software is full of problems and issues. It's awful and causes so much pain."
}
```

**Response**:
```json
{
  "neurons": 58,
  "connections": 145,
  "sentiment": "negative",
  "keywords": [
    "terrible",
    "software",
    "full",
    "problems",
    "issues",
    "awful",
    "causes",
    "much"
  ]
}
```

### Example 3: Neutral Sentiment

**Request**:
```json
{
  "text": "The meeting will take place tomorrow at 3pm in the conference room."
}
```

**Response**:
```json
{
  "neurons": 35,
  "connections": 92,
  "sentiment": "neutral",
  "keywords": [
    "meeting",
    "take",
    "place",
    "tomorrow",
    "conference",
    "room"
  ]
}
```

### Example 4: Technical Text

**Request**:
```json
{
  "text": "Machine learning algorithms process vast amounts of data to identify patterns and make predictions based on statistical models."
}
```

**Response**:
```json
{
  "neurons": 63,
  "connections": 187,
  "sentiment": "neutral",
  "keywords": [
    "machine",
    "learning",
    "algorithms",
    "process",
    "vast",
    "amounts",
    "data",
    "identify"
  ]
}
```

## Converting to Real Backend API

If you want to implement this as an actual backend API, here's how:

### Node.js + Express Example

```javascript
// server.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Your NLP functions here (extractKeywords, analyzeSentiment)

app.post('/api/predict', async (req, res) => {
  const { text } = req.body;
  
  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Invalid input text' });
  }
  
  try {
    const keywords = extractKeywords(text);
    const sentiment = analyzeSentiment(text);
    const neurons = Math.floor(Math.random() * 51) + 20;
    const connections = Math.floor(Math.random() * 131) + 70;
    
    res.json({
      neurons,
      connections,
      sentiment,
      keywords
    });
  } catch (error) {
    res.status(500).json({ error: 'Processing failed' });
  }
});

app.listen(3000, () => {
  console.log('API running on http://localhost:3000');
});
```

### Frontend Integration

```typescript
// Update processText in App.tsx
async function processText(text: string): Promise<AnalysisResult> {
  const response = await fetch('http://localhost:3000/api/predict', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });
  
  const data = await response.json();
  
  return {
    ...data,
    text
  };
}
```

## Error Handling

### Client-Side Validation

The application validates input before processing:

```typescript
if (!text.trim()) {
  // Button is disabled, prevents submission
  return;
}
```

### Fallback Keywords

If no keywords are found (very short text), defaults are provided:

```typescript
return sortedKeywords.length > 0 
  ? sortedKeywords 
  : ['text', 'analysis', 'processing'];
```

## Performance Considerations

### Current Implementation
- **Processing Time**: ~1ms (instant)
- **Simulated Delay**: 2000ms (for UX)
- **Memory Usage**: Minimal (client-side only)
- **Scalability**: Unlimited (no server)

### Backend Implementation
If implementing as a real backend:
- Add rate limiting
- Implement caching for common phrases
- Use advanced NLP libraries (natural, compromise.js)
- Consider using AI models (GPT, BERT) for better analysis
- Add request validation and sanitization
- Implement proper error logging

## Security Notes

### Current Implementation
- No server communication = No security concerns
- No data persistence
- No API keys needed
- Runs entirely in browser

### Backend Implementation
If you implement a real backend:
- Add CORS restrictions
- Implement rate limiting
- Sanitize input to prevent injection
- Add authentication if needed
- Log requests for monitoring
- Validate input length (prevent DoS)

## Advanced Features (Future)

Potential enhancements for the API:

1. **Named Entity Recognition**: Extract people, places, organizations
2. **Topic Modeling**: Identify main topics in text
3. **Readability Scores**: Calculate text complexity
4. **Language Detection**: Support multiple languages
5. **Text Summarization**: Generate summaries
6. **Emotion Detection**: Fine-grained emotional analysis
7. **Intent Classification**: Categorize text purpose
8. **Relationship Extraction**: Find connections between entities

---

**API Version**: 1.0  
**Last Updated**: November 2024  
**Maintained by**: EchoMind Team
