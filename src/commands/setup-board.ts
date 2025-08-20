import axios from 'axios';
import chalk = require('chalk');
import ora = require('ora');

interface SetupBoardOptions {
  name?: string;
  repo?: string;
}

interface BoardConfig {
  githubToken: string;
  projectName: string;
  repositoryOwner: string;
  repositoryName: string;
  boardName: string;
}

export async function setupBoard(options: SetupBoardOptions): Promise<void> {
  const spinner = ora('📊 Erstelle GitHub Project Board...').start();
  
  try {
    // GitHub API Setup
    const token = process.env.GITHUB_TOKEN || await getGitHubToken();
    const repoInfo = options.repo || await detectRepository();
    const [owner, repo] = repoInfo.split('/');
    
    const config: BoardConfig = {
      githubToken: token,
      projectName: repo,
      repositoryOwner: owner,
      repositoryName: repo,
      boardName: options.name || 'Main Development Board'
    };
    
    // GitHub Integration erstellen
    const github = new GitHubProjectManager(config);
    
    // 1. Project Board erstellen
    spinner.text = '📋 Erstelle Project Board...';
    const project = await github.createProject();
    
    // 2. Spalten erstellen
    spinner.text = '📊 Erstelle Spalten...';
    await github.createColumns(project.id);
    
    // 3. Automation Rules einrichten
    spinner.text = '🤖 Konfiguriere Automation...';
    await github.setupAutomation(project.id);
    
    // 4. Issue Templates verknüpfen
    spinner.text = '🔗 Verknüpfe Issue Templates...';
    await github.linkIssueTemplates();
    
    spinner.succeed('✅ GitHub Project Board erfolgreich erstellt!');
    
    console.log(chalk.green('\n🎯 Board Details:'));
    console.log(chalk.gray(`   Name: ${config.boardName}`));
    console.log(chalk.gray(`   Repository: ${owner}/${repo}`));
    console.log(chalk.gray(`   URL: https://github.com/${owner}/${repo}/projects`));
    
    console.log(chalk.blue('\n📋 Board Spalten:'));
    console.log(chalk.gray('   📥 Backlog    - Neue Issues landen hier'));
    console.log(chalk.gray('   ✅ Ready     - Analysis Agent approved'));
    console.log(chalk.gray('   🎯 To Do     - Bereit für Implementation'));
    console.log(chalk.gray('   🔄 Testing   - Pull Requests in Review'));
    console.log(chalk.gray('   ✨ Done      - Abgeschlossene Tasks'));
    
  } catch (error) {
    spinner.fail('❌ Fehler beim Board Setup');
    throw error;
  }
}

class GitHubProjectManager {
  private config: BoardConfig;
  private api: any;
  
  constructor(config: BoardConfig) {
    this.config = config;
    this.api = axios.create({
      baseURL: 'https://api.github.com',
      headers: {
        'Authorization': `token ${config.githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'claude-code-mastery-template'
      }
    });
  }
  
  async createProject(): Promise<{ id: number; url: string }> {
    try {
      const response = await this.api.post(`/repos/${this.config.repositoryOwner}/${this.config.repositoryName}/projects`, {
        name: this.config.boardName,
        body: `🤖 Multi-Agent Development Board\n\nAutomatically managed by Claude Code Mastery System:\n- Analysis Agent processes issues\n- Implementation Agent handles development\n- Human oversight at critical decision points`
      });
      
      return {
        id: response.data.id,
        url: response.data.html_url
      };
    } catch (error: any) {
      if (error.response?.status === 422) {
        throw new Error(`Project Board "${this.config.boardName}" existiert bereits`);
      }
      throw new Error(`GitHub API Fehler: ${error.response?.data?.message || error.message}`);
    }
  }
  
  async createColumns(projectId: number): Promise<void> {
    const columns = [
      {
        name: '📥 Backlog',
        automation: 'none'
      },
      {
        name: '✅ Ready', 
        automation: 'none'
      },
      {
        name: '🎯 To Do',
        automation: 'none'
      },
      {
        name: '🔄 Testing',
        automation: 'to_do'
      },
      {
        name: '✨ Done',
        automation: 'done'
      }
    ];
    
    for (const column of columns) {
      await this.api.post(`/projects/${projectId}/columns`, {
        name: column.name,
        automation_type: column.automation
      });
    }
  }
  
  async setupAutomation(projectId: number): Promise<void> {
    // GitHub Actions Workflow wird die Automation übernehmen
    // Hier könnten zusätzliche Webhook-Konfigurationen stehen
    
    // Repository Webhooks für erweiterte Automation
    try {
      await this.api.post(`/repos/${this.config.repositoryOwner}/${this.config.repositoryName}/hooks`, {
        name: 'web',
        active: true,
        events: ['issues', 'pull_request', 'project_card'],
        config: {
          url: `https://api.github.com/repos/${this.config.repositoryOwner}/${this.config.repositoryName}/dispatches`,
          content_type: 'json'
        }
      });
    } catch (error) {
      // Webhook könnte bereits existieren - nicht kritisch
      console.log(chalk.yellow('⚠️ Webhook Setup übersprungen (möglicherweise bereits vorhanden)'));
    }
  }
  
  async linkIssueTemplates(): Promise<void> {
    // Issue Templates sind bereits über .github/ISSUE_TEMPLATE/ verfügbar
    // Hier könnte zusätzliche Konfiguration stehen
    
    // Repository Settings für automatische Template-Verwendung
    try {
      await this.api.patch(`/repos/${this.config.repositoryOwner}/${this.config.repositoryName}`, {
        has_issues: true,
        has_projects: true,
        has_wiki: false
      });
    } catch (error) {
      // Repository Settings sind möglicherweise restricted
      console.log(chalk.yellow('⚠️ Repository Settings konnten nicht automatisch angepasst werden'));
    }
  }
}

async function getGitHubToken(): Promise<string> {
  const inquirer = await import('inquirer');
  const { token } = await inquirer.default.prompt([
    {
      type: 'password',
      name: 'token',
      message: '🔑 GitHub Personal Access Token eingeben:',
      mask: '*'
    }
  ]);
  return token;
}

async function detectRepository(): Promise<string> {
  try {
    // Git remote origin URL auslesen
    const { execSync } = await import('child_process');
    const remoteUrl = execSync('git remote get-url origin', { encoding: 'utf8' }).trim();
    
    // GitHub URL parsen
    const match = remoteUrl.match(/github\.com[:/]([^/]+)\/([^/]+?)(?:\.git)?$/);
    if (match) {
      return `${match[1]}/${match[2]}`;
    }
  } catch (error) {
    // Git remote nicht verfügbar
  }
  
  // Fallback: Benutzer fragen
  const inquirer = await import('inquirer');
  const { repo } = await inquirer.default.prompt([
    {
      type: 'input',
      name: 'repo',
      message: '📂 GitHub Repository (owner/repo):',
      validate: (input: string) => {
        return input.includes('/') ? true : 'Format: owner/repository';
      }
    }
  ]);
  return repo;
}
