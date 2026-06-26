'use client';

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#6366f1'];

const AdminDashboardClient = ({ pieChartData }) => {
  return (
    <div className="bg-zinc-900/40 border border-zinc-800/80 p-6 rounded-2xl shadow-xl flex flex-col justify-between w-full">
      <div>
        <h3 className="text-sm font-semibold text-zinc-300 mb-4 uppercase tracking-wider">Ebooks Sold by Genre</h3>
      </div>
      
      {pieChartData.length > 0 ? (
        <div className="h-64 w-full relative flex items-center justify-centermy-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={90}
                paddingAngle={4}
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="#18181b" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '12px', color: '#fff' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="text-center py-20 text-xs text-zinc-500">No genre breakdown available</div>
      )}

      {/* Custom Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center pt-4 border-t border-zinc-800/60 text-xs">
        {pieChartData.map((entry, index) => (
          <div key={entry.name} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
            <span className="text-zinc-400">{entry.name} ({entry.value})</span>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AdminDashboardClient;