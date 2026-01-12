# Contributing Guidelines

## Git Branching Strategy

We follow a simplified version of Git Flow to manage our development process.

### Branches

- **main**: This branch contains the production-ready code. All code in `main` must be stable and tested.
- **develop**: This is the integration branch for features. All features should be merged into `develop` first.
- **feature/**: Used for developing new features. Branch from `develop` and merge back into `develop`.
- **fix/**: Used for bug fixes. Branch from `develop` and merge back into `develop`.
- **hotfix/**: Used for critical fixes in production. Branch from `main` and merge back into both `main` and `develop`.

### Branch Naming Conventions

- Features: `feature/TASK-ID-short-description` (e.g., `feature/TASK-032-git-strategy`)
- Bug Fixes: `fix/TASK-ID-short-description`
- Chore: `chore/TASK-ID-description`

## Branch Protection Rules (GitHub)

- **main**:
  - Require a pull request before merging.
  - Require status checks to pass before merging (Lint, Typecheck, Tests).
  - Require linear history.
- **develop**:
  - Require a pull request before merging.
  - Require status checks to pass.

## Commit Message Conventions

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification. This is enforced using `commitlint` via a pre-commit hook.

Format: `<type>(<scope>): <description> [TASK-ID]`

Types:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools and libraries
- `build`: Changes that affect the build system or external dependencies
- `ci`: Changes to our CI configuration files and scripts

Example: `feat(setup): configure absolute imports [TASK-031]`

Note: The `TASK-ID` is required at the end of the commit message.
