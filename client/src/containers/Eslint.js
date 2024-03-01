import { ESLint } from 'eslint';
import { useEffect } from 'react';
 
const useLint = (code, setLintResult) => {
  useEffect(() => {
    const eslint = new ESLint({
      useEslintrc: true, // Use project's ESLint configuration
      overrideConfigFile: null, // Prevent overriding by parent configurations
    });
 
    eslint.lintText(code, { type: 'script' }) // Treat code as JavaScript
      .then((results) => setLintResult(results[0])) // Extract first result
      .catch((error) => console.error(error));
  }, [code]);
};
 
export { useLint };