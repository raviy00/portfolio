import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Navbar from '@/components/Navbar';
import Enhanced3DBackground from '@/components/Enhanced3DBackground';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  content: string;
}

export default function Blog() {
  const ref = useScrollAnimation();

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: 'Building Scalable Telegram Bots with FastAPI',
      excerpt: 'Learn how to create high-performance Telegram bots using FastAPI and async programming patterns.',
      date: 'November 15, 2024',
      category: 'Tutorial',
      readTime: '8 min read',
      content: `Building scalable Telegram bots requires careful consideration of architecture and performance patterns. In this comprehensive guide, we'll explore how to leverage FastAPI to create bots that can handle thousands of concurrent users.

Key topics covered:
- Setting up FastAPI with Telegram Bot API
- Implementing webhook handlers
- Database integration with async drivers
- Error handling and logging
- Deployment strategies

FastAPI provides excellent async support out of the box, making it ideal for I/O-bound operations like API calls to Telegram servers. By using proper async patterns, you can handle multiple user requests simultaneously without blocking.`,
    },
    {
      id: 2,
      title: 'Security Research: Common Python Automation Pitfalls',
      excerpt: 'Discover the most common security vulnerabilities in Python automation scripts and how to prevent them.',
      date: 'November 10, 2024',
      category: 'Security',
      readTime: '10 min read',
      content: `Security is paramount when developing automation tools. This article explores the most common vulnerabilities found in Python automation scripts and provides practical solutions.

Critical security considerations:
- Input validation and sanitization
- Secure credential management
- API rate limiting and abuse prevention
- SQL injection prevention
- Secure file handling

Many developers overlook security when building automation tools, assuming they're only used internally. However, best practices should always be followed to prevent potential exploits.`,
    },
    {
      id: 3,
      title: 'Getting Started with Machine Learning in Python',
      excerpt: 'An introduction to machine learning concepts and popular Python libraries for data analysis.',
      date: 'November 5, 2024',
      category: 'Machine Learning',
      readTime: '12 min read',
      content: `Machine learning is transforming how we solve complex problems. This beginner-friendly guide introduces fundamental concepts and shows how to get started with popular Python libraries.

Topics include:
- Supervised vs unsupervised learning
- Data preprocessing and feature engineering
- Popular libraries: scikit-learn, pandas, numpy
- Building your first classification model
- Model evaluation and validation

Python's rich ecosystem of machine learning libraries makes it the go-to choice for data scientists and engineers worldwide.`,
    },
  ];

  return (
    <div ref={ref} className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Enhanced 3D Background */}
      <Enhanced3DBackground />

      {/* Navigation */}
      <Navbar activeSection="blog" />

      {/* Header */}
      <div className="py-12 sm:py-16 md:py-24 bg-card/50 px-3 sm:px-4 md:px-6 mt-16 relative z-10">
        <div className="container">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-widest mb-2 sm:mb-4">
            Blog
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
            Technical insights, tutorials, and security research
          </p>
        </div>
      </div>

      {/* Blog Platforms Section */}
      <section className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 md:px-6 bg-card/30">
        <div className="container">
          <h2 className="section-title mb-6 sm:mb-8 md:mb-12">Featured Blog Platforms</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {/* Blogspot */}
            <div className="card-dotted p-4 sm:p-6 flex flex-col items-center justify-center text-center">
              <div className="text-5xl sm:text-6xl mb-4">📝</div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-wider mb-2">
                Ravi's Journal
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground mb-4 flex-grow">
                My personal blog on Blogspot with technical articles and insights
              </p>
              <button
                onClick={() => window.open('https://ravisjournal.blogspot.com/', '_blank')}
                className="btn-primary text-xs sm:text-sm md:text-base w-full"
              >
                Visit Blogspot
              </button>
            </div>

            {/* Medium */}
            <div className="card-dotted p-4 sm:p-6 flex flex-col items-center justify-center text-center">
              <div className="text-5xl sm:text-6xl mb-4">✍️</div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-wider mb-2">
                Medium Profile
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground mb-4 flex-grow">
                Articles and stories published on Medium platform
              </p>
              <button
                onClick={() => window.open('https://medium.com/@npkpathirage', '_blank')}
                className="btn-primary text-xs sm:text-sm md:text-base w-full"
              >
                Visit Medium
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 md:px-6">
        <div className="container">
          <h2 className="section-title mb-6 sm:mb-8 md:mb-12">Featured Articles</h2>
          <div className="space-y-6 sm:space-y-8 md:space-y-12">
            {blogPosts.map((post, idx) => (
              <article
                key={post.id}
                className="scroll-animate card-dotted p-3 sm:p-4 md:p-6"
                style={{ transitionDelay: `${idx * 0.1}s` }}
              >
                <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="inline-block px-2 sm:px-3 py-1 text-xs md:text-sm font-semibold uppercase tracking-wider border border-dashed border-accent text-accent">
                        {post.category}
                      </span>
                      <span className="inline-block px-2 sm:px-3 py-1 text-xs md:text-sm text-muted-foreground">
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-wider mb-3">
                      {post.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm md:text-base text-muted-foreground whitespace-nowrap">
                    {post.date}
                  </p>
                </div>
                
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
                  {post.excerpt}
                </p>

                <div className="border-t border-dashed border-border pt-4">
                  <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                    {post.content.substring(0, 300)}...
                  </p>
                  <button className="mt-4 btn-secondary text-xs sm:text-sm md:text-base">
                    Read Full Article
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
