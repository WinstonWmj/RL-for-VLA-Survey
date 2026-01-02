import { useState } from 'react';
import { motion } from 'framer-motion';
import { papers, stats } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';
import { ExternalLink, Github, FileText, TrendingUp, Layers, Activity } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* Hero Section */}
      <header className="relative overflow-hidden border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container py-16 md:py-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <div className="mb-4 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary">
              <Activity className="mr-2 h-3.5 w-3.5" />
              <span>Research Dashboard 2026</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
              Reinforcement Learning for <br/>
              <span className="text-primary">Vision-Language-Action</span> Models
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
              A comprehensive survey and interactive dashboard exploring the convergence of RL and VLA models for embodied intelligence.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="gap-2" onClick={() => window.open('https://github.com/WinstonWmj/RL-for-VLA-Survey', '_blank')}>
                <Github className="h-4 w-4" />
                View on GitHub
              </Button>
              <Button size="lg" variant="outline" className="gap-2" onClick={() => document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' })}>
                <TrendingUp className="h-4 w-4" />
                Explore Data
              </Button>
            </div>
          </motion.div>
        </div>
        
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 -z-10 h-full w-1/3 bg-gradient-to-b from-primary/10 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 -z-10 h-1/2 w-1/3 bg-gradient-to-t from-secondary/20 to-transparent blur-3xl" />
      </header>

      <main className="container py-12" id="dashboard">
        <Tabs defaultValue="overview" className="space-y-8" onValueChange={setActiveTab}>
          <div className="flex items-center justify-between">
            <TabsList className="bg-muted/50 p-1">
              <TabsTrigger value="overview" className="gap-2">
                <Layers className="h-4 w-4" /> Overview
              </TabsTrigger>
              <TabsTrigger value="papers" className="gap-2">
                <FileText className="h-4 w-4" /> Papers
              </TabsTrigger>
              <TabsTrigger value="analytics" className="gap-2">
                <TrendingUp className="h-4 w-4" /> Analytics
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatsCard title="Total Papers" value={stats.totalPapers} icon={<FileText className="h-4 w-4 text-primary" />} description="+12 this month" />
              <StatsCard title="Active Researchers" value="150+" icon={<Activity className="h-4 w-4 text-chart-2" />} description="Across 20+ institutions" />
              <StatsCard title="Key Paradigms" value="3" icon={<Layers className="h-4 w-4 text-chart-3" />} description="Offline, Online, Test-time" />
              <StatsCard title="GitHub Stars" value="380+" icon={<Github className="h-4 w-4 text-chart-4" />} description="On Awesome-RL-VLA" />
            </div>

            <div className="grid gap-8 md:grid-cols-7">
              <Card className="md:col-span-4 glass-card">
                <CardHeader>
                  <CardTitle>Research Trend</CardTitle>
                  <CardDescription>Monthly publication volume in RL for VLA</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={stats.trends}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                        <XAxis 
                          dataKey="month" 
                          stroke="var(--muted-foreground)" 
                          fontSize={12} 
                          tickLine={false} 
                          axisLine={false}
                          tickFormatter={(value) => value.split('-')[1]}
                        />
                        <YAxis 
                          stroke="var(--muted-foreground)" 
                          fontSize={12} 
                          tickLine={false} 
                          axisLine={false} 
                        />
                        <Tooltip 
                          contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: 'var(--radius)' }}
                          itemStyle={{ color: 'var(--foreground)' }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="count" 
                          stroke="var(--primary)" 
                          strokeWidth={3} 
                          dot={{ r: 4, fill: 'var(--background)', strokeWidth: 2 }}
                          activeDot={{ r: 6 }} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-3 glass-card">
                <CardHeader>
                  <CardTitle>Source Distribution</CardTitle>
                  <CardDescription>Where research is being published</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={stats.platforms} layout="vertical" margin={{ left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={true} vertical={false} />
                        <XAxis type="number" hide />
                        <YAxis 
                          dataKey="name" 
                          type="category" 
                          stroke="var(--foreground)" 
                          fontSize={12} 
                          tickLine={false} 
                          axisLine={false} 
                          width={80}
                        />
                        <Tooltip 
                          cursor={{ fill: 'var(--muted)' }}
                          contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: 'var(--radius)' }}
                        />
                        <Bar dataKey="percentage" fill="var(--primary)" radius={[0, 4, 4, 0]} barSize={32} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Papers Tab */}
          <TabsContent value="papers" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {papers.map((paper, index) => (
                <motion.div
                  key={paper.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="h-full flex flex-col hover:border-primary/50 transition-colors duration-300 glass-card group">
                    <CardHeader>
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <Badge variant={
                          paper.type === 'Offline RL' ? 'default' : 
                          paper.type === 'Online RL' ? 'secondary' : 'outline'
                        } className="mb-2">
                          {paper.type}
                        </Badge>
                        <span className="text-xs font-mono text-muted-foreground">{paper.date}</span>
                      </div>
                      <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                        {paper.title}
                      </CardTitle>
                      <CardDescription className="font-medium text-foreground/80">
                        {paper.authors.join(', ')} • {paper.venue}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {paper.summary}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {paper.tags.map(tag => (
                          <span key={tag} className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground font-mono">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                    <div className="p-6 pt-0 mt-auto">
                      <Button variant="outline" className="w-full gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-all" onClick={() => window.open(paper.url, '_blank')}>
                        Read Paper <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Detailed Analytics</CardTitle>
                <CardDescription>Deep dive into research metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-[400px] text-muted-foreground">
                  <div className="text-center">
                    <Activity className="h-12 w-12 mx-auto mb-4 opacity-20" />
                    <p>Advanced analytics visualization coming soon.</p>
                    <p className="text-sm">Including citation networks, keyword clouds, and author collaboration graphs.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t border-border/40 bg-muted/20 py-12 mt-12">
        <div className="container text-center text-muted-foreground">
          <p className="mb-4">
            Built with <span className="text-primary">Manus</span> • 2026
          </p>
          <div className="flex justify-center gap-6 text-sm">
            <a href="https://github.com/WinstonWmj/RL-for-VLA-Survey" className="hover:text-foreground transition-colors">GitHub Repository</a>
            <a href="#" className="hover:text-foreground transition-colors">Chrome Extension</a>
            <a href="#" className="hover:text-foreground transition-colors">About</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function StatsCard({ title, value, icon, description }: { title: string, value: string | number, icon: React.ReactNode, description: string }) {
  return (
    <Card className="glass-card overflow-hidden relative">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold font-mono">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">
          {description}
        </p>
      </CardContent>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-transparent opacity-20" />
    </Card>
  );
}
