const util = require('util');
const child_process = require('child_process');
const exec = util.promisify(child_process.exec);

function pad(n){return n.toString().padStart(2,'0');}

// Filename like: 2025-10-15_14-05-07.md
function getCreateTimeAsFileName(){
    const d = new Date();
    const date = [d.getFullYear(), pad(d.getMonth()+1), pad(d.getDate())].join('-');
    const time = [pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds())].join('-');
    return `${date}_${time}`;
}

function resolveHugoPath(){
    if(process.env.HUGO_PATH) return process.env.HUGO_PATH;
    const fs = require('fs');
    const candidates = [
        '/opt/homebrew/bin/hugo', // Apple Silicon brew
        '/usr/local/bin/hugo',    // Intel / older brew
    ];
    for(const p of candidates){
        try { fs.accessSync(p); return p; } catch(e){}
    }
    return 'hugo'; // fallback to PATH
}

async function executeCommand(){
    const hugo = resolveHugoPath();
    const fileName = getCreateTimeAsFileName()+'.md';
    const relPath = 'posts/'+fileName;
    const cwd = app.fileManager.vault.adapter.basePath;
    try {
        const {stdout, stderr} = await exec(`${hugo} new ${relPath}`, {cwd});
        console.log('[newblog] stdout:', stdout);
        console.log('[newblog] stderr:', stderr);
        if(/created/i.test(stdout)){
            new Notice(`New Blog Created [${relPath}]`);
        } else {
            new Notice('执行完成但输出不包含 created, 请查看控制台');
        }
    } catch(err){
        console.error('[newblog] error:', err);
        if(err.code === 'ENOENT'){
            new Notice('未找到 hugo 可执行文件。请将 brew 路径加入 PATH 或设置环境变量 HUGO_PATH');
        } else {
            new Notice('创建失败: '+(err.stderr || err.message));
        }
    }
}

module.exports = async function(context, req){
    await executeCommand();
};