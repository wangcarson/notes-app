import mongoose from 'mongoose';

export interface UserData {
  id?: string;
  name: string;
  email?: string;
  passwordHash?: string;
  phone?: string;
  provider: 'email' | 'google' | 'github';
  identities?: Array<{
    provider: string;
    providerUserId: string;
    accessToken?: string;
    refreshToken?: string;
  }>;
  boards: Array<string>;
}

const userSchema = new mongoose.Schema<UserData>({
  name: { type: String, required: true },
  email: String,
  passwordHash: String,
  phone: String,
  provider: { type: String, default: 'email' },
  identities: [
    {
      provider: { type: String, required: true },
      providerUserId: { type: String, required: true },
      accessToken: { type: String },
      refreshToken: { type: String },
    },
  ],
  boards: { type: [String], default: [] }
}, {
  timestamps: true
});

const User = mongoose.models.User || mongoose.model<UserData>("User", userSchema);
export default User;
