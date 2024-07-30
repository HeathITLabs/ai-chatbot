import { useSession } from 'next-auth/client';
import Chat from '../components/ChatComponent';

export default function Home() {
  const [session, loading] = useSession();

  if (loading) return <p>Loading...</p>;
  if (!session) return <p>You need to sign in</p>;

  return <Chat userId={session.user.id} />;
}