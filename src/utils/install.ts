const { rmdirSync, existsSync, mkdirSync, createWriteStream } = require('fs');
const { pipeline } = require('stream');
const { promisify } = require('util');
const fetch = require('node-fetch');

const streamPipeline = promisify(pipeline);

export const installAddons = async (arg: string) => {
  rmdirSync('tmp', { recursive: true });
  if (!existsSync('tmp')) mkdirSync('tmp');
  const addons = JSON.parse(arg);
  addons.forEach((addon: string) => mkdirSync(`tmp/${addon}`));

  // downloading sources
  if (addons.includes('d912pxy')) {
    const res = await fetch(
      'https://github.com/megai2/d912pxy/releases/download/v2.4.3.2/d912pxy_v2.4.3.2_r687.zip'
    );
    if (!res.ok) throw new Error(`unexpected response ${res.statusText}`);
    await streamPipeline(
      res.body,
      createWriteStream('tmp/d912pxy/d912pxy.zip')
    );
  }
  if (addons.includes('arcdps')) {
    const res = await fetch(
      'https://www.deltaconnected.com/arcdps/x64/d3d9.dll'
    );
    if (!res.ok) throw new Error(`unexpected response ${res.statusText}`);
    await streamPipeline(res.body, createWriteStream('tmp/arcdps/d3d9.dll'));
  }
};

// installAddons("['d912pxy', 'arcdps']");
// https://www.deltaconnected.com/arcdps/x64/d3d9.dll
