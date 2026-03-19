import { Languages } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useLanguage, Language } from '@/contexts/LanguageContext';

const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'pt-BR', label: 'Português (BR)', flag: '🇧🇷' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
];

const LanguageSelector = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <button className="p-2 rounded-lg transition-all duration-200 text-foreground/70 hover:text-foreground hover:bg-muted/50">
              <Languages className="w-5 h-5" />
            </button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t('nav.language')}</p>
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="end" className="bg-card border-border">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`cursor-pointer ${language === lang.code ? 'bg-muted' : ''}`}
          >
            <span className="mr-2">{lang.flag}</span>
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
