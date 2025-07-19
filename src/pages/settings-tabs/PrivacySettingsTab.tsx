import React, { useState } from 'react';

const initialUser = {
  name: 'Mohamed Mostafa',
  email: 'mohamed@example.com',
};

const PrivacySettingsTab: React.FC = () => {
  const [user, setUser] = useState(initialUser);
  const [editName, setEditName] = useState(user.name);
  const [editEmail, setEditEmail] = useState(user.email);
  const [infoSuccess, setInfoSuccess] = useState(false);
  const [infoError, setInfoError] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);
  const [resetFinal, setResetFinal] = useState(false);

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setError('');
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError('All fields are required.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.');
      return;
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setSuccess(true);
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleReset = () => {
    setResetConfirm(true);
    setResetFinal(false);
  };
  const handleFinalReset = () => {
    setResetFinal(true);
  };
  const confirmReset = () => {
    setUser(initialUser);
    setEditName(initialUser.name);
    setEditEmail(initialUser.email);
    setInfoSuccess(false);
    setInfoError('');
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setSuccess(false);
    setError('');
    setResetConfirm(false);
    setResetFinal(false);
  };
  const cancelReset = () => {
    setResetConfirm(false);
    setResetFinal(false);
  };

  return (
    <form className="max-w-2xl mx-auto bg-card border border-border rounded-2xl shadow-lg p-8 space-y-8">
      <div>
        <h2 className="text-lg font-bold text-text-primary mb-2">User Information</h2>
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1">
            <label className="text-sm font-medium text-text-primary">Name</label>
            <input type="text" className="mt-1 w-full rounded border border-input bg-background px-3 py-2 text-text-primary focus:ring-2 focus:ring-accent" value={editName} onChange={e => setEditName(e.target.value)} required />
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium text-text-primary">Email</label>
            <input type="email" className="mt-1 w-full rounded border border-input bg-background px-3 py-2 text-text-primary focus:ring-2 focus:ring-accent" value={editEmail} onChange={e => setEditEmail(e.target.value)} required />
          </div>
        </div>
      </div>
      {(infoError || infoSuccess) && (
        <div className="text-sm font-medium px-2">
          {infoError && <span className="text-red-600">{infoError}</span>}
          {infoSuccess && <span className="text-green-600">User info updated successfully!</span>}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div>
          <button type="button" className="bg-muted text-accent border border-accent px-4 py-2 rounded font-semibold hover:bg-accent/10 transition-colors mb-2" onClick={() => setShowPassword(v => !v)}>
            Change Password
          </button>
        </div>
      </div>
      {showPassword && (
        <div className="max-w-md mx-auto bg-muted/40 border border-border rounded-xl p-6 mt-4">
          <h2 className="text-lg font-bold text-text-primary mb-4">Change Password</h2>
          <form className="space-y-4" onSubmit={handleChangePassword}>
            <div>
              <label className="text-sm font-medium text-text-primary">Old Password</label>
              <input type="password" className="mt-1 w-full rounded border border-input bg-background px-3 py-2 text-text-primary focus:ring-2 focus:ring-accent" value={oldPassword} onChange={e => setOldPassword(e.target.value)} required />
            </div>
            <div>
              <label className="text-sm font-medium text-text-primary">New Password</label>
              <input type="password" className="mt-1 w-full rounded border border-input bg-background px-3 py-2 text-text-primary focus:ring-2 focus:ring-accent" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
            </div>
            <div>
              <label className="text-sm font-medium text-text-primary">Confirm New Password</label>
              <input type="password" className="mt-1 w-full rounded border border-input bg-background px-3 py-2 text-text-primary focus:ring-2 focus:ring-accent" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
            </div>
            {(error || success) && (
              <div className="text-sm font-medium px-2">
                {error && <span className="text-red-600">{error}</span>}
                {success && <span className="text-green-600">Password changed successfully!</span>}
              </div>
            )}
            <button type="submit" className="bg-accent text-white px-6 py-2 rounded font-semibold hover:bg-accent-hover transition-colors w-full">Save Password</button>
          </form>
        </div>
      )}
      <div className="flex flex-col md:flex-row gap-4 justify-end pt-2">
        <button type="submit" className="bg-accent text-white px-6 py-2 rounded font-semibold hover:bg-accent-hover transition-colors">Save</button>
        <button type="button" className="bg-red-100 text-red-600 hover:text-red-700 border border-red-200 px-6 py-2 rounded font-semibold" onClick={handleReset}>Reset All Settings</button>
      </div>
      {resetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-secondary-bg rounded-2xl shadow-2xl w-full max-w-sm p-8 relative">
            {!resetFinal ? (
              <>
                <h2 className="text-xl font-bold mb-4 text-text-primary">Reset All Settings</h2>
                <p className="mb-6 text-text-secondary">Are you sure you want to reset all privacy settings to default?</p>
                <div className="flex gap-4 justify-end">
                  <button className="bg-muted text-foreground px-4 py-2 rounded font-semibold border border-border hover:bg-muted/80 transition-colors" onClick={cancelReset}>Cancel</button>
                  <button className="bg-red-100 text-red-600 hover:text-red-700 border border-red-200 px-4 py-2 rounded font-semibold" onClick={handleFinalReset}>Reset</button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold mb-4 text-red-600">Warning!</h2>
                <p className="mb-6 text-text-secondary font-semibold">This action cannot be undone. Are you absolutely sure you want to reset <span className='text-red-600'>ALL</span> privacy settings?</p>
                <div className="flex gap-4 justify-end">
                  <button className="bg-muted text-foreground px-4 py-2 rounded font-semibold border border-border hover:bg-muted/80 transition-colors" onClick={cancelReset}>Cancel</button>
                  <button className="bg-red-100 text-red-600 hover:text-red-700 border border-red-200 px-4 py-2 rounded font-semibold" onClick={confirmReset}>Yes, Reset All</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </form>
  );
};

export default PrivacySettingsTab; 