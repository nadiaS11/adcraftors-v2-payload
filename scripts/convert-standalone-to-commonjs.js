import { promises as fs } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

async function convertStandaloneToCommonJS() {
  const standaloneDir = join(__dirname, '../.next/standalone')
  const packageJsonPath = join(standaloneDir, 'package.json')
  const serverJsPath = join(standaloneDir, 'server.js')

  try {
    // Step 1: Update .next/standalone/package.json to set "type": "commonjs"
    let packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'))
    if (packageJson.type === 'module') {
      packageJson.type = 'commonjs'
      await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2))
      console.log('Updated .next/standalone/package.json to "type": "commonjs"')
    } else if (packageJson.type === 'commonjs') {
      console.log('.next/standalone/package.json already set to "type": "commonjs"')
    } else {
      packageJson.type = 'commonjs'
      await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2))
      console.log('Set .next/standalone/package.json to "type": "commonjs"')
    }

    // Step 2: Read .next/standalone/server.js
    let serverJsContent = await fs.readFile(serverJsPath, 'utf8')

    // Step 3: Remove unwanted lines
    serverJsContent = serverJsContent
      .replace(/import module from ['"]module['"][;\s]*\n?/g, '')
      .replace(/const require = module\.createRequire\(import\.meta\.url\)[;\s]*\n?/g, '')
      .replace(
        /const __dirname = fileURLToPath\(new URL\('\.', import\.meta\.url\)\)[;\s]*\n?/g,
        '',
      )

    // Step 4: Convert remaining ESM to CommonJS
    serverJsContent = serverJsContent
      .replace(/import\s+{([^}]+)}\s+from\s+['"]([^'"]+)['"]/g, 'const {$1} = require("$2")')
      .replace(/import\s+(\w+)\s+from\s+['"]([^'"]+)['"]/g, 'const $1 = require("$2")')
      .replace(/export default\s+([^;]+);/, 'module.exports = $1;')
      .replace(/import\.meta\.url/g, 'require("url").pathToFileURL(__filename).href')

    // Step 5: Write modified server.js
    await fs.writeFile(serverJsPath, serverJsContent)
    console.log('Converted .next/standalone/server.js to CommonJS and removed unwanted lines')
  } catch (error) {
    console.error('Error during conversion:', error)
    process.exit(1)
  }
}

convertStandaloneToCommonJS()
