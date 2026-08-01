import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_USERS_ADMIN } from '../../data/mockData';
import { Users, Search, ShieldCheck, UserX, UserCheck, Edit3 } from 'lucide-react';

export const UserManagement = () => {
  const { addToast } = useApp();
  const [users, setUsers] = useState(MOCK_USERS_ADMIN);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleUserStatus = (userId) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const nextStatus = u.status === 'Active' ? 'Suspended' : 'Active';
        addToast(`User ${u.name} status updated to ${nextStatus}`, 'info');
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-400" /> Platform User Management
          </h2>
          <p className="text-xs text-gray-400">Manage user accounts, RBAC permissions, and account activation states</p>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, email or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      <div className="glass-panel p-6 rounded-3xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-gray-300">
            <thead className="text-[11px] text-gray-400 uppercase bg-white/5 border-b border-white/10">
              <tr>
                <th className="p-3">User Name & Email</th>
                <th className="p-3">Assigned Role</th>
                <th className="p-3">Account Status</th>
                <th className="p-3">Joined Date</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-3">
                    <div className="font-bold text-white">{u.name}</div>
                    <div className="text-[11px] text-gray-400">{u.email}</div>
                  </td>
                  <td className="p-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {u.role}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      u.status === 'Active' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                    }`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="p-3 font-mono">{u.joined}</td>
                  <td className="p-3">
                    <button
                      onClick={() => toggleUserStatus(u.id)}
                      className={`px-3 py-1 rounded-lg font-bold text-xs transition-colors flex items-center gap-1 ${
                        u.status === 'Active'
                          ? 'bg-rose-500/20 text-rose-300 hover:bg-rose-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
                      }`}
                    >
                      {u.status === 'Active' ? <UserX className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
                      {u.status === 'Active' ? 'Suspend' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
