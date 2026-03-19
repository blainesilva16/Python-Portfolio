import Navbar from '@/components/Navbar';
import WaveBackground from '@/components/WaveBackground';
import MiniChat from '@/components/MiniChat';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Code, 
  Database, 
  Brain, 
  Globe, 
  Mail, 
  Github, 
  Linkedin,
  Calendar,
  Briefcase
} from 'lucide-react';

import { faCode, faDatabase, faBrain, faGlobe, faMailBulk, faCalendar, faBriefcase } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const skills = [
  { name: 'Python', icon: faCode, level: 95 },
  { name: 'Flask/Django', icon: faGlobe, level: 90 },
  { name: 'Machine Learning', icon: faBrain, level: 85 },
  { name: 'SQL/NoSQL', icon: faDatabase, level: 88 },
];

// const experiences = [
//   {
//     title: 'Senior Python Developer',
//     company: 'Tech Company',
//     period: '2022 - Present',
//     description: 'Leading backend development and AI integration projects.',
//   },
//   {
//     title: 'Python Developer',
//     company: 'Startup Inc',
//     period: '2020 - 2022',
//     description: 'Built scalable APIs and automation tools.',
//   },
//   {
//     title: 'Junior Developer',
//     company: 'Software Co',
//     period: '2018 - 2020',
//     description: 'Started Python journey, focusing on web development.',
//   },
// ];

const experiences = [
  {
    title: 'Senior Python Developer',
    company: 'Oh, what could I do in your company?',
    period: '2027 - Present',
    description: 'Leading backend development and AI integration projects.',
  },
  {
    title: 'Python Developer',
    company: 'I could get promoted in your company as well!',
    period: '2026 - 2027',
    description: 'Built scalable APIs and automation tools.',
  },
  {
    title: 'Junior Developer',
    company: 'It could be your company!',
    period: '2025 - 2026',
    description: 'Started Python journey, focusing on web development/machine learning/data science/etc projects.',
  },
];

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <WaveBackground />
      <Navbar />
      <MiniChat />
      
      <main className="relative z-10 pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-12 text-center animate-fade-in">
            {t('about.title')}
          </h1>

          {/* Bio Section */}
          <section className="glass-card p-8 mb-8 animate-fade-in">
            <h2 className="text-2xl font-semibold text-secondary mb-4 flex items-center gap-2">
              <FontAwesomeIcon icon={faCode}  className="w-6 h-6" />
              {t('about.bio')}
            </h2>
            <p className="text-foreground/80 text-lg leading-relaxed">
              {t('about.bioText')}
            </p>
            <div className="flex gap-8 mt-6">
              <div className="text-center">
                <span className="text-4xl font-bold text-primary">1+</span>
                <p className="text-muted-foreground text-sm">{t('about.yearsExp')}</p>
              </div>
              <div className="text-center">
                <span className="text-4xl font-bold text-primary">10+</span>
                <p className="text-muted-foreground text-sm">{t('about.projectsCompleted')}</p>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section className="glass-card p-8 mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-2xl font-semibold text-secondary mb-6 flex items-center gap-2">
              <FontAwesomeIcon icon={faBrain}  className="w-6 h-6" />
              {t('about.skills')}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {skills.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon icon={skill.icon} className="w-5 h-5 text-secondary" />
                      <span className="font-medium text-foreground">{skill.name}</span>
                    </div>
                    <span className="text-muted-foreground text-sm">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Experience Timeline */}
          <section className="glass-card p-8 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-2xl font-semibold text-secondary mb-6 flex items-center gap-2">
              <FontAwesomeIcon icon={faBriefcase}  className="w-6 h-6" />
              {t('about.experience')}
            </h2>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
              {experiences.map((exp, index) => (
                <div key={index} className="relative pl-12 pb-8 last:pb-0">
                  <div className="absolute left-2 w-5 h-5 rounded-full bg-secondary border-4 border-background" />
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                    <FontAwesomeIcon icon={faCalendar}  className="w-4 h-4" />
                    {exp.period}
                  </div>
                  <h3 className="text-lg font-semibold text-primary">{exp.title}</h3>
                  <p className="text-secondary text-sm mb-1">{exp.company}</p>
                  <p className="text-foreground/70">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section className="glass-card p-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-2xl font-semibold text-secondary mb-6 flex items-center gap-2">
              <FontAwesomeIcon icon={faMailBulk}  className="w-6 h-6" />
              {t('about.contact')}
            </h2>
            <p className="text-foreground/80 mb-6">{t('about.getInTouch')}</p>
            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:blainesilva16@gmail.com"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-foreground"
              >
                <FontAwesomeIcon icon={faMailBulk} className="w-5 h-5 text-secondary" />
                blainesilva16@gmail.com
              </a>
              <a
                href="https://github.com/blainesilva16"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-foreground"
              >
                <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/blaine-silva-0ab04a178"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-foreground"
              >
                <FontAwesomeIcon icon={faLinkedin} className="w-5 h-5 text-[#0077B5]" />
                LinkedIn
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default About;
