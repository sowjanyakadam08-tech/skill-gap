/**
 * CAMPUS SKILL GAP ANALYZER - AI Intelligence Layer
 * Ready for Google Gemini API integration with local heuristic fallback.
 */

class AIService {
  constructor() {
    this.apiKey = null; // Backend/Environment configurable
  }

  /**
   * Generates instant AI Career Intelligence report for the current student & target career
   */
  async generateAnalysisSummary(userProfile, targetCareer, gapAnalysis, readinessScore) {
    // Simulate lightweight AI generation latency
    await new Promise(resolve => setTimeout(resolve, 300));

    const criticalGaps = gapAnalysis.filter(g => g.gapPercentage > 50).map(g => g.skillName);
    const strongSkills = gapAnalysis.filter(g => g.gapPercentage <= 15).map(g => g.skillName);

    let summaryText = `Based on your current profile as a ${userProfile.yearOfStudy} ${userProfile.department} student targeting **${targetCareer.title}**, `;

    if (readinessScore >= 80) {
      summaryText += `you demonstrate **exceptional readiness (${readinessScore}%)**! You have mastered key core areas like ${strongSkills.slice(0, 3).join(', ')}. Focus on building capstone projects and mock interview preparation.`;
    } else if (readinessScore >= 50) {
      summaryText += `you are on a solid path with **${readinessScore}% career readiness**. Your foundational knowledge is good, but addressing your major gaps in **${criticalGaps.length > 0 ? criticalGaps.join(', ') : 'advanced technical depth'}** will dramatically elevate your portfolio to industry standard.`;
    } else {
      summaryText += `your current readiness stands at **${readinessScore}%**. Don't worry! By dedicating 4-6 hours a week to your 90-day personalized roadmap, particularly addressing **${criticalGaps.slice(0, 3).join(', ')}**, you can bridge this gap before campus recruitment.`;
    }

    const keyRecommendations = [
      `Prioritize ${criticalGaps[0] || 'core technical fundamentals'} this month using targeted hands-on projects.`,
      `Dedicate 45 minutes daily to solving real-world domain engineering exercises.`,
      `Publish your code on GitHub to showcase your practical skill growth to recruiters.`,
      `Engage in team collaboration to strengthen soft skills alongside technical proficiency.`
    ];

    return {
      summaryText,
      keyRecommendations,
      readinessTier: readinessScore >= 75 ? 'Advanced' : readinessScore >= 50 ? 'Intermediate' : 'Foundational'
    };
  }

  /**
   * Provides dynamic answers for the AI Campus Coach drawer
   */
  async askAICoach(userPrompt, userProfile, targetCareer, gapAnalysis) {
    await new Promise(resolve => setTimeout(resolve, 400));

    const promptLower = userPrompt.toLowerCase();
    const criticalGaps = gapAnalysis.filter(g => g.gapPercentage > 30).map(g => g.skillName);

    if (promptLower.includes('resume') || promptLower.includes('cv')) {
      return `To tailor your resume for **${targetCareer.title}**, highlight projects that utilize ${targetCareer.requiredSkills.slice(0, 3).map(s => s.id).join(', ')}. Include quantifiable metrics (e.g., "Optimized latency by 30%" or "Integrated 5+ sensors"). Avoid listing weak skills until you complete Phase 2 of your roadmap.`;
    }

    if (promptLower.includes('interview') || promptLower.includes('question')) {
      return `For **${targetCareer.title}** roles, expect technical questions around:
1. ${targetCareer.learningAreas[0] || 'Core Architecture'}
2. Handling memory allocation and performance trade-offs.
3. System design walk-throughs of your capstone project.
Be prepared to explain how you closed your gap in ${criticalGaps[0] || 'core technical skills'}.`;
    }

    if (promptLower.includes('gap') || promptLower.includes('weak') || promptLower.includes('missing')) {
      return `Your primary skill gaps for **${targetCareer.title}** are: **${criticalGaps.length > 0 ? criticalGaps.join(', ') : 'None critical!'}**. I recommend starting with the top priority task in your 90-Day Roadmap today.`;
    }

    return `As your AI Campus Career Coach, I analyze your gap for **${targetCareer.title}**. Your top priority should be completing tasks for **${criticalGaps[0] || 'your core required skills'}** and building a hands-on project like the *"${targetCareer.typicalProjects[0] || 'Capstone Project'}"*. How else can I assist your learning path today?`;
  }
}

window.aiService = new AIService();
