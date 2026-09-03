import fs from 'fs';

let content = fs.readFileSync('src/App.jsx', 'utf-8');

const replacements = [
    // 1. TRUST STATS section
    ['bg-[#1A1A1A] py-12', 'bg-gray-100 dark:bg-black py-12'],
    ['font-black text-white mb-1', 'font-black text-gray-900 dark:text-white mb-1'], 
    ['divide-white/10', 'divide-gray-300 dark:divide-white/10'],
    
    // 2. COVERAGE section
    ['py-24 bg-[#1A1A1A] text-white overflow-hidden relative', 'py-24 bg-white dark:bg-[#111111] text-gray-900 dark:text-white overflow-hidden relative'],
    ['bg-white/10 px-4 py-2 rounded-full', 'bg-black/5 dark:bg-white/10 px-4 py-2 rounded-full'], 
    ['border border-white/10 backdrop-blur-sm', 'border border-gray-200 dark:border-white/10 backdrop-blur-sm'],
    ['bg-white/5 border border-white/10', 'bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10'], 
    ['border border-white/20 rounded-full', 'border border-gray-300 dark:border-white/20 rounded-full'], 
    ['mt-1 text-gray-300', 'mt-1 text-gray-500 dark:text-gray-300'],
    ['border border-white/10 rounded-full absolute', 'border border-gray-200 dark:border-white/10 rounded-full absolute'],
    
    // 3. CAPTAIN SECTION (yellow section)
    ['bg-white/20 backdrop-blur-sm rounded-3xl p-8 border border-white/30', 'bg-black/5 backdrop-blur-sm rounded-3xl p-8 border border-black/10'],
    ['w-32 h-32 bg-white dark:bg-gray-900 rounded-full', 'w-32 h-32 bg-white rounded-full'],
    ['bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm text-center', 'bg-white rounded-xl p-4 shadow-sm text-center'],
    
    // 4. APP SECTION
    ['py-24 bg-[#1A1A1A] text-white', 'py-24 bg-gray-50 dark:bg-black text-gray-900 dark:text-white'], 
    ['text-black px-6 py-4 rounded-xl font-bold flex', 'text-black dark:text-white px-6 py-4 rounded-xl font-bold flex'], // for app store buttons
    
    // 5. CTA SECTION
    ['py-24 bg-[#1A1A1A] text-white text-center', 'py-24 bg-gray-100 dark:bg-black text-gray-900 dark:text-white text-center'],
    ['bg-white/10 text-white border border-white/20 px-8 py-4', 'bg-black/5 dark:bg-white/10 text-gray-900 dark:text-white border border-gray-300 dark:border-white/20 px-8 py-4'], 
    
    // General gray text that was missed
    ['text-xl text-gray-400 mb-8', 'text-xl text-gray-600 dark:text-gray-400 mb-8'],
    ['text-xl text-gray-400 mb-10', 'text-xl text-gray-600 dark:text-gray-400 mb-10'],
    ['text-gray-400 font-medium', 'text-gray-600 dark:text-gray-400 font-medium']
];

for (const [oldStr, newStr] of replacements) {
    content = content.split(oldStr).join(newStr);
}

fs.writeFileSync('src/App.jsx', content, 'utf-8');
console.log("Sections updated successfully.");
