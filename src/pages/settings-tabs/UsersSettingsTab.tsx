import React, { useState } from 'react';
import { Edit, Trash2, ChevronDown, X, Lock } from 'lucide-react';

const CustomSelect: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = ({ children, ...props }) => (
  <div className="relative">
    <select
      {...props}
      className={
        'appearance-none bg-background border border-input rounded px-3 py-2 pr-8 text-text-primary focus:ring-2 focus:ring-accent w-full transition-colors ' +
        (props.className || '')
      }
    >
      {children}
    </select>
    <ChevronDown className="w-4 h-4 text-muted-foreground absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
  </div>
);

const initialUsers = [
  { name: 'Ahmed Ali', email: 'ahmed@example.com', role: 'Admin', status: 'Active' },
  { name: 'Sara Youssef', email: 'sara@example.com', role: 'Admin', status: 'Invited' },
];

const UsersSettingsTab: React.FC = () => {
  const [users, setUsers] = useState(initialUsers);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [deleteIdx, setDeleteIdx] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', role: 'Admin', status: 'Active' });

  const openEdit = (idx: number) => {
    setEditForm(users[idx]);
    setEditIdx(idx);
  };
  const saveEdit = () => {
    if (editIdx !== null) {
      setUsers(users.map((u, i) => (i === editIdx ? editForm : u)));
      setEditIdx(null);
    }
  };
  const openDelete = (idx: number) => setDeleteIdx(idx);
  const confirmDelete = () => {
    if (deleteIdx !== null) {
      setUsers(users.filter((_, i) => i !== deleteIdx));
      setDeleteIdx(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold text-text-primary">Users</h2>
        <button className="bg-primary text-white px-4 py-2 rounded font-semibold hover:bg-primary/90">+ Add User</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-border rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left align-middle text-sm font-semibold text-text-secondary">Name</th>
              <th className="px-4 py-2 text-left align-middle text-sm font-semibold text-text-secondary">Email</th>
              <th className="px-4 py-2 text-left align-middle text-sm font-semibold text-text-secondary">Role</th>
              <th className="px-4 py-2 text-left align-middle text-sm font-semibold text-text-secondary">Status</th>
              <th className="px-4 py-2 text-center align-middle text-sm font-semibold text-text-secondary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user.email}>
                <td className="px-4 py-2 align-middle">{user.name}</td>
                <td className="px-4 py-2 align-middle">{user.email}</td>
                <td className="px-4 py-2 align-middle">{user.role}</td>
                <td className="px-4 py-2 align-middle">{user.status}</td>
                <td className="px-4 py-2 align-middle text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button className="text-accent hover:text-accent-hover" title="Edit" onClick={() => openEdit(idx)}>
                      <Edit className="w-5 h-5" />
                    </button>
                    <button className="bg-red-100 text-red-600 hover:text-red-700 border border-red-200 px-2 py-1 rounded" title="Delete" onClick={() => openDelete(idx)}>
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Edit User Modal */}
      {editIdx !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-secondary-bg rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-red-500" onClick={() => setEditIdx(null)}>
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-6 text-text-primary">Edit User</h2>
            <form onSubmit={e => { e.preventDefault(); saveEdit(); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Name</label>
                <input type="text" value={editForm.name} onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))} className="w-full border border-input rounded-md px-4 py-2 bg-background text-text-primary focus:ring-2 focus:ring-accent focus:border-transparent" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Email</label>
                <input type="email" value={editForm.email} onChange={e => setEditForm(f => ({ ...f, email: e.target.value }))} className="w-full border border-input rounded-md px-4 py-2 bg-background text-text-primary focus:ring-2 focus:ring-accent focus:border-transparent" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Role</label>
                <CustomSelect value={editForm.role} onChange={e => setEditForm(f => ({ ...f, role: e.target.value }))}>
                  <option>Admin</option>
                  <option>Cashier</option>
                  <option>Viewer</option>
                </CustomSelect>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Status</label>
                <CustomSelect value={editForm.status} onChange={e => setEditForm(f => ({ ...f, status: e.target.value }))}>
                  <option>Active</option>
                  <option>Invited</option>
                  <option>Suspended</option>
                </CustomSelect>
              </div>
              <div className="pt-2 flex gap-2">
                <button type="submit" className="bg-accent text-white px-6 py-2 rounded font-semibold hover:bg-accent-hover transition-colors">Save</button>
                <button type="button" className="flex items-center gap-1 bg-muted text-accent border border-accent px-4 py-2 rounded font-semibold hover:bg-accent/10 transition-colors" onClick={() => {}}>
                  <Lock className="w-4 h-4" /> Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Delete User Modal */}
      {deleteIdx !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-secondary-bg rounded-2xl shadow-2xl w-full max-w-sm p-8 relative">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-red-500" onClick={() => setDeleteIdx(null)}>
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold mb-4 text-text-primary">Delete User</h2>
            <p className="mb-6 text-text-secondary">Are you sure you want to delete this user?</p>
            <div className="flex gap-4 justify-end">
              <button className="bg-muted text-foreground px-4 py-2 rounded font-semibold border border-border hover:bg-muted/80 transition-colors" onClick={() => setDeleteIdx(null)}>Cancel</button>
              <button className="bg-red-100 text-red-600 hover:text-red-700 border border-red-200 px-4 py-2 rounded font-semibold" onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
      {/* Invite User Modal Placeholder */}
      <div className="mt-4">
        <button className="bg-accent text-white px-4 py-2 rounded font-semibold hover:bg-accent-hover">Invite User</button>
      </div>
    </div>
  );
};

export default UsersSettingsTab; 