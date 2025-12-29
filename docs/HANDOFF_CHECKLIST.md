# Officer Handoff Checklist

This checklist ensures smooth transition of website maintenance responsibilities between club officers.

---

## Pre-Handoff (Outgoing Officer)

### 1. Verify Permissions

- [ ] Confirm incoming officer has a GitHub account
- [ ] Add incoming officer to N15RA organization with **Admin** role
- [ ] Ensure at least **2 people** have Admin access (to prevent single point of failure)

**How to add member to organization:**

1. Go to https://github.com/orgs/N15RA/people
2. Click "Invite member"
3. Enter their GitHub username
4. Set role to "Owner" or "Admin"

### 2. Knowledge Transfer

- [ ] Walk through website architecture (see [ARCHITECTURE.md](./ARCHITECTURE.md))
- [ ] Demonstrate content update process (see [CONTENT_GUIDE.md](./CONTENT_GUIDE.md))
- [ ] Show how to manually trigger deployment
- [ ] Explain the folder structure and where things are located

### 3. Account Handoff

| Account                 | Action                |
| ----------------------- | --------------------- |
| GitHub Organization     | Transfer admin access |
| Google Sheets (if used) | Add editor permission |

### 4. Documentation Review

- [ ] Ensure all documentation is up to date
- [ ] Update any outdated information
- [ ] Record any known issues or pending tasks

---

## Post-Handoff (Incoming Officer)

### 1. Verify Access

- [ ] Can access GitHub repository: https://github.com/N15RA/n15ra.github.io
- [ ] Can view Actions tab and workflow runs
- [ ] Can access repository Settings
- [ ] Can edit files directly on GitHub

### 2. Test Basic Operations

- [ ] Successfully make a small edit (e.g., add a space somewhere)
- [ ] Commit the change
- [ ] Verify automatic deployment succeeds
- [ ] Confirm website reflects the change

### 3. Test Manual Deployment

- [ ] Go to Actions tab
- [ ] Find "Deploy to GitHub Pages" workflow
- [ ] Click "Run workflow"
- [ ] Verify deployment completes successfully

### 4. Verify Website

- [ ] Website loads at https://n15ra.github.io/
- [ ] Both Chinese and English versions work
- [ ] Navigation links function correctly
- [ ] Images display properly

---

## Emergency Contacts

If you encounter technical issues you cannot resolve:

| Contact                    | Role               | When to Contact                 |
| -------------------------- | ------------------ | ------------------------------- |
| Previous Technical Officer | First line support | General questions, minor issues |
| Faculty Advisor            | Escalation         | Major issues, account problems  |

---

## Important Notes

### Keep Multiple Admins

Always maintain at least 2 organization admins. This prevents lockout if one person leaves unexpectedly.

### Don't Share Passwords

Each officer should use their own GitHub account. Never share account credentials.

### Document Changes

When making significant changes, add a note in the commit message explaining what and why.

### Backup Before Major Changes

If making large changes, consider creating a branch first to test before merging to main.

---

## Annual Timeline Suggestion

| Month     | Action                                   |
| --------- | ---------------------------------------- |
| September | New officers onboarding, full handoff    |
| October   | Shadow period, new officers observe      |
| November  | New officers take primary responsibility |
| June      | Document any issues encountered          |
| July      | Prepare handoff documentation            |

---

## Quick Links

- Repository: https://github.com/N15RA/n15ra.github.io
- Live Website: https://n15ra.github.io/
- Actions (Deployments): https://github.com/N15RA/n15ra.github.io/actions
- Settings: https://github.com/N15RA/n15ra.github.io/settings
