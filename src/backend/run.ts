import { exec, ChildProcess } from 'child_process';

class ProcessNode {
  private parent: ProcessNode;
  private c: ChildProcess;

  constructor(c: ChildProcess, p: ProcessNode) {
    this.parent = p;
    this.c = c;
    process.on('exit', () => {
      this.c.kill();
    })
  }

  get parentProcess(): ProcessNode {
    return this.parent;
  }

  get childProcess(): ChildProcess {
    return this.c;
  }
}

async function sleep(p: ProcessNode, ms: number): Promise<ProcessNode> {
  return new Promise(resolve => setTimeout(() => {resolve(p)}, ms));
}

async function run(command: string): Promise<ChildProcess> {
  const child = exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });

  console.log(child.pid);

  child.on('close', (code) => {
    console.info(`${command} exited with code ${code}`);
  })

  child.on('exit', (code) => {
    console.info(`${command} exited with code ${code}`);
  })

  child.on('error', (error) => {
    console.error(`${command} error: ${error}`);
  })

  return new Promise((resolve, reject) => {
    resolve(child);
  });
}

async function RunRedis(parent?: ProcessNode): Promise<ProcessNode> {
  const command = process.cwd() + '/bin/redis-server';

  return run(command).then((child) => {
    parent = new ProcessNode(child, parent);
    
    return new Promise((resolve, reject) => {
      resolve(parent);
    });
  });
}


async function RunUniverser(parent?: ProcessNode): Promise<ProcessNode> {
  const command = process.cwd() + '/bin/universer';
  
  return run(command).then((child) => {
    parent = new ProcessNode(child, parent);
    
    return new Promise((resolve, reject) => {
      resolve(parent);
    });
  });
}

function RunAll() {
  return RunRedis().then((p) => {
    return sleep(p, 5000)
  }).then((p) => {
    if (p.childProcess.killed) {
      console.error('Redis not started');
      return;
    }
    return RunUniverser();
  })
}

export default RunAll
