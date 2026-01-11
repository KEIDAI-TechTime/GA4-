export default function DeviceBreakdown() {
  const devices = [
    { name: 'スマホ', value: 68, icon: 'ri-smartphone-line', color: 'from-teal-500 to-cyan-600' },
    { name: 'PC', value: 25, icon: 'ri-computer-line', color: 'from-purple-500 to-pink-600' },
    { name: 'タブレット', value: 7, icon: 'ri-tablet-line', color: 'from-orange-500 to-red-600' },
  ];

  const maxValue = Math.max(...devices.map(d => d.value));

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-slate-900">デバイス</h2>
        <p className="text-sm text-slate-500">デバイス別アクセス</p>
      </div>

      <div className="space-y-5">
        {devices.map((device, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 bg-gradient-to-br ${device.color} rounded-lg flex items-center justify-center`}>
                  <i className={`${device.icon} text-lg text-white`}></i>
                </div>
                <span className="text-sm font-medium text-slate-900">{device.name}</span>
              </div>
              <span className="text-lg font-bold text-slate-900">{device.value}%</span>
            </div>
            <div className="relative w-full bg-slate-100 rounded-full h-3">
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

      <div className="mt-5 pt-5 border-t border-slate-200">
        <div className="flex items-center space-x-2 text-sm">
          <i className="ri-information-line text-teal-600"></i>
          <span className="text-slate-600">スマホ比率が70%を超えています。モバイル最適化を優先しましょう。</span>
        </div>
      </div>
    </div>
  );
}
