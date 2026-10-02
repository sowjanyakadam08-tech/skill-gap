/**
 * CAMPUS SKILL GAP ANALYZER - Single Page Application Router & View Renderers
 */

class AppUI {
  constructor() {
    this.currentView = 'landing'; // default view
    this.init();
  }

  init() {
    // Subscribe to state updates
    window.store.subscribe((state) => this.onStateChange(state));

    // Handle hash routing if available
    window.addEventListener('hashchange', () => this.handleRouting());

    // Initial render
    this.handleRouting();
    this.setupGlobalEvents();
  }

  handleRouting() {
    const hash = window.location.hash.replace('#', '') || 'landing';
    this.navigate(hash, false);
  }

  navigate(viewName, updateHash = true) {
    this.currentView = viewName;
    if (updateHash) {
      window.location.hash = viewName;
    }

    // Update sidebar active link
    document.querySelectorAll('.nav-item').forEach(el => {
      if (el.getAttribute('data-view') === viewName) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });

    this.render();

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onStateChange(state) {
    this.renderHeader();
    this.renderCurrentView(state);
  }

  render() {
    try {
      const state = window.store ? window.store.getState() : {};

      // Toggle Landing vs Dashboard Application Layout
      const landingEl = document.getElementById('view-landing');
      const appContainerEl = document.getElementById('app-main-layout');

      if (this.currentView === 'landing') {
        if (landingEl) landingEl.style.display = 'block';
        if (appContainerEl) appContainerEl.style.display = 'none';
        this.renderLandingPage();
      } else {
        if (landingEl) landingEl.style.display = 'none';
        if (appContainerEl) appContainerEl.style.display = 'flex';
        this.renderHeader();
        this.renderCurrentView(state);
      }
    } catch (err) {
      console.error('Error during app render:', err);
    }
  }

  renderHeader() {
    const state = window.store.getState();
    const user = state.user;
    const target = state.targetCareer;

    // Header badge
    const badgeEl = document.getElementById('header-career-badge');
    if (badgeEl) {
      badgeEl.innerHTML = `<i class="fa-solid fa-bullseye"></i> Target: ${target.title}`;
    }

    // Sidebar user mini card
    const avatarEl = document.getElementById('sidebar-user-avatar');
    const nameEl = document.getElementById('sidebar-user-name');
    const roleEl = document.getElementById('sidebar-user-role');

    if (avatarEl) avatarEl.src = user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200';
    if (nameEl) nameEl.textContent = user.fullName || 'Student';
    if (roleEl) roleEl.textContent = `${user.department || 'ECE'} • ${user.yearOfStudy || '3rd Year'}`;

    // Admin tab visibility
    const adminNavEl = document.getElementById('nav-college-insights');
    if (adminNavEl) {
      adminNavEl.style.display = state.userRole === 'admin' ? 'flex' : 'flex'; // show for demo
    }
  }

  renderCurrentView(state) {
    const bodyContainer = document.getElementById('page-content-area');
    if (!bodyContainer) return;

    switch (this.currentView) {
      case 'dashboard':
        bodyContainer.innerHTML = this.buildDashboardHTML(state);
        this.postRenderDashboard(state);
        break;

      case 'onboarding':
        bodyContainer.innerHTML = this.buildOnboardingHTML(state);
        this.postRenderOnboarding(state);
        break;

      case 'skills':
        bodyContainer.innerHTML = this.buildSkillsHTML(state);
        this.postRenderSkills(state);
        break;

      case 'gap_analysis':
        bodyContainer.innerHTML = this.buildGapAnalysisHTML(state);
        this.postRenderGapAnalysis(state);
        break;

      case 'careers':
        bodyContainer.innerHTML = this.buildCareersHTML(state);
        this.postRenderCareers(state);
        break;

      case 'roadmap':
        bodyContainer.innerHTML = this.buildRoadmapHTML(state);
        this.postRenderRoadmap(state);
        break;

      case 'projects':
        bodyContainer.innerHTML = this.buildProjectsHTML(state);
        this.postRenderProjects(state);
        break;

      case 'progress':
        bodyContainer.innerHTML = this.buildProgressHTML(state);
        this.postRenderProgress(state);
        break;

      case 'profile':
        bodyContainer.innerHTML = this.buildProfileHTML(state);
        this.postRenderProfile(state);
        break;

      case 'college_insights':
        bodyContainer.innerHTML = this.buildCollegeInsightsHTML(state);
        break;

      case 'settings':
        bodyContainer.innerHTML = this.buildSettingsHTML(state);
        this.postRenderSettings(state);
        break;

      default:
        bodyContainer.innerHTML = this.buildDashboardHTML(state);
        this.postRenderDashboard(state);
        break;
    }
  }

  // ==========================================
  // VIEW BUILDERS & POST-RENDER HANDLERS
  // ==========================================

  /* LANDING PAGE */
  renderLandingPage() {
    const landingEl = document.getElementById('view-landing');
    if (!landingEl) return;

    landingEl.innerHTML = `
      <nav class="top-header" style="position: fixed; width: 100%; top:0; left:0; z-index: 1000; background: rgba(8,8,8,0.9);">
        <div style="display:flex; align-items:center; gap:12px;">
          <div class="logo-icon">C</div>
          <div>
            <div class="logo-text">CAMPUS <span class="text-pink">SKILL GAP</span></div>
            <div class="logo-tag">CAREER INTELLIGENCE</div>
          </div>
        </div>
        <div style="display:flex; gap:12px;">
          <button class="btn btn-secondary btn-sm" onclick="app.showAuthModal('login')">Sign In</button>
          <button class="btn btn-primary btn-sm" onclick="app.showAuthModal('signup')">Create Account</button>
        </div>
      </nav>

      <div class="hero-container" style="padding-top: 140px;">
        <div class="hero-glow"></div>
        <div class="hero-content">
          <div class="hero-tag"><i class="fa-solid fa-sparkles"></i> AI-POWERED CAREER PLATFORM FOR COLLEGES</div>
          <h1 class="hero-title">Turn your current skills into a <span class="text-gradient">clear career roadmap.</span></h1>
          <p class="hero-subtitle">Discover the skills you already have, identify what you're missing, and build a personalized path toward your target career.</p>
          
          <div class="hero-actions">
            <button class="btn btn-primary btn-lg" onclick="app.navigate('onboarding')">
              <i class="fa-solid fa-wand-magic-sparkles"></i> Analyze My Skills
            </button>
            <button class="btn btn-secondary btn-lg" onclick="app.navigate('careers')">
              <i class="fa-solid fa-compass"></i> Explore Careers
            </button>
          </div>

          <!-- Futuristic Flowchart Element -->
          <div class="flowchart-container">
            <div class="flowchart-step"><i class="fa-solid fa-bolt text-pink"></i> CURRENT SKILLS</div>
            <div class="flowchart-arrow">➔</div>
            <div class="flowchart-step"><i class="fa-solid fa-chart-pie text-pink"></i> SKILL ANALYSIS</div>
            <div class="flowchart-arrow">➔</div>
            <div class="flowchart-step"><i class="fa-solid fa-triangle-exclamation text-pink"></i> SKILL GAPS</div>
            <div class="flowchart-arrow">➔</div>
            <div class="flowchart-step"><i class="fa-solid fa-map-location-dot text-pink"></i> LEARNING ROADMAP</div>
            <div class="flowchart-arrow">➔</div>
            <div class="flowchart-step" style="border-color:var(--pink-primary); background:var(--pink-muted);">
              <i class="fa-solid fa-graduation-cap text-pink"></i> CAREER READY
            </div>
          </div>
        </div>
      </div>

      <!-- Why Skill Gap Analyzer Section -->
      <div style="max-width: 1100px; margin: 0 auto; padding: 60px 20px;">
        <h2 style="text-align: center; margin-bottom: 40px; font-size: 2.2rem;">
          WHY <span class="text-gradient">SKILL GAP ANALYZER?</span>
        </h2>

        <div class="grid-3">
          <div class="glass-card glass-card-interactive">
            <div class="metric-icon" style="margin-bottom:16px;"><i class="fa-solid fa-bullseye"></i></div>
            <h3>Identify Missing Skills</h3>
            <p class="text-muted" style="margin-top:8px; font-size:0.9rem;">Quantify exact differences between classroom learning and real-world engineering benchmarks.</p>
          </div>

          <div class="glass-card glass-card-interactive">
            <div class="metric-icon" style="margin-bottom:16px;"><i class="fa-solid fa-briefcase"></i></div>
            <h3>Understand Career Requirements</h3>
            <p class="text-muted" style="margin-top:8px; font-size:0.9rem;">Access updated skill profiles for top roles in ECE, Software, AI/Data, and Core engineering.</p>
          </div>

          <div class="glass-card glass-card-interactive">
            <div class="metric-icon" style="margin-bottom:16px;"><i class="fa-solid fa-road"></i></div>
            <h3>Personalized Learning Paths</h3>
            <p class="text-muted" style="margin-top:8px; font-size:0.9rem;">Receive step-by-step 90-day execution roadmaps structured specifically for your timeline.</p>
          </div>

          <div class="glass-card glass-card-interactive">
            <div class="metric-icon" style="margin-bottom:16px;"><i class="fa-solid fa-chart-line"></i></div>
            <h3>Track Your Improvement</h3>
            <p class="text-muted" style="margin-top:8px; font-size:0.9rem;">Monitor your readiness score climb as you log learning hours and complete modules.</p>
          </div>

          <div class="glass-card glass-card-interactive">
            <div class="metric-icon" style="margin-bottom:16px;"><i class="fa-solid fa-code"></i></div>
            <h3>Discover Suitable Projects</h3>
            <p class="text-muted" style="margin-top:8px; font-size:0.9rem;">Build portfolio projects specifically designed to target your weakest skill areas.</p>
          </div>

          <div class="glass-card glass-card-interactive">
            <div class="metric-icon" style="margin-bottom:16px;"><i class="fa-solid fa-building-columns"></i></div>
            <h3>College Intelligence</h3>
            <p class="text-muted" style="margin-top:8px; font-size:0.9rem;">Help colleges understand aggregated student skill gaps to optimize department training.</p>
          </div>
        </div>

        <div style="text-align: center; margin-top: 60px;">
          <button class="btn btn-primary btn-lg" onclick="app.navigate('dashboard')">
            Launch Platform Dashboard <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    `;
  }

  /* DASHBOARD VIEW */
  buildDashboardHTML(state) {
    const user = state.user;
    const target = state.targetCareer;
    const gaps = state.gapAnalysis;
    const readiness = state.readinessScore;

    const skillGapPerc = Math.max(0, 100 - readiness);
    const masteredCount = user.skills.filter(s => s.level >= 80).length;

    const topGaps = gaps.filter(g => g.gapPercentage > 15).slice(0, 4);

    return `
      <div style="margin-bottom: 28px;">
        <h1>Good morning, ${user.fullName} 👋</h1>
        <p class="text-muted">"Let's close your skill gaps today."</p>
      </div>

      <!-- 4 Top Cards -->
      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-header">
            <span class="metric-title">CURRENT SKILL SCORE</span>
            <div class="metric-icon"><i class="fa-solid fa-star"></i></div>
          </div>
          <div class="metric-value text-pink">78%</div>
          <div class="metric-sub"><i class="fa-solid fa-check text-pink"></i> Based on ${user.skills.length} self-assessed skills</div>
        </div>

        <div class="metric-card">
          <div class="metric-header">
            <span class="metric-title">SKILL GAP</span>
            <div class="metric-icon"><i class="fa-solid fa-chart-pie"></i></div>
          </div>
          <div class="metric-value">${skillGapPerc}%</div>
          <div class="metric-sub"><i class="fa-solid fa-arrow-down"></i> Needed to reach target mastery</div>
        </div>

        <div class="metric-card">
          <div class="metric-header">
            <span class="metric-title">CAREER READINESS</span>
            <div class="metric-icon"><i class="fa-solid fa-graduation-cap"></i></div>
          </div>
          <div class="metric-value text-gradient">${readiness}%</div>
          <div class="metric-sub">Target: ${target.title}</div>
        </div>

        <div class="metric-card">
          <div class="metric-header">
            <span class="metric-title">SKILLS MASTERED</span>
            <div class="metric-icon"><i class="fa-solid fa-trophy"></i></div>
          </div>
          <div class="metric-value">${masteredCount}</div>
          <div class="metric-sub">Advanced proficiency level</div>
        </div>
      </div>

      <!-- Main Dashboard Grid -->
      <div class="grid-2" style="margin-bottom: 28px;">
        <!-- MY CAREER TARGET -->
        <div class="glass-card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
            <h3>MY CAREER TARGET</h3>
            <span class="status-pill status-improvement">${target.category}</span>
          </div>

          <h2 class="text-pink" style="margin-bottom:8px;">${target.title}</h2>
          <p class="text-muted" style="font-size:0.9rem; margin-bottom:20px;">${target.description}</p>

          <div style="margin-bottom:20px;">
            <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:6px;">
              <span>Career readiness:</span>
              <span class="text-pink" style="font-weight:700;">${readiness}%</span>
            </div>
            <div class="progress-bar-bg">
              <div class="progress-bar-fill" style="width: ${readiness}%;"></div>
            </div>
          </div>

          <div style="display:flex; gap:12px;">
            <button class="btn btn-primary btn-sm" onclick="app.navigate('gap_analysis')">
              <i class="fa-solid fa-magnifying-glass-chart"></i> View Analysis
            </button>
            <button class="btn btn-secondary btn-sm" onclick="app.navigate('careers')">
              <i class="fa-solid fa-arrows-rotate"></i> Change Target
            </button>
          </div>
        </div>

        <!-- TOP SKILL GAPS -->
        <div class="glass-card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
            <h3>TOP SKILL GAPS</h3>
            <button class="btn btn-outline-pink btn-sm" onclick="app.navigate('gap_analysis')">View All Gaps</button>
          </div>

          <div style="display:flex; flex-direction:column; gap:14px;">
            ${topGaps.length > 0 ? topGaps.map(g => `
              <div>
                <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:4px;">
                  <span style="font-weight:600; color:#fff;">${g.skillName}</span>
                  <span class="${g.statusClass}">${g.gapPercentage}% Gap</span>
                </div>
                <div class="progress-bar-bg" style="height:6px;">
                  <div class="progress-bar-fill" style="width: ${g.gapPercentage}%; background: ${g.gapPercentage > 50 ? '#FF2D8D' : '#F59E0B'};"></div>
                </div>
              </div>
            `).join('') : '<p class="text-muted">No significant gaps detected!</p>'}
          </div>
        </div>
      </div>

      <!-- TODAY'S FOCUS & AI SUMMARY -->
      <div class="grid-2">
        <!-- TODAY'S FOCUS -->
        <div class="glass-card" style="border-left:4px solid var(--pink-primary);">
          <div style="display:flex; align-items:center; gap:10px; margin-bottom:12px;">
            <div class="metric-icon" style="width:30px; height:30px; font-size:0.9rem;"><i class="fa-solid fa-fire text-pink"></i></div>
            <h3 style="font-size:1.1rem;">TODAY'S FOCUS</h3>
          </div>

          <h4 style="color:#fff; margin-bottom:6px;">Learn: "Pointers and Memory Management in C"</h4>
          <p class="text-muted" style="font-size:0.85rem; margin-bottom:16px;">
            Estimated time: <strong class="text-pink">45 minutes</strong> • Essential for closing your Embedded C gap.
          </p>

          <button class="btn btn-primary btn-sm" onclick="app.navigate('roadmap')">
            <i class="fa-solid fa-play"></i> Start Learning
          </button>
        </div>

        <!-- RADAR PREVIEW CARD -->
        <div class="glass-card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <h3>SKILL MATRIX SNAPSHOT</h3>
            <button class="btn btn-secondary btn-sm" onclick="app.navigate('gap_analysis')">Full Charts</button>
          </div>
          <div style="height: 180px; position:relative;">
            <canvas id="dash-radar-chart"></canvas>
          </div>
        </div>
      </div>
    `;
  }

  postRenderDashboard(state) {
    if (window.appCharts) {
      window.appCharts.renderRadarChart('dash-radar-chart', state.gapAnalysis);
    }
  }

  /* ONBOARDING VIEW */
  buildOnboardingHTML(state) {
    return `
      <div class="onboarding-card">
        <h2 style="text-align:center; margin-bottom:8px;">STUDENT <span class="text-pink">ONBOARDING</span></h2>
        <p class="text-muted" style="text-align:center; font-size:0.9rem; margin-bottom:32px;">
          Set up your academic details & current technical skill levels to calibrate your readiness.
        </p>

        <!-- Step Indicator -->
        <div class="step-indicator">
          <div class="step-dot active" id="onboard-dot-1">1</div>
          <div class="step-dot" id="onboard-dot-2">2</div>
          <div class="step-dot" id="onboard-dot-3">3</div>
        </div>

        <!-- STEP 1: EDUCATION -->
        <div id="onboard-step-1" class="onboard-step-panel">
          <h3 style="margin-bottom:20px;">Step 1: Education Details</h3>
          
          <div class="form-group">
            <label class="form-label">College Name</label>
            <input type="text" id="ob-college" class="form-control" value="${state.user.collegeName || ''}" placeholder="e.g. NIT / IIT / State Engineering College">
          </div>

          <div class="grid-2">
            <div class="form-group">
              <label class="form-label">Department / Branch</label>
              <select id="ob-dept" class="form-control">
                <option value="ECE" ${state.user.department === 'ECE' ? 'selected' : ''}>ECE (Electronics & Comm)</option>
                <option value="CSE" ${state.user.department === 'CSE' ? 'selected' : ''}>CSE (Computer Science)</option>
                <option value="EEE" ${state.user.department === 'EEE' ? 'selected' : ''}>EEE (Electrical & Electronics)</option>
                <option value="Mechanical" ${state.user.department === 'Mechanical' ? 'selected' : ''}>Mechanical</option>
                <option value="Civil" ${state.user.department === 'Civil' ? 'selected' : ''}>Civil</option>
                <option value="IT" ${state.user.department === 'IT' ? 'selected' : ''}>IT (Information Tech)</option>
                <option value="AI & ML" ${state.user.department === 'AI & ML' ? 'selected' : ''}>AI & ML</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Year of Study</label>
              <select id="ob-year" class="form-control">
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year" selected>3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
            </div>
          </div>

          <div style="text-align:right; margin-top:28px;">
            <button class="btn btn-primary" onclick="app.goToOnboardStep(2)">Next: Select Skills ➔</button>
          </div>
        </div>

        <!-- STEP 2: SKILLS SELECTION -->
        <div id="onboard-step-2" class="onboard-step-panel" style="display:none;">
          <h3 style="margin-bottom:8px;">Step 2: Select Current Skills</h3>
          <p class="text-muted" style="font-size:0.85rem; margin-bottom:20px;">Click skills you have learned or practiced.</p>

          <div class="form-group">
            <label class="form-label text-pink">Technical Skills</label>
            <div class="skill-tag-picker" id="ob-tech-picker">
              ${SKILL_DATABASE.filter(s => s.category === 'Technical').map(s => {
                const isSelected = state.user.skills.some(us => us.id === s.id);
                return `<div class="skill-chip ${isSelected ? 'selected' : ''}" data-id="${s.id}" data-name="${s.name}" onclick="app.toggleObSkill(this)">${s.name}</div>`;
              }).join('')}
            </div>
          </div>

          <div class="form-group" style="margin-top:20px;">
            <label class="form-label text-pink">Soft Skills</label>
            <div class="skill-tag-picker" id="ob-soft-picker">
              ${SKILL_DATABASE.filter(s => s.category === 'Soft').map(s => {
                const isSelected = state.user.skills.some(us => us.id === s.id);
                return `<div class="skill-chip ${isSelected ? 'selected' : ''}" data-id="${s.id}" data-name="${s.name}" onclick="app.toggleObSkill(this)">${s.name}</div>`;
              }).join('')}
            </div>
          </div>

          <div style="display:flex; justify-content:space-between; margin-top:28px;">
            <button class="btn btn-secondary" onclick="app.goToOnboardStep(1)">Back</button>
            <button class="btn btn-primary" onclick="app.goToOnboardStep(3)">Next: Set Levels ➔</button>
          </div>
        </div>

        <!-- STEP 3: PROFICIENCY -->
        <div id="onboard-step-3" class="onboard-step-panel" style="display:none;">
          <h3 style="margin-bottom:8px;">Step 3: Skill Proficiency</h3>
          <p class="text-muted" style="font-size:0.85rem; margin-bottom:20px;">Set your level (Beginner 30%, Intermediate 60%, Advanced 90%).</p>

          <div id="ob-proficiency-list" style="display:flex; flex-direction:column; gap:16px; max-height:300px; overflow-y:auto; padding-right:8px;">
            <!-- Rendered dynamically -->
          </div>

          <div style="display:flex; justify-content:space-between; margin-top:28px;">
            <button class="btn btn-secondary" onclick="app.goToOnboardStep(2)">Back</button>
            <button class="btn btn-primary" onclick="app.finishOnboarding()">Complete Onboarding 🎉</button>
          </div>
        </div>
      </div>
    `;
  }

  postRenderOnboarding(state) {
    this.obSelectedSkills = [...state.user.skills];
  }

  toggleObSkill(chipEl) {
    chipEl.classList.toggle('selected');
    const id = chipEl.getAttribute('data-id');
    const name = chipEl.getAttribute('data-name');

    if (chipEl.classList.contains('selected')) {
      if (!this.obSelectedSkills.some(s => s.id === id)) {
        this.obSelectedSkills.push({ id, name, level: 60, category: 'Technical' });
      }
    } else {
      this.obSelectedSkills = this.obSelectedSkills.filter(s => s.id !== id);
    }
  }

  goToOnboardStep(stepNum) {
    document.querySelectorAll('.onboard-step-panel').forEach(p => p.style.display = 'none');
    document.getElementById(`onboard-step-${stepNum}`).style.display = 'block';

    document.querySelectorAll('.step-dot').forEach((d, idx) => {
      if (idx + 1 === stepNum) d.className = 'step-dot active';
      else if (idx + 1 < stepNum) d.className = 'step-dot completed';
      else d.className = 'step-dot';
    });

    if (stepNum === 3) {
      this.renderProficiencyInputs();
    }
  }

  renderProficiencyInputs() {
    const listEl = document.getElementById('ob-proficiency-list');
    if (!listEl) return;

    if (this.obSelectedSkills.length === 0) {
      listEl.innerHTML = '<p class="text-muted">No skills selected yet! Go back to Step 2.</p>';
      return;
    }

    listEl.innerHTML = this.obSelectedSkills.map(s => `
      <div style="background:var(--bg-secondary); padding:12px 16px; border-radius:var(--radius-md); display:flex; align-items:center; justify-content:space-between; gap:16px;">
        <span style="font-weight:600; color:#fff; min-width:140px;">${s.name}</span>
        
        <div style="display:flex; gap:8px;">
          <button class="btn btn-sm ${s.level <= 40 ? 'btn-primary' : 'btn-secondary'}" onclick="app.setObSkillLevel('${s.id}', 30, this)">Beginner (30%)</button>
          <button class="btn btn-sm ${s.level > 40 && s.level <= 70 ? 'btn-primary' : 'btn-secondary'}" onclick="app.setObSkillLevel('${s.id}', 60, this)">Intermediate (60%)</button>
          <button class="btn btn-sm ${s.level > 70 ? 'btn-primary' : 'btn-secondary'}" onclick="app.setObSkillLevel('${s.id}', 90, this)">Advanced (90%)</button>
        </div>
      </div>
    `).join('');
  }

  setObSkillLevel(id, level, btnEl) {
    const found = this.obSelectedSkills.find(s => s.id === id);
    if (found) found.level = level;
    this.renderProficiencyInputs();
  }

  finishOnboarding() {
    const college = document.getElementById('ob-college')?.value;
    const dept = document.getElementById('ob-dept')?.value;
    const year = document.getElementById('ob-year')?.value;

    window.store.updateEducation({ collegeName: college, department: dept, yearOfStudy: year });
    window.store.updateSkills(this.obSelectedSkills);

    this.navigate('dashboard');
  }

  /* SKILL GAP ANALYSIS PAGE */
  buildGapAnalysisHTML(state) {
    const target = state.targetCareer;
    const gaps = state.gapAnalysis;
    const readiness = state.readinessScore;

    return `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 28px;">
        <div>
          <h1>SKILL GAP ANALYSIS</h1>
          <p class="text-muted">Target Role: <strong class="text-pink">${target.title}</strong></p>
        </div>
        <button class="btn btn-primary btn-sm" onclick="app.showCustomSkillModal()">+ Add Custom Skill</button>
      </div>

      <!-- READINESS SUMMARY COMPONENT -->
      <div class="glass-card" style="margin-bottom: 28px; background: linear-gradient(135deg, rgba(23,23,23,0.9), rgba(255,45,141,0.08));">
        <div class="grid-2" style="align-items:center;">
          <div>
            <span class="status-pill status-critical" style="margin-bottom:12px;">Skill-based readiness indicator</span>
            <h2 style="font-size:2.8rem; margin:8px 0;" class="text-gradient">${readiness}%</h2>
            <p class="text-muted" style="font-size:0.9rem;">
              Calculated dynamically via: <code style="color:var(--pink-soft);">Skill Gap = Required Level - Current Level</code>
            </p>
            <p style="font-size:0.8rem; color:#888; margin-top:8px;">
              * Note: This score indicates skill alignment and does not guarantee employment.
            </p>
          </div>

          <div style="height: 160px; position:relative;">
            <canvas id="gap-gauge-chart"></canvas>
          </div>
        </div>
      </div>

      <!-- VISUALIZATIONS GRID -->
      <div class="grid-2" style="margin-bottom: 28px;">
        <!-- RADAR CHART -->
        <div class="glass-card">
          <h3>RADAR: CURRENT VS REQUIRED SKILLS</h3>
          <div style="height: 320px; position:relative; margin-top:16px;">
            <canvas id="gap-radar-chart"></canvas>
          </div>
        </div>

        <!-- HORIZONTAL BARS CHART -->
        <div class="glass-card">
          <h3>SKILL COMPARISON BREAKDOWN</h3>
          <div style="height: 320px; position:relative; margin-top:16px;">
            <canvas id="gap-bar-chart"></canvas>
          </div>
        </div>
      </div>

      <!-- DETAILED GAP TABLE -->
      <div class="glass-card">
        <h3 style="margin-bottom:20px;">DETAILED SKILL COMPARISON</h3>

        <div style="overflow-x:auto;">
          <table style="width:100%; border-collapse:collapse; text-align:left; font-size:0.9rem;">
            <thead>
              <tr style="border-bottom:1px solid var(--border-subtle); color:var(--text-muted); font-size:0.75rem; text-transform:uppercase;">
                <th style="padding:12px;">SKILL</th>
                <th style="padding:12px;">CATEGORY</th>
                <th style="padding:12px;">CURRENT LEVEL</th>
                <th style="padding:12px;">TARGET REQ.</th>
                <th style="padding:12px;">GAP (%)</th>
                <th style="padding:12px;">STATUS</th>
                <th style="padding:12px; text-align:right;">ACTION</th>
              </tr>
            </thead>
            <tbody>
              ${gaps.map(g => `
                <tr style="border-bottom:1px solid rgba(255,255,255,0.04);">
                  <td style="padding:14px 12px; font-weight:600; color:#fff;">${g.skillName}</td>
                  <td style="padding:14px 12px;" class="text-muted">${g.category}</td>
                  <td style="padding:14px 12px;">
                    <div style="display:flex; align-items:center; gap:8px;">
                      <div class="progress-bar-bg" style="width:80px; height:6px;">
                        <div class="progress-bar-fill" style="width:${g.currentLevel}%;"></div>
                      </div>
                      <span>${g.currentLevel}%</span>
                    </div>
                  </td>
                  <td style="padding:14px 12px; font-weight:600;">${g.requiredLevel}%</td>
                  <td style="padding:14px 12px; font-weight:700;" class="text-pink">${g.gapPercentage}%</td>
                  <td style="padding:14px 12px;"><span class="${g.statusClass}">${g.status}</span></td>
                  <td style="padding:14px 12px; text-align:right;">
                    <button class="btn btn-secondary btn-sm" onclick="app.editSkillProficiencyModal('${g.skillId}', ${g.currentLevel})">Update</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  postRenderGapAnalysis(state) {
    if (window.appCharts) {
      window.appCharts.renderReadinessGauge('gap-gauge-chart', state.readinessScore);
      window.appCharts.renderRadarChart('gap-radar-chart', state.gapAnalysis);
      window.appCharts.renderBarChart('gap-bar-chart', state.gapAnalysis);
    }
  }

  /* CAREER EXPLORER VIEW */
  buildCareersHTML(state) {
    const activeTargetId = state.targetCareer.id;

    const categories = ['ALL', 'SOFTWARE', 'AI / DATA', 'ECE / CORE', 'OTHER'];

    return `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:28px;">
        <div>
          <h1>CAREER EXPLORER</h1>
          <p class="text-muted">Explore industry role benchmarks & target requirements</p>
        </div>
        <button class="btn btn-primary btn-sm" onclick="app.showCustomCareerModal()">+ Add Custom Career</button>
      </div>

      <!-- Search & Filters -->
      <div style="display:flex; gap:16px; margin-bottom:28px; flex-wrap:wrap;">
        <div class="header-search" style="width:280px;">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" id="career-search-input" placeholder="Search career role..." oninput="app.filterCareers()">
        </div>

        <div style="display:flex; gap:8px;">
          ${categories.map(cat => `
            <button class="btn btn-secondary btn-sm career-cat-btn ${cat === 'ALL' ? 'active' : ''}" onclick="app.filterCareerCat('${cat}', this)">${cat}</button>
          `).join('')}
        </div>
      </div>

      <!-- Careers Grid -->
      <div class="grid-3" id="careers-grid-container">
        ${CAREER_DATABASE.map(c => `
          <div class="glass-card glass-card-interactive career-item-card" data-cat="${c.category}" data-title="${c.title.toLowerCase()}">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;">
              <span class="status-pill status-improvement">${c.category}</span>
              ${c.id === activeTargetId ? '<span class="status-pill status-strong"><i class="fa-solid fa-bullseye"></i> CURRENT TARGET</span>' : ''}
            </div>

            <h3 style="margin-bottom:8px; font-size:1.2rem;">${c.title}</h3>
            <p class="text-muted" style="font-size:0.85rem; margin-bottom:16px; min-height:48px;">${c.description}</p>

            <div style="font-size:0.8rem; color:#888; margin-bottom:16px;">
              <div><strong>Salary:</strong> ${c.salaryRange}</div>
              <div><strong>Demand:</strong> ${c.demand}</div>
            </div>

            <div style="display:flex; gap:8px;">
              <button class="btn btn-secondary btn-sm" style="flex:1;" onclick="app.viewCareerDetailModal('${c.id}')">View Skills</button>
              <button class="btn ${c.id === activeTargetId ? 'btn-outline-pink' : 'btn-primary'} btn-sm" onclick="app.setTargetCareer('${c.id}')">
                ${c.id === activeTargetId ? 'Selected' : 'Set Target'}
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  postRenderCareers(state) {}

  filterCareerCat(cat, btnEl) {
    document.querySelectorAll('.career-cat-btn').forEach(b => b.classList.remove('active'));
    btnEl.classList.add('active');

    const searchVal = (document.getElementById('career-search-input')?.value || '').toLowerCase();

    document.querySelectorAll('.career-item-card').forEach(card => {
      const cardCat = card.getAttribute('data-cat');
      const cardTitle = card.getAttribute('data-title');

      const matchesCat = (cat === 'ALL' || cardCat.includes(cat));
      const matchesSearch = cardTitle.includes(searchVal);

      if (matchesCat && matchesSearch) card.style.display = 'block';
      else card.style.display = 'none';
    });
  }

  filterCareers() {
    const activeCatBtn = document.querySelector('.career-cat-btn.active');
    const activeCat = activeCatBtn ? activeCatBtn.textContent : 'ALL';
    this.filterCareerCat(activeCat, activeCatBtn);
  }

  setTargetCareer(careerId) {
    window.store.setTargetCareer(careerId);
    this.navigate('dashboard');
  }

  /* PERSONALIZED ROADMAP VIEW */
  buildRoadmapHTML(state) {
    const roadmap = window.store.getRoadmap();
    const target = state.targetCareer;

    const completedCount = roadmap.filter(r => r.isCompleted).length;
    const progressPerc = Math.round((completedCount / roadmap.length) * 100) || 0;

    return `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 28px;">
        <div>
          <h1>YOUR 90-DAY ROADMAP</h1>
          <p class="text-muted">Structured learning path for <strong class="text-pink">${target.title}</strong></p>
        </div>
        <div>
          <span class="status-pill status-strong" style="font-size:0.9rem; padding:8px 16px;">
            Roadmap Progress: ${progressPerc}% (${completedCount}/${roadmap.length} Modules)
          </span>
        </div>
      </div>

      <!-- Phases Timeline -->
      <div style="display:flex; flex-direction:column; gap:24px;">
        ${roadmap.map((item, idx) => `
          <div class="glass-card" style="border-left: 4px solid ${item.isCompleted ? '#10B981' : 'var(--pink-primary)'};">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
              <div>
                <span class="status-pill status-improvement" style="margin-right:8px;">${item.phaseTitle}</span>
                <span class="text-muted" style="font-size:0.85rem;">${item.weeks}</span>
              </div>

              <div style="display:flex; align-items:center; gap:12px;">
                <span class="text-muted" style="font-size:0.8rem;"><i class="fa-solid fa-clock text-pink"></i> Est. ${item.estHours} Hours</span>
                <button class="btn ${item.isCompleted ? 'btn-secondary' : 'btn-primary'} btn-sm" onclick="app.toggleRoadmapTask('${item.taskId}')">
                  ${item.isCompleted ? '<i class="fa-solid fa-circle-check text-pink"></i> Completed' : 'Mark Complete'}
                </button>
              </div>
            </div>

            <h3 style="margin-bottom:8px; font-size:1.2rem;" class="text-white">${item.skillName}</h3>

            <div class="grid-2" style="margin-top:12px; font-size:0.85rem;">
              <div>
                <strong class="text-pink">Topics Covered:</strong>
                <ul style="margin-top:4px; padding-left:18px; color:var(--text-gray-light);">
                  ${item.topics.map(t => `<li>${t}</li>`).join('')}
                </ul>
              </div>

              <div>
                <div><strong>Difficulty:</strong> ${item.difficulty}</div>
                <div style="margin-top:4px;"><strong>Recommended Resource:</strong> ${item.recommendedResource}</div>
                <div style="margin-top:4px; color:var(--pink-soft);"><strong>Hands-on Project:</strong> ${item.project}</div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  postRenderRoadmap(state) {}

  toggleRoadmapTask(taskId) {
    window.store.toggleRoadmapTask(taskId);
  }

  /* PROJECT RECOMMENDATIONS VIEW */
  buildProjectsHTML(state) {
    const projects = window.store.getRecommendedProjects();
    const target = state.targetCareer;

    return `
      <div style="margin-bottom:28px;">
        <h1>PROJECT RECOMMENDATIONS</h1>
        <p class="text-muted">Tailored projects to bridge your gaps for <strong class="text-pink">${target.title}</strong></p>
      </div>

      <div class="grid-2">
        ${projects.map(p => `
          <div class="glass-card glass-card-interactive" style="display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div style="display:flex; justify-content:space-between; margin-bottom:12px;">
                <span class="status-pill status-improvement">${p.difficulty}</span>
                <span class="text-muted" style="font-size:0.8rem;"><i class="fa-solid fa-hourglass"></i> ${p.estimatedDuration}</span>
              </div>

              <h3 style="margin-bottom:8px; font-size:1.15rem;">${p.title}</h3>
              <p class="text-muted" style="font-size:0.85rem; margin-bottom:16px;">${p.description}</p>

              <div style="margin-bottom:16px;">
                <div style="font-size:0.8rem; font-weight:700; color:var(--pink-soft); margin-bottom:6px;">Skills Gained:</div>
                <div style="display:flex; flex-wrap:wrap; gap:6px;">
                  ${p.skillsGained.map(sg => `<span class="skill-chip" style="font-size:0.75rem; padding:4px 10px;">${sg}</span>`).join('')}
                </div>
              </div>
            </div>

            <div style="display:flex; gap:12px; margin-top:16px;">
              <button class="btn btn-primary btn-sm" style="flex:1;" onclick="app.showProjectDetailModal('${p.id}')">
                <i class="fa-solid fa-folder-open"></i> View Project
              </button>
              <button class="btn btn-secondary btn-sm" onclick="app.addProjectToRoadmap('${p.title}')">Add to Roadmap</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  postRenderProjects(state) {}

  showProjectDetailModal(projId) {
    const proj = PROJECT_RECOMMENDATIONS.find(p => p.id === projId);
    if (!proj) return;

    this.showModal(`
      <div class="modal-header">
        <h2>${proj.title}</h2>
        <button class="close-modal-btn" onclick="app.closeModal()">&times;</button>
      </div>

      <div style="font-size:0.9rem; color:var(--text-gray-light);">
        <p style="margin-bottom:16px;">${proj.description}</p>
        
        <h4 class="text-pink" style="margin-bottom:8px;">System Architecture:</h4>
        <div style="background:var(--bg-secondary); padding:12px; border-radius:var(--radius-md); font-family:monospace; margin-bottom:16px; font-size:0.8rem;">
          ${proj.architecture}
        </div>

        <h4 class="text-pink" style="margin-bottom:8px;">Execution Steps:</h4>
        <ol style="padding-left:20px; margin-bottom:20px;">
          ${proj.steps.map(s => `<li style="margin-bottom:6px;">${s}</li>`).join('')}
        </ol>

        <button class="btn btn-primary btn-sm" style="width:100%;" onclick="app.closeModal()">Got it!</button>
      </div>
    `);
  }

  addProjectToRoadmap(projTitle) {
    window.store.logLearningHours(5);
    alert(`Project "${projTitle}" added to your active learning goals!`);
  }

  /* PROGRESS TRACKING VIEW */
  buildProgressHTML(state) {
    const prog = state.user.progress || { skillsImproved: 0, learningHours: 0, completedTasks: 0, completedProjects: 0, readinessHistory: [] };

    return `
      <div style="margin-bottom:28px;">
        <h1>MY PROGRESS</h1>
        <p class="text-muted">Track your learning metrics & skill score trajectory over time</p>
      </div>

      <!-- 4 Stat Cards -->
      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-header">
            <span class="metric-title">SKILLS IMPROVED</span>
            <div class="metric-icon"><i class="fa-solid fa-arrow-trend-up"></i></div>
          </div>
          <div class="metric-value text-pink">${prog.skillsImproved || 6}</div>
          <div class="metric-sub">Skills updated this month</div>
        </div>

        <div class="metric-card">
          <div class="metric-header">
            <span class="metric-title">LEARNING HOURS</span>
            <div class="metric-icon"><i class="fa-solid fa-clock"></i></div>
          </div>
          <div class="metric-value">${prog.learningHours || 28} hrs</div>
          <div class="metric-sub">Logged practice sessions</div>
        </div>

        <div class="metric-card">
          <div class="metric-header">
            <span class="metric-title">COMPLETED TASKS</span>
            <div class="metric-icon"><i class="fa-solid fa-list-check"></i></div>
          </div>
          <div class="metric-value">${prog.completedTasks || 8}</div>
          <div class="metric-sub">Roadmap items finished</div>
        </div>

        <div class="metric-card">
          <div class="metric-header">
            <span class="metric-title">PROJECTS COMPLETED</span>
            <div class="metric-icon"><i class="fa-solid fa-cubes"></i></div>
          </div>
          <div class="metric-value text-pink">${prog.completedProjects || 2}</div>
          <div class="metric-sub">Portfolio builds</div>
        </div>
      </div>

      <!-- LAST 30 DAYS SUMMARY CARD -->
      <div class="glass-card" style="margin-bottom:28px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <h3>LAST 30 DAYS TRAJECTORY</h3>
          <button class="btn btn-secondary btn-sm" onclick="app.simulateLogHours()">+ Log 2 Hours</button>
        </div>

        <div style="height:260px; position:relative;">
          <canvas id="progress-line-chart"></canvas>
        </div>
      </div>
    `;
  }

  postRenderProgress(state) {
    if (window.appCharts) {
      window.appCharts.renderProgressChart('progress-line-chart', state.user.progress?.readinessHistory);
    }
  }

  simulateLogHours() {
    window.store.logLearningHours(2);
  }

  /* PROFILE VIEW */
  buildProfileHTML(state) {
    const user = state.user;
    const target = state.targetCareer;

    return `
      <div style="margin-bottom:28px; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <h1>STUDENT PROFILE</h1>
          <p class="text-muted">Manage academic details, skills inventory, and achievements</p>
        </div>
        <button class="btn btn-primary btn-sm" onclick="app.showEditProfileModal()">Edit Profile</button>
      </div>

      <div class="grid-3" style="margin-bottom:28px;">
        <!-- PROFILE CARD -->
        <div class="glass-card" style="text-align:center;">
          <img src="${user.avatarUrl}" style="width:90px; height:90px; border-radius:50%; border:3px solid var(--pink-primary); margin-bottom:16px; object-fit:cover;">
          <h3>${user.fullName}</h3>
          <p class="text-pink" style="font-weight:600; font-size:0.9rem;">${user.department} Student</p>
          <p class="text-muted" style="font-size:0.85rem; margin-top:4px;">${user.collegeName}</p>
          <p class="text-muted" style="font-size:0.8rem;">${user.yearOfStudy} • ${user.semester || '6th Sem'}</p>

          <div style="margin-top:20px; padding-top:16px; border-top:1px solid var(--border-subtle);">
            <div style="font-size:0.75rem; text-transform:uppercase; color:var(--text-muted);">Career Target:</div>
            <strong class="text-white" style="font-size:0.95rem;">${target.title}</strong>
          </div>
        </div>

        <!-- SKILLS INVENTORY -->
        <div class="glass-card" style="grid-column: span 2;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
            <h3>CURRENT SKILLS INVENTORY</h3>
            <button class="btn btn-outline-pink btn-sm" onclick="app.navigate('onboarding')">Update Skills</button>
          </div>

          <div style="display:flex; flex-wrap:wrap; gap:10px;">
            ${user.skills.map(s => `
              <div class="glass-card" style="padding:10px 14px; border-radius:var(--radius-md); display:flex; align-items:center; gap:10px;">
                <div>
                  <div style="font-weight:600; font-size:0.85rem; color:#fff;">${s.name}</div>
                  <div class="text-pink" style="font-size:0.75rem;">Level: ${s.level}%</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  postRenderProfile(state) {}

  showEditProfileModal() {
    const user = window.store.getState().user;
    this.showModal(`
      <div class="modal-header">
        <h2>Edit Profile Information</h2>
        <button class="close-modal-btn" onclick="app.closeModal()">&times;</button>
      </div>

      <div class="form-group">
        <label class="form-label">Full Name</label>
        <input type="text" id="edit-name" class="form-control" value="${user.fullName}">
      </div>

      <div class="form-group">
        <label class="form-label">College Name</label>
        <input type="text" id="edit-college" class="form-control" value="${user.collegeName}">
      </div>

      <div class="form-group">
        <label class="form-label">Department</label>
        <input type="text" id="edit-dept" class="form-control" value="${user.department}">
      </div>

      <button class="btn btn-primary btn-sm" style="width:100%; margin-top:16px;" onclick="app.saveProfileEdit()">Save Changes</button>
    `);
  }

  saveProfileEdit() {
    const name = document.getElementById('edit-name')?.value;
    const college = document.getElementById('edit-college')?.value;
    const dept = document.getElementById('edit-dept')?.value;

    const user = window.store.getState().user;
    if (name) user.fullName = name;
    if (college) user.collegeName = college;
    if (dept) user.department = dept;

    window.store.saveUser();
    this.closeModal();
    this.render();
  }

  /* COLLEGE SKILL INSIGHTS (ADMIN VIEW) */
  buildCollegeInsightsHTML(state) {
    const insights = COLLEGE_INSIGHTS_DATA;

    return `
      <div style="margin-bottom:28px;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div>
            <h1>COLLEGE SKILL INSIGHTS</h1>
            <p class="text-muted">Anonymized aggregate student analytics & skill gap trends</p>
          </div>
          <span class="status-pill status-strong"><i class="fa-solid fa-lock"></i> PRIVACY STRICT: AGGREGATED DATA ONLY</span>
        </div>
      </div>

      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-header"><span class="metric-title">TOTAL STUDENTS</span></div>
          <div class="metric-value">${insights.totalStudents}</div>
        </div>
        <div class="metric-card">
          <div class="metric-header"><span class="metric-title">ANALYZED PROFILES</span></div>
          <div class="metric-value text-pink">${insights.analyzedStudents}</div>
        </div>
        <div class="metric-card">
          <div class="metric-header"><span class="metric-title">AVG CAMPUS READINESS</span></div>
          <div class="metric-value text-gradient">${insights.avgReadinessScore}%</div>
        </div>
      </div>

      <div class="grid-2" style="margin-bottom:28px;">
        <!-- MOST COMMON SKILL GAPS -->
        <div class="glass-card">
          <h3 style="margin-bottom:16px;">MOST COMMON STUDENT SKILL GAPS</h3>
          <div style="display:flex; flex-direction:column; gap:12px;">
            ${insights.mostCommonGaps.map(g => `
              <div>
                <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:4px;">
                  <span>${g.skill}</span>
                  <span class="text-pink" style="font-weight:700;">${g.gapPercentage}% Students Impacted</span>
                </div>
                <div class="progress-bar-bg" style="height:6px;">
                  <div class="progress-bar-fill" style="width:${g.gapPercentage}%;"></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- DEPARTMENT BREAKDOWN -->
        <div class="glass-card">
          <h3 style="margin-bottom:16px;">DEPARTMENT READINESS SUMMARY</h3>
          <table style="width:100%; border-collapse:collapse; font-size:0.85rem; text-align:left;">
            <thead>
              <tr style="border-bottom:1px solid var(--border-subtle); color:var(--text-muted);">
                <th style="padding:8px;">DEPARTMENT</th>
                <th style="padding:8px;">STUDENTS</th>
                <th style="padding:8px;">AVG READINESS</th>
                <th style="padding:8px;">TOP GAP</th>
              </tr>
            </thead>
            <tbody>
              ${insights.departmentBreakdown.map(d => `
                <tr style="border-bottom:1px solid rgba(255,255,255,0.04);">
                  <td style="padding:10px 8px; font-weight:600; color:#fff;">${d.dept}</td>
                  <td style="padding:10px 8px;">${d.students}</td>
                  <td style="padding:10px 8px;" class="text-pink">${d.avgReadiness}%</td>
                  <td style="padding:10px 8px;" class="text-muted">${d.topGap}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  /* SETTINGS VIEW */
  buildSettingsHTML(state) {
    return `
      <div style="margin-bottom:28px;">
        <h1>PLATFORM SETTINGS</h1>
        <p class="text-muted">Account preferences & system configurations</p>
      </div>

      <div class="glass-card" style="max-width:600px;">
        <h3 style="margin-bottom:20px;">Role Switcher (Demo View)</h3>
        
        <div style="display:flex; gap:12px; margin-bottom:24px;">
          <button class="btn ${state.userRole === 'student' ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="app.setRole('student')">
            Student Perspective
          </button>
          <button class="btn ${state.userRole === 'admin' ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="app.setRole('admin')">
            College Admin Perspective
          </button>
        </div>

        <h3 style="margin-bottom:16px;">Account Actions</h3>
        <button class="btn btn-outline-pink btn-sm" onclick="app.logout()">Sign Out of Platform</button>
      </div>
    `;
  }

  postRenderSettings(state) {}

  setRole(role) {
    window.store.setUserRole(role);
    this.render();
  }

  logout() {
    window.store.logout();
    this.navigate('landing');
  }

  // ==========================================
  // MODALS & AI COACH CONTROLLER
  // ==========================================

  showModal(contentHTML) {
    const overlay = document.getElementById('global-modal-overlay');
    const box = document.getElementById('global-modal-box');
    if (overlay && box) {
      box.innerHTML = contentHTML;
      overlay.classList.add('active');
    }
  }

  closeModal() {
    const overlay = document.getElementById('global-modal-overlay');
    if (overlay) overlay.classList.remove('active');
  }

  showAuthModal(type = 'login') {
    this.showModal(`
      <div class="modal-header">
        <h2>${type === 'login' ? 'Sign In to Account' : 'Create Student Account'}</h2>
        <button class="close-modal-btn" onclick="app.closeModal()">&times;</button>
      </div>

      <div class="form-group">
        <label class="form-label">Email Address</label>
        <input type="email" id="auth-email" class="form-control" placeholder="student@campus.edu">
      </div>

      <div class="form-group">
        <label class="form-label">Password</label>
        <input type="password" id="auth-pass" class="form-control" placeholder="••••••••">
      </div>

      ${type === 'signup' ? `
        <div class="form-group">
          <label class="form-label">Full Name</label>
          <input type="text" id="auth-name" class="form-control" placeholder="e.g. Ananya Rao">
        </div>
      ` : ''}

      <button class="btn btn-primary btn-sm" style="width:100%; margin-top:16px;" onclick="app.submitAuth('${type}')">
        ${type === 'login' ? 'Sign In' : 'Register & Start Onboarding'}
      </button>
    `);
  }

  submitAuth(type) {
    const email = document.getElementById('auth-email')?.value;
    const pass = document.getElementById('auth-pass')?.value;
    const name = document.getElementById('auth-name')?.value;

    if (type === 'signup') {
      window.store.signup({ email, fullName: name });
      this.closeModal();
      this.navigate('onboarding');
    } else {
      window.store.login(email, pass);
      this.closeModal();
      this.navigate('dashboard');
    }
  }

  showCustomSkillModal() {
    this.showModal(`
      <div class="modal-header">
        <h2>Add Custom Skill</h2>
        <button class="close-modal-btn" onclick="app.closeModal()">&times;</button>
      </div>

      <div class="form-group">
        <label class="form-label">Skill Name</label>
        <input type="text" id="custom-skill-name" class="form-control" placeholder="e.g. Rust / PyTorch">
      </div>

      <div class="form-group">
        <label class="form-label">Proficiency Level</label>
        <select id="custom-skill-level" class="form-control">
          <option value="30">Beginner (30%)</option>
          <option value="60" selected>Intermediate (60%)</option>
          <option value="90">Advanced (90%)</option>
        </select>
      </div>

      <button class="btn btn-primary btn-sm" style="width:100%; margin-top:16px;" onclick="app.saveCustomSkill()">Save Skill</button>
    `);
  }

  saveCustomSkill() {
    const name = document.getElementById('custom-skill-name')?.value;
    const level = Number(document.getElementById('custom-skill-level')?.value || 60);
    if (name) {
      window.store.addCustomSkill(name, level);
      this.closeModal();
      this.render();
    }
  }

  editSkillProficiencyModal(skillId, currentLevel) {
    const skill = window.store.getState().user.skills.find(s => s.id === skillId) || { name: skillId };
    this.showModal(`
      <div class="modal-header">
        <h2>Update Level: ${skill.name}</h2>
        <button class="close-modal-btn" onclick="app.closeModal()">&times;</button>
      </div>

      <div class="form-group">
        <label class="form-label">Set Level (%)</label>
        <input type="range" id="edit-level-slider" min="0" max="100" value="${currentLevel}" style="width:100%; accent-color:var(--pink-primary);" oninput="document.getElementById('level-val-disp').textContent = this.value + '%'">
        <div style="text-align:center; margin-top:8px; font-weight:700;" class="text-pink" id="level-val-disp">${currentLevel}%</div>
      </div>

      <button class="btn btn-primary btn-sm" style="width:100%; margin-top:16px;" onclick="app.saveSkillProficiency('${skillId}')">Save Level</button>
    `);
  }

  saveSkillProficiency(skillId) {
    const level = Number(document.getElementById('edit-level-slider')?.value || 60);
    window.store.setSkillLevel(skillId, level);
    this.closeModal();
    this.render();
  }

  toggleAICoachDrawer() {
    const drawer = document.getElementById('ai-coach-drawer');
    if (drawer) drawer.classList.toggle('active');
  }

  async sendAICoachMessage() {
    const inputEl = document.getElementById('ai-coach-input');
    const msgContainer = document.getElementById('ai-coach-msgs');

    if (!inputEl || !inputEl.value.trim() || !msgContainer) return;

    const userText = inputEl.value.trim();
    inputEl.value = '';

    // Append User Message
    msgContainer.innerHTML += `<div class="ai-msg ai-msg-user">${userText}</div>`;
    msgContainer.scrollTop = msgContainer.scrollHeight;

    const state = window.store.getState();
    const reply = await window.aiService.askAICoach(userText, state.user, state.targetCareer, state.gapAnalysis);

    // Append AI Message
    msgContainer.innerHTML += `<div class="ai-msg ai-msg-bot">${reply}</div>`;
    msgContainer.scrollTop = msgContainer.scrollHeight;
  }

  setupGlobalEvents() {
    // Navigation clicks
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const view = item.getAttribute('data-view');
        if (view) this.navigate(view);
      });
    });

    // Mobile menu toggle
    const mobBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.getElementById('app-sidebar');
    if (mobBtn && sidebar) {
      mobBtn.addEventListener('click', () => {
        sidebar.classList.toggle('mobile-open');
      });
    }
  }
}

// Instantiate global app UI router safely
const initApp = () => {
  if (!window.app) {
    try {
      window.app = new AppUI();
    } catch (err) {
      console.error('AppUI initialization error:', err);
    }
  }
};

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  initApp();
} else {
  document.addEventListener('DOMContentLoaded', initApp);
}

