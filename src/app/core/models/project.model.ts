export interface Project {
  _id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'on-hold';
  createdAt: string;
  updatedAt: string;
}