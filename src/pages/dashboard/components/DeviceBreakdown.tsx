import { useDeviceBreakdown, useSelectedProperty } from '../../../hooks/useGA4';

interface DeviceBreakdownProps {
  dateRange?: string;
}

// デバイス名を日本語に変換し、アイコンと色を割り当て
function getDeviceInfo(device: string): { name: string; icon: string; color: string } {
  const deviceLower = device.toLowerCase();

  if (deviceLower === 'mobile') {
    return { name: 'スマホ', icon: 'ri-smartphone-line', color: 'from-teal-400 to-cyan-500' };
  }
  if (deviceLower === 'desktop') {
    return { name: 'PC', icon: 'ri-computer-line', color: 'from-purple-400 to-pink-500' };
  }
  if (deviceLower === 'tablet') {
    return { name: 'タブレット', icon: 'ri-tablet-line', color: 'from-orange-400 to-red-500' };
  }
  return { name: device || 'その他', icon: 'ri-device-line', color: 'from-slate-400 to-slate-500' };
}

export default function DeviceBreakdown({ dateRange = '30days' }: DeviceBreakdownProps) {
  const { propertyId } = useSelectedProperty();
  const { data, loading, error } = useDeviceBreakdown(propertyId, dateRange);

  // データを整形
  const devices = data.map(item => {
    const info = getDeviceInfo(item.device);
    return {
      name: info.name,
      value: Math.round(item.percentage),
      icon: info.icon,
      color: info.color,
      sessions: item.sessions,
    };
  }).sort((a, b) => b.value - a.value);

  const maxValue = Math.max(...devices.map(d => d.value), 1);

  // スマホ比率のアドバイスを生成
  const mobileDevice = devices.find(d => d.name === 'スマホ');
  const mobileRatio = mobileDevice?.value || 0;

  const getAdvice = () => {
    if (mobileRatio >= 70) {
      return 'スマホ比率が70%を超えています。モバイル最適化を優先しましょう。';
    }
    if (mobileRatio >= 50) {
      return 'スマホ比率が高めです。モバイルでの表示を確認しましょう。';
    }
    return 'PCからのアクセスが多めです。デスクトップ体験も重視しましょう。';
  };

  if (loading) {
    return (
      <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
        <div className="mb-5">
          <h2 className="text-lg font-bold text-white">デバイス</h2>
          <p className="text-sm text-slate-400">デバイス別アクセス</p>
        </div>
        <div className="h-48 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-teal-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
        <div className="mb-5">
          <h2 className="text-lg font-bold text-white">デバイス</h2>
          <p className="text-sm text-slate-400">デバイス別アクセス</p>
        </div>
        <div className="h-48 flex items-center justify-center text-red-400">
          <p>データの取得に失敗しました</p>
        </div>
      </div>
    );
  }

  if (devices.length === 0) {
    return (
      <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
        <div className="mb-5">
          <h2 className="text-lg font-bold text-white">デバイス</h2>
          <p className="text-sm text-slate-400">デバイス別アクセス</p>
        </div>
        <div className="h-48 flex items-center justify-center text-slate-400">
          <p>データがありません</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-white">デバイス</h2>
        <p className="text-sm text-slate-400">デバイス別アクセス</p>
      </div>

      <div className="space-y-5">
        {devices.map((device, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 bg-gradient-to-br ${device.color} rounded-lg flex items-center justify-center shadow-lg`}>
                  <i className={`${device.icon} text-lg text-white`}></i>
                </div>
                <span className="text-sm font-medium text-white">{device.name}</span>
              </div>
              <span className="text-lg font-bold text-white">{device.value}%</span>
            </div>
            <div className="relative w-full bg-white/10 rounded-full h-3">
              <div
                className={`bg-gradient-to-r ${device.color} h-3 rounded-full transition-all duration-500 flex items-center justify-end pr-2`}
                style={{ width: `${(device.value / maxValue) * 100}%` }}
              >
                {device.value > 15 && (
                  <span className="text-xs font-bold text-white">{device.value}%</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 pt-5 border-t border-white/10">
        <div className="flex items-center space-x-2 text-sm">
          <i className="ri-information-line text-teal-400"></i>
          <span className="text-slate-300">{getAdvice()}</span>
        </div>
      </div>
    </div>
  );
}
