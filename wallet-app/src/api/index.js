import { request } from './client';

export const api = {
  auth: {
    register: (data) => request('/auth/register', { method: 'POST', body: data }),
    login: (data) => request('/auth/login', { method: 'POST', body: data }),
    profile: () => request('/auth/profile'),
    changePassword: (data) => request('/auth/change-password', { method: 'POST', body: data }),
  },
  deposits: {
    submit: (data) => request('/deposits', { method: 'POST', body: data }),
    mine: () => request('/deposits'),
  },
  withdrawals: {
    submit: (data) => request('/withdrawals', { method: 'POST', body: data }),
    mine: () => request('/withdrawals'),
  },
  levels: {
    getAll: () => request('/levels'),
    purchase: (data) => request('/levels/purchase', { method: 'POST', body: data }),
  },
  tasks: {
    today: () => request('/tasks'),
    rate: (data) => request('/tasks/rate', { method: 'POST', body: data }),
  },
  transactions: () => request('/transactions'),
  settings: {
    depositWallet: () => request('/settings/deposit-wallet'),
    updateDepositWallet: (data) => request('/settings/deposit-wallet', { method: 'PUT', body: data }),
    announcement: () => request('/settings/announcement'),
    updateAnnouncement: (data) => request('/settings/announcement', { method: 'PUT', body: data }),
  },
  admin: {
    stats: () => request('/admin/stats'),
    changePassword: (data) => request('/admin/password', { method: 'PUT', body: data }),
    users: () => request('/admin/users'),
    updateUser: (id, data) => request(`/admin/users/${id}`, { method: 'PUT', body: data }),
    deposits: (status) => request(`/admin/deposits${status ? `?status=${status}` : ''}`),
    approveDeposit: (id) => request(`/admin/deposits/${id}/approve`, { method: 'POST' }),
    rejectDeposit: (id) => request(`/admin/deposits/${id}/reject`, { method: 'POST' }),
    withdrawals: (status) => request(`/admin/withdrawals${status ? `?status=${status}` : ''}`),
    approveWithdrawal: (id) => request(`/admin/withdrawals/${id}/approve`, { method: 'POST' }),
    rejectWithdrawal: (id) => request(`/admin/withdrawals/${id}/reject`, { method: 'POST' }),
    hotels: () => request('/admin/hotels'),
    addHotel: (data) => request('/admin/hotels', { method: 'POST', body: data }),
    updateHotel: (id, data) => request(`/admin/hotels/${id}`, { method: 'PUT', body: data }),
    deleteHotel: (id) => request(`/admin/hotels/${id}`, { method: 'DELETE' }),
    levels: () => request('/admin/levels'),
    addLevel: (data) => request('/admin/levels', { method: 'POST', body: data }),
    updateLevel: (id, data) => request(`/admin/levels/${id}`, { method: 'PUT', body: data }),
    deleteLevel: (id) => request(`/admin/levels/${id}`, { method: 'DELETE' }),
  },
};
