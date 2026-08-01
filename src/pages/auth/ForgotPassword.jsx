import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { apiService } from '../../services/api';
import { KeyRound, Mail, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

export const ForgotPassword = () => {
  const { setCurrentView, addToast } = useApp();
  const [step, setStep] = useState(1); // 1: Email, 2: OTP boxes, 3: New Password, 4: Success
  const [email, setEmail] = useState('');
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [storedOtp, setStoredOtp] = useState('');

  const otpRefs = useRef([]);

  // Step 1: Send OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await apiService.sendPasswordResetOTP(email);
      if (res.success) {
        setStoredOtp(res.otpCode);
        addToast(`OTP sent to ${email}. Check your inbox.`, 'success');
        setStep(2);
      }
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOTP = (e) => {
    e.preventDefault();
    setErrorMsg('');
    const enteredOtp = otpDigits.join('');
    if (enteredOtp.length !== 6) {
      setErrorMsg('Please enter all 6 digits of the OTP.');
      return;
    }
    if (enteredOtp !== storedOtp) {
      setErrorMsg('Incorrect OTP. Please try again.');
      return;
    }
    addToast('OTP verified successfully!', 'success');
    setStep(3);
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (newPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please re-enter.');
      return;
    }
    if (newPassword.length < 4) {
      setErrorMsg('Password must be at least 4 characters.');
      return;
    }
    setLoading(true);
    try {
      const res = await apiService.resetPassword(email, storedOtp, newPassword);
      if (res.success) {
        addToast('Password reset successful! You can now log in.', 'success');
        setStep(4);
      }
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  // OTP box key handler
  const handleOtpChange = (value, idx) => {
    if (!/^\d*$/.test(value)) return; // digits only
    const updated = [...otpDigits];
    updated[idx] = value.slice(-1); // only last char
    setOtpDigits(updated);
    if (value && idx < 5) {
      otpRefs.current[idx + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !otpDigits[idx] && idx > 0) {
      otpRefs.current[idx - 1]?.focus();
    }
  };

  // Step indicator
  const steps = ['Enter Email', 'Verify OTP', 'New Password', 'Done'];

  return (
    <div className="min-h-[calc(100vh-65px)] flex items-center justify-center p-6 bg-slate-50">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mx-auto shadow-xs">
            <KeyRound className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">Reset Your Password</h2>
          <p className="text-xs text-slate-500 font-medium">Secure OTP verification — 3 step process</p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-between px-2">
          {steps.map((s, idx) => {
            const stepNum = idx + 1;
            const isCompleted = step > stepNum;
            const isCurrent = step === stepNum;
            return (
              <React.Fragment key={s}>
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-extrabold border-2 transition-all ${
                    isCompleted ? 'bg-emerald-500 border-emerald-500 text-white' :
                    isCurrent ? 'bg-blue-600 border-blue-600 text-white' :
                    'bg-white border-slate-300 text-slate-400'
                  }`}>
                    {isCompleted ? '✓' : stepNum}
                  </div>
                  <span className={`text-[9px] font-bold uppercase tracking-wider ${isCurrent ? 'text-blue-600' : 'text-slate-400'}`}>
                    {s}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-1 mb-4 rounded-full ${step > stepNum ? 'bg-emerald-400' : 'bg-slate-200'}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Error */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        {/* ── STEP 1: Enter Email ── */}
        {step === 1 && (
          <form onSubmit={handleSendOTP} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Registered Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="Enter your registered email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-1.5 font-medium">An OTP will be sent to this email for verification.</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold text-xs transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2"
            >
              {loading ? 'Verifying...' : 'Send OTP to Email'} <ArrowRight className="w-4 h-4" />
            </button>

            <button type="button" onClick={() => setCurrentView('login')} className="w-full text-xs text-slate-500 hover:text-blue-600 font-semibold transition-colors">
              ← Back to Sign In
            </button>
          </form>
        )}

        {/* ── STEP 2: Enter OTP ── */}
        {step === 2 && (
          <form onSubmit={handleVerifyOTP} className="space-y-5">
            <p className="text-xs text-center text-slate-500 font-medium">
              Enter the 6-digit OTP sent to <span className="font-bold text-blue-600">{email}</span>
            </p>

            {/* 6-Box OTP Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-3 text-center">Enter 6-Digit OTP</label>
              <div className="flex items-center justify-center gap-2.5">
                {otpDigits.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => (otpRefs.current[idx] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, idx)}
                    onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                    className={`w-11 h-12 text-center text-lg font-extrabold rounded-xl border-2 transition-all focus:outline-none ${
                      digit
                        ? 'border-blue-500 bg-blue-50 text-blue-900'
                        : 'border-slate-300 bg-white text-slate-900 focus:border-blue-400'
                    }`}
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2"
            >
              Verify OTP <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => { setStep(1); setOtpDigits(['','','','','','']); }}
              className="w-full text-xs text-slate-500 hover:text-blue-600 font-semibold transition-colors"
            >
              ← Change Email / Resend OTP
            </button>
          </form>
        )}

        {/* ── STEP 3: New Password ── */}
        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-xs text-emerald-800 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              Identity verified! Create your new password.
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">New Password</label>
              <input
                type="password"
                required
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Confirm New Password</label>
              <input
                type="password"
                required
                placeholder="Re-enter new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full bg-white border rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 transition-all ${
                  confirmPassword && confirmPassword !== newPassword
                    ? 'border-rose-400 focus:ring-rose-100'
                    : 'border-slate-300 focus:border-blue-600 focus:ring-blue-100'
                }`}
              />
              {confirmPassword && confirmPassword !== newPassword && (
                <p className="text-[10px] text-rose-500 font-bold mt-1">Passwords do not match</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || (confirmPassword !== '' && confirmPassword !== newPassword)}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold text-xs transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2"
            >
              {loading ? 'Saving Password...' : 'Save New Password'} <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* ── STEP 4: Success ── */}
        {step === 4 && (
          <div className="text-center space-y-5 py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-slate-900">Password Updated!</h3>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                Your password has been successfully reset. Sign in with your new credentials.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setCurrentView('login')}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2"
            >
              Go to Sign In <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
