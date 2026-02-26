import fsExtra from 'fs-extra';
import { join } from 'path';

const { copy, ensureDir, readJSON, writeJSON, remove } = fsExtra;

export async function afterPack({ appOutDir }) {
  const root = process.cwd();
  const resourcesApp = join(appOutDir, 'resources', 'app');
  const distDest = join(resourcesApp, 'dist');
  
  console.log('Setting up app resources...');
  console.log('  App output dir:', appOutDir);
  console.log('  Resources/app:', resourcesApp);
  
  // Clean the resources/app folder first (remove everything except node_modules)
  const items = await fsExtra.readdir(resourcesApp);
  for (const item of items) {
    if (item !== 'node_modules') {
      await remove(join(resourcesApp, item));
    }
  }
  
  // Copy dist folder
  const distSrc = join(root, 'dist');
  console.log('  Copying dist from:', distSrc);
  console.log('  Copying dist to:', distDest);
  await ensureDir(distDest);
  await copy(distSrc, distDest);
  
  // Copy assets/icons to dist/assets/icons for tray icon
  const iconsSrc = join(root, 'assets', 'icons');
  const iconsDest = join(distDest, 'assets', 'icons');
  await ensureDir(iconsDest);
  await copy(iconsSrc, iconsDest);
  
  // Copy and modify package.json
  const pkgSrc = join(root, 'package.json');
  const pkgDest = join(resourcesApp, 'package.json');
  const pkg = await readJSON(pkgSrc);
  delete pkg.type;
  delete pkg.scripts;
  delete pkg.devDependencies;
  await writeJSON(pkgDest, pkg, { spaces: 2 });
  
  console.log('✓ App resources set up successfully');
}
