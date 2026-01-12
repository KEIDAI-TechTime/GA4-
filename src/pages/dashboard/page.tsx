import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import SiteOverview from './components/SiteOverview';
import NotificationAlert from './components/NotificationAlert';
import PriorityAction from './components/PriorityAction';
import SummaryCards from './components/SummaryCards';
import AccessTrendChart from './components/AccessTrendChart';
import PageRanking from './components/PageRanking';
import KeywordRanking from './components/KeywordRanking';
import TrafficSources from './components/TrafficSources';
import DeviceBreakdown from './components/DeviceBreakdown';
import BenchmarkComparison from './components/BenchmarkComparison';
import ImprovementSuggestions from './components/ImprovementSuggestions';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

export default function Dashboard() {
  const [dateRange, setDateRange] = useState('30days');
  const [lastUpdated, setLastUpdated] = useState<Date>(() => new Date());
  const [refreshKey, setRefreshKey] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    // Increment key to force re-render of all components
    setRefreshKey(prev => prev + 1);
    setLastUpdated(new Date());
    // Simulate refresh completion
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      <Header
        dateRange={dateRange}
        setDateRange={setDateRange}
        lastUpdated={lastUpdated}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />
      
      <motion.main
        key={refreshKey}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <SiteOverview dateRange={dateRange} />
        </motion.div>

        <motion.div variants={itemVariants}>
          <NotificationAlert dateRange={dateRange} />
        </motion.div>

        <motion.div variants={itemVariants}>
          <PriorityAction dateRange={dateRange} />
        </motion.div>

        <motion.div variants={itemVariants}>
          <SummaryCards dateRange={dateRange} />
        </motion.div>

        <motion.div variants={itemVariants}>
          <AccessTrendChart dateRange={dateRange} />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          variants={itemVariants}
        >
          <PageRanking dateRange={dateRange} />
          <KeywordRanking />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          variants={itemVariants}
        >
          <TrafficSources dateRange={dateRange} />
          <DeviceBreakdown dateRange={dateRange} />
        </motion.div>

        <motion.div variants={itemVariants}>
          <BenchmarkComparison dateRange={dateRange} />
        </motion.div>

        <motion.div variants={itemVariants}>
          <ImprovementSuggestions dateRange={dateRange} />
        </motion.div>
      </motion.main>
    </div>
  );
}
