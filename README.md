# AUTHENX — AI-Based Fake Identity & Document Screening System

AUTHENX is an AI-assisted document screening prototype designed to demonstrate how identity documents can be analyzed for suspicious or inconsistent information.

## 🚀 Live Demo

**[Launch AUTHENX](https://authenx-verify-flow.base44.app)**

## 📌 Project Overview

AUTHENX provides a simulated end-to-end document screening workflow that allows users to upload a document and receive an analysis report containing extracted information, validation results, tampering indicators, face comparison results, and an overall risk assessment.

The project was developed as a hackathon prototype.

## ✨ Key Features

- 📄 Document upload and preview
- 🔍 Document screening workflow
- 🧾 Field extraction
- ✅ Identity/document validation
- 👤 Face comparison interface
- 🛡️ Tampering and anomaly indicators
- 📊 Risk score calculation
- 📋 Detailed screening findings
- 🕘 Screening history
- 📑 Report generation
- 🎨 Modern responsive interface

## 🏗️ Architecture

```text
User
 │
 ▼
AUTHENX Web Interface
 │
 ├── Document Upload
 ├── Document Preview
 └── Screening Workflow
          │
          ▼
    Screening Functions
          │
          ├── Field Extraction
          ├── Validation
          ├── Finding Generation
          ├── Face Comparison
          └── Risk Assessment
          │
          ▼
      Screening Report
          │
          ├── Extracted Fields
          ├── Validation Results
          ├── Findings
          ├── Risk Score
          └── Screening History