import React, { useState } from 'react';
import { analyzeSkills } from '../lib/utils';
import { Search, TrendingUp, BookOpen, CheckCircle } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  required: number;
  gap: number;
  learningResources: {
    title: string;
    url: string;
  }[];
}

const SkillAnalysis: React.FC = () => {
  const [jobRole, setJobRole] = useState('');
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);

  const handleAnalyze = async () => {
    if (!jobRole) return;
    setLoading(true);
    try {
      const result = await analyzeSkills(jobRole); // This function should return Skill[]
      setSkills(result);
      setIsAnalyzed(true);
    } catch (error) {
      console.error('Error analyzing skills:', error);
      setIsAnalyzed(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI Skill Analysis</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Analyze your skills and identify areas for improvement</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4 mb-6">
          <input
            type="text"
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            placeholder="Enter your job role or skillset (e.g., React, Node, Python)"
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
          />
          <button
            onClick={handleAnalyze}
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            disabled={loading}
          >
            <Search className="w-5 h-5" />
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>

        {isAnalyzed && (
          <div className="space-y-6">
            {skills.map((skill) => (
              <div key={skill.name} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0 last:pb-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{skill.name}</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Gap: {skill.gap}%</span>
                </div>
                <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600" style={{ width: `${skill.level}%` }} />
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span className="dark:text-gray-300">Current Level: {skill.level}%</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span className="dark:text-gray-300">Required Level: {skill.required}%</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <BookOpen className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <div className="space-y-1">
                      {skill.learningResources.map((resource, index) => (
                        <a
                          key={index}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-indigo-600 dark:text-indigo-400 hover:underline"
                        >
                          {resource.title}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillAnalysis;
