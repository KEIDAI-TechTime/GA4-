import { motion } from 'framer-motion';

const pathVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 1.5,
      ease: 'easeInOut'
    }
  }
};

export default function AccessTrendChart() {
  const data = [
    { date: '1/1', pv: 650, uu: 420 },
    { date: '1/3', pv: 720, uu: 480 },
    { date: '1/5', pv: 680, uu: 450 },
    { date: '1/7', pv: 890, uu: 580 },
    { date: '1/9', pv: 920, uu: 610 },
    { date: '1/11', pv: 850, uu: 560 },
    { date: '1/13', pv: 780, uu: 520 },
    { date: '1/15', pv: 950, uu: 640 },
    { date: '1/17', pv: 1020, uu: 680 },
    { date: '1/19', pv: 980, uu: 650 },
    { date: '1/21', pv: 870, uu: 590 },
    { date: '1/23', pv: 920, uu: 620 },
    { date: '1/25', pv: 1050, uu: 710 },
    { date: '1/27', pv: 1100, uu: 740 },
    { date: '1/29', pv: 980, uu: 660 },
    { date: '1/31', pv: 890, uu: 600 },
  ];

  const maxValue = Math.max(...data.map(d => d.pv));
  const chartHeight = 240;

  return (
    <motion.div 
      className="bg-white rounded-xl p-6 shadow-sm border border-slate-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-slate-900">アクセス推移</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-teal-500"></div>
            <span className="text-sm text-slate-600">PV</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-sm text-slate-600">UU</span>
          </div>
        </div>
      </div>

      <div className="relative h-64">
        <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
          <defs>
            <linearGradient id="pvGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgb(20, 184, 166)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="rgb(20, 184, 166)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="uuGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 50, 100, 150, 200].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="800"
              y2={y}
              stroke="#e2e8f0"
              strokeWidth="1"
            />
          ))}

          {/* PV Area */}
          <motion.path
            d="M 0 120 L 26.67 115 L 53.33 110 L 80 105 L 106.67 100 L 133.33 95 L 160 90 L 186.67 85 L 213.33 80 L 240 75 L 266.67 70 L 293.33 75 L 320 80 L 346.67 85 L 373.33 90 L 400 85 L 426.67 80 L 453.33 75 L 480 70 L 506.67 65 L 533.33 60 L 560 55 L 586.67 50 L 613.33 45 L 640 40 L 666.67 35 L 693.33 30 L 720 25 L 746.67 20 L 773.33 15 L 800 10 L 800 200 L 0 200 Z"
            fill="url(#pvGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />

          {/* PV Line */}
          <motion.path
            d="M 0 120 L 26.67 115 L 53.33 110 L 80 105 L 106.67 100 L 133.33 95 L 160 90 L 186.67 85 L 213.33 80 L 240 75 L 266.67 70 L 293.33 75 L 320 80 L 346.67 85 L 373.33 90 L 400 85 L 426.67 80 L 453.33 75 L 480 70 L 506.67 65 L 533.33 60 L 560 55 L 586.67 50 L 613.33 45 L 640 40 L 666.67 35 L 693.33 30 L 720 25 L 746.67 20 L 773.33 15 L 800 10"
            fill="none"
            stroke="rgb(20, 184, 166)"
            strokeWidth="3"
            variants={pathVariants}
            initial="hidden"
            animate="visible"
          />

          {/* UU Area */}
          <motion.path
            d="M 0 140 L 26.67 138 L 53.33 136 L 80 134 L 106.67 132 L 133.33 130 L 160 128 L 186.67 126 L 213.33 124 L 240 122 L 266.67 120 L 293.33 122 L 320 124 L 346.67 126 L 373.33 128 L 400 126 L 426.67 124 L 453.33 122 L 480 120 L 506.67 118 L 533.33 116 L 560 114 L 586.67 112 L 613.33 110 L 640 108 L 666.67 106 L 693.33 104 L 720 102 L 746.67 100 L 773.33 98 L 800 96 L 800 200 L 0 200 Z"
            fill="url(#uuGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />

          {/* UU Line */}
          <motion.path
            d="M 0 140 L 26.67 138 L 53.33 136 L 80 134 L 106.67 132 L 133.33 130 L 160 128 L 186.67 126 L 213.33 124 L 240 122 L 266.67 120 L 293.33 122 L 320 124 L 346.67 126 L 373.33 128 L 400 126 L 426.67 124 L 453.33 122 L 480 120 L 506.67 118 L 533.33 116 L 560 114 L 586.67 112 L 613.33 110 L 640 108 L 666.67 106 L 693.33 104 L 720 102 L 746.67 100 L 773.33 98 L 800 96"
            fill="none"
            stroke="rgb(59, 130, 246)"
            strokeWidth="3"
            variants={pathVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          />
        </svg>

        {/* X-axis labels */}
        <div className="flex justify-between mt-2 text-xs text-slate-500">
          <span>30日前</span>
          <span>20日前</span>
          <span>10日前</span>
          <span>今日</span>
        </div>
      </div>
    </motion.div>
  );
}
