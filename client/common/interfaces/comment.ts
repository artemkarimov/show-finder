import Show from './show';
import User from './user';

interface Comment {
  id: number;
  content: string;
  show: Show;
  user: User;
}

export default Comment;
