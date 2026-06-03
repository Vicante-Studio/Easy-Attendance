# Contributing to Easy Attendance

Thanks for your interest in contributing. This is a small project, so the process is kept simple — but please follow it so things stay organized.

## Before You Start

**Open an issue first** before writing any code or submitting a pull request. This applies to bug fixes, new features, and documentation changes. It gives us a chance to discuss what you're planning, avoid duplicate work, and make sure it fits the direction of the project.

The only exception is genuinely trivial changes — fixing a typo, correcting a broken link, updating a version number. For anything that touches logic, structure, or features, open an issue.

## How to Contribute

### 1. Open an issue

Go to [Issues](https://github.com/vicante-studio/Easy-Attendance/issues) and describe:

- **What you want to do** — feature, bug fix, refactor, docs, etc.
- **Why it's useful** — who does this help and how?
- **Any relevant context** — screenshots, error logs, related issues

Wait for a response before starting work. Issues are usually acknowledged within a few days.

### 2. Fork and clone the repo

```bash
git clone https://github.com/vicante-studio/Easy-Attendance.git
cd Easy-Attendance
npm install
```

### 3. Create a branch

Name it something descriptive:

```bash
git checkout -b fix/counter-disconnect-crash
git checkout -b feat/export-attendance-csv
```

### 4. Make your changes

- Follow the existing code style (TypeScript throughout, ESLint config is already set up)
- Keep changes focused — one issue per pull request
- Test your changes locally before submitting

For development setup, see the [README](./README.md).

### 5. Submit a pull request

When you open the PR:

- Reference the issue it addresses (e.g. `Closes #12`)
- Describe what you changed and why
- Include screenshots if the change is visual

## Reporting Bugs

Use the [Issues](https://github.com/vicante-studio/Easy-Attendance/issues) tab. Include:

- What you expected to happen
- What actually happened
- Steps to reproduce
- Your OS and Node version

## Questions

If you're unsure about something before opening an issue, you can start a [Discussion](https://github.com/vicante-studio/Easy-Attendance/discussions) instead.

---

This project is MIT licensed. By contributing, you agree that your contributions will be licensed under the same terms.
