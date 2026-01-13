import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { user, loading, signInWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && user) {
      navigate('/property-selection');
    }
  }, [user, loading, navigate]);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await signInWithGoogle();
      navigate('/property-selection');
    } catch (err: unknown) {
      console.error('Login error:', err);
      if (err && typeof err === 'object' && 'code' in err) {
        const firebaseError = err as { code: string };
        if (firebaseError.code === 'auth/popup-closed-by-user') {
          setError('ログインがキャンセルされました');
        } else if (firebaseError.code === 'auth/popup-blocked') {
          setError('ポップアップがブロックされました。ポップアップを許可してください');
        } else {
          setError('ログインに失敗しました。もう一度お試しください');
        }
      } else {
        setError('ログインに失敗しました。もう一度お試しください');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <i className="ri-loader-4-line text-4xl text-teal-600"></i>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 flex items-center justify-center p-4">
      <motion.div
        className="max-w-md w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <i className="ri-line-chart-line text-white text-3xl"></i>
          </motion.div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">SEO Dashboard</h1>
          <p className="text-slate-600">Google アカウントでログイン</p>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ y: -4 }}
        >
          {error && (
            <motion.div
              className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-2">
                <i className="ri-error-warning-line text-lg"></i>
                <span>{error}</span>
              </div>
            </motion.div>
          )}

          <motion.button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full bg-white border-2 border-slate-200 text-slate-700 px-6 py-4 rounded-xl font-bold text-base hover:border-teal-500 hover:bg-teal-50 transition-all whitespace-nowrap cursor-pointer flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <i className="ri-loader-4-line text-2xl"></i>
              </motion.div>
            ) : (
              <>
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Google でログイン</span>
              </>
            )}
          </motion.button>

          <motion.div
            className="mt-6 pt-6 border-t border-slate-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-sm text-slate-500 text-center">
              ログインすることで、
              <a href="#" className="text-teal-600 hover:underline">利用規約</a>
              と
              <a href="#" className="text-teal-600 hover:underline">プライバシーポリシー</a>
              に同意したものとみなされます。
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-sm text-slate-600">
            GA4とSearch Consoleのデータを自動分析し、<br />
            具体的な改善提案を提供します
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
