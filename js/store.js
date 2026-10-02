/**
 * CAMPUS SKILL GAP ANALYZER - State Management & Skill Gap Engine
 */

class AppStore {
  constructor() {
    this.storageKeyUser = 'campus_skillgap_user';
    this.storageKeyAuth = 'campus_skillgap_auth';
    this.storageKeyRole = 'campus_skillgap_role'; // 'student' or 'admin'
    this.init();
  }

  init() {
    try {
      const savedUser = localStorage.getItem(this.storageKeyUser);
      if (savedUser) {
        this.user = JSON.parse(savedUser);
      } else {
        this.user = JSON.parse(JSON.stringify(SAMPLE_STUDENT_PROFILE));
        this.saveUser();
      }
    } catch (e) {
      this.user = JSON.parse(JSON.stringify(SAMPLE_STUDENT_PROFILE));
    }

    try {
      const savedAuth = localStorage.getItem(this.storageKeyAuth);
      this.isAuthenticated = savedAuth ? JSON.parse(savedAuth) : true;
    } catch (e) {
      this.isAuthenticated = true;
    }

    try {
      const savedRole = localStorage.getItem(this.storageKeyRole);
      this.userRole = savedRole || 'student';
    } catch (e) {
      this.userRole = 'student';
    }

    this.listeners = [];
  }

  saveUser() {
    try {
      localStorage.setItem(this.storageKeyUser, JSON.stringify(this.user));
      localStorage.setItem(this.storageKeyAuth, JSON.stringify(this.isAuthenticated));
      localStorage.setItem(this.storageKeyRole, this.userRole);
    } catch (e) {
      console.warn('localStorage save ignored:', e);
    }
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.saveUser();
    this.listeners.forEach(listener => listener(this.getState()));
  }

  saveUser() {
    localStorage.setItem(this.storageKeyUser, JSON.stringify(this.user));
    localStorage.setItem(this.storageKeyAuth, JSON.stringify(this.isAuthenticated));
    localStorage.setItem(this.storageKeyRole, this.userRole);
  }

  getState() {
    const targetCareer = this.getTargetCareer();
    const gapAnalysis = this.calculateSkillGaps(targetCareer);
    const readinessScore = this.calculateReadinessScore(targetCareer, gapAnalysis);

    return {
      user: this.user,
      isAuthenticated: this.isAuthenticated,
      userRole: this.userRole,
      targetCareer,
      gapAnalysis,
      readinessScore
    };
  }

