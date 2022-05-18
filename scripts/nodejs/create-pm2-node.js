import { execSync } from 'child_process'
import { existsSync } from 'fs'
import { basename } from 'path'
import { homedir } from 'os'

const projectPath = process.argv[2]
const projectLaunchNpmScript = process.argv[3] || 'dev'
if (!existsSync(projectPath)) {
    console.error('Project path does not exist')
    process.exit(1)
}
const projectName = basename(projectPath)

execSync(`pm2 start --name ${projectName} ${homedir()}/executor.js -- "npm --prefix ${projectPath} run ${projectLaunchNpmScript}"`, {
    stdio: 'inherit',
    shell: false
})