
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight } from "lucide-react";

const Blog = () => {
  const blogPosts = [
    {
      title: "The Future of Credit Scoring: How AI is Revolutionizing Financial Inclusion",
      excerpt: "Explore how artificial intelligence and machine learning are transforming the way we assess creditworthiness, making financial services accessible to previously underserved populations.",
      author: "Dr. Sarah Chen",
      date: "December 10, 2024",
      category: "AI & Technology",
      readTime: "8 min read"
    },
    {
      title: "Breaking Down Barriers: Alternative Data Sources for Credit Assessment",
      excerpt: "Discover the innovative data points that CreditAI analyzes to create comprehensive credit profiles for individuals without traditional credit history.",
      author: "Michael Rodriguez",
      date: "December 8, 2024",
      category: "Financial Inclusion",
      readTime: "6 min read"
    },
    {
      title: "Success Stories: How CreditAI Helped 10,000 People Access Credit",
      excerpt: "Real stories from users who have benefited from our AI-powered credit scoring platform, showcasing the transformative power of inclusive finance.",
      author: "Emma Thompson",
      date: "December 5, 2024",
      category: "Success Stories",
      readTime: "5 min read"
    },
    {
      title: "Understanding Your Credit Score: A Complete Guide",
      excerpt: "Everything you need to know about credit scores, how they're calculated, and steps you can take to improve your creditworthiness.",
      author: "James Park",
      date: "December 3, 2024",
      category: "Education",
      readTime: "10 min read"
    },
    {
      title: "The Global Credit Gap: Why Traditional Scoring Falls Short",
      excerpt: "An in-depth analysis of the worldwide credit accessibility crisis and how alternative scoring methods can bridge the gap.",
      author: "Dr. Priya Sharma",
      date: "November 30, 2024",
      category: "Research",
      readTime: "12 min read"
    },
    {
      title: "Mobile-First Financial Services: The Key to Emerging Market Success",
      excerpt: "How mobile technology is enabling financial inclusion in developing economies and the role of smartphone data in credit assessment.",
      author: "Alex Kumar",
      date: "November 28, 2024",
      category: "Mobile Finance",
      readTime: "7 min read"
    }
  ];

  const categories = ["All", "AI & Technology", "Financial Inclusion", "Success Stories", "Education", "Research", "Mobile Finance"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50">
      <Navbar />
      
      <div className="pt-20 pb-16 px-4">
        <div className="container mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent mb-6">
              CreditAI Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Insights, stories, and updates from the world of AI-powered financial inclusion. 
              Stay informed about the latest trends and developments in alternative credit scoring.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category, index) => (
              <Badge 
                key={index} 
                className={`cursor-pointer px-4 py-2 ${
                  index === 0 
                    ? 'bg-orange-500 text-white hover:bg-orange-600' 
                    : 'bg-white text-gray-700 hover:bg-orange-50'
                }`}
              >
                {category}
              </Badge>
            ))}
          </div>

          {/* Featured Post */}
          <Card className="mb-12 overflow-hidden hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-r from-orange-500 to-blue-600 p-1">
              <div className="bg-white p-8">
                <Badge className="mb-4 bg-orange-100 text-orange-800">Featured</Badge>
                <h2 className="text-3xl font-bold mb-4 text-gray-900">
                  {blogPosts[0].title}
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  {blogPosts[0].excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{blogPosts[0].author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{blogPosts[0].date}</span>
                    </div>
                    <span>{blogPosts[0].readTime}</span>
                  </div>
                  <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Badge className="w-fit mb-2 bg-blue-100 text-blue-800">
                    {post.category}
                  </Badge>
                  <CardTitle className="text-xl line-clamp-2">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <span>{post.readTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      <span>{post.date}</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="mt-16 bg-gradient-to-r from-orange-500 to-blue-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-xl mb-6 opacity-90">
              Subscribe to our newsletter for the latest insights on AI-powered financial inclusion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-2 rounded text-gray-900"
              />
              <Button className="bg-white text-orange-600 hover:bg-gray-100">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
