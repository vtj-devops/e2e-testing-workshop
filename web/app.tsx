// NOTE: このファイルはブラウザの Babel (standalone) で TSX を直接トランスパイルして実行する
// 開発用の簡易構成です。エディタの型チェックを簡単化するために以下を有効にしています。
// @ts-nocheck
/** @jsxRuntime classic */

type User = { username: string; role: 'admin' | 'user' } | null;

const { useState, useEffect } = React as any;

function Login({ onLogin }: { onLogin: (u: User) => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e: any) {
    e.preventDefault();
    setError('');
    // デモ用の固定アカウント: 管理者(admin) と 一般ユーザー(user)
    const accounts: Record<string, { password: string; role: 'admin' | 'user' }> = {
      admin: { password: 'password', role: 'admin' },
      user: { password: 'password', role: 'user' },
    };
    const acct = accounts[username];
    if (acct && password === acct.password) {
      onLogin({ username, role: acct.role });
    } else {
      setError('ユーザー名かパスワードが違います');
    }
  }

  return (
    <div className="card">
      <h2>ログイン</h2>
      <form onSubmit={handleSubmit}>
        <label>
          ユーザー名
          <input
            value={username}
            onChange={(e: any) => setUsername(e.target.value)}
            aria-label="username"
            data-testid="username-input"
            required
          />
        </label>
        <label>
          パスワード
          <input
            type="password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            aria-label="password"
            data-testid="password-input"
            required
          />
        </label>
        {error && <div className="error" role="alert">{error}</div>}
  <button type="submit" data-testid="login-button">ログイン</button>
      </form>
  <div className="hint">デモ用アカウント: 管理者 <strong>admin</strong> / 一般ユーザー <strong>user</strong>（パスワードはいずれも <strong>password</strong>）</div>
    </div>
  );
}

function Dashboard({ user, onLogout }: { user: NonNullable<User>; onLogout: () => void }) {
  const [secretVisible, setSecretVisible] = useState(false);
  return (
    <div className="card">
      <h2>ようこそ、{user.username}さん</h2>
      <p>これは保護されたダッシュボードページのサンプルです。</p>

      {/* 管理者のみが見られるセクション */}
      {user.role === 'admin' && (
        <div className="admin-panel">
          <h3>管理者用ダッシュボード</h3>
          <p>ここには管理者だけが使える管理操作が表示されます。</p>
          {/* 管理者ボタン: ユーザー一覧をトグル表示（デモデータ） */}
          <AdminUserListToggle />
        </div>
      )}

      <button data-testid="toggle-secret" onClick={() => setSecretVisible((s: boolean) => !s)}>
        {secretVisible ? '秘密を隠す' : '秘密を表示'}
      </button>
      {secretVisible && <pre className="secret">シークレットデータ: 42-SECRET</pre>}
      <div style={{ marginTop: '12px' }}>
        <button className="secondary" data-testid="logout-button" onClick={onLogout}>ログアウト</button>
      </div>
    </div>
  );
}

function AdminUserListToggle() {
  const [visible, setVisible] = useState(false);
  const demoUsers = [
    { id: 1, username: 'admin', role: 'admin' },
    { id: 2, username: 'alice', role: 'user' },
    { id: 3, username: 'bob', role: 'user' },
  ];

  return (
    <div>
      <button className="danger" data-testid="toggle-user-list" onClick={() => setVisible(v => !v)}>
        {visible ? 'ユーザー一覧を隠す' : 'ユーザー一覧を表示'}
      </button>
      {visible && (
        <ul className="user-list" style={{ marginTop: '8px' }}>
          {demoUsers.map(u => (
            <li key={u.id}>{u.username} — {u.role}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function App() {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    const raw = localStorage.getItem('simple-react-auth');
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        // 以前の形式では role がなかった可能性があるため、無ければ一般ユーザーとして扱う
        if (parsed && typeof parsed === 'object' && !('role' in parsed)) {
          parsed.role = 'user';
        }
        setUser(parsed);
      } catch (e) {
        localStorage.removeItem('simple-react-auth');
      }
    }
  }, []);

  function handleLogin(u: User) {
    setUser(u);
    if (u) localStorage.setItem('simple-react-auth', JSON.stringify(u));
  }

  function handleLogout() {
    setUser(null);
    localStorage.removeItem('simple-react-auth');
  }

  return (
    <div className="app">
      <header>
        <h1>E2E Workshop - Simple React Login</h1>
      </header>
      <main>
        {!user ? (
          <Login onLogin={handleLogin} />
        ) : (
          <Dashboard user={user as NonNullable<User>} onLogout={handleLogout} />
        )}
      </main>
      <footer>
        <small>クライアントサイドのみの簡易デモです（認証はハードコードされています）</small>
      </footer>
    </div>
  );
}

(ReactDOM as any).createRoot(document.getElementById('root')).render(React.createElement(App));
