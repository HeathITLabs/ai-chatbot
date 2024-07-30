import { signIn } from 'next-auth/client';

export default function SignIn() {
  return (
    <div>
      <form onSubmit={(e) => { e.preventDefault(); signIn('credentials', { username: e.target.username.value, password: e.target.password.value }); }}>
        <input name="username" type="text" placeholder="Username" required />
        <input name="password" type="password" placeholder="Password" required />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}