
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Book, BookOpen, FileText, Grid, List } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { MarkdownRenderer } from '@/components/MarkdownRenderer';

interface Blog {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  path: string;
  tags: string[];
  coverImage: string;
}

interface BlogsData {
  blogs: Blog[];
}

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'grid' | 'list'>(() => {
    // Get view preference from localStorage or default to grid
    return (localStorage.getItem('blogViewPreference') as 'grid' | 'list') || 'grid';
  });
  const [activeTag, setActiveTag] = useState<string | null>(() => {
    // Get active tag from localStorage or default to null
    return localStorage.getItem('blogActiveTag');
  });
  
  // Persist view preference to localStorage
  useEffect(() => {
    localStorage.setItem('blogViewPreference', view);
  }, [view]);
  
  // Persist active tag to localStorage
  useEffect(() => {
    if (activeTag) {
      localStorage.setItem('blogActiveTag', activeTag);
    } else {
      localStorage.removeItem('blogActiveTag');
    }
  }, [activeTag]);
  
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/blogs.json');
        const data: BlogsData = await response.json();
        setBlogs(data.blogs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setLoading(false);
      }
    };
    
    fetchBlogs();
  }, []);
  
  const fetchBlogContent = async (blog: Blog) => {
    try {
      const response = await fetch(blog.path);
      const text = await response.text();
      setContent(text);
      setSelectedBlog(blog);
    } catch (error) {
      console.error('Error fetching blog content:', error);
    }
  };
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const getAllTags = () => {
    const allTags = blogs.flatMap(blog => blog.tags);
    return Array.from(new Set(allTags));
  };
  
  const filteredBlogs = activeTag
    ? blogs.filter(blog => blog.tags.includes(activeTag))
    : blogs;

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <Link to="/" className="fixed top-4 left-4 text-white/60 hover:text-white transition-colors z-50">
        ← Back
      </Link>

      <div className="max-w-6xl mx-auto pt-16">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              Blogs
            </span>
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto">
            Explore my thoughts, projects, and tutorials on various topics. From gaming to coding, there's something for everyone.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : selectedBlog ? (
          <div className="relative glass-morphism p-6 rounded-xl backdrop-blur-sm border border-white/10 animate-fade-in">
            <button 
              onClick={() => setSelectedBlog(null)}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
            >
              ← Back to blogs
            </button>
            <div className="mb-6">
              <div 
                className="h-64 w-full rounded-lg mb-6 bg-cover bg-center" 
                style={{ backgroundImage: `url(${selectedBlog.coverImage})` }}
              />
              <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                {selectedBlog.title}
              </h1>
              <div className="text-white/60 mb-4">
                {formatDate(selectedBlog.date)}
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedBlog.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="text-xs px-3 py-1 rounded-full bg-purple-900/30 text-purple-300 border border-purple-800/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <MarkdownRenderer content={content} />
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <Tabs defaultValue={activeTag || "all"} className="w-auto">
                <TabsList className="bg-black/50 border border-white/10">
                  <TabsTrigger 
                    value="all" 
                    onClick={() => setActiveTag(null)}
                    className="data-[state=active]:bg-purple-900/50"
                  >
                    All
                  </TabsTrigger>
                  {getAllTags().map(tag => (
                    <TabsTrigger 
                      key={tag} 
                      value={tag}
                      onClick={() => setActiveTag(tag)}
                      className="data-[state=active]:bg-purple-900/50"
                    >
                      {tag}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setView('grid')}
                  className={`p-2 rounded ${view === 'grid' ? 'bg-purple-900/50 text-white' : 'text-white/60'}`}
                  title="Grid view"
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`p-2 rounded ${view === 'list' ? 'bg-purple-900/50 text-white' : 'text-white/60'}`}
                  title="List view"
                >
                  <List size={18} />
                </button>
              </div>
            </div>
            
            {view === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBlogs.map(blog => (
                  <Card 
                    key={blog.id}
                    className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-white/10 hover:from-purple-900/30 hover:to-pink-900/30 transition-all duration-300 backdrop-blur-sm overflow-hidden hover-glow"
                  >
                    <div 
                      className="h-48 w-full bg-cover bg-center" 
                      style={{ backgroundImage: `url(${blog.coverImage})` }}
                    />
                    <CardHeader>
                      <CardTitle className="text-xl text-white">{blog.title}</CardTitle>
                      <CardDescription className="text-white/60">
                        {formatDate(blog.date)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white/80">{blog.excerpt}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="flex flex-wrap gap-2">
                        {blog.tags.slice(0, 2).map(tag => (
                          <span 
                            key={tag} 
                            className="text-xs px-2 py-1 rounded-full bg-purple-900/30 text-purple-300 border border-purple-800/50"
                          >
                            {tag}
                          </span>
                        ))}
                        {blog.tags.length > 2 && (
                          <span className="text-xs px-2 py-1 rounded-full bg-gray-800/50 text-gray-400">
                            +{blog.tags.length - 2}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => fetchBlogContent(blog)}
                        className="relative group text-sm font-medium"
                      >
                        <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300">
                          Read more
                        </span>
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
                      </button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredBlogs.map(blog => (
                  <div 
                    key={blog.id}
                    className="flex flex-col md:flex-row gap-4 p-4 bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-white/10 hover:from-purple-900/30 hover:to-pink-900/30 transition-all duration-300 backdrop-blur-sm rounded-lg overflow-hidden hover-glow"
                  >
                    <div 
                      className="h-32 md:w-48 flex-shrink-0 bg-cover bg-center rounded-md" 
                      style={{ backgroundImage: `url(${blog.coverImage})` }}
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1">{blog.title}</h3>
                      <p className="text-white/60 text-sm mb-2">
                        {formatDate(blog.date)}
                      </p>
                      <p className="text-white/80 mb-3">{blog.excerpt}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex flex-wrap gap-2">
                          {blog.tags.map(tag => (
                            <span 
                              key={tag} 
                              className="text-xs px-2 py-1 rounded-full bg-purple-900/30 text-purple-300 border border-purple-800/50"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <button
                          onClick={() => fetchBlogContent(blog)}
                          className="relative group text-sm font-medium"
                        >
                          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300">
                            Read more
                          </span>
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </>
        )}
      </div>
    </div>
  );
};

export default Blogs;
