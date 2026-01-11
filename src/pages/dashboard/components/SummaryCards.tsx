import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut'
    }
  }
};

export default function SummaryCards() {
  const cards = [
    {
      title: 'PV（ページビュー）',
      value: '12,458',
      change: '+15.3%',
      isPositive: true,
      icon: 'ri-eye-line',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'ユーザー数',
      value: '3,842',
      change: '+8.7%',
      isPositive: true,
      icon: 'ri-user-line',
      color: 'from-teal-500 to-teal-600'
    },
    {
      title: 'CV件数',
      value: '127',
      change: '+22.1%',
      isPositive: true,
      icon: 'ri-check-double-line',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'CV率',
      value: '3.3%',
      change: '+0.5pt',
      isPositive: true,
      icon: 'ri-line-chart-line',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center`}>
              <i className={`${card.icon} text-white text-xl`}></i>
            </div>
            <span className={`text-sm font-bold ${card.isPositive ? 'text-teal-600' : 'text-red-600'}`}>
              {card.change}
            </span>
          </div>
          <h3 className="text-slate-600 text-sm font-medium mb-1">{card.title}</h3>
          <motion.p 
            className="text-3xl font-bold text-slate-900"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 + 0.2, duration: 0.5, ease: 'easeOut' }}
          >
            {card.value}
          </motion.p>
        </motion.div>
      ))}
    </div>
  );
}
