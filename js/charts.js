/**
 * CAMPUS SKILL GAP ANALYZER - Chart.js Visualization Wrappers
 */

class SkillGapCharts {
  constructor() {
    this.instances = {};
    this.initDefaults();
  }

  initDefaults() {
    try {
      if (window.Chart && Chart.defaults) {
        Chart.defaults.color = '#A7A7A7';
        if (Chart.defaults.font) {
          Chart.defaults.font.family = "'Plus Jakarta Sans', 'Outfit', sans-serif";
          Chart.defaults.font.size = 12;
        }
        if (Chart.defaults.plugins && Chart.defaults.plugins.tooltip) {
          Chart.defaults.plugins.tooltip.backgroundColor = '#171717';
          Chart.defaults.plugins.tooltip.titleColor = '#FFFFFF';
          Chart.defaults.plugins.tooltip.bodyColor = '#FF9DCA';
          Chart.defaults.plugins.tooltip.borderColor = 'rgba(255, 45, 141, 0.4)';
          Chart.defaults.plugins.tooltip.borderWidth = 1;
          Chart.defaults.plugins.tooltip.padding = 10;
          Chart.defaults.plugins.tooltip.cornerRadius = 8;
        }
      }
    } catch (err) {
      console.warn('Chart.js theme defaults warning:', err);
    }
  }

  destroy(id) {
    if (this.instances[id]) {
      try {
        this.instances[id].destroy();
      } catch (e) {}
      delete this.instances[id];
    }
  }

  /**
   * 1. Radar Chart: Current Skills vs Required Skills
   */
  renderRadarChart(canvasId, gapAnalysis) {
    if (!window.Chart) return;
    this.destroy(canvasId);

    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    try {
      const skillsToDisplay = (gapAnalysis || []).slice(0, 8);
      const labels = skillsToDisplay.map(s => s.skillName);
      const currentData = skillsToDisplay.map(s => s.currentLevel);
      const requiredData = skillsToDisplay.map(s => s.requiredLevel);

      const ctx = canvas.getContext('2d');

      const currentGradient = ctx.createLinearGradient(0, 0, 0, 300);
      currentGradient.addColorStop(0, 'rgba(255, 45, 141, 0.5)');
      currentGradient.addColorStop(1, 'rgba(139, 46, 255, 0.1)');

      this.instances[canvasId] = new Chart(ctx, {
        type: 'radar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Your Current Level',
              data: currentData,
              backgroundColor: currentGradient,
              borderColor: '#FF2D8D',
              borderWidth: 2,
              pointBackgroundColor: '#FF4FA3',
              pointBorderColor: '#FFF',
              pointHoverBackgroundColor: '#FFF',
              pointHoverBorderColor: '#FF2D8D',
              pointRadius: 4
            },
            {
              label: 'Required Target Level',
              data: requiredData,
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderColor: 'rgba(255, 255, 255, 0.4)',
              borderWidth: 2,
              borderDash: [4, 4],
              pointBackgroundColor: '#A7A7A7',
              pointRadius: 3
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              angleLines: { color: 'rgba(255, 255, 255, 0.08)' },
              grid: { color: 'rgba(255, 255, 255, 0.08)' },
              pointLabels: {
                color: '#E0E0E0',
                font: { size: 11, weight: '600' }
              },
              ticks: {
                backdropColor: 'transparent',
                color: '#777',
                stepSize: 25,
                min: 0,
                max: 100
              }
            }
          },
          plugins: {
            legend: {
              display: true,
              position: 'bottom',
              labels: { color: '#E0E0E0', usePointStyle: true, padding: 15 }
            }
          }
        }
      });
    } catch (e) {
      console.warn('Error rendering radar chart:', e);
    }
  }

  /**
   * 2. Horizontal Skill Comparison Bars
   */
  renderBarChart(canvasId, gapAnalysis) {
    if (!window.Chart) return;
    this.destroy(canvasId);

    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    try {
      const skillsToDisplay = (gapAnalysis || []).slice(0, 7);
      const labels = skillsToDisplay.map(s => s.skillName);
      const currentData = skillsToDisplay.map(s => s.currentLevel);
      const requiredData = skillsToDisplay.map(s => s.requiredLevel);

      const ctx = canvas.getContext('2d');

      this.instances[canvasId] = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Current Skill Level (%)',
              data: currentData,
              backgroundColor: '#FF2D8D',
              borderRadius: 6,
              barThickness: 10
            },
            {
              label: 'Target Requirement (%)',
              data: requiredData,
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              borderRadius: 6,
              barThickness: 10
            }
          ]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              grid: { color: 'rgba(255, 255, 255, 0.05)' },
              ticks: { color: '#888' },
              max: 100
            },
            y: {
              grid: { display: false },
              ticks: { color: '#FFFFFF', font: { weight: '500' } }
            }
          },
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: { color: '#DDD', usePointStyle: true }
            }
          }
        }
      });
    } catch (e) {
      console.warn('Error rendering bar chart:', e);
    }
  }

  /**
   * 3. Career Readiness Doughnut/Gauge
   */
  renderReadinessGauge(canvasId, score) {
    if (!window.Chart) return;
    this.destroy(canvasId);

    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    try {
      const ctx = canvas.getContext('2d');

      const gradient = ctx.createLinearGradient(0, 0, 200, 0);
      gradient.addColorStop(0, '#FF2D8D');
      gradient.addColorStop(1, '#8B2EFF');

      this.instances[canvasId] = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Readiness', 'Gap Remaining'],
          datasets: [
            {
              data: [score, 100 - score],
              backgroundColor: [gradient, 'rgba(255, 255, 255, 0.06)'],
              borderColor: 'transparent',
              hoverOffset: 4
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '78%',
          plugins: {
            legend: { display: false },
            tooltip: { enabled: true }
          }
        }
      });
    } catch (e) {
      console.warn('Error rendering gauge chart:', e);
    }
  }

  /**
   * 4. Progress History Line Chart
   */
  renderProgressChart(canvasId, readinessHistory) {
    if (!window.Chart) return;
    this.destroy(canvasId);

    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    try {
      const history = readinessHistory || [
        { date: 'Week 1', score: 48 },
        { date: 'Week 2', score: 52 },
        { date: 'Week 3', score: 57 },
        { date: 'Week 4', score: 64 }
      ];

      const labels = history.map(h => h.date);
      const data = history.map(h => h.score);

      const ctx = canvas.getContext('2d');

      const fillGradient = ctx.createLinearGradient(0, 0, 0, 200);
      fillGradient.addColorStop(0, 'rgba(255, 45, 141, 0.35)');
      fillGradient.addColorStop(1, 'rgba(255, 45, 141, 0.0)');

      this.instances[canvasId] = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Career Readiness Score (%)',
              data: data,
              fill: true,
              backgroundColor: fillGradient,
              borderColor: '#FF2D8D',
              borderWidth: 3,
              tension: 0.35,
              pointBackgroundColor: '#FF4FA3',
              pointBorderColor: '#FFFFFF',
              pointRadius: 5,
              pointHoverRadius: 7
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              grid: { color: 'rgba(255, 255, 255, 0.05)' },
              ticks: { color: '#888' }
            },
            y: {
              grid: { color: 'rgba(255, 255, 255, 0.05)' },
              ticks: { color: '#888' },
              min: 0,
              max: 100
            }
          },
          plugins: {
            legend: { display: false }
          }
        }
      });
    } catch (e) {
      console.warn('Error rendering progress chart:', e);
    }
  }
}

window.appCharts = new SkillGapCharts();
