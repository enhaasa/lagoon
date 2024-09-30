import process from "process";
import * as fs from 'fs';
import * as path from 'path';

const args = process.argv.slice(2);
const componentName = args[0];
const componentNameCaps = componentName.charAt(0).toUpperCase() + componentName.slice(1);

if (!componentName) {
    console.error('Please provide a component name.');
    process.exit(1);
}

const currentDir = process.cwd();
const componentDir = path.join(currentDir, componentName);

if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir);
}


const tsxContent = 
`import styles from './${componentNameCaps}.module.scss';

export default function ${componentNameCaps}() {

    return (
        <div className={styles.container}>

        </div>    
    );
}
`;

const scssContent = 
`.container {

}
`;

const tsxPath = path.join(componentDir, `${componentNameCaps}.tsx`);
fs.writeFileSync(tsxPath, tsxContent);

const scssPath = path.join(componentDir, `${componentNameCaps}.module.scss`);
fs.writeFileSync(scssPath, scssContent);

console.log(`Created component ${componentNameCaps}.`);