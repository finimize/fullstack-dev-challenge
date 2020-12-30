import { spawn } from 'child_process'

const args = ['start'] as const
spawn('yarn', args, { stdio: 'inherit', cwd: 'client', shell: true })