  // Auth Operations
  login(email, password) {
    this.isAuthenticated = true;
    if (email) {
      this.user.email = email;
      const nameFromEmail = email.split('@')[0].replace('.', ' ');
      this.user.fullName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);
    }
    this.notify();
    return { success: true };
  }

  signup(userData) {
    this.user = {
      ...this.user,
      fullName: userData.fullName || 'New Student',
      email: userData.email || 'student@campus.edu',
      collegeName: userData.collegeName || 'State University',
      department: userData.department || 'ECE',
      yearOfStudy: userData.yearOfStudy || '3rd Year',
      semester: userData.semester || '5th Semester',
      skills: this.user.skills || [],
      progress: {
        skillsImproved: 0,
        learningHours: 0,
        completedTasks: 0,
        completedProjects: 0,
        readinessHistory: [{ date: 'Today', score: 35 }]
      }
    };
    this.isAuthenticated = true;
    this.notify();
    return { success: true };
  }

  logout() {
    this.isAuthenticated = false;
    this.saveUser();
    this.notify();
  }

  setUserRole(role) {
    this.userRole = role;
    this.notify();
  }

  // Onboarding & Profile Updates
  updateEducation(data) {
    this.user.collegeName = data.collegeName || this.user.collegeName;
    this.user.department = data.department || this.user.department;
    this.user.yearOfStudy = data.yearOfStudy || this.user.yearOfStudy;
    this.user.semester = data.semester || this.user.semester;
    this.notify();
  }

  updateSkills(skillsList) {
    // skillsList: array of { id, name, level (30/60/90), category }
    this.user.skills = skillsList;
    this.recalculateHistory();
    this.notify();
  }

  addCustomSkill(skillName, level = 60, category = 'Technical') {
    const id = skillName.toLowerCase().replace(/\s+/g, '_');
    const existingIndex = this.user.skills.findIndex(s => s.id === id || s.name.toLowerCase() === skillName.toLowerCase());
    if (existingIndex >= 0) {
      this.user.skills[existingIndex].level = level;
    } else {
      this.user.skills.push({ id, name: skillName, level, category });
    }
    this.notify();
  }

  setSkillLevel(skillId, level) {
    const skill = this.user.skills.find(s => s.id === skillId);
    if (skill) {
      skill.level = level;
    } else {
      const dbSkill = SKILL_DATABASE.find(s => s.id === skillId);
      if (dbSkill) {
        this.user.skills.push({
          id: dbSkill.id,
          name: dbSkill.name,
          level: level,
          category: dbSkill.category
        });
      }
    }
    this.recalculateHistory();
    this.notify();
  }

  removeSkill(skillId) {
    this.user.skills = this.user.skills.filter(s => s.id !== skillId);
    this.notify();
  }

  setTargetCareer(careerId) {
    this.user.targetCareerId = careerId;
    this.recalculateHistory();
    this.notify();
  }

  getTargetCareer() {
    if (!this.user.targetCareerId) {
      return CAREER_DATABASE[0]; // fallback
    }
    const found = CAREER_DATABASE.find(c => c.id === this.user.targetCareerId);
    if (found) return found;

    // Check custom career in user state
    if (this.user.customCareer) return this.user.customCareer;

    return CAREER_DATABASE[0];
  }

  addCustomCareer(careerData) {
    // careerData: { title, category, description, requiredSkills: [{ id, level }] }
    const id = 'custom_' + Date.now();
    const customCareer = {
      id,
      title: careerData.title,
      category: careerData.category || 'CUSTOM',
      description: careerData.description || 'User defined target role.',
      salaryRange: '$70,000 - $120,000 / yr',
      demand: 'High',
      requiredSkills: careerData.requiredSkills || [],
      recommendedSkills: ['communication', 'problem_solving'],
      typicalProjects: ['Custom Capstone Project'],
      learningAreas: ['Core Technology Foundations']
    };
    CAREER_DATABASE.push(customCareer);
    this.user.targetCareerId = id;
    this.notify();
    return customCareer;
  }

  // ==========================================
  // CORE SKILL GAP & READINESS ALGORITHM
  // ==========================================

  /**
   * Calculate skill gaps between current skills and target career requirements
   */
  calculateSkillGaps(targetCareer = this.getTargetCareer()) {
    if (!targetCareer || !targetCareer.requiredSkills) {
      return [];
    }

    const requiredList = targetCareer.requiredSkills;
    const userSkillsMap = new Map();
    (this.user.skills || []).forEach(s => userSkillsMap.set(s.id, s));

    const analysis = requiredList.map(req => {
      const dbSkill = SKILL_DATABASE.find(s => s.id === req.id) || { name: req.id, category: 'Technical' };
      const userSkill = userSkillsMap.get(req.id);

      const currentLevel = userSkill ? Number(userSkill.level) : 0;
      const requiredLevel = Number(req.level);

      const gap = Math.max(0, requiredLevel - currentLevel);
      const gapPercentage = Math.round((gap / requiredLevel) * 100);

      let status = 'Strong';
      let statusClass = 'status-strong';
      if (gapPercentage > 60) {
        status = 'Critical Gap';
        statusClass = 'status-critical';
      } else if (gapPercentage > 30) {
        status = 'Major Gap';
        statusClass = 'status-major';
      } else if (gapPercentage > 10) {
        status = 'Needs Improvement';
        statusClass = 'status-improvement';
      }

      return {
        skillId: req.id,
        skillName: dbSkill.name || userSkill?.name || req.id,
        category: dbSkill.category || 'Technical',
        currentLevel,
        requiredLevel,
        gap,
        gapPercentage,
        status,
        statusClass,
        hasSkill: !!userSkill && currentLevel > 0
      };
    });

    // Also include user soft skills if relevant
    (this.user.skills || []).forEach(uSkill => {
      if (uSkill.category === 'Soft' && !analysis.some(a => a.skillId === uSkill.id)) {
        const requiredLevel = 85;
        const currentLevel = Number(uSkill.level);
        const gap = Math.max(0, requiredLevel - currentLevel);
        const gapPercentage = Math.round((gap / requiredLevel) * 100);

        analysis.push({
          skillId: uSkill.id,
          skillName: uSkill.name,
          category: 'Soft',
          currentLevel,
          requiredLevel,
          gap,
          gapPercentage,
          status: gapPercentage <= 10 ? 'Strong' : gapPercentage <= 30 ? 'Needs Improvement' : 'Major Gap',
          statusClass: gapPercentage <= 10 ? 'status-strong' : gapPercentage <= 30 ? 'status-improvement' : 'status-major',
          hasSkill: true
        });
      }
    });

    // Sort by gap percentage descending (critical gaps first)
    return analysis.sort((a, b) => b.gapPercentage - a.gapPercentage);
  }

  /**
   * Calculates Career Readiness Score (%)
   */
  calculateReadinessScore(targetCareer = this.getTargetCareer(), gapAnalysis = null) {
    if (!targetCareer || !targetCareer.requiredSkills || targetCareer.requiredSkills.length === 0) {
      return 50;
    }

    const gaps = gapAnalysis || this.calculateSkillGaps(targetCareer);
    const requiredOnlyGaps = gaps.filter(g => targetCareer.requiredSkills.some(r => r.id === g.skillId));

    if (requiredOnlyGaps.length === 0) return 0;

    let totalMatchRatio = 0;
    requiredOnlyGaps.forEach(g => {
      const match = Math.min(1, g.currentLevel / g.requiredLevel);
      totalMatchRatio += match;
    });

    const score = Math.round((totalMatchRatio / requiredOnlyGaps.length) * 100);
    return Math.min(100, Math.max(0, score));
  }

  recalculateHistory() {
    const score = this.calculateReadinessScore();
    const history = this.user.progress?.readinessHistory || [];
    if (history.length > 0) {
      history[history.length - 1].score = score;
    } else {
      this.user.progress.readinessHistory = [{ date: 'Today', score: score }];
    }
  }

  // Roadmap Operations
  getRoadmap() {
    const targetCareer = this.getTargetCareer();
    const template = ROADMAP_TEMPLATES[targetCareer.id] || DEFAULT_ROADMAP_GENERIC;

    const completedSet = new Set(this.user.completedRoadmapTaskIds || []);

    return template.map((task, idx) => {
      const taskId = `task_${targetCareer.id}_${idx}`;
      return {
        ...task,
        taskId,
        isCompleted: completedSet.has(taskId)
      };
    });
  }

  toggleRoadmapTask(taskId) {
    if (!this.user.completedRoadmapTaskIds) {
      this.user.completedRoadmapTaskIds = [];
    }

    const set = new Set(this.user.completedRoadmapTaskIds);
    if (set.has(taskId)) {
      set.delete(taskId);
      if (this.user.progress.completedTasks > 0) {
        this.user.progress.completedTasks -= 1;
      }
    } else {
      set.add(taskId);
      this.user.progress.completedTasks = (this.user.progress.completedTasks || 0) + 1;
      this.user.progress.learningHours = (this.user.progress.learningHours || 0) + 4;
      this.user.progress.skillsImproved = (this.user.progress.skillsImproved || 0) + 1;
    }

    this.user.completedRoadmapTaskIds = Array.from(set);
    this.recalculateHistory();
    this.notify();
  }

  // Project Recommendations
  getRecommendedProjects() {
    const targetCareer = this.getTargetCareer();
    const gaps = this.calculateSkillGaps(targetCareer);
    const weakSkillIds = new Set(gaps.filter(g => g.gapPercentage > 20).map(g => g.skillId));

    // Filter projects matching target career or weak skills
    return PROJECT_RECOMMENDATIONS.map(proj => {
      const matchesCareer = proj.targetCareerId === targetCareer.id;
      const matchingSkillCount = proj.requiredSkills.filter(s => weakSkillIds.has(s)).length;
      return {
        ...proj,
        relevanceScore: (matchesCareer ? 50 : 10) + (matchingSkillCount * 20)
      };
    }).sort((a, b) => b.relevanceScore - a.relevanceScore);
  }

  logLearningHours(hours = 1) {
    if (!this.user.progress) {
      this.user.progress = { skillsImproved: 0, learningHours: 0, completedTasks: 0, completedProjects: 0, readinessHistory: [] };
    }
    this.user.progress.learningHours += hours;
    this.notify();
  }
}

// Global Store Instance
window.store = new AppStore();
