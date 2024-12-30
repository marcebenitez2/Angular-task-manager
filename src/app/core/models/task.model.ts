export interface Task {
  _id:         string;
  title:       string;
  description: string;
  status:      string;
  project:     string;
  assignedTo:  string[];
  dueDate:     string;
  __v:         number;
}
