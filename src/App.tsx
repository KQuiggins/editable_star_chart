import React, { useState, useEffect } from 'react';
import { Save, Printer, Edit3, Check, X } from 'lucide-react';

interface ChartData {
  childName: string;
  behaviors: string[];
  completions: { [key: string]: boolean };
}

const DAYS = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
const DAY_COLORS = [
  'border-pink-400 bg-pink-50',
  'border-orange-400 bg-orange-50',
  'border-yellow-400 bg-yellow-50',
  'border-green-400 bg-green-50',
  'border-blue-400 bg-blue-50',
  'border-purple-400 bg-purple-50',
  'border-pink-400 bg-pink-50'
];

const DEFAULT_BEHAVIORS = [
  'Be A Good Listener',
  'Be Kind To Each Other',
  'Use Inside Voices',
  'Use Good Manners',
  'Help Clean Living Room',
  'Clean Your Bedroom',
  'Clean Your Toy Room',
  'Work On Using Potty',
  'Have Good Bath Time'
];

function App() {
  const [chartData, setChartData] = useState<ChartData>({
    childName: "Kenzie's",
    behaviors: DEFAULT_BEHAVIORS,
    completions: {}
  });
  
  const [editingName, setEditingName] = useState(false);
  const [editingBehavior, setEditingBehavior] = useState<number | null>(null);
  const [tempName, setTempName] = useState(chartData.childName);
  const [tempBehavior, setTempBehavior] = useState('');

  // Load data from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('rewardChartData');
    if (saved) {
      setChartData(JSON.parse(saved));
    }
  }, []);

  // Save data to localStorage whenever chartData changes
  useEffect(() => {
    localStorage.setItem('rewardChartData', JSON.stringify(chartData));
  }, [chartData]);

  const toggleCompletion = (behaviorIndex: number, dayIndex: number) => {
    const key = `${behaviorIndex}-${dayIndex}`;
    setChartData(prev => ({
      ...prev,
      completions: {
        ...prev.completions,
        [key]: !prev.completions[key]
      }
    }));
  };

  const saveNameEdit = () => {
    setChartData(prev => ({ ...prev, childName: tempName }));
    setEditingName(false);
  };

  const cancelNameEdit = () => {
    setTempName(chartData.childName);
    setEditingName(false);
  };

  const startEditingBehavior = (index: number) => {
    setEditingBehavior(index);
    setTempBehavior(chartData.behaviors[index]);
  };

  const saveBehaviorEdit = () => {
    if (editingBehavior !== null) {
      const newBehaviors = [...chartData.behaviors];
      newBehaviors[editingBehavior] = tempBehavior;
      setChartData(prev => ({ ...prev, behaviors: newBehaviors }));
      setEditingBehavior(null);
      setTempBehavior('');
    }
  };

  const cancelBehaviorEdit = () => {
    setEditingBehavior(null);
    setTempBehavior('');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSave = () => {
    const dataStr = JSON.stringify(chartData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `${chartData.childName.replace(/[^a-z0-9]/gi, '_')}_reward_chart.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      {/* Action Buttons - Hidden when printing */}
      <div className="print:hidden fixed top-4 right-4 flex gap-2 z-10">
        <button
          onClick={handleSave}
          className="bg-purple-500 hover:bg-purple-600 text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105"
          title="Save Chart Data"
        >
          <Save size={20} />
        </button>
        <button
          onClick={handlePrint}
          className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105"
          title="Print Chart"
        >
          <Printer size={20} />
        </button>
      </div>

      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Rainbow Header */}
        <div className="relative bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 p-8 text-center overflow-hidden">
          {/* Decorative dots */}
          <div className="absolute top-6 left-8 w-3 h-3 bg-yellow-400 rounded-full"></div>
          <div className="absolute top-12 right-12 w-2 h-2 bg-pink-400 rounded-full"></div>
          <div className="absolute top-4 right-24 w-2 h-2 bg-purple-500 rounded-full"></div>
          <div className="absolute bottom-8 left-16 w-2 h-2 bg-green-400 rounded-full"></div>
          <div className="absolute bottom-6 right-8 w-3 h-3 bg-blue-400 rounded-full"></div>
          <div className="absolute top-8 left-1/3 w-2 h-2 bg-orange-400 rounded-full"></div>
          
          {/* Rainbow SVG */}
          <div className="flex justify-center mb-4">
            <svg width="200" height="120" viewBox="0 0 200 120" className="drop-shadow-sm">
              {/* Rainbow arcs */}
              <path d="M 20 100 A 80 80 0 0 1 180 100" stroke="#e91e63" strokeWidth="8" fill="none" />
              <path d="M 28 100 A 72 72 0 0 1 172 100" stroke="#ff9800" strokeWidth="8" fill="none" />
              <path d="M 36 100 A 64 64 0 0 1 164 100" stroke="#ffeb3b" strokeWidth="8" fill="none" />
              <path d="M 44 100 A 56 56 0 0 1 156 100" stroke="#4caf50" strokeWidth="8" fill="none" />
              <path d="M 52 100 A 48 48 0 0 1 148 100" stroke="#2196f3" strokeWidth="8" fill="none" />
              <path d="M 60 100 A 40 40 0 0 1 140 100" stroke="#9c27b0" strokeWidth="8" fill="none" />
              
              {/* Clouds */}
              <g transform="translate(15,95)">
                <circle cx="8" cy="5" r="8" fill="#fff" opacity="0.9" />
                <circle cx="20" cy="5" r="10" fill="#fff" opacity="0.9" />
                <circle cx="32" cy="5" r="8" fill="#fff" opacity="0.9" />
                <rect x="8" y="8" width="24" height="8" fill="#fff" opacity="0.9" rx="4" />
              </g>
              
              <g transform="translate(155,95)">
                <circle cx="8" cy="5" r="8" fill="#fff" opacity="0.9" />
                <circle cx="20" cy="5" r="10" fill="#fff" opacity="0.9" />
                <circle cx="32" cy="5" r="8" fill="#fff" opacity="0.9" />
                <rect x="8" y="8" width="24" height="8" fill="#fff" opacity="0.9" rx="4" />
              </g>
            </svg>
          </div>
          
          {/* Editable Title */}
          <div className="mb-2">
            {editingName ? (
              <div className="flex items-center justify-center gap-2">
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="text-4xl md:text-5xl font-bold text-purple-600 bg-transparent border-b-2 border-purple-400 text-center max-w-md outline-none"
                  autoFocus
                />
                <button onClick={saveNameEdit} className="text-green-600 hover:text-green-700 p-1">
                  <Check size={24} />
                </button>
                <button onClick={cancelNameEdit} className="text-red-600 hover:text-red-700 p-1">
                  <X size={24} />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 group">
                <h1 className="text-4xl md:text-5xl font-bold text-purple-600 font-serif">
                  {chartData.childName}
                </h1>
                <button
                  onClick={() => {
                    setEditingName(true);
                    setTempName(chartData.childName);
                  }}
                  className="text-purple-400 hover:text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity p-1 print:hidden"
                >
                  <Edit3 size={20} />
                </button>
              </div>
            )}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-purple-500 font-serif">
            Reward Chart
          </h2>
        </div>

        {/* Chart Table */}
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border-2 border-gray-800 bg-white p-3 text-left font-bold text-purple-600 text-lg min-w-[200px]">
                    Behavior
                  </th>
                  {DAYS.map((day, index) => (
                    <th
                      key={day}
                      className={`border-2 border-gray-800 p-3 text-center font-bold text-lg min-w-[80px] ${DAY_COLORS[index]}`}
                      style={{ color: index === 1 ? '#f97316' : index === 2 ? '#eab308' : index === 3 ? '#22c55e' : index === 4 ? '#3b82f6' : '#a855f7' }}
                    >
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {chartData.behaviors.map((behavior, behaviorIndex) => (
                  <tr key={behaviorIndex}>
                    <td className="border-2 border-gray-800 p-3 bg-white">
                      {editingBehavior === behaviorIndex ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={tempBehavior}
                            onChange={(e) => setTempBehavior(e.target.value)}
                            className="text-purple-600 font-medium bg-transparent border-b border-purple-400 outline-none flex-1"
                            autoFocus
                          />
                          <button onClick={saveBehaviorEdit} className="text-green-600 hover:text-green-700 p-1">
                            <Check size={16} />
                          </button>
                          <button onClick={cancelBehaviorEdit} className="text-red-600 hover:text-red-700 p-1">
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 group">
                          <span className="text-purple-600 font-medium">
                            {behavior}
                          </span>
                          <button
                            onClick={() => startEditingBehavior(behaviorIndex)}
                            className="text-purple-400 hover:text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity p-1 print:hidden"
                          >
                            <Edit3 size={14} />
                          </button>
                        </div>
                      )}
                    </td>
                    {DAYS.map((_, dayIndex) => {
                      const key = `${behaviorIndex}-${dayIndex}`;
                      const isCompleted = chartData.completions[key];
                      return (
                        <td
                          key={dayIndex}
                          className={`border-2 border-gray-800 p-3 text-center ${DAY_COLORS[dayIndex]} cursor-pointer hover:opacity-80 transition-opacity`}
                          onClick={() => toggleCompletion(behaviorIndex, dayIndex)}
                        >
                          <div className="w-full h-8 flex items-center justify-center">
                            {isCompleted && (
                              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                                <Check size={16} className="text-white" />
                              </div>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;