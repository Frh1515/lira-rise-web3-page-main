
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
}

interface Task {
  id: string;
  platform: string;
  description: string;
  reward: number;
  completed: boolean;
  completedAt?: Date;
}

interface AppState {
  user: User | null;
  balance: number;
  tasks: Task[];
  referralCode: string;
  submittedReferralCode: string;
  completingTasks: string[];
  claimableRewards: string[];
  setUser: (user: User) => void;
  setBalance: (balance: number) => void;
  addBalance: (amount: number) => void;
  completeTask: (taskId: string) => void;
  setCompletingTask: (taskId: string, completing: boolean) => void;
  setClaimableReward: (taskId: string) => void;
  clearClaimableReward: (taskId: string) => void;
  setReferralCode: (code: string) => void;
  setSubmittedReferralCode: (code: string) => void;
  updateFullName: (name: string) => void;
  initializeTasks: () => void;
}

const defaultTasks: Task[] = [
  // Facebook
  { id: 'fb-1', platform: 'Facebook', description: 'Follow the official page', reward: 10, completed: false },
  { id: 'fb-2', platform: 'Facebook', description: 'Like and comment on a post', reward: 5, completed: false },
  { id: 'fb-3', platform: 'Facebook', description: 'Share a post', reward: 15, completed: false },
  
  // X/Twitter
  { id: 'x-1', platform: 'X/Twitter', description: 'Follow the account', reward: 10, completed: false },
  { id: 'x-2', platform: 'X/Twitter', description: 'Retweet the latest post', reward: 5, completed: false },
  { id: 'x-3', platform: 'X/Twitter', description: 'Reply with hashtag #TimeApp', reward: 10, completed: false },
  
  // TikTok
  { id: 'tt-1', platform: 'TikTok', description: 'Follow the account', reward: 10, completed: false },
  { id: 'tt-2', platform: 'TikTok', description: 'Like a video', reward: 5, completed: false },
  { id: 'tt-3', platform: 'TikTok', description: 'Comment on a video', reward: 5, completed: false },
  { id: 'tt-4', platform: 'TikTok', description: 'Create a Duet or Stitch', reward: 20, completed: false },
  
  // Instagram
  { id: 'ig-1', platform: 'Instagram', description: 'Follow the account', reward: 10, completed: false },
  { id: 'ig-2', platform: 'Instagram', description: 'Like a photo', reward: 5, completed: false },
  { id: 'ig-3', platform: 'Instagram', description: 'Write a respectful comment', reward: 10, completed: false },
  { id: 'ig-4', platform: 'Instagram', description: 'Share in your story', reward: 15, completed: false },
  
  // YouTube
  { id: 'yt-1', platform: 'YouTube', description: 'Subscribe to the channel', reward: 15, completed: false },
  { id: 'yt-2', platform: 'YouTube', description: 'Like a video', reward: 10, completed: false },
  { id: 'yt-3', platform: 'YouTube', description: 'Write a comment', reward: 10, completed: false },
  { id: 'yt-4', platform: 'YouTube', description: 'Share with 3 friends', reward: 20, completed: false },
  
  // Telegram
  { id: 'tg-1', platform: 'Telegram', description: 'Join the channel', reward: 10, completed: false },
  { id: 'tg-2', platform: 'Telegram', description: 'Join the group', reward: 10, completed: false },
  { id: 'tg-3', platform: 'Telegram', description: 'Invite 3 people', reward: 15, completed: false },
  { id: 'tg-4', platform: 'Telegram', description: 'Participate in a group discussion', reward: 10, completed: false },
];

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      balance: 120,
      tasks: [],
      referralCode: '',
      submittedReferralCode: '',
      completingTasks: [],
      claimableRewards: [],
      
      setUser: (user) => set({ user }),
      
      setBalance: (balance) => set({ balance }),
      
      addBalance: (amount) => set((state) => ({ balance: state.balance + amount })),
      
      completeTask: (taskId) => set((state) => ({
        tasks: state.tasks.map(task => 
          task.id === taskId 
            ? { ...task, completed: true, completedAt: new Date() }
            : task
        )
      })),
      
      setCompletingTask: (taskId, completing) => set((state) => ({
        completingTasks: completing 
          ? [...state.completingTasks, taskId]
          : state.completingTasks.filter(id => id !== taskId)
      })),

      setClaimableReward: (taskId) => set((state) => ({
        claimableRewards: [...state.claimableRewards, taskId]
      })),

      clearClaimableReward: (taskId) => set((state) => ({
        claimableRewards: state.claimableRewards.filter(id => id !== taskId)
      })),
      
      setReferralCode: (code) => set({ referralCode: code }),
      
      setSubmittedReferralCode: (code) => set({ submittedReferralCode: code }),
      
      updateFullName: (name) => set((state) => ({
        user: state.user ? { ...state.user, fullName: name } : null
      })),
      
      initializeTasks: () => set((state) => ({
        tasks: state.tasks.length === 0 ? defaultTasks : state.tasks
      }))
    }),
    {
      name: 'lyra-coin-storage',
    }
  )
);
