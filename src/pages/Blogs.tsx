import { motion } from 'framer-motion';
import { Clock, User, Calendar, ArrowRight, Search, Tag } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

const Blogs = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Web Development', 'Mobile Apps', 'Data Science', 'AI/ML', 'DevOps', 'Career Tips'];

  const blogPosts = [
    {
      id: 1,
      title: "The Complete Guide to React 19: What's New and How to Upgrade",
      description: "Explore the latest features in React 19 including concurrent rendering, automatic batching, and the new Suspense boundaries.",
      author: "Sarah Johnson",
      date: "2024-03-15",
      readTime: "8 min read",
      category: "Web Development",
      tags: ["React", "JavaScript", "Frontend"],
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
      featured: true
    },
    {
      id: 2,
      title: "Building Your First Full-Stack Application: A Step-by-Step Guide",
      description: "Learn how to create a complete web application from frontend to backend using modern technologies.",
      author: "Michael Chen",
      date: "2024-03-12",
      readTime: "12 min read",
      category: "Web Development",
      tags: ["Full-Stack", "Node.js", "React"],
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop"
    },
    {
      id: 3,
      title: "Machine Learning for Beginners: Understanding the Fundamentals",
      description: "Demystify machine learning concepts and learn how to get started with your first ML project.",
      author: "Emily Rodriguez",
      date: "2024-03-10",
      readTime: "10 min read",
      category: "AI/ML",
      tags: ["Machine Learning", "Python", "Data Science"],
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop"
    },
    {
      id: 4,
      title: "Career Transition: From Bootcamp to Senior Developer",
      description: "Real stories and practical advice from developers who successfully transitioned into tech careers.",
      author: "David Park",
      date: "2024-03-08",
      readTime: "6 min read",
      category: "Career Tips",
      tags: ["Career", "Bootcamp", "Growth"],
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop"
    },
    {
      id: 5,
      title: "Docker and Kubernetes: A DevOps Essential Guide",
      description: "Master containerization and orchestration with Docker and Kubernetes for modern application deployment.",
      author: "Alex Thompson",
      date: "2024-03-05",
      readTime: "15 min read",
      category: "DevOps",
      tags: ["Docker", "Kubernetes", "DevOps"],
      image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400&h=250&fit=crop"
    },
    {
      id: 6,
      title: "Mobile App Development: Native vs Cross-Platform",
      description: "Compare different approaches to mobile development and choose the right strategy for your project.",
      author: "Lisa Wang",
      date: "2024-03-02",
      readTime: "9 min read",
      category: "Mobile Apps",
      tags: ["Mobile", "React Native", "Flutter"],
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop"
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              DEVZeroOne <span className="text-primary">Blog</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Stay updated with the latest trends, tutorials, and insights from the world of programming and technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 px-4 bg-section-bg">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && selectedCategory === 'All' && !searchTerm && (
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-8">Featured Article</h2>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-8">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <Badge variant="secondary">{featuredPost.category}</Badge>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(featuredPost.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {featuredPost.readTime}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{featuredPost.title}</h3>
                    <p className="text-muted-foreground mb-6">{featuredPost.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{featuredPost.author}</span>
                      </div>
                      <Button>
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4" variant="secondary">
                      {post.category}
                    </Badge>
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </div>
                    </div>
                    <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {post.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{post.author}</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-4">
                      {post.tags.map((tag) => (
                        <div key={tag} className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Tag className="h-3 w-3" />
                          {tag}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
            <p className="text-lg mb-8 opacity-90">
              Subscribe to our newsletter and never miss the latest tutorials and insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input
                placeholder="Enter your email"
                className="bg-primary-foreground text-foreground"
              />
              <Button variant="secondary">Subscribe</Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blogs;