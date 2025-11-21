import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate email
    if (!email.trim()) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      // Submit to Formspree for newsletter
      const response = await fetch('https://formspree.io/f/xnnwgnkd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          _subject: 'New Newsletter Subscriber',
          message: `New subscriber: ${email}`,
          _captcha: false,
        }),
      });

      if (response.ok) {
        toast.success('Successfully subscribed to newsletter! Check your email.');
        setEmail('');
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || 'Failed to subscribe. Please try again.');
      }
    } catch (error) {
      console.error('Error subscribing:', error);
      toast.error('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 md:py-20 relative z-10 px-4 md:px-6">
      <div className="container">
        <div className="max-w-2xl mx-auto">
          <h2 className="section-title mb-8 md:mb-12">Stay Updated</h2>
          <p className="text-center text-base md:text-lg text-muted-foreground mb-8">
            Subscribe to my newsletter for the latest insights on Python automation, security research, and AI-powered solutions.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="border-dashed flex-grow text-sm md:text-base"
            />
            <Button
              type="submit"
              disabled={loading}
              className="btn-primary whitespace-nowrap text-sm md:text-base"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Subscribing...
                </>
              ) : (
                'Subscribe'
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
