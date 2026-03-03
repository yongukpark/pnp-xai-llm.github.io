import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';
import fs from 'node:fs';
import path from 'node:path';

const tasksRoot = path.join(process.cwd(), 'tasks');

const versionPattern = /(\d{4})-(\d{2})-v(\d+)/i;

function getVersionSortKey(value: string): number | null {
  const match = value.match(versionPattern);
  if (!match) {
    return null;
  }
  const [, year, month, version] = match;
  return Number(year) * 100000 + Number(month) * 100 + Number(version);
}

function sortVersionsDesc(a: string, b: string): number {
  const aBase = path.basename(a, path.extname(a));
  const bBase = path.basename(b, path.extname(b));
  const aKey = getVersionSortKey(aBase);
  const bKey = getVersionSortKey(bBase);

  if (aKey !== null && bKey !== null) {
    return bKey - aKey;
  }

  return bBase.localeCompare(aBase);
}

function getDocIdFromFrontMatter(filePath: string): string {
  const raw = fs.readFileSync(filePath, 'utf8');
  const frontMatter = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!frontMatter) {
    return path.basename(filePath, '.md');
  }
  const idLine = frontMatter[1].match(/^id:\s*(.+)$/m);
  if (!idLine) {
    return path.basename(filePath, '.md');
  }
  return idLine[1].trim().replace(/^["']|["']$/g, '');
}

const taskCategories = fs
  .readdirSync(tasksRoot, {withFileTypes: true})
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort((a, b) => a.localeCompare(b))
  .map((categoryName) => {
    const categoryPath = path.join(tasksRoot, categoryName);
    const items = fs
      .readdirSync(categoryPath, {withFileTypes: true})
      .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
      .map((entry) => entry.name)
      .sort(sortVersionsDesc)
      .map((fileName) => {
        const filePath = path.join(categoryPath, fileName);
        const docId = getDocIdFromFrontMatter(filePath);
        return `${categoryName}/${docId}`;
      });

    return {
      type: 'category' as const,
      label: categoryName,
      collapsed: false,
      items,
    };
  })
  .filter((category) => category.items.length > 0);

const sidebars: SidebarsConfig = {
  tasksSidebar: ['index', ...taskCategories],
};

export default sidebars;
