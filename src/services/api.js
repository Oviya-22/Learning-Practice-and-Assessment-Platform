import { getDBUsers, saveDBUsers, getDBQuestions, initDatabase } from './db';
import { ASSESSMENT_QUESTION_BANK, ASSESSMENT_LIST } from '../data/assessmentData';

// Simulated Backend API Service layer
export const apiService = {
  // Login with DB authentication
  loginUser: async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getDBUsers();
        const foundUser = users.find(
          u => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
        );

        if (foundUser) {
          const jwtToken = `jwt_header.${btoa(JSON.stringify({ id: foundUser.id, role: foundUser.role }))}.signature`;
          resolve({
            success: true,
            user: foundUser,
            token: jwtToken,
            message: 'Authentication successful'
          });
        } else {
          reject(new Error('Invalid email address or password. Please try again.'));
        }
      }, 500);
    });
  },

  // Forgot Password Step 1: Check Email & Send OTP
  sendPasswordResetOTP: async (email) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getDBUsers();
        const foundUser = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
        
        if (foundUser) {
          resolve({
            success: true,
            otpCode: '777888',
            message: `OTP verification code sent to ${email}`
          });
        } else {
          reject(new Error('Account with this email address was not found in database.'));
        }
      }, 500);
    });
  },

  // Forgot Password Step 2 & 3: Verify OTP and Reset Password in DB
  resetPassword: async (email, otpCode, newPassword) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getDBUsers();
        const userIndex = users.findIndex(u => u.email.toLowerCase() === email.trim().toLowerCase());

        if (userIndex !== -1) {
          if (otpCode !== '777888' && otpCode !== '123456' && otpCode !== '555777') {
            reject(new Error('Invalid OTP code. Use demo OTP: 777888'));
            return;
          }

          users[userIndex].password = newPassword;
          saveDBUsers(users);

          resolve({
            success: true,
            message: 'Password successfully updated in database!'
          });
        } else {
          reject(new Error('User account not found'));
        }
      }, 600);
    });
  },

  // Fetch Questions from DB (Practice Engine)
  fetchQuestions: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const questions = getDBQuestions();
        resolve(questions);
      }, 400);
    });
  },

  // Fetch All Assessment Definitions from DB
  fetchAssessments: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(ASSESSMENT_LIST);
      }, 300);
    });
  },

  // Fetch Questions for a specific Assessment (by questionIds array)
  fetchAssessmentQuestions: async (questionIds) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const allQuestions = ASSESSMENT_QUESTION_BANK;
        // Return questions in order, or all if no filter
        const filtered = questionIds && questionIds.length
          ? allQuestions.filter(q => questionIds.includes(q.id))
          : allQuestions;
        resolve(filtered);
      }, 400);
    });
  }
};
