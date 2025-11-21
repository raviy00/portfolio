import { useLanguage } from '@/contexts/LanguageContext';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-4 px-4 py-2 border border-dashed border-border rounded">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">Language:</span>
      <RadioGroup value={language} onValueChange={(value) => setLanguage(value as 'en' | 'de')} className="flex gap-4">
        <div className="flex items-center gap-2">
          <RadioGroupItem value="en" id="lang-en" />
          <label htmlFor="lang-en" className="text-sm cursor-pointer">
            English
          </label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="de" id="lang-de" />
          <label htmlFor="lang-de" className="text-sm cursor-pointer">
            Deutsch
          </label>
        </div>
      </RadioGroup>
    </div>
  );
}
