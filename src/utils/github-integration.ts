import axios from 'axios';
import chalk = require('chalk');

export class GitHubIntegration {
  private token: string;
  private api: any;
  
  constructor(token: string) {
    this.token = token;
    this.api = axios.create({
      baseURL: 'https://api.github.com',
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'claude-code-mastery-template'
      }
    });
  }
  
  async createProjectBoard(config: any): Promise<void> {
    try {
      // GitHub Project Board über setup-board.ts Command erstellen
      console.log(chalk.yellow('📊 GitHub Project Board wird über setup-board Command erstellt...'));
      console.log(chalk.gray(`   Repository: ${config.projectInfo?.name || 'current-project'}`));
    } catch (error) {
      console.warn(chalk.yellow('⚠️ GitHub Project Board Setup übersprungen'));
      console.log(chalk.gray('   Verwenden Sie: claude-mastery setup-board'));
    }
  }
  
  async validateToken(): Promise<boolean> {
    try {
      await this.api.get('/user');
      return true;
    } catch (error) {
      return false;
    }
  }
}
